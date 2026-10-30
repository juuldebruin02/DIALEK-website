# DIALEK. 2027

One-page festivalsite voor DIALEK op 27 februari 2027 in de ECI Cultuurfabriek in Roermond.

## Lokaal bekijken

De site bestaat uit statische HTML, CSS en JavaScript. Start vanuit deze map een lokale server:

```sh
python3 -m http.server 4173
```

Open daarna `http://localhost:4173`.

## Inhoud en vertalingen

Remunjs is vanaf beta 6 de starttaal bij iedere nieuwe paginaweergave, ook bij verversen en ongeacht een eerder opgeslagen taalkeuze. Nederlands blijft beschikbaar bovenaan het menu en is de inhoudelijke bron. De Nederlandse bronteksten staan met vaste sleutels in `copy-nl.js`; `copy-li.js` bevat de oudere werkvertalingen. `copy-reviewed.js` bevat de door Juul als goedgekeurd aangeleverde teksten voor Remunjs, Heëlesj, Zittesj, Mééls, Echts en sinds beta 8 Wierts en overschrijft uitsluitend die zes varianten. `i18n.js` koppelt de bestanden aan de tien taalkeuzes. De overige dialecten zijn niet opnieuw aangepast of goedgekeurd. Bronnen, eerdere twijfelpunten en de importverantwoording staan in `../docs/dialectcontrole/`.

Sinds beta 6 wordt een taalkeuze alleen voor de huidige pagina gebruikt. Oude voorkeuren uit beta 3–5 worden niet gelezen of opnieuw opgeslagen.

Bij het aanleveren van definitieve vertalingen zijn per wijziging nodig:

- de vaste tekstsleutel uit `copy-nl.js` / `copy-li.js`;
- de huidige Nederlandse of Remunjse brontekst;
- de goedgekeurde dialecttekst;
- naam of initialen van de controleur.

## Nog te vervangen placeholders

- definitieve invulling van de interactieve taalactiviteiten;
- gecontroleerde teksten voor de overige dialectvarianten.

De aanmeldlink en bestaande Spotify-profielen zijn overgenomen uit de aangeleverde bronnen. Het Spotify-profiel van Opgeschaoren Troubadours is gecontroleerd aan de hand van Spotify zelf. Het programma volgt het in oktober 2026 aangeleverde Programmaoverzicht DIALEK 2027.pdf. Technische wissels en presentatiemomenten worden niet apart getoond.

## Versies en herstelpunten

- `website-beta-1`: vaste Git-tag op `bd91edd`, vóór deze update.
- `website-beta-2`: controlepunt van de afgeronde eerste beta 2-versie.
- `website-beta-2-final`: `217c51b`, de definitieve beta 2 vóór de wijzigingen van oktober.
- `website-beta-3`: `7bf0064`, de website zoals die er vóór de feedback van 22 oktober 2026 uitzag.
- `website-beta-4`: `f29f581`, de afgeronde artiesten-, partner- en dialectupdate van 22 oktober 2026; ook bewaard op `codex/website-beta-4`.
- `website-beta-5`: versie van 24 oktober 2026 met uitsluitend de definitieve ticketbestemming als websitewijziging: `https://ecicultuurfabriek.nl/voorstelling/dialek/`. Beta 4 blijft het herstelpunt vóór deze aanpassing.
- `website-beta-5-before-translations`: `ac48272`, inclusief Luuks GitHub-update van 26 oktober 2026. Dit is de basis en het herstelpunt vóór beta 6.
- `website-beta-6`: goedgekeurde documentteksten, Mééls in plaats van Valkenbergs, Remunjs bij iedere paginaweergave en de Nederlandse festivalregel met “in het Limburgs”.
- `website-beta-7`: bouwt voort op beta 6 (`264216d`); goedgekeurde Echtse tekst, Wieërts en Venrods uit het menu en transparante achtergronden bij Veldeke Remunj/Bibliorura. Beta 6 blijft het herstelpunt; de aanvullende lokale kopie heet `website-beta-6-before-beta-7.zip`.
- `website-beta-7-1`: aanvulling op beta 7 met uitsluitend de door Juul op 29 oktober aangeleverde Spotify-link voor Melton; de knop gebruikt dezelfde stijl en vertalingen als de andere artiesten. Beta 7 (`e596653`) blijft het herstelpunt vóór deze aanvulling.
- `website-beta-8`: goedgekeurde Wiertse documenttekst en Wierts terug in het taalmenu. Beta 7.1 (`8a97f1a`) blijft het herstelpunt; de aanvullende lokale kopie heet `website-beta-7-1-before-beta-8.zip`.
- Uitpakbare lokale kopieën staan naast de projectmap in `../Versies/`. Deze grote ZIP-bestanden gaan niet mee naar GitHub. De versiegeschiedenis zelf blijft in Git bewaard.

