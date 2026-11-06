'use strict';
// FRESTA v0.7.0 browser smoke: production UI and WebGL, no legacy QA bridge.
const assert=require('node:assert/strict');
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.glb':'model/gltf-binary'};
const server=http.createServer(async(req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);}catch{res.writeHead(400).end();return;}
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try{const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}
  catch{res.writeHead(404).end();}
});
(async()=>{
  let browser,page;
  const failures=[];
  try{
    await new Promise((ok,fail)=>server.listen(0,'127.0.0.1',err=>err?fail(err):ok()));
    browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'});
    page.on('pageerror',e=>failures.push(String(e)));
    page.on('response',r=>{if(r.status()>=400 && !(r.status()===404 && r.url().endsWith('/assets/rastejante_animado_fresta.glb')))failures.push('HTTP '+r.status()+' '+r.url());});
    await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded',timeout:35000});
    await page.waitForFunction(()=>window.FRESTA?.version==='0.7.0'||!document.querySelector('#fatal')?.hidden,{timeout:35000});
    const fatal=await page.locator('#fatal').isVisible();
    assert.equal(fatal,false,'WebGL init failed: '+await page.locator('#fatal-message').textContent());
    await page.waitForFunction(()=>window.FRESTA?.diagnostics().calls>0,{timeout:20000});
    assert.equal(await page.locator('#menu').isVisible(),true);
    await page.locator('#new-game').click();
    assert.equal(await page.locator('#modal').isVisible(),true,'intro modal was not opened');
    await page.getByRole('button',{name:'Começar em 1ª pessoa'}).click();
    await page.waitForFunction(()=>window.FRESTA?.diagnostics().chapter===1&&document.querySelector('#hud')&&!document.querySelector('#hud').hidden,{timeout:20000});
    const d=await page.evaluate(()=>window.FRESTA.diagnostics());
    assert.ok(d.calls>0,'no WebGL draw calls');
    assert.equal(d.chapter,1);
    assert.equal(await page.locator('#fatal').isVisible(),false);
    assert.deepEqual(failures,[],'browser errors');
    console.log('PASS FRESTA 0.7.0 browser: menu, intro, chapter I, WebGL, HUD',JSON.stringify({chapter:d.chapter,calls:d.calls,flashlightModel:d.flashlightModel}));
  }catch(err){console.error('FRESTA v0.7.0 browser smoke FAILED:',err.stack||err);console.error('Other browser errors:',failures);process.exitCode=1;}
  finally{
    if(page)await page.screenshot({path:path.join(root,'browser-qa.png'),fullPage:true}).catch(()=>{});
    if(browser)await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})();
