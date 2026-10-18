"""Original practice families; symbolic checks verify numerical answers independently."""
import json
from pathlib import Path
from fractions import Fraction
import sympy as s
root=Path(__file__).resolve().parents[1]
p=root/'lib/book-seed.json'
data=json.loads(p.read_text())
data['records']=[r for r in data['records'] if not r['id'].startswith('book-practice-')]
refs={}
for r in data['records']: refs[(r['book_id'],r['pdf_page'])]=r
x=s.Symbol('x', real=True)
checks=0

def add(family,k,ref,topic,prompt,right,wrong,why,level='Médio',subject='calculo1',verify=None):
 global checks
 if verify is not None:
  assert s.simplify(verify-s.Rational(right))==0,(family,k,right,verify)
  checks+=1
 opts=list(map(str,[right,*wrong]));assert len(opts)==4 and len(set(opts))==4,(family,k,opts)
 shift=(k+family)%4;opts=opts[-shift:]+opts[:-shift] if shift else opts
 template=refs[ref];id=f'book-practice-{family:02}-{k:02}'
 q=dict(id=id,subject=subject,topic=f'topic-{topic}',level=level,prompt=prompt,options=opts,answer=shift,explanation=why,xp=10)
 data['records'].append({**{a:template[a] for a in ['book_id','pdf_page','printed_page','section','guidance']},'id':id,'question':q})

def num(f,k,ref,topic,prompt,v,why,level='Médio',subject='calculo1',verify=None):
 v=Fraction(v);add(f,k,ref,topic,prompt,str(v),[str(v+1),str(v-1),str(v+2)],why,level,subject,verify)
