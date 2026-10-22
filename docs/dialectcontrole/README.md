# Dialectcontrole — website beta 4

Controleperiode: 16–22 oktober 2026. Nederlandse copy is de inhoudelijke bron.

## Conclusie en grenzen

Dit is een bronondersteunde correctieronde, **geen taalkundige eindgoedkeuring**. Geen van de tien dialectversies kan als gegarandeerd foutloos worden aangemerkt. Vooral in lange biografieën blijven lokale woordkeus, lidwoorden, verbuiging, aanspreekvorm en zinsbouw onzeker. De waarschuwing bij het taalmenu en in de footer blijft daarom staan.

Voor Roermond, Maastricht, Sittard, Venlo en Valkenburg is ieder uniek woord uit de vertaalde tekstvelden die de website werkelijk gebruikt opgezocht in D’n Dictionair. Herhaalde woorden zijn gekoppeld aan alle betreffende tekstcodes. De overige vijf dialecten zijn onderzocht met lokale bronnen; daarvoor is **geen volledige woord-voor-woorddekking** bereikt. Ook voor de eerste vijf is een complete grammaticale eindcontrole niet afgerond.

Een exacte woordenboektreffer betekent niet automatisch dat het woord in deze zin correct is. `klink` is bijvoorbeeld ook een zelfstandig naamwoord; voor de slogan is juist de vervoeging van `klinke` relevant. Geen treffer betekent evenmin automatisch een fout: vervoegingen, samenstellingen, internationale termen en eigennamen kunnen ontbreken.

## Bestanden voor controleurs

- `teksten-voor-nalezers.md`: de Nederlandse tekst en alle tien werkvertalingen, per vaste tekstcode. De nieuwe biografieën staan onder `troubadoursLong` en `meltonLong`.
- `woordcontrole.csv`: iedere unieke woordvorm per dialect, de tekstcodes waarin deze voorkomt, het resultaat en de bronlink. Dit is naslagbewijs, geen goedkeuringslijst.
- `samenvatting.json`: tellingen, controlemoment en vingerafdruk van de gecontroleerde teksten. Tellingen zijn **geen percentages taalkundige juistheid**.

Een controleur kan per tekstcode een complete verbeterde tekst teruggeven. Vermeld dialect, naam/initialen van de controleur en datum. De codes graag behouden; daarmee kunnen wijzigingen exact terug naar de website zonder de vormgeving te veranderen.

## Dekking per dialect

| Dialect | Gevonden primaire bronnen | Wat is gecontroleerd | Wat blijft nodig |
| --- | --- | --- | --- |
| Remunjs | D’n Dictionair, Spelling 2003 Remunjs, Veldeke Remunj | Alle unieke woorden opgezocht; gerichte controles van betekenis en vervoegingen, o.a. `klink`, `veult`, `kint`, `leut`, `bringk`, `sjpraeke` | Volledige contextcontrole, vooral `matchLong`, artiestenbio’s en `infoLead` |
| Mestreechs | D’n Dictionair, Mestreechter Taol, lokale spellinggids | Alle unieke woorden opgezocht; lidwoorden, aanspreekvorm `geer`, vergelijkende trap en enkele onregelmatige werkwoorden | Alle lidwoorden/adjectieven en consistent gebruik van beleefdheidsvorm door een lokale lezer |
| Zitterds | D’n Dictionair, Geheugensteuntje Zitterds | Alle unieke woorden opgezocht; o.a. `neit`, `awd`, `awwer`, `kènt`, `brèngk`, `liet` | Woordgeslacht, verbuiging en lange samengestelde zinnen |
| Venloos | D’n Dictionair, Spelling 2003 Venloos | Alle unieke woorden opgezocht; o.a. `gen`, `dich`, `nie`, `flaaj`, `luuet` | Aanspreekvormen, verleden tijden en accenttekens in de langere teksten |
| Valkebergs | D’n Dictionair, Spelling 2003 Valkebergs | Alle unieke woorden opgezocht; o.a. `mèt`, `sjoan`, `deensdeg`, `modersjpraok`, `lièt` | Lokale uitspraakvarianten en hun consequenties voor de gehele zin |
| Kirchröadsj | D’r nuie Kirchröadsjer Dieksiejoneer | Gerichte lexicale controles, o.a. `moeziek`, `moddersjproach`, `heem`, `veule` | Veel zinsbouw en vervoeging onzeker; niet afleiden uit Roermonds of Duits |
| Wieërts | Veldeke Wieërt: spelling en grammatica 2023 | Gerichte spelling- en vervoegingscontrole: o.a. `bringtj`, `wiltj`, `és`, `hes`, `bés`, `weurtj` | Keuze van lokale variant en consequente vervoeging in alle zinnen; de grammatica onderscheidt ook varianten |
| Echs | Piet Aben: Spelling 2003 van ’t Echs | Gerichte correcties zoals `väör`, `huuere`, `nuuedig`, `häökske`, `klinktj` | Geen volledig bruikbaar online woordenboek plus grammatica gevonden voor deze hele tekst; veel onzekerheid |
| Heëlesj | Gemeente Heerlen, Veldeke Kring Heerlen | Plaatselijke voorbeelden en `heem`; dialectnaam gecontroleerd | Geen volledige actuele online spelling-/grammaticadekking bereikt; veel overgenomen formuleringen moeten lokaal worden herschreven |
| Venrods | Veldeke Venray: alfabetische woordenlijst | Gerichte woordcontrole, o.a. `meziek`, `moj`, `meugelek` | De online lijst sluit vervoegingen, meervouden en verkleinwoorden expliciet uit; aanspreekvorm en werkwoordsvormen zijn niet goedgekeurd |

