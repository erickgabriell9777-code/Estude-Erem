'use client';
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Mail, Phone, BookOpen, LockKeyhole, Loader2 } from 'lucide-react';
import type { LoginOptions } from '@/lib/account-auth';
import { appVersion } from '@/lib/app-version';
import { HumanCheck } from './turnstile';

type Mode = 'signin' | 'signup' | 'recover' | 'phone' | 'verify' | 'reset';

export function LoginForm({ options }: { options: LoginOptions }) {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+55');
  const [code, setCode] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [challenge, setChallenge] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('mode') === 'reset') setMode('reset');
    if (query.has('error')) setError('A entrada não foi concluída. Tente novamente.');
  }, []);

  function change(next: Mode) {
    setMode(next);
    setError('');
    setMessage('');
    setCaptchaToken('');
    setChallenge(x => x + 1);
    setPassword('');
  }

  async function action(name: string, data: Record<string, string>) {
    if (busy || !captchaToken) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(`/auth/${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, captchaToken }),
      });
      const body = await response.json() as { error?: string; message?: string; redirect?: string; sent?: boolean };
      if (!response.ok) throw Error(body.error ?? 'Não foi possível concluir. Tente novamente.');
      if (body.redirect) {
        const target = new URL(body.redirect, window.location.origin);
        if (target.origin === window.location.origin || (/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(target.origin) && target.pathname === '/auth/v1/authorize')) {
          window.location.assign(target.href);
          return;
        }
        throw Error('Não foi possível iniciar a entrada.');
      }
      if (body.sent) change('verify');
      if (body.message) setMessage(body.message);
      setPassword('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível conectar. Tente novamente.');
    } finally {
      setBusy(false);
      setCaptchaToken('');
      setChallenge(x => x + 1);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (mode === 'phone') void action('phone', { phone: phone.replace(/[\s()-]/g, '') });
    else if (mode === 'verify') void action('verify', { phone: phone.replace(/[\s()-]/g, ''), token: code });
    else if (mode === 'recover') void action('recover', { email: email.trim() });
    else if (mode === 'reset') void action('reset', { password });
    else void action(mode === 'signup' ? 'signup' : 'password', { email: email.trim(), password });
  }

  const titles = {
    signin: 'Bem-vindo de volta.',
    signup: 'Seu estudo começa aqui.',
    recover: 'Recuperar acesso',
    phone: 'Entrar pelo telefone',
    verify: 'Confira seu celular',
    reset: 'Escolha uma nova senha',
  };
  const labels = {
    signin: 'Entrar',
    signup: 'Criar conta',
    recover: 'Enviar instruções',
    phone: 'Receber código',
    verify: 'Confirmar código',
    reset: 'Salvar nova senha',
  };
  const available = options.email || options.phone || options.google || options.facebook;

  return (
    <main className="auth-screen">
      <section className="auth-intro" aria-label="Estude Erem">
        <Link className="auth-brand" href="/">e<span>estude <strong>erem</strong></span></Link>
        <h1 className="heading-1">Aprenda no seu ritmo.</h1>
        <p className="text-secondary">Suas matérias, livros, questões e cadernos num só lugar.</p>
        <div className="auth-intro-note flex items-center gap-2 text-muted">
          <BookOpen size={20} aria-hidden="true" />
          <span>Continue seus estudos em qualquer aparelho com a sua conta.</span>
        </div>
      </section>

      <section className="auth-card surface" aria-labelledby="auth-heading">
        <div className="auth-card-icon flex items-center justify-center w-12 h-12 rounded-xl bg-primary-soft text-primary mx-auto mb-4">
          <LockKeyhole size={24} aria-hidden="true" />
        </div>
        <h2 id="auth-heading" className="heading-3 text-center">{titles[mode]}</h2>
        <p className="text-secondary text-center mt-2">
          {mode === 'signup' ? 'Crie sua conta para guardar seu progresso.' :
           mode === 'verify' ? `Digite o código enviado para ${phone}.` :
           mode === 'recover' ? 'Vamos enviar as instruções para o seu e-mail.' :
           'Entre na sua conta para continuar.'}
        </p>

        {!options.ready || !available ? (
          <p className="text-muted text-center mt-4" role="status">
            As opções de entrada estão sendo preparadas. Tente novamente em instantes.
          </p>
        ) : (
          <>
            {(mode === 'signin' || mode === 'signup') && (
              <>
                {(options.google || options.facebook) && (
                  <div className="auth-social flex flex-col gap-2 mt-4">
                    {options.google && (
                      <button
                        type="button"
                        className="btn btn-secondary w-full"
                        disabled={busy || !captchaToken}
                        onClick={() => void action('oauth', { provider: 'google' })}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                          <span>Continuar com Google</span>
                        </span>
                      </button>
                    )}
                    {options.facebook && (
                      <button
                        type="button"
                        className="btn btn-secondary w-full"
                        disabled={busy || !captchaToken}
                        onClick={() => void action('oauth', { provider: 'facebook' })}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          <span>Continuar com Facebook</span>
                        </span>
                      </button>
                    )}
                  </div>
                )}
                {options.email && options.signup && (
                  <div className="auth-tabs flex gap-2 mt-4" role="tablist" aria-label="Acesso por e-mail">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'signin'}
                      aria-controls="email-panel"
                      className={`btn w-full ${mode === 'signin' ? 'btn-primary' : 'btn-ghost'}`}
                      disabled={busy}
                      onClick={() => change('signin')}
                    >
                      Entrar
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'signup'}
                      aria-controls="email-panel"
                      className={`btn w-full ${mode === 'signup' ? 'btn-primary' : 'btn-ghost'}`}
                      disabled={busy}
                      onClick={() => change('signup')}
                    >
                      Criar conta
                    </button>
                  </div>
                )}
              </>
            )}

            {(options.email || mode === 'phone' || mode === 'verify' || mode === 'reset') && (
              <form className="auth-form flex flex-col gap-3 mt-4" onSubmit={submit}>
                {(mode === 'signin' || mode === 'signup' || mode === 'recover') && options.email && (
                  <label className="flex flex-col gap-1">
                    <span className="label">E-mail</span>
                    <input
                      className="input"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={busy}
                      required
                      maxLength={254}
                      placeholder="voce@exemplo.com"
                    />
                  </label>
                )}
                {(mode === 'signin' || mode === 'signup' || mode === 'reset') && options.email && (
                  <label className="flex flex-col gap-1">
                    <span className="label">{mode === 'reset' ? 'Nova senha' : 'Senha'}</span>
                    <input
                      className="input"
                      name="password"
                      type="password"
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={busy}
                      required
                      minLength={8}
                      maxLength={128}
                    />
                    {mode === 'signup' && <small className="text-muted text-xs">Use pelo menos 8 caracteres.</small>}
                  </label>
                )}
                {mode === 'phone' && (
                  <label className="flex flex-col gap-1">
                    <span className="label">Telefone com DDD e código do país</span>
                    <input
                      className="input"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+55 11 99999-9999"
                      disabled={busy}
                      required
                      maxLength={25}
                    />
                  </label>
                )}
                {mode === 'verify' && (
                  <label className="flex flex-col gap-1">
                    <span className="label">Código recebido por SMS</span>
                    <input
                      className="input"
                      name="code"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      value={code}
                      onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                      disabled={busy}
                      required
                      pattern="[0-9]{6,10}"
                      maxLength={10}
                    />
                  </label>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full mt-2"
                  disabled={busy || !captchaToken}
                >
                  {busy ? <Loader2 className="spin" size={18} aria-hidden="true" /> : null}
                  {busy ? 'Aguarde…' : labels[mode]}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </form>
            )}

            <div className="auth-secondary flex flex-wrap gap-2 justify-center mt-4">
              {mode === 'signin' && (
                <>
                  {options.email && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      disabled={busy}
                      onClick={() => change('recover')}
                    >
                      <Mail size={16} aria-hidden="true" /> Esqueci minha senha
                    </button>
                  )}
                  {options.phone && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      disabled={busy}
                      onClick={() => change('phone')}
                    >
                      <Phone size={16} aria-hidden="true" /> Entrar por telefone
                    </button>
                  )}
                </>
              )}
              {!['signin', 'signup'].includes(mode) && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={busy}
                  onClick={() => change('signin')}
                >
                  <ArrowLeft size={16} aria-hidden="true" /> Voltar para entrar
                </button>
              )}
            </div>

            {error && <p className="text-danger text-sm text-center mt-3" role="alert">{error}</p>}
            {message && <p className="text-success text-sm text-center mt-3" role="status">{message}</p>}

            <footer className="auth-footer text-center text-muted text-xs mt-6">
              Estude Erem · {appVersion}
            </footer>
          </>
        )}
        {options.ready && available && <HumanCheck key={challenge} siteKey={options.siteKey} onToken={setCaptchaToken} />}
      </section>
    </main>
  );
}