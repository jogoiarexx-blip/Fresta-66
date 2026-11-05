'use strict';
// Genuine Chromium/WebGL smoke test, designed for GitHub-hosted Linux runners.
// The game exposes a localhost-only QA handle with ?qa=1; live GitHub Pages never does.
const assert = require('node:assert/strict');
const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');
const {chromium} = require('playwright');

const root = path.resolve(__dirname, '..');
const MIME = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer(async(req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if(!file.startsWith(root+path.sep) && file!==root){res.writeHead(403);res.end();return;}
  try { const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes); }
  catch {res.writeHead(404);res.end();}
});
const nearly=(a,b,eps=.10)=>assert.ok(Math.abs(a-b)<eps,`expected ${a} ≈ ${b}`);
(async()=>{
  let browser;
  try {
    await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',err=>err?reject(err):resolve()));
    browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text());});
    await page.goto(`http://127.0.0.1:${server.address().port}/?qa=1`,{waitUntil:'domcontentloaded',timeout:35000});
    await page.waitForFunction(()=>window.FRESTA && window.__FRESTA_QA__ && window.__FRESTA_QA__.game?.renderer,{timeout:35000});
    assert.equal(await page.locator('#fatal').isHidden(),true,'WebGL initialisation failed');
    await page.waitForFunction(()=>window.FRESTA.diagnostics().calls>0,{timeout:15000});
    console.log('PASS browser: Chromium opened FRESTA, WebGL produced draw calls');
    await page.locator('#new-game').click();
    await page.getByRole('button',{name:'Começar em 1ª pessoa'}).click();
    await page.waitForFunction(()=>window.FRESTA.diagnostics().chapter===1 && window.__FRESTA_QA__.game.running,{timeout:15000});
    assert.equal(await page.locator('#hud').isHidden(),false);
    const result=await page.evaluate(()=>{
      const g=window.__FRESTA_QA__.game;
      const pos=()=>({x:g.player.x,z:g.player.z,feetY:g.player.feetY});
      const driveTo=(x,z)=>{
        g.paused=false;
        const dx=x-g.player.x,dz=z-g.player.z,dist=Math.hypot(dx,dz);
        g.player.yaw=Math.atan2(-dx,-dz);
        g.keys.add('KeyW');
        const n=Math.ceil(dist/(2.05*.015));
        for(let i=0;i<n;i++)g.updatePlayer(.015);
        g.keys.delete('KeyW');
        return pos();
      };
      g.player={...g.player,x:4.23,z:34.35,feetY:0,yaw:Math.PI,pitch:0};
      g.room=g.roomAt(g.player.x,g.player.z);
      g.getColliders();
      const lower=driveTo(4.23,37.9);
      const turn=driveTo(5.83,37.9);
      const upper=driveTo(5.83,34.48);
      g.updateCamera(.05);
      g.state.flags.chapter1Done=true;
      const arrived=g.travelChapter(2);
      const ch2={chapter:g.state.chapter,room:g.room?.id,enemy:g.enemy.mode,position:pos()};
      g.state.enemies[2]={x:5,z:27,mode:'PATROL',patrol:1,wait:1};
      const cameBack=g.travelChapter(1);
      const back={chapter:g.state.chapter,room:g.room?.id,position:pos()};
      g.syncPosition();
      const checkpoint=structuredClone(g.state);
      g.start(checkpoint);
      const restored={chapter:g.state.chapter,room:g.room?.id,position:pos()};
      return {lower,turn,upper,arrived,ch2,cameBack,back,restored};
    });
    nearly(result.lower.z,37.9);nearly(result.lower.feetY,1.62);
    nearly(result.turn.x,5.83);nearly(result.turn.feetY,1.62);
    nearly(result.upper.z,34.48);nearly(result.upper.feetY,3.24);
    assert.equal(result.arrived,true);assert.equal(result.ch2.chapter,2);
    assert.equal(result.cameBack,true);assert.equal(result.back.chapter,1);
    assert.equal(result.restored.chapter,1);
    nearly(result.back.position.feetY,result.restored.position.feetY,.235);
    console.log('PASS browser: two flights, physical height, chapter II, return, checkpoint restore',JSON.stringify(result));
    const documentClosed=await page.evaluate(()=>{
      const g=window.__FRESTA_QA__.game;
      g.ui.document('maintenance');
      const opened=!document.getElementById('modal').hidden && g.paused;
      g.ui.close();
      return {opened,closed:document.getElementById('modal').hidden && !g.ui.modalType,active:g.running};
    });
    assert.deepEqual(documentClosed,{opened:true,closed:true,active:true});
    console.log('PASS browser: opening and closing a document returns directly to exploration');
    assert.equal(errors.length,0,'Browser JS errors: '+errors.join(' | '));
    console.log('SUCCESS: browser WebGL and gameplay smoke tests passed');
    await page.screenshot({path:path.join(root,'browser-qa.png'),fullPage:true});
  } catch(err) {
    console.error('FRESTA browser smoke FAILED:',err.stack||String(err));
    process.exitCode=1;
  } finally {
    if(browser) await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})();
