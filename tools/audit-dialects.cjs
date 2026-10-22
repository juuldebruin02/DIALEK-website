// Read-only dictionary checks. No website copy is changed by this tool.
// Results are lexical evidence, NOT a grammatical or editorial approval.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const site = path.join(root, 'Dialek-master');
const cache = process.env.DIALEK_DICTIONARY_CACHE;
if (!cache) throw Error('Set DIALEK_DICTIONARY_CACHE to a temporary cache directory.');
fs.mkdirSync(cache, { recursive: true });
const mapping = { remunjs:'Roermond', mestreechs:'Maastricht', zitterds:'Sittard', venloos:'Venlo', valkebergs:'Valkenburg' };
const normalize = s => s.normalize('NFC').toLocaleLowerCase('nl').replace(/[‘’ʼ]/g,"'");
const tokens = s => (normalize(s).match(/'?\p{L}+(?:['\-]\p{L}+)*/gu) || [])
  .map(word => word.startsWith("'") && !["'n","'t","'ne","'nen","'r"].includes(word) ? word.slice(1) : word);
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function lookup(term, direction='LI-NL', dialect='') {
  const url = new URL('https://www.limburgs.net/api/search/' + encodeURIComponent(term));
  url.search = new URLSearchParams({ term, languageDirection:direction, deep:'false', ...(dialect ? { dialects:dialect } : {}) });
  const file = path.join(cache, crypto.createHash('sha256').update(url.href).digest('hex') + '.json');
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file,'utf8'));
  await sleep(180);
  // curl uses the host's supported network configuration; no login is needed.
  let raw;
  try { raw = execFileSync('curl',['--fail','--silent','--show-error','--max-time','25',url.href],{encoding:'utf8',maxBuffer:8*1024*1024}); }
  catch (error) { throw Error('Dictionary request failed; stop rather than classify as missing: '+url.href); }
  const result = JSON.parse(raw);
  if (!Array.isArray(result.data)) throw Error('Unexpected dictionary response: '+url.href);
  const out = { url:url.href, checkedAt:new Date().toISOString(), data:result.data };
  fs.writeFileSync(file, JSON.stringify(out));
  return out;
}
function loadCopy() {
  const context = { window:{} }; vm.createContext(context);
  for(const name of ['copy-nl.js','copy-li.js','i18n.js']) vm.runInContext(fs.readFileSync(path.join(site,name),'utf8'),context);
  const html = fs.readFileSync(path.join(site,'index.html'),'utf8');
  const keys = [...new Set([...html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)].map(m=>m[1]))];
  return { dialects:context.window.DIALEK_I18N.dialects, keys };
}
async function audit() {
  const { dialects, keys } = loadCopy();
  const rows = [], unique = new Map();
  for(const dialect of dialects.filter(d=>d.code!=='nl')) {
    const words = new Map();
    for(const key of keys) for(const word of tokens(dialect.strings[key] || '')) {
      if (!words.has(word)) words.set(word, new Set()); words.get(word).add(key);
    }
    for(const [word,usedIn] of words) {
      const row={ dialect:dialect.code, word, keys:[...usedIn], status:'buiten D’n Dictionair', references:[] };
      rows.push(row);
      if(mapping[dialect.code]) { if(!unique.has(word)) unique.set(word,[]); unique.get(word).push(row); }
    }
  }
  let done = 0;
  for(const [word,instances] of unique) {
    const result=await lookup(word);
    for(const row of instances) {
      const town=mapping[row.dialect];
      let local=result.data.filter(item=>item.dialect===town && normalize(item.spelling)===word);
      // Search is prefix-based and returns at most 20 results. Narrow a full page
      // before treating absence as a non-match. Do not conflate another dialect.
      let specific=result;
      if(!local.length && result.data.length>=20) {
        specific=await lookup(word,'LI-NL',town);
        local=specific.data.filter(item=>item.dialect===town && normalize(item.spelling)===word);
      }
      row.status=local.length ? 'exact lemma; context niet goedgekeurd' : 'geen exact lemma; handmatig beoordelen';
      row.references=local.map(item=>({ id:item.id, spelling:item.spelling, partOfSpeech:item.fullPartOfSpeech?.dutch, url:'https://www.limburgs.net/dictionair/LI-NL/'+item.id+'/'+encodeURIComponent(item.spelling) }));
      row.lookup=specific.url;
    }
    if(++done%100===0) console.log('Dictionary terms checked:',done,'/',unique.size);
  }
  const dir=path.join(root,'docs','dialectcontrole'); fs.mkdirSync(dir,{recursive:true});
  const summary={checkedAt:new Date().toISOString(), copySha256:crypto.createHash('sha256').update(JSON.stringify({dialects,keys})).digest('hex'), uniqueQueries:unique.size, scope:'Visible translated copy and accessibility labels, unique words per dialect, repeated occurrences linked by copy key. Exact headword matching is not grammatical verification. Proper names and loanwords are included; numbers are excluded.',dialects:{}};
  for(const d of dialects.filter(d=>d.code!=='nl')) {
    const list=rows.filter(r=>r.dialect===d.code);
    summary.dialects[d.code]={words:list.length, exact:list.filter(r=>r.references.length).length, remaining:list.filter(r=>!r.references.length).length, dictionary:!!mapping[d.code]};
  }
  const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
  const header=['dialect','woord','tekstvelden','status','woordsoort (zoekresultaat, niet volledig)','bronnen'];
  const data=rows.sort((a,b)=>(a.dialect+' '+a.word).localeCompare(b.dialect+' '+b.word,'nl')).map(r=>[r.dialect,r.word,r.keys.join(' | '),r.status,r.references.map(x=>x.partOfSpeech).join(' | '),r.references.map(x=>x.url).join(' | ')||r.lookup||'']);
  fs.writeFileSync(path.join(dir,'woordcontrole.csv'),'\uFEFF'+[header,...data].map(row=>row.map(csv).join(',')).join('\n')+'\n');
  fs.writeFileSync(path.join(dir,'samenvatting.json'),JSON.stringify(summary,null,2)+'\n');
  console.log(JSON.stringify(summary,null,2));
}
if(require.main===module) {
  if(process.argv[2]==='lookup') {
    (async()=>{for(const word of process.argv.slice(3)){ const r=await lookup(word,'NL-LI'); console.log(word,JSON.stringify(r.data.map(x=>({id:x.id,word:x.spelling,town:x.dialect,meaning:x.target,pos:x.fullPartOfSpeech.dutch}))))}})().catch(e=>{console.error(e);process.exitCode=1;});
  } else audit().catch(e=>{console.error(e);process.exitCode=1;});
}
module.exports={lookup,loadCopy,tokens};
