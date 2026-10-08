const { chromium } = require(process.env.DIALEK_PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const site = path.resolve(__dirname, '../Dialek-master');
const output = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'dialek-beta2-check-'));
const url = require('node:url').pathToFileURL(path.join(site, 'index.html')).href;
const errors = [], findings = [];
const slots = {
  'day-text-detail': ['13:45–14:30','15:45–16:30'],
  'day-match-detail': ['14:30–15:45'],
  'day-language-detail': ['13:00–13:45','14:30–15:45','16:30–18:00'],
  'day-network-detail': ['13:00–13:45','14:30–15:45','16:30–18:00'],
  'artist-sophie-detail': ['20:00–20:25'], 'artist-tba-detail':['20:35–21:00'],
  'artist-limbo-detail':['21:15–21:40'], 'artist-riethamer-detail':['21:45–22:10'],
  'artist-basement-detail':['22:20–22:45']
};
(async () => {
  const browser = await chromium.launch({ executablePath:process.env.DIALEK_BROWSER_PATH, headless:true });
  const page = await browser.newPage({ viewport:{width:1512,height:850}, reducedMotion:'reduce' });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('html').getAttribute('lang'),'nl');
  assert.equal(await page.locator('#dialectSelect').inputValue(),'nl');
  assert.equal(await page.locator('#dialectSelect option').count(),11);
  assert.equal(await page.locator('#info .info-card, #info .mission-strip, #info .partners').count(),0);
  assert.equal(await page.locator('[data-i18n="nightNote"], [data-i18n="dayProgramLabel"], .schedule-card__plus').count(),0);
  assert.equal(await page.locator('a[data-i18n="matchCta"]').getAttribute('href'),'https://forms.gle/nLZkYrnmeo9nLyRF6');
  assert.equal(await page.locator('a[href="mailto:juuldebruinmusic@gmail.com"]').count(),1);
  assert.equal(await page.locator('.partner').count(),3);
  assert.equal(await page.locator('.partner img').count(),2);
  assert.equal(await page.locator('.spotify-link').count(),4);
  const copyIssues = await page.evaluate(() => [...document.querySelectorAll('[data-i18n]')].flatMap(el => {
    const key=el.dataset.i18n, expected=window.DIALEK_COPY_NL[key];
    const actual=el.hasAttribute('data-split-words') ? el.getAttribute('aria-label') : el.textContent;
    const norm=s=>s.replace(/\s/g,'');
    return !expected || norm(actual)!==norm(expected) ? [{key,actual,expected}] : [];
  }));
  assert.deepEqual(copyIssues,[]);
  for (const [id, expected] of Object.entries(slots)) {
    assert.deepEqual(await page.locator('[aria-controls="'+id+'"] .schedule-card__slot').allTextContents(),expected);
  }
  const heroFontSizes=await page.locator('.hero').evaluate(hero => [...new Set([...hero.querySelectorAll('*')].filter(el => [...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()) && el.getBoundingClientRect().height>0).map(el=>getComputedStyle(el).fontSize))]);
  assert.ok(heroFontSizes.length<=4,heroFontSizes.join(', '));
  await page.screenshot({path:path.join(output,'beta2-desktop-hero.png')});
  await page.locator('#programma').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'beta2-desktop-program.png')});
  const languages=await page.locator('#dialectSelect option').evaluateAll(opts=>opts.map(o=>o.value));
  for(const size of [{width:1512,height:850},{width:1440,height:900},{width:1280,height:800},{width:1024,height:768},{width:900,height:1000},{width:768,height:1024},{width:390,height:844},{width:375,height:812},{width:320,height:740}]){
    await page.setViewportSize(size);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    for(const lang of languages){
      await page.selectOption('#dialectSelect',lang);
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      const issue=await page.evaluate(()=>{
        const bad=[];
        if(document.documentElement.scrollWidth>innerWidth+1)bad.push('page overflow: '+document.documentElement.scrollWidth);
        for(const el of document.querySelectorAll('.nav__links > *, .schedule-card__trigger, .hero__facts')){
          const r=el.getBoundingClientRect();
          if(r.left<0||r.right>innerWidth+1)bad.push(el.className+' outside viewport '+r.left+' / '+r.right);
        }
        for(const row of document.querySelectorAll('.schedule-card__trigger')){
          const time=row.querySelector('.schedule-card__time').getBoundingClientRect();
          const summary=row.querySelector('.schedule-card__summary').getBoundingClientRect();
          if(time.right>summary.left)bad.push('time/title overlap');
        }
        const texts=[...document.querySelectorAll('[data-i18n]')];
        for(const el of texts)if(!window.DIALEK_I18N.dialects.find(d=>d.code===document.documentElement.dataset.dialect).strings[el.dataset.i18n])bad.push('missing '+el.dataset.i18n);
        return bad;
      });
      if(issue.length)findings.push({viewport:size.width,language:lang,issue});
    }
    await page.selectOption('#dialectSelect','nl');
    if(size.width===390||size.width===320){
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:path.join(output,'beta2-'+size.width+'-hero.png')});
      await page.locator('[aria-controls="day-text-detail"]').scrollIntoViewIfNeeded();
      await page.screenshot({path:path.join(output,'beta2-'+size.width+'-program.png')});
    }
  }
  for(const size of [{width:1512,height:850},{width:390,height:844}]){
    await page.setViewportSize(size);
    const heights=[];
    for(const artist of ['sophie','limbo','riethamer','basement']){
      const trigger=page.locator('[aria-controls="artist-'+artist+'-detail"]');
      await trigger.click();
      assert.equal(await trigger.getAttribute('aria-expanded'),'true');
      const figure=page.locator('#artist-'+artist+'-detail .artist-photo');
      await figure.scrollIntoViewIfNeeded();
      await page.waitForFunction(id=>{const im=document.querySelector('#'+id+' .artist-photo__image'); return im.complete&&im.naturalWidth>0},'artist-'+artist+'-detail');
      await page.waitForFunction(id=>getComputedStyle(document.querySelector('#'+id+' .schedule-card__detail-inner')).opacity==='1','artist-'+artist+'-detail');
      await figure.scrollIntoViewIfNeeded();
      const box=await figure.boundingBox(); heights.push(box.height);
      await page.screenshot({path:path.join(output,'beta2-'+size.width+'-'+artist+'.png')});
      assert.ok(await figure.locator('img').evaluate(im=>im.naturalWidth>=im.clientWidth));
      await trigger.click();
      assert.equal(await trigger.getAttribute('aria-expanded'),'false');
    }
    assert.equal(new Set(heights).size,1);
  }
  await page.setViewportSize({width:1512,height:850});
  const trigger=page.locator('[aria-controls="day-match-detail"]');
  await trigger.focus(); await page.keyboard.press('Space');
  assert.equal(await trigger.getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('#day-match-detail [data-i18n-paragraphs] p').count(),3);
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('#day-match-detail .schedule-card__detail-inner')).opacity==='1');
  await page.screenshot({path:path.join(output,'beta2-taalmatch.png')});
  await page.keyboard.press('Enter');
  assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  await page.locator('#info').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'beta2-about.png')});
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'beta2-partners.png')});
  await page.selectOption('#dialectSelect','mestreechs'); await page.reload();
  assert.equal(await page.locator('#dialectSelect').inputValue(),'mestreechs');
  await page.selectOption('#dialectSelect','nl');
  const currentScript=fs.readFileSync(path.join(site,'script.js'),'utf8');
  const priorScript=execFileSync('git',['show','website-beta-1:Dialek-master/script.js'],{cwd:site,encoding:'utf8'});
  assert.equal(currentScript.slice(currentScript.indexOf('  var clouds =')),priorScript.slice(priorScript.indexOf('  var clouds =')));
  const currentCss=fs.readFileSync(path.join(site,'styles.css'),'utf8');
  const priorCss=execFileSync('git',['show','website-beta-1:Dialek-master/styles.css'],{cwd:site,encoding:'utf8'});
  for(const selector of ['.sky','.sky__gradient','.clouds','.clouds--far','.clouds--mid','.clouds--near','.vlaai-rig','.vlaai-drop','.vlaai-swing','.string','.vlaai']){
    const rule=css=>css.match(new RegExp(selector.replaceAll('.','\\.')+' \\{[^}]+\\}'))?.[0];
    assert.equal(rule(currentCss),rule(priorCss),selector+' changed');
  }
  await browser.close();
  console.log(JSON.stringify({output,errors,findings,heroFontSizes,viewports:9,languages:11,checks:'copy, schedule, links, all photo sizes, keyboard, persistence, unchanged sky/vlaai'},null,2));
  assert.deepEqual(errors,[]); assert.deepEqual(findings,[]);
})();
