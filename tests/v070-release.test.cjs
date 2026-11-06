'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const js=html.match(/<script[^>]+src="\.\/([^"]+\.js)"/)?.[1];
const css=html.match(/<link[^>]+rel="stylesheet"[^>]+href="\.\/([^"]+\.css)"/)?.[1];
const vendor=html.match(/<link[^>]+rel="modulepreload"[^>]+href="\.\/([^"]+\.js)"/)?.[1];
test('FRESTA 0.7.0 entrypoint references available production bundles',()=>{
  for(const [kind,file] of Object.entries({js,css,vendor})){
    assert.ok(file,kind+' not declared in index.html');
    assert.ok(fs.statSync(path.join(root,file)).size>1000,kind+' missing or empty: '+file);
  }
  assert.match(html,/id="new-game"/);
  assert.match(html,/id="modal"/);
  assert.match(html,/id="fatal"/);
  assert.match(html,/id="world"/);
});
test('published bundle includes 0.7.0 runtime and playable chapters',()=>{
  const code=fs.readFileSync(path.join(root,js),'utf8');
  assert.ok(code.includes('version:"0.7.0"'),'version marker missing');
  assert.ok(code.includes('newGame(){'),'new game UI missing');
  assert.ok(code.includes('Começar em 1ª pessoa'),'intro choice missing');
  assert.ok(code.includes('diagnostics:()=>'),'runtime diagnostics missing');
  assert.ok(code.includes('chapter:1'),'chapter initialization missing');
});
test('flashlight model is a valid GLB with binary header',()=>{
  const bundle=fs.readFileSync(path.join(root,js),'utf8');
  const assets=fs.readdirSync(path.join(root,'assets')).filter(x=>x.endsWith('.glb'));
  assert.ok(assets.length>0,'flashlight GLB missing');
  for(const file of assets){
    const buffer=fs.readFileSync(path.join(root,'assets',file));
    assert.equal(buffer.toString('ascii',0,4),'glTF',file+' is not GLB');
    assert.equal(buffer.readUInt32LE(8),buffer.length,file+' length mismatch');
    assert.ok(bundle.includes(file),'GLB not referenced by the runtime: '+file);
  }
});
test('static HTML assets resolve locally',()=>{
  for(const [,relative] of html.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g)){
    assert.ok(fs.existsSync(path.join(root,relative)),relative+' missing');
  }
});

test('Rastejante faces AI forward and uses human-scale-plus height',()=>{
  const code=fs.readFileSync(path.join(root,js),'utf8');
  assert.ok(code.includes('const scale=2.35/size.y;'),'Rastejante target height should be 2.35 m');
  assert.ok(code.includes('container.rotation.y=Math.PI;'),'model forward should align with AI movement');
  assert.ok(code.includes('rastejante_animado_fresta.glb'),'animated GLB source missing');
});
