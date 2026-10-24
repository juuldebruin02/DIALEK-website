# DIALEK. 2027

One-page festivalsite voor DIALEK op 27 februari 2027 in de ECI Cultuurfabriek in Roermond.

## Lokaal bekijken

De site bestaat uit statische HTML, CSS en JavaScript. Start vanuit deze map een lokale server:

```sh
python3 -m http.server 4173
```

Open daarna `http://localhost:4173`.

## Inhoud en vertalingen

Remunjs is de standaardtaal bij een eerste bezoek. Nederlands blijft beschikbaar bovenaan het menu en is de inhoudelijke bron. De Nederlandse bronteksten staan met vaste sleutels in `copy-nl.js`; `copy-li.js` bevat de Limburgse werkvertalingen en de streekgebonden aanvullingen. `i18n.js` koppelt deze aan de elf taalkeuzes. De dialectteksten zijn nog niet goedgekeurd door lokale dialectsprekers. De website vermeldt die status bij de taalkeuze en in de footer. Bronnen, resterende twijfelpunten en een export voor controleurs staan in `../docs/dialectcontrole/`.

Sinds beta 3 wordt een taalkeuze apart onthouden. Een oudere voorkeur uit beta 2 verhindert daardoor niet dat het eerste bezoek in het Remunjs opent. Beta 4 behoudt een expliciete keuze die de bezoeker daarna heeft gemaakt.

Bij het aanleveren van definitieve vertalingen zijn per wijziging nodig:

- de vaste tekstsleutel uit `copy-nl.js` / `copy-li.js`;
- de huidige Nederlandse of Remunjse brontekst;
- de goedgekeurde dialecttekst;
- naam of initialen van de controleur.

## Nog te vervangen placeholders

- de bevestigde Spotify-link van Melton (niet verwarren met naamgenoten);
- definitieve invulling van de interactieve taalactiviteiten;
- gecontroleerde teksten voor alle dialectvarianten.

De aanmeldlink en bestaande Spotify-profielen zijn overgenomen uit de aangeleverde bronnen. Het Spotify-profiel van Opgeschaoren Troubadours is gecontroleerd aan de hand van Spotify zelf. Het programma volgt het in oktober 2026 aangeleverde Programmaoverzicht DIALEK 2027.pdf. Technische wissels en presentatiemomenten worden niet apart getoond.

## Versies en herstelpunten

- `website-beta-1`: vaste Git-tag op `bd91edd`, vóór deze update.
- `website-beta-2`: controlepunt van de afgeronde eerste beta 2-versie.
- `website-beta-2-final`: `217c51b`, de definitieve beta 2 vóór de wijzigingen van oktober.
- `website-beta-3`: `7bf0064`, de website zoals die er vóór de feedback van 22 oktober 2026 uitzag.
- `website-beta-4`: `f29f581`, de afgeronde artiesten-, partner- en dialectupdate van 22 oktober 2026; ook bewaard op `codex/website-beta-4`.
- `website-beta-5`: versie van 24 oktober 2026 met uitsluitend de definitieve ticketbestemming als websitewijziging: `https://ecicultuurfabriek.nl/voorstelling/dialek/`. Beta 4 blijft het herstelpunt vóór deze aanpassing.
- Uitpakbare lokale kopieën staan naast de projectmap in `../Versies/`. Deze grote ZIP-bestanden gaan niet mee naar GitHub. De versiegeschiedenis zelf blijft in Git bewaard.

Beta 1 is onafhankelijk van beta 2 terug te halen via de tag. Om beta 1 te bekijken zonder de huidige bestanden te wijzigen, kan een apart archief of een aparte checkout van die tag gemaakt worden. Gebruik geen harde reset op de werkmap.

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

De actuele browsercontrole in `../tools/check-beta4.cjs` test de Nederlandse tekstkoppeling, alle tijdslots, links, vijf fotoafmetingen, toetsenbordbediening, het onthouden van de taal, de standaard Remunjse landing en de ongewijzigde lucht-/vlaaicode. Layoutcontrole: 320, 375, 390, 768, 900, 1024, 1280, 1440 en 1512 pixels breed, telkens alle elf taalkeuzes. Deze technische controle is geen taalkundige goedkeuring van de dialecten. De beta 2-test blijft bewaard voor die historische versie.

De test gebruikt Node.js met Playwright. Optioneel kunnen `DIALEK_PLAYWRIGHT_PATH` en `DIALEK_BROWSER_PATH` naar een bestaande installatie verwijzen. Screenshots worden in een tijdelijke map bewaard. Er worden geen formulieren ingestuurd en er wordt niets gepubliceerd.

## Belangrijkste bestanden

- `index.html` — pagina-inhoud en programmastructuur;
- `styles.css` — visuele stijl, responsive layout en animaties;
- `script.js` — dialectwisseling, uitklapkaarten, reveals en parallax;
- `copy-nl.js` — Nederlandse redactionele bron;
- `copy-li.js` — voorlopige regionale vertalingen;
- `i18n.js` — taalkeuzes en samenstellen van de teksten;
- `assets/` — vlaai, wolken, persfoto-webversies en partnerlogo's.