## Belangrijke correcties en bewijs

Voorbeelden uit de controle; geen uitputtende lijst van alle wijzigingen:

- Muziek: `meziek` in de vijf Dictionair-varianten; Kerkraads `moeziek`. Zie bijvoorbeeld [Remunjs meziek](https://www.limburgs.net/dictionair/LI-NL/62857/meziek) en [Kirchröadsj, letter M](https://dieksiejoneer-kirchroa.nl/m-nederlands-kirchroadsj/).
- Februari: `fibberwarie` in Roermond, Maastricht en Sittard; de vorm is niet zonder meer overgenomen naar andere plaatsen. [Remunjs](https://www.limburgs.net/dictionair/LI-NL/31295/fibberwarie).
- Dezelfde Nederlandse werkwoordsvorm vraagt lokaal verschillende spelling: Roermonds `leut`, Maastrichts/Sittards `liet`, Valkenburgs `lièt`, Venloos `luuet`. Geraadpleegde lemma’s: [Roermond](https://www.limburgs.net/dictionair/LI-NL/56760/laote), [Maastricht](https://www.limburgs.net/dictionair/LI-NL/56759/laote), [Sittard](https://www.limburgs.net/dictionair/LI-NL/56761/laote), [Valkenburg](https://www.limburgs.net/dictionair/LI-NL/56762/laote), [Venlo](https://www.limburgs.net/dictionair/LI-NL/56763/laote).
- Maastrichts `DIALEK wèlt`, niet de uit Roermond overgenomen vorm `wilt`: [wèlle](https://www.limburgs.net/dictionair/LI-NL/111178/w%C3%A8lle). De vergrotende trap van `aajd` is `awwer`: [lokale grammatica](https://www.mestreechtertaol.nl/grammatica/bijvooglek-naomwoord/trappe-vaan-vergelieking).
- Sittards `kènt`, `brèngk` en `geef`: [kènne](https://www.limburgs.net/dictionair/LI-NL/50710/k%C3%A8nne), [brènge](https://www.limburgs.net/dictionair/LI-NL/18855/br%C3%A8nge), [gaeve](https://www.limburgs.net/dictionair/LI-NL/35851/gaeve).
- Weertse vervoegingen zijn gecontroleerd in de tabellen van de lokale grammatica, onder meer pagina 53. De uitgangen zijn niet blind voor alle werkwoorden gelijkgetrokken.
- In de nieuwe Over-tekst ontbraken in enkele werkvertalingen nog carnaval of hiphop. Die inhoud is gelijkgetrokken met de Nederlandse bron; andere Nederlandse teksten zijn niet herschreven.
- Eigennamen, artiestennamen en titels blijven intact, waaronder `Lotte oet Limburg`, `Opgeschaoren Troubadours`, `Van Laer`, `ICH DRUIM DOOR`, `Jóngesdruim`, `Josh Mosa` en `Heart, Home en Mind`.

## Prioriteiten voor menselijke eindredactie

1. `troubadoursLong` en `meltonLong`: nieuw vertaalde tekst. Vooral verleden tijden, de betrekkelijke bijzin, woordgeslacht en de abstracte formulering over reflectie/gevoel verdienen controle. Dit zijn werkvertalingen, ook wanneer woorden apart zijn gevonden.
2. `matchLong`: een consequente aanspreekvorm met bijbehorende persoonsvorm. Let met name op `doe/se/dich`, `geer` en `ge`; zet vormen uit verschillende dialecten niet bij elkaar.
3. `infoTitle` en `infoLead`: idiomatisch “voelt als thuis”, werkwoordsvormen en de zinsconstructie rond opgroeien in een taal.
4. `limboLong`, `riethamerLong`, `basementLong`, `lotteLong`: veel tekst was eerder tussen dialecten gedeeld. Dat maakt de minder goed gedocumenteerde varianten extra verdacht. Een spellingcorrectie alleen lost een onnatuurlijke zin niet op.
5. `kicker`, `programIntro`, `textStageLong` en `networkLong`: onbepaalde lidwoorden en bijvoeglijke naamwoorden moeten bij het plaatselijke woordgeslacht passen.
6. `foodNote` bevat in alle Limburgse keuzes bewust de letterlijk aangeleverde zin: `fritkroam op 't terrein, dus blief veural hange!`. Dit is een vaste redactionele keuze, geen bewijs dat die zin in alle tien dialecten lokaal identiek hoort te zijn. De Nederlandse versie is afzonderlijk opgenomen.

## Bronnen en werkwijze

**Voorkeursvolgorde:** een bron voor exact de bedoelde plaats en betekenis; daarna de lokale spelling/grammatica; daarna algemenere Limburgse informatie als achtergrond. Historische voorbeelden zijn niet automatisch hedendaagse spellingnormen. Ook in D’n Dictionair kunnen voorbeeldzinnen uit andere plaatsen staan: die zijn niet als plaatselijk bewijs gebruikt.

- [D’n Dictionair](https://www.limburgs.net/) van de [Limbörgse Academie](https://www.limburgs.org/nl/): zoekingangen en, waar nodig, vervoegingstabellen en betekenisonderscheid. Het controlescript gebruikt dezelfde openbare zoekgegevens, zonder account.
- [Hoes veur ’t Limburgs — spelling en hulpmiddelen](https://hoesveurtlimburgs.nl/limburgse-taal/spelling-en-hulpmiddelen): toegang tot plaatselijke spellingregels, niet één uniforme vertaling voor heel Limburg.
- [Remunjs — Pierre Bakkes](https://bestanden.hoesveurtlimburgs.nl/uploads/Downloads/Spelling/Spelling-2003-Remunjs.pdf), [Mestreechs — Joop Kurris](https://bestanden.hoesveurtlimburgs.nl/uploads/Downloads/Spelling/Spelling-2003-Mestreechs.pdf), [Zitterds](https://bestanden.hoesveurtlimburgs.nl/uploads/Downloads/Spelling/Geheugensteuntje-Zitterds.pdf), [Venloos — Frens Bakker](https://bestanden.hoesveurtlimburgs.nl/uploads/Downloads/Spelling/Spelling-2003-Venloos.pdf), [Valkebergs — Jan Notten](https://bestanden.hoesveurtlimburgs.nl/uploads/Downloads/Spelling/Spelling-2003-Valkebergs.pdf), [Echs — Piet Aben](https://bestanden.hoesveurtlimburgs.nl/uploads/Downloads/Spelling/Spelling-2003-Echs.pdf).
- [Mestreechter Taol — grammatica](https://www.mestreechtertaol.nl/grammatica/werkwoord/vervoging), [onbepaalde lidwoorden](https://www.mestreechtertaol.nl/grammatica/lidwoord/oonbepaold) en [onregelmatige werkwoorden](https://www.mestreechtertaol.nl/grammatica/werkwoord/oonregelmaoteg).
- [Veldeke Wieërt — grammatica 2023](https://veldekewieert.nl/wp-content/uploads/2023/08/VELDEKE-Grammatica-20230831.pdf) en [spelling 2023](https://veldekewieert.nl/wp-content/uploads/2023/07/63770-VELDEKE-spelling-2023.pdf), door Jan Feijen. Relevante tabellen zijn visueel gecontroleerd, niet alleen als los uitgelezen woorden.
- [Kirchröadsjer Dieksiejoneer](https://dieksiejoneer-kirchroa.nl/woordenlijst-nederlands-kirchroadsj-2/): lokale woordbetekenissen; de gevonden woorden zijn geen volledige grammaticale goedkeuring van de bios.
- [Veldeke Venray — woordenlijst](https://veldekevenray.nl/woorden/) en [letter M](https://veldekevenray.nl/wp-content/uploads/2022/03/letter_m.pdf): beperkte woordenlijst, expliciet zonder vervoegingen en meervouden.
- [Gemeente Heerlen — Heëlesj plat](https://www.heerlen.nl/heerlens-plat) en [Veldeke Heerlen](https://veldekeheerlen.nl/). Het oudere Heerlense woordenboek is niet zonder meer gelijk aan een actuele spellingcontrole.
- [Overzicht Limburgse dialectwoordenboeken 2024](https://bestanden.hoesveurtlimburgs.nl/uploads/Downloads/Spelling/Overzicht-Limburgse-dialectwoordenboeken-2024-2.pdf): helpt fysieke naslagwerken voor de ontbrekende lokale dekking te vinden.
- [Elektronisch Woordenboek van de Limburgse Dialecten](https://e-wld.nl/): nuttig voor regionale woordattestatie, maar niet gebruikt als automatische norm voor moderne festivalcopy of grammatica.

De geautomatiseerde controle normaliseert hoofdletters en apostrofvormen, maar verwijdert geen betekenisvolle accenten. Een zoekresultaat uit een andere plaats telt niet als treffer. Bij een volle resultatenpagina wordt de zoekopdracht per plaats vernauwd. Bij netwerkfouten stopt het script; ontbrekende antwoorden worden niet als “woord bestaat niet” aangemerkt. De lijst bewaart links, geen gekopieerde woordenboekdefinities.

Herhalen: voer `tools/audit-dialects.cjs` uit met een tijdelijke map in `DIALEK_DICTIONARY_CACHE`. Na tekstwijzigingen ook `tools/export-dialect-review.cjs` opnieuw uitvoeren. De website gebruikt de onderzoeksbestanden niet tijdens het laden.
