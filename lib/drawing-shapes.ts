import type {Stroke} from './personal-notes';
export type ShapeKind='line'|'rectangle'|'circle'|'triangle';
export function shapePoints(kind:ShapeKind,points:Stroke['points']):Stroke['points']{
 if(!points.length)return [];
 const first=points[0],last=points[points.length-1];
 if(kind==='line')return [first,last];
 const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys),cx=(left+right)/2,cy=(top+bottom)/2;
 if(kind==='rectangle')return [[left,top],[right,top],[right,bottom],[left,bottom],[left,top]];
 if(kind==='triangle')return [[cx,top],[right,bottom],[left,bottom],[cx,top]];
 const radius=Math.min(right-left,bottom-top)/2;
 return Array.from({length:65},(_,i)=>[Math.round(cx+radius*Math.cos((i%64)*Math.PI/32)),Math.round(cy+radius*Math.sin((i%64)*Math.PI/32))]);
}

type Point=Stroke['points'][number];
const distance=(a:Point,b:Point)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function segmentDistance(p:Point,a:Point,b:Point){const dx=b[0]-a[0],dy=b[1]-a[1],d=dx*dx+dy*dy;const t=d?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/d)):0;return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);}
function simplify(points:Point[],epsilon:number):Point[]{
 if(points.length<3)return points;
 let max=0,index=0;for(let i=1;i<points.length-1;i++){const d=segmentDistance(points[i],points[0],points.at(-1)!);if(d>max){max=d;index=i;}}
 return max>epsilon?[...simplify(points.slice(0,index+1),epsilon).slice(0,-1),...simplify(points.slice(index),epsilon)]:[points[0],points.at(-1)!];
}
export type RecognizedShape={name:string;points:Point[]};
export function recognizeShape(input:Point[]):RecognizedShape|null{
 if(input.length<6)return null;
 const left=Math.min(...input.map(p=>p[0])),right=Math.max(...input.map(p=>p[0])),top=Math.min(...input.map(p=>p[1])),bottom=Math.max(...input.map(p=>p[1]));
 const w=right-left,h=bottom-top,diag=Math.hypot(w,h),first=input[0],last=input.at(-1)!;
 if(diag<30)return null;
 const length=input.slice(1).reduce((sum,p,i)=>sum+distance(p,input[i]),0),endDistance=distance(first,last);
 if(endDistance>diag*.8&&length/endDistance<1.18&&Math.max(...input.map(p=>segmentDistance(p,first,last)))<diag*.055)return {name:'Linha',points:[first,last]};
 if(w<20||h<20||endDistance>diag*.24||length<diag*2||length>diag*4.3)return null;
 // Split a closed contour opposite its start so simplification is independent of closure.
 let opposite=1;for(let i=2;i<input.length;i++)if(distance(first,input[i])>distance(first,input[opposite]))opposite=i;
 const closed=[...input,first];
 let corners=[...simplify(closed.slice(0,opposite+1),diag*.065).slice(0,-1),...simplify(closed.slice(opposite),diag*.065).slice(0,-1)];
 // Remove a redundant starting point in the middle of a side.
 let changed=true;while(changed&&corners.length>3){changed=false;for(let i=0;i<corners.length;i++)if(segmentDistance(corners[i],corners[(i+corners.length-1)%corners.length],corners[(i+1)%corners.length])<diag*.07){corners.splice(i,1);changed=true;break;}}
 const area=Math.abs(corners.reduce((sum,p,i)=>{const q=corners[(i+1)%corners.length];return sum+p[0]*q[1]-q[0]*p[1]},0))/2;
 if(corners.length===3&&area>w*h*.25)return {name:'Triângulo',points:[...corners,corners[0]]};
 if(corners.length===4&&area>w*h*.4){
 const rightAngles=corners.every((p,i)=>{const a=corners[(i+3)%4],b=corners[(i+1)%4];return Math.abs((a[0]-p[0])*(b[0]-p[0])+(a[1]-p[1])*(b[1]-p[1]))/(distance(a,p)*distance(b,p))<.42;});
 if(rightAngles){
 const angle=Math.atan2(corners[1][1]-corners[0][1],corners[1][0]-corners[0][0]),co=Math.cos(angle),si=Math.sin(angle);
 const projected=input.map(([x,y])=>[x*co+y*si,-x*si+y*co]);
 let x0=Math.min(...projected.map(p=>p[0])),x1=Math.max(...projected.map(p=>p[0])),y0=Math.min(...projected.map(p=>p[1])),y1=Math.max(...projected.map(p=>p[1]));
 const ratio=(x1-x0)/(y1-y0),square=ratio>.8&&ratio<1.25;
 if(square){const size=((x1-x0)+(y1-y0))/2,cx=(x0+x1)/2,cy=(y0+y1)/2;x0=cx-size/2;x1=cx+size/2;y0=cy-size/2;y1=cy+size/2;}
 const points:Point[]=[[x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]].map(([x,y])=>[Math.round(x*co-y*si),Math.round(x*si+y*co)]);
 if(points.every(([x,y])=>x>=0&&x<=1000&&y>=0&&y<=700))return {name:square?'Quadrado':'Retângulo',points};
 }
 }
 const cx=(left+right)/2,cy=(top+bottom)/2,rx=w/2,ry=h/2;
 const radialError=input.reduce((sum,[x,y])=>sum+Math.abs(Math.hypot((x-cx)/rx,(y-cy)/ry)-1),0)/input.length;
 if(corners.length>=5&&radialError<.1){const circle=w/h>.82&&w/h<1.22;const radius=Math.min(rx,ry);return {name:circle?'Círculo':'Elipse',points:Array.from({length:65},(_,i)=>[Math.round(cx+(circle?radius:rx)*Math.cos((i%64)*Math.PI/32)),Math.round(cy+(circle?radius:ry)*Math.sin((i%64)*Math.PI/32))])};}
 return null;
}
