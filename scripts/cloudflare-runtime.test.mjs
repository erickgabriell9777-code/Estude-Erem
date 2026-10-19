import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { createTestRuntime, root } from "./test-support/cloudflare-runtime.mjs";

const version = JSON.parse(readFileSync(`${root}/package.json`, "utf8")).version;
const config = JSON.parse(readFileSync(`${root}/dist/server/wrangler.json`, "utf8"));
const assets = readdirSync(`${root}/dist/client/_next/static`, { recursive: true })
  .filter(path => /\.(?:css|js)$/.test(path)).map(path => `/_next/static/${path}`);

test("compiled Cloudflare app serves authenticated styles, scripts and study data", async t => {
  assert.equal(config.assets.run_worker_first, true);
  assert.equal(config.assets.binding, "ASSETS");
  assert.ok(assets.some(path => path.endsWith(".css")), "Build must contain a stylesheet");
  assert.ok(assets.some(path => path.endsWith(".js")), "Build must contain client JavaScript");
  const { mf, token } = await createTestRuntime();
  t.after(() => mf.dispose());
  const jwt = await token();
  const cookie = { cookie: `CF_Authorization=${jwt}` };
  const fetch = (path, options = {}) => mf.dispatchFetch(`http://localhost${path}`, options);
  const css = assets.find(path => path.endsWith(".css"));
  const js = assets.find(path => path.endsWith(".js"));

  await t.test("anonymous, forged and uninvited sessions cannot read pages, APIs or assets", async () => {
    const outsider = await token("outsider@example.com", "outsider");
    for (const [headers, status] of [
      [{}, 401],
      [{ "oai-authenticated-user-id": "owner", "oai-authenticated-user-email": "owner@example.com" }, 401],
      [{ cookie: "CF_Authorization=invalid" }, 401],
      [{ cookie: `CF_Authorization=${outsider}` }, 403],
    ]) {
      for (const path of ["/", "/api/study", css, js, "/pdfjs/pdf.worker.min.mjs"]) {
        const response = await fetch(path, { headers });
        assert.equal(response.status, status, path);
        assert.equal(response.headers.get("cache-control"), "private, no-store");
        await response.arrayBuffer();
      }
    }
  });

  await t.test("HTML references real styles and scripts, and every built asset loads with its correct type", async () => {
    const response = await fetch("/", { headers: cookie });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("X-Erem-Version"), version);
    const html = await response.text();
    assert.match(html, /<link[^>]+rel="stylesheet"/);
    assert.match(html, /<script[^>]+src="\/_next\/static\//);
    for (const match of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)(?:\?[^"<]*)?"/g)) {
      assert.ok(assets.includes(match[1]), `HTML references a missing asset: ${match[1]}`);
    }
    for (const path of [...assets, "/favicon.svg", "/pdfjs/pdf.worker.min.mjs"]) {
      const resource = await fetch(path, { headers: cookie });
      assert.equal(resource.status, 200, path);
      const type = path.endsWith(".css") ? /text\/css/ : path.endsWith(".svg") ? /image\/svg\+xml/ : /javascript/;
      assert.match(resource.headers.get("content-type"), type, path);
      assert.equal(resource.headers.get("cache-control"), "private, no-store");
      assert.equal(resource.headers.get("X-Content-Type-Options"), "nosniff");
      assert.deepEqual(Buffer.from(await resource.arrayBuffer()), readFileSync(`${root}/dist/client${path}`), path);
    }
    const head = await fetch(css, { method: "HEAD", headers: cookie });
    assert.equal(head.status, 200);
    assert.match(head.headers.get("content-type"), /text\/css/);
    assert.equal(await head.text(), "");
    const missing = await fetch("/_next/static/missing.css", { headers: cookie });
    assert.equal(missing.status, 404);
    assert.doesNotMatch(await missing.text(), /<!doctype|<html/i);
  });

  await t.test("the loaded client can retrieve the catalogue and isolated user state", async () => {
    const response = await fetch("/api/study", { headers: cookie });
    assert.equal(response.status, 200, await response.clone().text());
    const body = await response.json();
    assert.ok(body.catalogue.subjects.length > 0);
    assert.ok(body.catalogue.questions.length > 0);
    assert.equal(body.revision, 0);
    const saved = await fetch("/api/study", {
      method: "POST",
      headers: { ...cookie, "Content-Type": "application/json", Origin: "http://localhost" },
      body: JSON.stringify({ revision: body.revision, action: { type: "profile", name: "Teste celular" } }),
    });
    assert.equal(saved.status, 200);
    assert.equal((await saved.json()).state.name, "Teste celular");
    const reloaded = await fetch("/api/study", { headers: cookie });
    assert.equal((await reloaded.json()).state.name, "Teste celular");
    const partner = await fetch("/api/study", { headers: { cookie: `CF_Authorization=${await token("partner@example.com", "partner")}` } });
    const partnerBody = await partner.json();
    assert.equal(partner.status, 200);
    assert.equal(partnerBody.revision, 0);
    assert.notEqual(partnerBody.state.name, "Teste celular");
    for (const [email, sub] of [["owner@example.com", "owner"], ["partner@example.com", "partner"]]) {
      const signed = await token(email, sub);
      for (const headers of [{ cookie: `CF_Authorization=${signed}` }, { "cf-access-jwt-assertion": signed }]) {
        const result = await fetch("/api/notebooks", { headers });
        assert.equal(result.status, 200);
        await result.arrayBuffer();
      }
    }
  });

  await t.test("a two-subject session contains questions from both subjects", async () => {
    const response = await fetch("/api/study", { headers: cookie });
    const {catalogue, revision} = await response.json();
    const selected = ['portugues', 'matematica'];
    const topics = selected.map(subject => catalogue.questions.find(question => question.subject === subject).topic);
    const result = await fetch("/api/study", {
      method: "POST", headers: { ...cookie, "Content-Type": "application/json", Origin: "http://localhost" },
      body: JSON.stringify({revision, action: {type: "start", settings: {subjects: selected, topics, count: 2, difficulty: "all", order: "ordered", mode: "unseen"}}}),
    });
    assert.equal(result.status, 200);
    const {state} = await result.json();
    const actual = state.session.questions.map(id => catalogue.questions.find(question => question.id === id).subject);
    assert.deepEqual(new Set(actual), new Set(selected));
  });

  await t.test("marks in the extended paper area survive save/reload without changing existing strokes", async () => {
    const oldStroke = {color: "#93c5fd", width: 3, opacity: 1, points: [[12,20],[40,700]]};
    const lowerStroke = {...oldStroke, points: [[40,1750],[1000,2000]]};
    const note = {id: crypto.randomUUID(), revision: 0, title: "Caderno de teste", subject: "matematica", questionId: null,
      pages: [{id: crypto.randomUUID(), name: "Página 1", paper: "lined", dark: true, text: "", strokes: [oldStroke, lowerStroke]}]};
    const save = data => fetch("/api/notebooks", {method: "POST", headers: {...cookie, "Content-Type": "application/json", Origin: "http://localhost"}, body: JSON.stringify(data)});
    const result = await save(note);
    assert.equal(result.status, 200);
    const saved = (await result.json()).notebook;
    assert.equal(saved.revision, 1);
    const reopened = await fetch(`/api/notebooks?id=${note.id}`, {headers: cookie});
    assert.equal(reopened.status, 200);
    assert.deepEqual((await reopened.json()).notebook.pages[0].strokes, [oldStroke, lowerStroke]);
    const invalid = {...saved, pages: [{...note.pages[0], strokes: [{...lowerStroke, points: [[0,2001]]}]}]};
    const rejected = await save(invalid);
    assert.equal(rejected.status, 400);
    await rejected.arrayBuffer();
    const unchanged = await fetch(`/api/notebooks?id=${note.id}`, {headers: cookie});
    assert.deepEqual((await unchanged.json()).notebook, saved);
  });
});