G=('guidorizzi-v1',122);C=('guidorizzi-v1',107);L=('guidorizzi-v1',138);D=('stewart-v1',185);P=('stewart-v1',194);H=('guidorizzi-v1',262);U=('uerj-v1',17);I=('uerj-v1',194);S=('uerj-v1',293);B=('uerj-v1',297);T=('stewart-v1',372)
for k in range(1,21):
 a=k+2;b=k+3;n=2+k%4
 add(1,k,U,95,f'Qual é o domínio real de f(x) = √(x − {a})?',f'[{a}, +∞)',[f'({a}, +∞)',f'(−∞, {a}]','ℝ'],f'O radicando precisa ser não negativo: x − {a} ≥ 0, logo x ≥ {a}.','Fácil')
 add(2,k,U,95,f'Quais números ficam fora do domínio de f(x) = 1/((x − {a})(x + {b}))?',f'{a} e −{b}',[f'−{a} e {b}',f'Apenas {a}','Nenhum'],f'O denominador zera em x = {a} e x = −{b}; ambos precisam ser excluídos.','Fácil')
 num(3,k,G,98,f'Calcule lim(x → {a}) ({b}x − {k}).',b*a-k,f'Polinômios são contínuos: substitua x por {a}. Resultado: {b}·{a} − {k} = {b*a-k}.','Fácil',verify=s.limit(b*x-k,x,a))
 c=37 if k==5 else a
 num(4,k,G,98,f'Calcule lim(x → {c}) (x² − {c*c})/(x − {c}).',2*c,f'Fatore o numerador: (x − {c})(x + {c}). Para x ≠ {c}, cancele o fator comum. O limite é 2·{c} = {2*c}.',verify=s.limit((x*x-c*c)/(x-c),x,c))
 num(5,k,C,100,f'Se f(x) = {a}x² + {b} para x ≠ 2 e f(2) = c, qual c torna f contínua em 2?',4*a+b,f'O valor definido deve coincidir com o limite: {a}·2² + {b} = {4*a+b}.',verify=s.limit(a*x*x+b,x,2))
 add(6,k,L,99,f'Uma função tem limite à esquerda {a} e à direita {b} em x = {k}. O limite bilateral é:', 'Não existe',[str(a),str(b),str(Fraction(a+b,2))],f'Os limites laterais {a} e {b} são diferentes. A média deles não é o limite bilateral.','Fácil')
 num(7,k,D,102,f'Para f(x) = {a}x^{n}, quanto vale f′(1)?',a*n,f'A regra da potência dá f′(x) = {a*n}x^{n-1}. Em x = 1, resulta {a*n}.','Fácil',verify=s.diff(a*x**n,x).subs(x,1))
 num(8,k,D,102,f'Se f(x) = {a}x³ − {b}x² + {k}x, calcule f′(2).',12*a-4*b+k,f'Derivando termo a termo: f′(x) = {3*a}x² − {2*b}x + {k}. Avalie em 2: {12*a-4*b+k}.',verify=s.diff(a*x**3-b*x*x+k*x,x).subs(x,2))
 num(9,k,P,102,f'Se f(x) = (x + {a})(x² + {b}), qual é f′(1)?',b+1+2*(1+a),f'Use u′v + uv′: em 1, temos (1 + {b}) + (1 + {a})·2 = {b+1+2*(1+a)}.',verify=s.diff((x+a)*(x*x+b),x).subs(x,1))
 num(10,k,H,103,f'Se f(x) = ({a}x + 1)^{n}, quanto vale f′(0)?',a*n,f'A cadeia dá f′(x) = {n}({a}x + 1)^{n-1}·{a}. Em zero, a potência vale 1, então f′(0) = {a*n}.',verify=s.diff((a*x+1)**n,x).subs(x,0))
 num(11,k,H,103,f'Para f(x) = (x² + {a})³, calcule f′(1).',6*(a+1)**2,f'Derive a externa e multiplique por 2x: f′(x) = 6x(x² + {a})². Em 1, resulta {6*(a+1)**2}.',verify=s.diff((x*x+a)**3,x).subs(x,1))
 num(12,k,I,104,f'Na curva x² + y² = {a*a+b*b}, qual é dy/dx no ponto ({a}, {b})?',Fraction(-a,b),f'Derivando implicitamente: 2x + 2y·y′ = 0. Assim y′ = −x/y = −{a}/{b}.','Médio',verify=-s.Rational(a,b))
 num(13,k,I,104,f'Na curva xy = {a*b}, qual é a inclinação da tangente em ({a}, {b})?',Fraction(-b,a),f'Pela regra do produto, y + x·y′ = 0; portanto y′ = −y/x = −{b}/{a}.',verify=-s.Rational(b,a))
 num(14,k,T,109,f'Sabe-se que ∫ de 0 a 2 de f(x) dx = {a} e ∫ de 2 a 5 de f(x) dx = {b}. Quanto vale ∫ de 0 a 5 de f(x) dx?',a+b,f'A integral é aditiva em intervalos adjacentes: {a} + {b} = {a+b}.','Fácil',verify=s.Integer(a+b))
 num(15,k,T,109,f'Se ∫ de 1 a 4 de g(x) dx = {a}, quanto vale ∫ de 4 a 1 de {b}g(x) dx?',-a*b,f'Inverter os limites troca o sinal; o fator constante pode sair da integral. Resultado: −{b}·{a} = {-a*b}.',verify=s.Integer(-a*b))
 num(16,k,S,110,f'Calcule ∫ de 0 a 1 de 2x(x² + {a}) dx.',Fraction(2*a+1,2),f'Faça u = x² + {a}; du = 2x dx. Os limites tornam-se {a} e {a+1}. A integral de u é u²/2, dando {Fraction(2*a+1,2)}.',verify=s.integrate(2*x*(x*x+a),(x,0,1)))
 num(17,k,S,110,f'Na substituição u = {a}x² + {b}, qual é o coeficiente de x dx em du?',2*a,f'Derivando u: du = {2*a}x dx. A constante {b} tem derivada zero.','Fácil',verify=s.diff(a*x*x+b,x).coeff(x))
 add(18,k,H,103,f'Ao derivar f(x) = ({a}x + {b})², alguém escreveu 2({a}x + {b}). Qual correção é necessária?',f'Multiplicar por {a}',[f'Somar {a}',f'Dividir por {a}','Nenhuma correção'],f'Falta a derivada da função interna, que é {a}. A resposta correta é {2*a}({a}x + {b}).')
 num(19,k,B,111,f'Para integrar x e^({a}x) por partes, escolhemos u = x e dv = e^({a}x) dx. Qual fator multiplica e^({a}x) em v?',Fraction(1,a),f'Uma primitiva de e^({a}x) é e^({a}x)/{a}; a derivada cancela o divisor {a}.','Médio','calculo2',verify=s.Rational(1,a))
 add(20,k,B,111,f'Qual é uma primitiva de x e^({a}x)?',f'e^({a}x)(x/{a} − 1/{a*a}) + C',[f'e^({a}x)(x/{a} + 1/{a*a}) + C',f'x e^({a}x) + C',f'e^({a}x)/{a} + C'],f'Escolha u = x e dv = e^({a}x) dx. Então uv − ∫v du = x e^({a}x)/{a} − e^({a}x)/{a*a} + C.','Difícil','calculo2')
 assert s.simplify(s.diff(s.exp(a*x)*(x/a-s.Rational(1,a*a)),x)-x*s.exp(a*x))==0;checks+=1
 num(21,k,B,111,f'Para integrar {a}x^{n} ln(x), x > 0, escolha u = ln(x) e dv = {a}x^{n} dx. Qual é o coeficiente de x^{n+1} ln(x) no termo uv?',Fraction(a,n+1),f'Para o integrando {a}x^{n} ln(x), tome v = {a}x^{n+1}/{n+1}. Assim o coeficiente pedido é {Fraction(a,n+1)}.','Difícil','calculo2',verify=s.Rational(a,n+1))
 num(22,k,B,111,f'Calcule ∫ de 0 a 1 de {a}x e^x dx.',a,f'Por partes, uma primitiva é {a}e^x(x − 1). Em 1 vale 0 e em 0 vale −{a}; subtraindo, resulta {a}.','Difícil','calculo2',verify=s.integrate(a*x*s.exp(x),(x,0,1)))
 num(23,k,C,100,f'Se f é contínua em {a}, f({a}) = {b} e g(x) = {k}f(x) + 2, qual é lim(x → {a}) g(x)?',k*b+2,f'Continuidade dá lim f(x) = {b}. Pelas operações com limites: {k}·{b} + 2 = {k*b+2}.',verify=s.Integer(k*b+2))
 num(24,k,D,102,f'Para f(x) = {a}x² + {b}x + 7, calcule f″(x).',2*a,f'A primeira derivada é {2*a}x + {b}. Derivando de novo, f″(x) = {2*a}.',verify=s.diff(a*x*x+b*x+7,x,2))
assert len(data['records'])==528
assert len({r['id'] for r in data['records']})==528
assert len({r['question']['prompt'] for r in data['records']})==528
p.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n')
print(f'{len(data["records"])} original questions; {checks} symbolic checks passed')
