'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');
const source = fs.readFileSync(path.join(__dirname, '..', 'assets/index-fresta-browser-v035.js'),'utf8');

function slice(start, end) {
  const i=source.indexOf(start), j=source.indexOf(end,i+start.length);
  assert.ok(i>=0 && j>i, `${start} must be present`);
  return source.slice(i,j);
}
const stairMethod = slice('stairHeight(t,e){','stairRail(t,e,s,i,a,n');
const height = new Function(`return ({${stairMethod}}).stairHeight`)();
const floorModel={heightAt:(x,z)=>newMap(x,z)};
function newMap(x,z){const pads=[];for(let i=0;i<9;i++){const z1=34.66+.32*(i+.5),z2=37.54-.32*(i+.5);pads.push({x1:3.59,x2:4.87,z1:z1-.156,z2:z1+.156,top:.18*(i+1)});pads.push({x1:5.19,x2:6.47,z1:z2-.156,z2:z2+.156,top:1.62+.18*(i+1)});}pads.push({x1:3.53,x2:6.55,z1:37.55,z2:38.41,top:1.62});pads.push({x1:5.19,x2:6.47,z1:34.3,z2:34.65,top:3.24});return Math.max(0,...pads.filter(p=>x>=p.x1-.022&&x<=p.x2+.022&&z>=p.z1-.022&&z<=p.z2+.022).map(p=>p.top))}
const level1={floorModel},level2={floorModel:{heightAt:()=>0}};
const floor=(x,z)=>height.call(level1,x,z);
const near=(a,b,t=.06)=>assert.ok(Math.abs(a-b)<=t, `expected ${a} ~= ${b}`);

test('both flights reach the correct levels, landing joins without jumps',()=>{
  near(floor(4.23,34.35),0);
  near(floor(4.23,36.10),.9);
  near(floor(4.23,37.54),1.62);
  near(floor(5.83,37.54),1.80);
  near(floor(5.83,36.10),2.52);
  near(floor(5.83,34.65),3.24);
});

test('height applies only to stairs on the ground floor',()=>{
  assert.equal(floor(2,36),0);
  assert.equal(floor(5.83,33.9),0);
  assert.equal(height.call(level2,5.83,35),0);
});

test('stairwell perimeter is full-height, but other floors remain normal',()=>{
  const qt=vm.runInNewContext(slice('function Qt(o=rt,t=Et){','function te(o){')+'\nQt', {rt:[],Et:[]});
  const rooms=[{id:'gallery',x1:1.5,x2:10,z1:29,z2:34},{id:'stairs',x1:3,x2:7,z1:34,z2:39}];
  const openings=[{axis:'z',at:34,center:5,width:2,rooms:['gallery','stairs']}];
  const snippet=slice('this.colliders=Qt(e.rooms,e.openings)','this.solids=[]')+'this.solids=[]';
  const construct=new Function('Qt','e',`const self={};${snippet.replaceAll('this.','self.')};return self.colliders;`);
  const walls=construct(qt,{id:1,rooms,openings});
  const side=walls.filter(w=>w.axis==='x'&&Math.abs(w.at-3)<.02&&w.to>34&&w.from<39);
  assert.ok(side.length,'stair side wall should exist');
  assert.ok(side.every(w=>w.top>=6.24),'stairwell side wall extends to full height');
  const head=walls.filter(w=>w.axis==='z'&&Math.abs(w.at-34)<.02&&w.from<7&&w.to>3);
  assert.ok(head.some(w=>w.bottom>2),'stair entrance remains open at human height');
  assert.ok(head.every(w=>w.top>=6.24),'wall above the entrance reaches the top');
  const ordinary=walls.filter(w=>w.axis==='x'&&Math.abs(w.at-10)<.02);
  assert.ok(ordinary.length&&ordinary.every(w=>w.top===3),'non-stair walls unchanged');
  const second=construct(qt,{id:2,rooms,openings});
  assert.ok(second.filter(w=>w.axis==='x'&&Math.abs(w.at-3)<.02).every(w=>w.top===3),'second floor unaffected');
});

test('aiming at second-floor exit starts the ray from current stair height',()=>{
  const findMethod=slice('findTarget(){','interact(){');
  let origin=null;
  const find = new Function('V','F',`return ({${findMethod}}).findTarget`)((a,b)=>{origin=a;return true},()=>({x:0,z:0}));
  const game={player:{x:5.83,z:35.15,yaw:0,feetY:floor(5.83,35.15)},state:{collected:[]},crouch:false,world:{stairHeight:floor},layout:{objects:[{id:'exit',kind:'exit',x:5.83,y:4.55,z:34.77,label:'2º andar'}],openings:[]},colliders:[]};
  assert.equal(find.call(game)?.id,'exit');
  near(origin.y,1.63+floor(5.83,35.15),.001);
  game.player.feetY=0;
  assert.equal(find.call(game),null,'cannot interact with upstairs exit from ground level');
});

test('footstep sound follows stair height rather than floor zero',()=>{
  assert.ok(source.includes('this.audio.step({x:e.x,y:.1+e.feetY,z:e.z}'));
});