Beta 1 is onafhankelijk van beta 2 terug te halen via de tag. Om beta 1 te bekijken zonder de huidige bestanden te wijzigen, kan een apart archief of een aparte checkout van die tag gemaakt worden. Gebruik geen harde reset op de werkmap.

## Beta 8: Wierts terug met goedgekeurde tekst

Op 30 oktober 2026 zijn alle 61 ingevulde paarse blokken uit het aangeleverde Wiertse Google Doc letterlijk overgenomen, gekoppeld aan 62 websitevelden. De zes resterende velden (D062–D067) bevatten nog invultekst; daar blijven de bestaande Nederlandse schermlezerlabels en metadata staan. Er waren geen openstaande suggesties. Zie `../docs/dialectcontrole/beta-8-import.json` voor de bronversie, veldkoppeling en controlevingerafdruk.

De keuze heet `Wierts · Weert`, conform de documentnaam, en gebruikt de bestaande interne code `wieerts`. De negen bestaande taalkeuzes en teksten blijven exact gelijk, evenals de vormgeving, tijden, foto's, links en interacties. Remunjs blijft de starttaal. Venrods blijft uit het menu. De in de bron aanwezige werkvertaling-meldingen zijn eveneens letterlijk behouden.

## Beta 7: gerichte update van 29 oktober 2026

Uit het aangeleverde Echtse Google Doc zijn 64 ingevulde paarse blokken exact overgenomen, gekoppeld aan 65 websitevelden. D065–D067 bevatten nog invultekst en zijn daarom niet gepubliceerd; de bestaande Nederlandse metadata blijft daar staan. Er waren geen openstaande suggesties. Zie `../docs/dialectcontrole/beta-7-import.json` voor de bronversie, tekstkoppeling en controlevingerafdruk.

Wieërts (Weert) en Venrods (Venray) zijn uitsluitend uit het taalmenu verwijderd. Hun historische bronteksten blijven beschikbaar. Nederlands, de vier eerder goedgekeurde dialecten, de overige taalkeuzes, het programma, de foto's en het gedrag van de site zijn niet gewijzigd.

Voor Veldeke Remunj en Bibliorura vervangt een uitsluitend op deze twee afbeeldingen toegepast SVG-filter de eerdere mengmodus: het papier wordt echt transparant en de inkt wit. De oorspronkelijke logobestanden, afmetingen en positie blijven behouden. Er zijn geen logo's opnieuw getekend.

## Beta 6: goedgekeurde documentteksten

De vier Google Docs zijn op 27 oktober 2026 via de native documentstructuur gelezen, inclusief tekstkleur en suggestiestatus. Per document zijn alle 67 vertaalblokken overgenomen (68 websitevelden, omdat één tekst twee plekken vult). Er zijn geen openstaande suggesties aangetroffen. Accenten, interpunctie, interne spaties en alinea-einden zijn niet taalkundig gecorrigeerd. De vaste documentlabels horen niet bij de websitetekst.

Mééls · Meijel vervangt Valkebergs · Valkenburg. De menunaam voor Sittard is Zittesj, zoals in de aangeleverde bron; de bestaande interne code blijft behouden. Alleen deze vier dialecten gebruiken nu ook hun aangeleverde schermlezerlabels en metadata. De bron bevat nog werkvertaling-meldingen; die zijn op verzoek om exacte overname eveneens behouden. Nederlands is uitsluitend gewijzigd bij `kicker`: “Een eendaags festival in het Limburgs”.

Bronlinks, tekstcodes, bronversies en controlevingerafdrukken staan in `../docs/dialectcontrole/beta-6-import.json`. De oorspronkelijke Docs zijn niet aangepast. De oudere beta 4-onderzoeksexport is historisch en wordt niet als huidige goedgekeurde tekst gebruikt. Vormgeving, foto's, links en tijden blijven gelijk aan `ac48272`.

## Beta 5: ticketlink en hostingmap

De knop Tickets opent de aangeleverde DIALEK-pagina bij ECI in een nieuw tabblad. Teksten, vormgeving, taalvarianten, programma en overige links zijn ongewijzigd ten opzichte van beta 4.

Voor hosting bevat `Dialek-master/` de volledige statische website, met `index.html` direct in die map. Er is geen bouwstap of installatie van afhankelijkheden nodig. Gebruik deze map als te publiceren map; documentatie, controlescripts en originele persfoto’s buiten deze map zijn geen onderdeel van de website. Hosting en domeininstellingen zijn met deze versie niet gewijzigd.

## Beta 4: afgebakende wijzigingen

