const { chromium } = require(process.env.DIALEK_PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const site = path.resolve(__dirname, '../Dialek-master');
const output = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'dialek-beta7-check-'));
const url = process.env.DIALEK_TEST_URL || require('node:url').pathToFileURL(path.join(site, 'index.html')).href;
const errors = [], findings = [];
const reviewed = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/dialectcontrole/beta-7-import.json'), 'utf8'));
const earlierReviewed = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/dialectcontrole/beta-6-import.json'), 'utf8'));
const vm = require('node:vm');
function loadCopy(ref) {
  const context = { window: {} }; vm.createContext(context);
  for (const file of ['copy-nl.js','copy-li.js','copy-reviewed.js','i18n.js']) {
    const source = execFileSync('git',['show',ref+':Dialek-master/'+file],{cwd:site,encoding:'utf8'});
    vm.runInContext(source,context);
  }
  return JSON.parse(JSON.stringify(context.window));
}
const baseline = loadCopy(reviewed.baseCommit);
const slots = {
  'day-text-detail': ['15:00–15:45','16:45–17:30'],
  'day-match-detail': ['15:45–16:45'],
  'day-language-detail': ['15:45–18:30'],
  'day-network-detail': ['15:45–18:30'],
  'artist-troubadours-detail': ['20:00–20:30'], 'artist-melton-detail':['20:40–21:05'],
  'artist-limbo-detail':['21:20–21:50'], 'artist-riethamer-detail':['22:00–22:25'],
  'artist-basement-detail':['22:35–23:10']
};
(async () => {
  const browser = await chromium.launch({ executablePath:process.env.DIALEK_BROWSER_PATH, headless:true });
  const page = await browser.newPage({ viewport:{width:1512,height:850}, reducedMotion:'reduce' });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('html').getAttribute('lang'),'li');
  assert.equal(await page.locator('#dialectSelect').inputValue(),'remunjs');
  assert.equal(await page.locator('[data-i18n="foodNote"]').textContent(),"Frietkraom op 't terrein, dus blief veural hange!");
  await page.selectOption('#dialectSelect','nl');
  assert.equal(await page.locator('#dialectSelect').inputValue(),'nl');
  assert.equal(await page.locator('#dialectSelect option').count(),9);
  assert.equal(await page.locator('#info .info-card, #info .mission-strip, #info .partners').count(),0);
  assert.equal(await page.locator('[data-i18n="nightNote"], [data-i18n="dayProgramLabel"], .schedule-card__plus').count(),0);
  assert.equal(await page.locator('.program-block--day .detail-status').count(),0);
  const rightRows = await page.locator('.hero__facts--where p').evaluateAll(rows => rows.map(el => { const r=el.getBoundingClientRect(); return {top:r.top,bottom:r.bottom,right:r.right}; }));
  assert.equal(rightRows.length,4);
  assert.equal(new Set(rightRows.map(r => Math.round(r.right))).size,1);
  const rightGaps = rightRows.slice(1).map((r,i) => r.top-rightRows[i].bottom);
  assert.ok(Math.max(...rightGaps)-Math.min(...rightGaps)<1,'Uneven hero fact spacing');
  assert.equal(await page.locator('a[data-i18n="matchCta"]').getAttribute('href'),'https://forms.gle/nLZkYrnmeo9nLyRF6');
  assert.equal(await page.locator('a[href="mailto:juuldebruinmusic@gmail.com"]').count(),1);
  assert.equal(await page.locator('.partner').count(),9);
  assert.equal(await page.locator('.partner img').count(),8);
  assert.equal(await page.locator('.spotify-link').count(),4);
  assert.equal(await page.locator('[data-i18n="artistLabel"], [data-i18n="artistPhotoLabel"], [data-artist="TBA"], [data-artist="Sophie Albert"]').count(),0);
  assert.equal(await page.locator('#artist-troubadours-detail [data-i18n-paragraphs] p').count(),2);
  assert.equal(await page.locator('#artist-troubadours-detail .spotify-link').getAttribute('href'),'https://open.spotify.com/artist/1UJkA0mBxwmjxO6FV2QhUT');
  assert.equal(await page.locator('.program-divider > i').count(),1);
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
  await page.screenshot({path:path.join(output,'beta7-desktop-hero.png')});
  await page.locator('#programma').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'beta7-desktop-program.png')});
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
        const program=document.querySelector('#programma').getBoundingClientRect();
        const about=document.querySelector('#info').getBoundingClientRect();
        if(Math.abs(program.width-about.width)>1||Math.abs(program.left-about.left)>1)bad.push('program/about panel widths differ');
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
        const lefts=['#info .eyebrow','#info-title .word','#info .info__lead'].map(sel=>document.querySelector(sel).getBoundingClientRect().left);
        if(Math.max(...lefts)-Math.min(...lefts)>1)bad.push('About alignment differs');
        const note=document.querySelector('.program-divider__note').getBoundingClientRect();
        const activity=document.querySelector('.activity-note').getBoundingClientRect();
        if(note.top<activity.bottom)bad.push('Food note overlaps day programme');
        return bad;
      });
      if(issue.length)findings.push({viewport:size.width,language:lang,issue});
    }
    await page.selectOption('#dialectSelect','nl');
    if(size.width===390||size.width===320){
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:path.join(output,'beta7-'+size.width+'-hero.png')});
      await page.locator('[aria-controls="day-text-detail"]').scrollIntoViewIfNeeded();
      await page.screenshot({path:path.join(output,'beta7-'+size.width+'-program.png')});
    }
  }
  for(const size of [{width:1512,height:850},{width:390,height:844}]){
    await page.setViewportSize(size);
    const heights=[];
    for(const artist of ['troubadours','melton','limbo','riethamer','basement']){
      const trigger=page.locator('[aria-controls="artist-'+artist+'-detail"]');
      await trigger.click();
      assert.equal(await trigger.getAttribute('aria-expanded'),'true');
      const figure=page.locator('#artist-'+artist+'-detail .artist-photo');
      await figure.scrollIntoViewIfNeeded();
      await page.waitForFunction(id=>{const im=document.querySelector('#'+id+' .artist-photo__image'); return im.complete&&im.naturalWidth>0},'artist-'+artist+'-detail');
      await page.waitForFunction(id=>getComputedStyle(document.querySelector('#'+id+' .schedule-card__detail-inner')).opacity==='1','artist-'+artist+'-detail');
      await figure.scrollIntoViewIfNeeded();
      const box=await figure.boundingBox(); heights.push(box.height);
      await page.screenshot({path:path.join(output,'beta7-'+size.width+'-'+artist+'.png')});
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
  await page.screenshot({path:path.join(output,'beta7-taalmatch.png')});
  await page.keyboard.press('Enter');
  assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  await page.locator('#info').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'beta7-about.png')});
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,'beta7-partners.png')});
  await page.waitForFunction(()=>[...document.querySelectorAll('.partner img')].every(im=>im.complete&&im.naturalWidth>0));
  for(const size of [{width:1512,height:850},{width:390,height:844},{width:320,height:740}]){
    await page.setViewportSize(size);
    await page.locator('.program-divider').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(output,'beta7-'+size.width+'-divider.png')});
    await page.locator('.partners').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(output,'beta7-'+size.width+'-partners.png')});
    await page.locator('#info').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(output,'beta7-'+size.width+'-about.png')});
  }
  await page.selectOption('#dialectSelect','mestreechs');
  // Pixel regression: paper and object-fit padding must be transparent, not a black/white box.
  await page.setViewportSize({width:1512,height:850});
  const logoChecks=[];
  for(const name of ['veldeke-remunj.png','bibliorura.jpg']){
    const img=page.locator('.partner img[src$="'+name+'"]');
    await img.evaluate(el=>{el.style.width='300px';el.style.height='120px';el.parentElement.style.backgroundColor='#ff00ff';});
    await img.scrollIntoViewIfNeeded();
    await page.waitForFunction(name=>{const img=document.querySelector('.partner img[src$="'+name+'"]');return img.complete&&img.naturalWidth>0&&img.getBoundingClientRect().width===300;},name);
    const png=await img.screenshot({path:path.join(output,name+'-transparency.png')});
    const {data,info}=await require('sharp')(png).raw().toBuffer({resolveWithObject:true});
    let black=0,white=0,transparent=0;
    for(let i=0;i<data.length;i+=info.channels){
      const [r,g,b]=data.subarray(i,i+3);
      if(r<30&&g<30&&b<30)black++;
      if(r>245&&g>245&&b>245)white++;
      if(r>245&&g<15&&b>245)transparent++;
    }
    const pixels=info.width*info.height;
    assert.equal(black,0,name+' has a black background');
    assert.ok(transparent/pixels>.7,name+' paper is opaque');
    assert.ok(white/pixels>.03&&white/pixels<.3,name+' artwork missing or opaque frame');
    for(const [x,y] of [[2,2],[info.width-3,2],[2,info.height-3],[info.width-3,info.height-3]]){
      const i=(y*info.width+x)*info.channels;
      assert.ok(data[i]>245&&data[i+1]<15&&data[i+2]>245,name+' has an opaque corner');
    }
    logoChecks.push({name,black,white,transparent,pixels});
    await img.evaluate(el=>{el.removeAttribute('style');el.parentElement.removeAttribute('style');});
  }
  await page.evaluate(() => localStorage.setItem('dialek-beta3-language','nl'));
  await page.reload();
  assert.equal(await page.locator('#dialectSelect').inputValue(),'remunjs');
  await page.selectOption('#dialectSelect','nl');
  const liveCopy=await page.evaluate(()=>({nl:window.DIALEK_COPY_NL,regional:window.DIALEK_DIALECT_COPY,dialects:window.DIALEK_I18N.dialects,approved:window.DIALEK_REVIEWED_COPY}));
  assert.deepEqual(liveCopy.regional,baseline.DIALEK_DIALECT_COPY,'Unreviewed regional source changed');
  assert.deepEqual(liveCopy.nl,baseline.DIALEK_COPY_NL,'Dutch changed');
  assert.equal(liveCopy.nl.kicker,'Een eendaags festival in het Limburgs');
  assert.ok(languages.includes('meels')&&!languages.includes('valkebergs'));
  assert.deepEqual(languages,baseline.DIALEK_I18N.dialects.map(d=>d.code).filter(code=>!['wieerts','venroads'].includes(code)));
  assert.ok(!JSON.stringify(liveCopy.approved.echts).includes('voeg hier de vertaling toe'));
  for(const [code,strings] of Object.entries(baseline.DIALEK_REVIEWED_COPY))assert.deepEqual(liveCopy.approved[code],strings,code+' reviewed copy changed');
  for(const key of ['description','ogTitle','ogDescription'])assert.equal(liveCopy.dialects.find(d=>d.code==='echts').strings[key],baseline.DIALEK_COPY_NL[key]);
  for(const prior of baseline.DIALEK_I18N.dialects){
    if(['echts','wieerts','venroads'].includes(prior.code))continue;
    assert.deepEqual(liveCopy.dialects.find(d=>d.code===prior.code).strings,prior.strings,prior.code+' changed');
  }
  for(const source of [...earlierReviewed.sources,...reviewed.sources]){
    const hash=require('node:crypto').createHash('sha256').update(JSON.stringify(liveCopy.approved[source.code])).digest('hex');
    assert.equal(hash,source.stringsSha256,source.code+' differs from approved source');
    for(const size of [{width:1512,height:850},{width:390,height:844},{width:320,height:740}]){
      await page.setViewportSize(size);
      await page.selectOption('#dialectSelect',source.code);
      const mismatch=await page.evaluate(()=>{
        const approved=window.DIALEK_I18N.dialects.find(d=>d.code===document.documentElement.dataset.dialect).strings;
        const problems=[];
        const normal=s=>s.replace(/\s+/g,' ').trim();
        for(const el of document.querySelectorAll('[data-i18n]')){
          const key=el.dataset.i18n;
          let actual=el.hasAttribute('data-split-words') ? el.getAttribute('aria-label') :
            el.hasAttribute('data-i18n-paragraphs') ? [...el.children].map(p=>p.textContent).join('\n\n') :
            [...el.childNodes].map(n=>n.nodeName==='BR'?'\n':n.textContent).join('');
          if(approved[key]!==undefined && normal(actual)!==normal(approved[key]))problems.push(key);
        }
        for(const el of document.querySelectorAll('[data-i18n-aria]')){
          const key=el.dataset.i18nAria;
          if(approved[key]!==undefined&&el.getAttribute('aria-label')!==approved[key])problems.push(key);
        }
        if(document.title!==approved.pageTitle.trim().replace(/\s+/g,' '))problems.push('pageTitle');
        if(document.querySelector('meta[name="description"]').content!==approved.description)problems.push('description');
        if(document.querySelector('meta[property="og:title"]').content!==approved.ogTitle)problems.push('ogTitle');
        if(document.querySelector('meta[property="og:description"]').content!==approved.ogDescription)problems.push('ogDescription');
        return problems;
      });
      assert.deepEqual(mismatch,[],source.code+' source mismatch');
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:path.join(output,source.code+'-'+size.width+'-hero.png')});
    }
  }
  await page.selectOption('#dialectSelect','nl');
  assert.equal(await page.title(),baseline.DIALEK_COPY_NL.pageTitle);
  assert.equal(await page.locator('.nav__brand').getAttribute('aria-label'),'DIALEK home');
  assert.equal(await page.locator('.nav__links').getAttribute('aria-label'),'Hoofdmenu');
  assert.equal(await page.locator('.nav__cta').getAttribute('href'),'https://ecicultuurfabriek.nl/voorstelling/dialek/');
  const currentScript=fs.readFileSync(path.join(site,'script.js'),'utf8');
  const priorScript=execFileSync('git',['show',reviewed.baseCommit+':Dialek-master/script.js'],{cwd:site,encoding:'utf8'});
  assert.equal(currentScript.slice(currentScript.indexOf('  var clouds =')),priorScript.slice(priorScript.indexOf('  var clouds =')));
  const currentCss=fs.readFileSync(path.join(site,'styles.css'),'utf8');
  const priorCss=execFileSync('git',['show',reviewed.baseCommit+':Dialek-master/styles.css'],{cwd:site,encoding:'utf8'});
  const normaliseLogoRule = css => css.replace(/(\.partners__list--secondary \.partner img\[src\$="veldeke-remunj\.png"\],[\s\S]*?\{)[^}]+\}/, '$1 LOGO FILTER }');
  assert.equal(normaliseLogoRule(currentCss),normaliseLogoRule(priorCss),'CSS changed outside two logo filters');
  assert.equal(currentScript,priorScript,'JavaScript behaviour changed');
  for(const selector of ['.sky','.sky__gradient','.clouds','.clouds--far','.clouds--mid','.clouds--near','.vlaai-rig','.vlaai-drop','.vlaai-swing','.string','.vlaai']){
    const rule=css=>css.match(new RegExp(selector.replaceAll('.','\\.')+' \\{[^}]+\\}'))?.[0];
    assert.equal(rule(currentCss),rule(priorCss),selector+' changed');
  }
  await browser.close();
  console.log(JSON.stringify({output,errors,findings,heroFontSizes,logoChecks,viewports:9,languages:9,checks:'approved copy, preserved other dialects, schedule, links, photos, keyboard, Remunjs on every load, preserved styles/vlaai except two logo filters'},null,2));
  assert.deepEqual(errors,[]); assert.deepEqual(findings,[]);
})();
