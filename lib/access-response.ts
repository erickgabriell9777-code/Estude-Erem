import type { AccessError, AccessErrorCode } from "./access-auth";

const messages: Record<AccessErrorCode, { title: string; message: string; help: string }> = {
  CONFIG_DOMAIN_MISSING: { title: "Configuração de entrada incompleta", message: "O endereço de autenticação ainda não está disponível nesta publicação.", help: "Conferir ACCESS_TEAM_DOMAIN em Production e publicar a versão corrigida." },
  CONFIG_DOMAIN_INVALID: { title: "Endereço de autenticação inválido", message: "O domínio configurado para o login não foi reconhecido.", help: "Conferir ACCESS_TEAM_DOMAIN. Use o domínio da equipe Cloudflare Access ou seu endereço JWKS." },
  CONFIG_AUD_MISSING: { title: "Configuração de entrada incompleta", message: "O identificador da aplicação ainda não está disponível nesta publicação.", help: "Conferir ACCESS_AUD em Production. O nome precisa ter dois Cs e estar em maiúsculas." },
  CONFIG_AUD_INVALID: { title: "Identificador de acesso inválido", message: "O identificador da aplicação contém caracteres inesperados.", help: "Copiar novamente o AUD tag completo para ACCESS_AUD e publicar." },
  CONFIG_EMAILS_MISSING: { title: "Lista de acesso não configurada", message: "Esta publicação ainda não recebeu os e-mails permitidos para o teste.", help: "Conferir EREM_ALLOWED_EMAILS em Production e publicar." },
  CONFIG_EMAILS_INVALID: { title: "E-mail de acesso incompleto", message: "Um dos e-mails permitidos está incompleto ou em formato inválido.", help: "Conferir EREM_ALLOWED_EMAILS. Cada endereço precisa incluir @ e o domínio completo." },
  SESSION_MISSING: { title: "Entre para continuar", message: "O Estude Erem precisa confirmar sua conta antes de abrir.", help: "Use a conta autorizada para participar dos testes." },
  SESSION_INVALID: { title: "Vamos renovar sua entrada", message: "Não foi possível confirmar esta sessão de acesso.", help: "Entre novamente com a conta autorizada. Se continuar, envie o código abaixo ao responsável pelo app." },
  SESSION_EXPIRED: { title: "Sua sessão expirou", message: "Entre novamente para continuar seus estudos.", help: "Seus dados salvos permanecem na sua conta." },
  ACCESS_AUDIENCE_MISMATCH: { title: "O login precisa de um ajuste", message: "A sessão recebida pertence a uma configuração de acesso diferente.", help: "Conferir se ACCESS_AUD corresponde à aplicação que protege este endereço." },
  ACCESS_ISSUER_MISMATCH: { title: "O login precisa de um ajuste", message: "A equipe usada no login não corresponde à configuração desta publicação.", help: "Conferir ACCESS_TEAM_DOMAIN com a equipe da aplicação Access." },
  ACCOUNT_NOT_ALLOWED: { title: "Esta conta ainda não tem acesso", message: "Os testes estão disponíveis apenas para as contas autorizadas.", help: "Troque para a conta que recebeu acesso ao Estude Erem." },
  ACCESS_UNAVAILABLE: { title: "Não foi possível concluir a entrada", message: "O serviço de acesso está indisponível neste momento.", help: "Tente novamente e, se continuar, envie o código abaixo ao responsável pelo app." },
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function createAccessResponse(request: Request, error: AccessError, version: string): Response {
  const { status, code } = error;
  const { title, message, help } = messages[code];
  const headers = {
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow",
    "X-Erem-Access-Code": code,
    "X-Erem-Version": version,
  };
  if (new URL(request.url).pathname.startsWith("/api/")) {
    return Response.json({ error: message, code, version }, { status, headers });
  }
  const canSignIn = status === 401 || status === 403;
  const action = status === 403 ? "Trocar conta" : "Entrar novamente";
  return new Response(`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Estude Erem · Entrar</title><style>
:root{color-scheme:light dark;font:16px/1.55 system-ui,sans-serif;background:#f7f6fc;color:#25213b}
*{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;padding:max(24px,env(safe-area-inset-top)) max(20px,env(safe-area-inset-right)) max(24px,env(safe-area-inset-bottom)) max(20px,env(safe-area-inset-left))}
main{width:100%;max-width:440px}.brand{font-weight:750;font-size:18px;color:#5b40c4}.tag{font-size:13px;color:#625a76;margin:4px 0 32px}h1{font-size:clamp(26px,7vw,32px);line-height:1.2;letter-spacing:-.6px;margin:0 0 16px}p{margin:12px 0}.help{color:#625a76;font-size:14px;overflow-wrap:anywhere}
nav{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0}a{display:flex;align-items:center;justify-content:center;min-height:48px;padding:12px 18px;border-radius:14px;font-weight:650;text-decoration:none;background:#5b40c4;color:white}a.secondary{background:#ebe6fa;color:#49319e}a:focus-visible{outline:3px solid #a478f4;outline-offset:4px}footer{border-top:1px solid #ddd7eb;padding-top:16px;font-size:12px;color:#625a76;overflow-wrap:anywhere}footer span{display:block}
@media(prefers-color-scheme:dark){:root{background:#14121b;color:#f3effc}.brand{color:#c5afff}.tag,.help,footer{color:#bdb3cf}a{background:#a889f4;color:#1d113b}a.secondary{background:#292235;color:#dacbff}footer{border-color:#393044}}
</style></head><body><main><div class="brand">Estude Erem</div><p class="tag">Acesso para participantes do teste</p>
<h1>${title}</h1><p>${message}</p><p class="help">${help}</p><nav aria-label="Opções de entrada">
${canSignIn ? `<a href="/cdn-cgi/access/logout">${action}</a>` : ""}<a href="/"${canSignIn ? ' class="secondary"' : ""}>Tentar novamente</a></nav>
<footer><span>Código: ${code}</span><span>Versão ${escapeHtml(version)}</span></footer></main></body></html>`, {
    status, headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
  });
}
