'use strict';
const test=require('node:test'), assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/index-fresta-physics-v034.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
function part(a,b){const i=script.indexOf(a),j=script.indexOf(b,i+a.length);assert.ok(i>=0&&j>i,'Missing '+a);return script.slice(i,j)}
const height=new Function('return ({'+part('stairHeight(t,e){','stairRail(t,e,s,i,a,n')+'}).stairHeight')();
const pads=[];for(let i=0;i<9;i++){const a=34.66+.32*(i+.5),b=37.54-.32*(i+.5);pads.push({x1:3.59,x2:4.87,z1:a-.156,z2:a+.156,top:.18*(i+1)},{x1:5.19,x2:6.47,z1:b-.156,z2:b+.156,top:1.62+.18*(i+1)})}pads.push({x1:3.53,x2:6.55,z1:37.55,z2:38.41,top:1.62},{x1:5.19,x2:6.47,z1:34.3,z2:34.65,top:3.24});const stair=(x,z)=>Math.max(0,...pads.filter(p=>x>=p.x1-.022&&x<=p.x2+.022&&z>=p.z1-.022&&z<=p.z2+.022).map(p=>p.top));
const near=(a,b)=>assert.ok(Math.abs(a-b)<.065,'expected '+a+' ~= '+b);
test('the page references real assets',()=>{
  for(const x of html.matchAll(/(?:href|src)="\.\/assets\/([^"]+)"/g))assert.ok(fs.existsSync(path.join(root,'assets',x[1])));
  assert.ok(html.includes('index-fresta-physics-v034.js'));
});
test('two staircase flights join at the landing without height jumps',()=>{
  near(stair(4.23,34.35),0);near(stair(4.23,36.10),.90);near(stair(4.23,37.54),1.62);
  near(stair(5.83,37.54),1.80);near(stair(5.83,36.10),2.52);near(stair(5.83,34.65),3.24);
  assert.equal(stair(5.83,33.9),0);
  assert.equal(height.call({floorModel:{heightAt:()=>0}},5.83,34.65),0);
});
test('stairwell perimeter wall reaches the top but does not close the entrance',()=>{
  const Qt=vm.runInNewContext(part('function Qt(o=rt,t=Et){','function te(o){')+';Qt',{rt:[],Et:[]});
  const rooms=[{id:'gallery',x1:1.5,x2:10,z1:29,z2:34},{id:'stairs',x1:3,x2:7,z1:34,z2:39}];
  const openings=[{axis:'z',at:34,center:5,width:2,rooms:['gallery','stairs']}];
  const expr=part('this.colliders=Qt(e.rooms,e.openings)','this.solids=[]')+'this.solids=[]';
  const build=new Function('Qt','e','const self={};'+expr.replaceAll('this.','self.')+';return self.colliders');
  const walls=build(Qt,{id:1,rooms,openings});
  const side=walls.filter(w=>w.axis==='x'&&Math.abs(w.at-3)<.02&&w.to>34&&w.from<39);
  assert.ok(side.length&&side.every(w=>w.top>=6.24));
  const entrance=walls.filter(w=>w.axis==='z'&&Math.abs(w.at-34)<.02&&w.from<7&&w.to>3);
  assert.ok(entrance.some(w=>w.bottom>2)&&entrance.every(w=>w.top>=6.24));
  assert.ok(build(Qt,{id:2,rooms,openings}).every(w=>w.top<=3));
});
test('second floor exit uses the elevated interaction ray',()=>{
  let ray=null;
  const target=new Function('V','F','return ({'+part('findTarget(){','interact(){')+'}).findTarget')((a,b)=>{ray=a;return true},()=>({x:0,z:0}));
  const state={player:{x:5.83,z:35.15,yaw:0,feetY:stair(5.83,35.15)},state:{collected:[]},crouch:false,world:{stairHeight:stair},layout:{objects:[{id:'exit',kind:'exit',x:5.83,y:4.55,z:34.77}],openings:[]},colliders:[]};
  assert.equal(target.call(state)?.id,'exit');near(ray.y,1.63+stair(5.83,35.15));
  state.player.feetY=0;assert.equal(target.call(state),null);
});
test('closing a document returns to gameplay instead of an extra pause',()=>{
  const close=new Function('return ({'+part('close(){','backToJournal(){')+'}).close')();
  let count=0;close.call({modalType:'document',g:{running:true},resumeGame(){count++}});
  assert.equal(count,1);
});
test('footsteps follow the elevated player',()=>{
  assert.ok(script.includes('this.audio.step({x:e.x,y:.1+e.feetY,z:e.z}'));
});
