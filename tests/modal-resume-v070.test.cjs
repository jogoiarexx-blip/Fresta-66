'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const bundle=html.match(/<script[^>]+src="\.\/([^"]+\.js)"/)?.[1];
assert.ok(bundle,'production script missing');
const source=fs.readFileSync(path.join(__dirname,'..',bundle),'utf8');
const modal={hidden:false},resume={hidden:true};
const elements={modal,resume};
const b=id=>elements[id];
function method(start,end,name){
  const i=source.indexOf(start),j=source.indexOf(end,i+start.length);
  assert.ok(i>=0&&j>i,'UI '+name+' not found');
  return new Function('b','return ({'+source.slice(i,j)+'}).'+name)(b);
}
const close=method('close(){if(this.cancelPattern()','resumeGame(){','close');
const resumeGame=method('resumeGame(){this.cancelPattern()','button(e,t,','resumeGame');
function fake(type='document',running=true){
  let captures=0,background=null;
  const ui={modalType:type,history:[{type:'pause'}],g:{running,capture(){captures++}},cancelPattern(){},setBackgroundInert(v){background=v},resumeGame};
  return {ui,get captures(){return captures},get background(){return background}};
}
test('closing an in-game document bypasses the pause menu',()=>{
  const run=fake();
  close.call(run.ui);
  assert.equal(run.captures,1);
  assert.equal(run.ui.modalType,null);
  assert.deepEqual(run.ui.history,[]);
  assert.equal(modal.hidden,true);
  assert.equal(resume.hidden,true);
  assert.equal(run.background,false);
});
test('closing an in-game save panel resumes immediately',()=>{
  modal.hidden=false;resume.hidden=false;
  const run=fake('save');
  close.call(run.ui);
  assert.equal(run.captures,1);
  assert.equal(modal.hidden,true);
  assert.equal(resume.hidden,true);
});
test('closing the pause menu resumes gameplay, while pregame menu stays on screen',()=>{
  modal.hidden=false;resume.hidden=false;
  const run=fake('pause');
  close.call(run.ui);
  assert.equal(run.captures,1);
  const pregame=fake('settings',false);
  modal.hidden=false;resume.hidden=false;pregame.ui.history=[];
  close.call(pregame.ui);
  assert.equal(pregame.captures,0);
  assert.equal(modal.hidden,true);
  assert.equal(resume.hidden,true);
});
test('saving a tape resumes instead of reopening the save menu',()=>{
  assert.ok(source.includes('this.g.save(t)&&(this.resumeGame(),this.notice('));
  assert.ok(!source.includes('this.g.save(t)&&(this.notice("Gravação concluída. Você está em segurança."),this.saveMenu())'));
});
