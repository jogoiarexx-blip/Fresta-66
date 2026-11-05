const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/index-fresta-browser-v035.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/index-fresta-pause-v031.css'),'utf8');
const begin=script.indexOf('class pe{');
const end=script.indexOf('class fe extends Error');
assert(begin>0&&end>begin,'Game UI class found');
const classCode=script.slice(begin,end);
let elements;
function initializeDOM(){
  elements={};
  const E=(id)=>elements[id]??(elements[id]={id,hidden:false,inert:false,dataset:{},innerHTML:'',textContent:'',children:[],setAttribute(k,v){this[k]=v},replaceChildren(){this.children=[]},append(node){this.children.push(node)},classList:{add(){},remove(){},toggle(){}},focus(){}});
  return E;
}
const f=initializeDOM();
const document={
  createElement(name){return {tagName:name,hidden:false,disabled:false,innerHTML:'',textContent:'',onclick:null,classList:{add(){}},setAttribute(){}}},
  activeElement:null,
  querySelectorAll(){return []},
  addEventListener(){}
};
const ctx={document,f,requestAnimationFrame(fn){fn()},L:{maintenance:{title:'Ordem de manutenção 017',by:'HELENA',text:'A chave está sobre a mesa.\n\nO fusível está no depósito.'}},U:()=>'00:10',At:v=>String(v).toLowerCase(),O:v=>v,tt:()=>'Encontre o fusível'};
const uiClass=vm.runInNewContext(`${classCode}\npe`,ctx);
function newUI(running=true){
 initializeDOM();
 let captureCalls=0,pauseCalls=0;
 const game={running,paused:!running,room:{name:'Portaria'},state:{chapter:1,time:30,documents:['maintenance'],items:[]},settings:{readingTheme:'paper',readingSize:18},applySettings(){},audio:{setActive(){}},capture(){captureCalls++;this.paused=false},pause(){pauseCalls++;this.paused=true}};
 const ui=Object.create(uiClass.prototype);
 ui.g=game;ui.modalType=null;ui.history=[];ui.goingBack=false;ui.setBackgroundInert=uiClass.prototype.setBackgroundInert;
 return {ui,game,get captureCalls(){return captureCalls},get pauseCalls(){return pauseCalls}};
}
function check(name,fn){try{fn();console.log('PASS',name)}catch(err){console.error('FAIL',name,err.stack);process.exitCode=1}}
check('1. document opened from game pauses and hides resume overlay',()=>{
 const t=newUI();t.ui.document('maintenance');assert.equal(t.ui.modalType,'document');assert.equal(t.game.paused,true);assert.equal(f('resume').hidden,true);assert.equal(f('modal').hidden,false);
});
check('2. document X/close returns directly to gameplay and clears history',()=>{
 const t=newUI();t.ui.modalType='document';t.ui.history=[{type:'pause'},{type:'journal'}];t.game.paused=true;t.ui.close();
 assert.equal(t.ui.modalType,null);assert.equal(t.captureCalls,1);assert.equal(t.game.paused,false);assert.equal(f('resume').hidden,true);assert.equal(f('modal').hidden,true);assert.equal(t.ui.history.length,0)
});
check('3. closing root pause modal resumes gameplay (no intermediary overlay)',()=>{
 const t=newUI();t.ui.pause();t.ui.close();assert.equal(t.captureCalls,1);assert.equal(t.ui.modalType,null);assert.equal(f('resume').hidden,true);
});
check('4. manual return from document to journal preserves pause breadcrumb',()=>{
 const t=newUI();t.ui.pause();t.ui.modalType='document';t.ui.history=[{type:'pause'},{type:'journal'}];
 t.ui.backToJournal();assert.equal(t.ui.modalType,'journal');assert.deepEqual(t.ui.history.map(x=>x.type),['pause']);assert.equal(t.captureCalls,0);assert.equal(t.game.paused,true);
});
check('5. closing document while game not running does not try to capture mouse',()=>{
 const t=newUI(false);t.ui.modalType='document';t.ui.close();assert.equal(t.captureCalls,0);assert.equal(t.ui.modalType,null);assert.equal(f('resume').hidden,true);
});
check('6. generated DOM paths match shipped assets, accessibility buttons exist',()=>{
 for(const p of [...html.matchAll(/(?:src|href)="\.\/assets\/([^"]+)"/g)].map(x=>x[1])) assert(fs.existsSync(path.join(root,'assets',p)),p);
 assert(html.includes('id="resume-menu-button"'));
 assert(html.includes('id="resume-button"'));
 assert(css.includes('#modal[data-view="document"] .modal-panel{width:min'));
});
check('7. UI close method cannot leave the old resume overlay visible after document',()=>{
 const t=newUI();t.ui.modalType='document';t.game.paused=true;f('resume').hidden=false;t.ui.close();assert.equal(f('resume').hidden,true);
});
if(process.exitCode)process.exit(process.exitCode);
console.log('All 7 state and asset checks passed.');
