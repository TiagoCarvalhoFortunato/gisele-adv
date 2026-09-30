const { chromium } = require('playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  fs.mkdirSync('review',{recursive:true});
  const results=[];
  for (const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844],['small-mobile',320,720]]) {
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
    await page.goto('http://127.0.0.1:8000',{waitUntil:'networkidle'});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('#sobre').scrollIntoViewIfNeeded();
    await page.locator('.about-visual img').evaluate(image=>image.decode());
    await page.evaluate(()=>{ document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0,0); });
    await page.waitForFunction(()=>window.scrollY===0);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.screenshot({path:`review/${name}.png`,fullPage:true});
    const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({src:i.getAttribute('src'),ok:i.complete&&i.naturalWidth>0})),fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),anchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
    await page.locator('#quote-next').click();
    const next=await page.locator('#quote-name').textContent();
    await page.locator('#quote-prev').click();
    const previous=await page.locator('#quote-name').textContent();
    let menu=true;
    if(width<=1000){await page.locator('.menu-toggle').click();menu=await page.locator('#main-nav').isVisible();await page.keyboard.press('Escape');menu=menu&&!(await page.locator('#main-nav').isVisible());await page.locator('.menu-toggle').click();await page.locator('#main-nav a[href="#sobre"]').click();menu=menu&&!(await page.locator('#main-nav').isVisible());}
    results.push({name,...layout,errors,carousel:next==='Odila Maria de Jesus'&&previous==='Juliana Lima',menu});
    await page.close();
  }
  fs.writeFileSync('review/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
  await browser.close();
})();
