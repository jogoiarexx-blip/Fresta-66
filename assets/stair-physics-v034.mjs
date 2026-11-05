/**
 * FRESTA 66 v0.3.4: collision-aware stair navigation, measured in metres.
 * Walkable heights follow the actual stair meshes (18 treads + 2 landings).
 */
export const STAIR_STEP_HEIGHT=.18;
export const WALK_UP_LIMIT=.235;
export const WALK_DOWN_LIMIT=.235;
export const PLAYER_RADIUS=.25;
const EPS=.022; // bridge small visual gaps between neighbouring treads
function pad(x1,x2,z1,z2,top,kind){return{x1,x2,z1,z2,top,kind}}
export function buildStairSurfaces(){
 const surfaces=[];
 for(let i=0;i<9;i++){
  const a=34.66+.32*(i+.5),b=37.54-.32*(i+.5);
  surfaces.push(pad(3.59,4.87,a-.156,a+.156,.18*(i+1),"lower-flight"));
  surfaces.push(pad(5.19,6.47,b-.156,b+.156,1.62+.18*(i+1),"upper-flight"));
 }
 surfaces.push(pad(3.53,6.55,37.55,38.41,1.62,"turning-landing"));
 surfaces.push(pad(5.19,6.47,34.30,34.65,3.24,"upper-landing"));
 return surfaces;
}
const inside=(x,z,s)=>x>=s.x1-EPS&&x<=s.x2+EPS&&z>=s.z1-EPS&&z<=s.z2+EPS;
export function collidesWithVolume(x,z,feetY,height,volumes,radius=PLAYER_RADIUS){
 for(const b of volumes){
  if(b.bottom>=feetY+height-1e-4||b.top<=feetY+.035)continue;
  const cx=Math.max(b.x1,Math.min(x,b.x2)),cz=Math.max(b.z1,Math.min(z,b.z2));
  if((x-cx)**2+(z-cz)**2<radius*radius)return true;
 }
 return false;
}
export class StairFloorModel{
 constructor(enabled=false){this.enabled=!!enabled;this.surfaces=this.enabled?buildStairSurfaces():[]}
 heightAt(x,z){
  if(!this.enabled)return 0;
  let h=0;for(const s of this.surfaces)if(inside(x,z,s))h=Math.max(h,s.top);
  return h;
 }
 restoreHeight(p){
  const y=this.heightAt(p.x,p.z);
  return Number.isFinite(p.feetY)&&Math.abs(p.feetY-y)<WALK_UP_LIMIT?p.feetY:y;
 }
 supportAt(x,z,feetY){
  if(!this.enabled)return 0;
  const pads=this.surfaces.filter(s=>inside(x,z,s));
  if(!pads.length)return feetY<=WALK_DOWN_LIMIT?0:null;
  const y=Math.max(...pads.map(s=>s.top));
  if(y-feetY>WALK_UP_LIMIT||feetY-y>WALK_DOWN_LIMIT)return null;
  return y;
 }
}
export function resolve3DMovement(p,dx,dz,colliders,floor,height=1.75,radius=PLAYER_RADIUS){
 if(!Number.isFinite(p.feetY))p.feetY=floor.restoreHeight(p);
 const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.08));
 for(let i=0;i<count;i++){
  const sx=dx/count,sz=dz/count,axes=i%2?["z","x"]:["x","z"];
  for(const axis of axes){
   const nx=p.x+(axis==="x"?sx:0),nz=p.z+(axis==="z"?sz:0);
   const y=floor.supportAt(nx,nz,p.feetY);
   if(y===null||collidesWithVolume(nx,nz,y,height,colliders,radius))continue;
   p.x=nx;p.z=nz;p.feetY=y;
  }
 }
 return p;
}
