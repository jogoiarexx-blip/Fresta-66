'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url'),path=require('node:path');
const load=import(pathToFileURL(path.resolve(__dirname,'../assets/stair-physics-v034.mjs')).href);
function near(x,y){assert.ok(Math.abs(x-y)<.06,`expected ${x} near ${y}`)}
async function walk(f,p,to,obstacles=[]){
 const {resolve3DMovement}=await load,dx=to.x-p.x,dz=to.z-p.z,n=Math.ceil(Math.hypot(dx,dz)/.025);
 for(let i=0;i<n;i++)resolve3DMovement(p,dx/n,dz/n,obstacles,f);
 return p;
}
test('18 stair treads and two physical landings',async()=>{
 const {StairFloorModel,buildStairSurfaces}=await load,f=new StairFloorModel(true),s=buildStairSurfaces();
 assert.equal(s.filter(x=>x.kind==='lower-flight').length,9);
 assert.equal(s.filter(x=>x.kind==='upper-flight').length,9);
 assert.equal(s.filter(x=>x.kind.includes('landing')).length,2);
 near(f.heightAt(4.23,34.82),.18);near(f.heightAt(4.23,36.1),.90);near(f.heightAt(5.83,34.82),3.24);
});
test('climb both stair flights and descend back to floor zero',async()=>{
 const {StairFloorModel}=await load,f=new StairFloorModel(true),p={x:4.23,z:34.35,feetY:0};
 await walk(f,p,{x:4.23,z:37.9});near(p.feetY,1.62);
 await walk(f,p,{x:5.83,z:37.9});near(p.feetY,1.62);
 await walk(f,p,{x:5.83,z:34.48});near(p.feetY,3.24);
 await walk(f,p,{x:5.83,z:37.9});near(p.feetY,1.62);
 await walk(f,p,{x:4.23,z:37.9});near(p.feetY,1.62);
 await walk(f,p,{x:4.23,z:34.35});near(p.feetY,0);
});
test('no shortcut through high upper staircase',async()=>{
 const {StairFloorModel}=await load,f=new StairFloorModel(true),p={x:5.83,z:34.48,feetY:0};
 await walk(f,p,{x:5.83,z:35.5});near(p.feetY,0);assert.ok(p.z<34.66);
});
test('no jump onto landing from ground',async()=>{
 const {StairFloorModel}=await load,f=new StairFloorModel(true),p={x:5.04,z:38.6,feetY:0};
 await walk(f,p,{x:5.04,z:37.9});near(p.feetY,0);assert.ok(p.z>38.43);
});
test('central partition blocks transverse movement before landing',async()=>{
 const {StairFloorModel}=await load,f=new StairFloorModel(true);
 const p={x:4.23,z:36.1,feetY:f.heightAt(4.23,36.1)};
 await walk(f,p,{x:5.83,z:36.1},[{x1:4.92,x2:5.12,z1:34.45,z2:37.47,bottom:0,top:3.3}]);
 assert.ok(p.x<4.92);
});
test('3D capsule collider ignores walls below feet and detects same-floor walls',async()=>{
 const {collidesWithVolume}=await load,b=[{x1:1,x2:2,z1:1,z2:2,bottom:0,top:2}];
 assert.equal(collidesWithVolume(1.5,1.5,0,1.75,b),true);
 assert.equal(collidesWithVolume(1.5,1.5,2.15,1.75,b),false);
 assert.equal(collidesWithVolume(1.5,1.5,1.95,1.75,b),true);
});
test('old save positions can be recovered; chapter II remains flat',async()=>{
 const {StairFloorModel}=await load,f=new StairFloorModel(true),flat=new StairFloorModel(false);
 near(f.restoreHeight({x:5.83,z:35.15}),f.heightAt(5.83,35.15));
 near(f.restoreHeight({x:5.83,z:35.15,feetY:0}),f.heightAt(5.83,35.15));
 near(flat.restoreHeight({x:5.83,z:35.15}),0);
});
