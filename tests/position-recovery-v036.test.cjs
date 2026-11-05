'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.resolve(__dirname,'../assets/index-fresta-landing-v036.js'),'utf8');
test('invalid horizontal movement restores x,z and feetY atomically',()=>{
  assert.match(source,/u=\{x:e\.x,z:e\.z,feetY:e\.feetY\};resolve3DMovement\(/);
  assert.match(source,/&&\(e\.x=u\.x,e\.z=u\.z,e\.feetY=u\.feetY\)/);
});
test('localhost-only QA bridge cannot leak onto public GitHub Pages',()=>{
  assert.match(source,/location\.hostname==="127\.0\.0\.1"\|\|location\.hostname==="localhost"/);
  assert.match(source,/new URLSearchParams\(location\.search\)\.has\("qa"\)/);
});
test('client diagnostics reflects the latest version',()=>assert.match(source,/version:"0\.3\.6"/));

const testPosition=require('node:test');
testPosition('upper landing backstop matches the visible wall, without blocking the landing',()=>{assert.match(source,/this\.solid\(5\.82,34\.06,1\.56,\.18,3\.5\)/)});
