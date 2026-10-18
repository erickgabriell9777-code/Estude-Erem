import test from "node:test";
import assert from "node:assert/strict";
import {parseVersion,nextVersion} from "./versioning.mjs";
import {checkVersion} from "./check-version.mjs";
import pkg from "../package.json" with {type:"json"};
import entries from "../lib/changelog.json" with {type:"json"};

test("formato e limites de MAJOR.MINOR.PATCH",()=>{
 for (const value of ["1.0.0","1.59.59","2.13.8"]) assert.equal(parseVersion(value).length,3);
 for (const value of ["1.60.0","1.4.60","1.01.0","1.2","1.2.3-beta"]) assert.throws(()=>parseVersion(value));
});
test("classificação, resets e passagem pelo limite 59",()=>{
 assert.equal(nextVersion("1.3.7","patch"),"1.3.8");
 assert.equal(nextVersion("1.3.7","minor"),"1.4.0");
 assert.equal(nextVersion("1.27.14","major"),"2.0.0");
 assert.equal(nextVersion("1.0.59","patch"),"1.1.0");
 assert.equal(nextVersion("1.59.8","minor"),"2.0.0");
 assert.equal(nextVersion("1.59.59","patch"),"2.0.0");
});
test("versão pública, build e primeira entrada do histórico",()=>{
 assert.equal(checkVersion(pkg,entries),true);
 assert.throws(()=>checkVersion({...pkg,version:"1.60.0"},entries));
 assert.throws(()=>checkVersion({...pkg,appBuild:0},entries));
 assert.throws(()=>checkVersion(pkg,[{...entries[0],categories:{Correções:[]}}]));
});
