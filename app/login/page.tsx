import {env} from 'cloudflare:workers';
import {loginOptions} from '@/lib/account-auth';
import {LoginForm} from './login-form';
export const dynamic='force-dynamic';
export default async function LoginPage(){return <LoginForm options={await loginOptions(env)}/>;}
