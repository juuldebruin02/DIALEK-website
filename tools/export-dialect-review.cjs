// Export current displayed copy with stable keys, without modifying the website.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),site=path.join(root,'Dialek-master');
const c={window:{}};vm.createContext(c);
for(const name of ['copy-nl.js','copy-li.js','i18n.js'])vm.runInContext(fs.readFileSync(path.join(site,name),'utf8'),c);
const html=fs.readFileSync(path.join(site,'index.html'),'utf8');
const keys=[...new Set([...html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)].map(m=>m[1]))];
const out=['# DIALEK — teksten voor dialectlezers','',
  'Werkversie beta 4. De Nederlandse tekst is inhoudelijk leidend. Alle dialectversies zijn nog voor eindredactie; zie README.md voor bronnen en onzekerheden.',
  '', 'Laat de tekstcodes staan. Geef per correctie de volledige vervangende tekst, dialect, controleur en datum. Namen en lied-/albumtitels niet vertalen.', ''];
for(const d of c.window.DIALEK_I18N.dialects){
 out.push('## '+d.name+' · '+d.code,'','Controleur: …  |  Datum: …  |  Status: nog niet goedgekeurd','');
 for(const key of keys){if(!d.strings[key])throw Error('Missing '+d.code+'/'+key);out.push('### '+d.code+'.'+key,'',d.strings[key],'');}
}
const dir=path.join(root,'docs','dialectcontrole');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'teksten-voor-nalezers.md'),out.join('\n'));
console.log('Exported',keys.length,'fields ×',c.window.DIALEK_I18N.dialects.length,'languages.');