- De vijf kleine partnerlogo’s worden wit weergegeven. De witte achtergrond van Veldeke Remunj/Bibliorura wordt via de weergave weggeblend; bronbestanden blijven intact.
- De frietkraamtekst staat klein boven de bestaande scheidingslijn tussen dag- en avondprogramma. De lijn en het gele ornament blijven staan.
- Opgeschaoren Troubadours vervangt Sophie Albert; Melton vervangt TBA. Speeltijden blijven respectievelijk 20:00–20:30 en 20:40–21:05. Beide krijgen de aangeleverde bio, een korte tagline en de juiste persfoto.
- Nieuwe webfoto’s zijn alleen verkleind en gecomprimeerd, niet geretoucheerd. De originelen blijven in `../Pressfoto's/`.
- Nederlandse teksten buiten deze nieuwe onderdelen blijven gelijk. Gerichte dialectcorrecties en de controlebeperkingen staan in het dialectrapport. De rest van de vormgeving, interacties, wolken, vlaai en tijden blijft gelijk aan beta 3.

## Actuele tijden sinds beta 3

Inloop dagprogramma 14:30; Tekstverslaafd 15:00–15:45 en 16:45–17:30; Taalmatch 15:45–16:45; interactieve taalactiviteiten en netwerken 15:45–18:30, met de pauze voor Tekstverslaafd in de toelichting. Avondinloop 19:30; eerste act 20:00–20:30; tweede act 20:40–21:05; pauze 21:05–21:20; In Limbo 21:20–21:50; Riethamer Rekords 22:00–22:25; The Basement Collective 22:35–23:10.

## Beta 2: historische inhoudelijke keuzes (tijden inmiddels vervangen)

1. Eerst de Nederlandse copy geplaatst, als afzonderlijk controlepunt in de geschiedenis.
2. Expliciete feedback gaat vóór oudere tekst: ticketprijs €6, daginloop 13:00, avondinloop 19:30. De laatste act speelt 22:20–22:45.
3. Tekstverslaafd: 13:45–14:30 en 15:45–16:30. Taalmatch: 14:30–15:45. Taalactiviteiten en netwerken tonen op verzoek alleen de begin- en eindtijd: 13:00–18:00. De toelichting over pauzes tijdens Tekstverslaafd blijft staan. De voorlopige statuslabels bij alle vier de dagonderdelen zijn verwijderd; de Taalmatch-aanmeldknop blijft beschikbaar.
4. Tekst uit het Word-document is op de bijbehorende sleutels gezet. Alleen duidelijke schrijf-/spatiefouten zijn licht gecorrigeerd; de losse opmerkingen in het document zijn geen aanvullende wijzigingsopdrachten. Lottes nieuwe biografie staat onder de bestaande presentatorvermelding, uitklapbaar en zonder fictief tijdslot.
5. Foto's zijn afgeleid van de vier aangeleverde persfoto's. De oorspronkelijke bestanden in `Pressfoto's` zijn niet gewijzigd. De webversies zijn niet kunstmatig verscherpt of opgeschaald.
6. Partners: Tekstverslaafd, Lotte Zeptner en Ons Limburgs Museum. Lotte krijgt op expliciet verzoek geen logo. Bronvermelding van de andere logo's staat bij de assets.
7. De bestaande kleurstelling, wolken, vlaai met touw en parallax zijn behouden. Alleen de gevraagde onderdelen en noodzakelijke responsive aanpassingen zijn gewijzigd.

## Controle

De actuele browsercontrole in `../tools/check-beta8.cjs` test de exacte goedgekeurde tekstlaag, behoud van de negen bestaande taalkeuzes en Nederlandse tekst, alle tijdslots, links, vijf fotoafmetingen, toetsenbordbediening, Remunjs na opnieuw laden en de volledig ongewijzigde stijlen en interacties ten opzichte van `8a97f1a`. Ook HTML blijft exact gelijk, afgezien van de twee scriptversies voor cacheverversing. Layoutcontrole: 320, 375, 390, 768, 900, 1024, 1280, 1440 en 1512 pixels breed, telkens alle tien taalkeuzes. De twee logo's worden bovendien op transparante randen en witte inkt gecontroleerd. Deze technische controle is geen eigen taalkundige goedkeuring. De oudere tests blijven bewaard voor hun historische versies.

De test gebruikt Node.js met Playwright. Optioneel kunnen `DIALEK_PLAYWRIGHT_PATH` en `DIALEK_BROWSER_PATH` naar een bestaande installatie verwijzen. Screenshots worden in een tijdelijke map bewaard. Er worden geen formulieren ingestuurd en er wordt niets gepubliceerd.

## Belangrijkste bestanden

- `index.html` — pagina-inhoud en programmastructuur;
- `styles.css` — visuele stijl, responsive layout en animaties;
- `script.js` — dialectwisseling, uitklapkaarten, reveals en parallax;
- `copy-nl.js` — Nederlandse redactionele bron;
- `copy-li.js` — voorlopige regionale vertalingen;
- `copy-reviewed.js` — exact aangeleverde goedgekeurde documentteksten voor zes dialecten;
- `i18n.js` — taalkeuzes en samenstellen van de teksten;
- `assets/` — vlaai, wolken, persfoto-webversies en partnerlogo's.
