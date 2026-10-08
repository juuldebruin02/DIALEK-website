# DIALEK. 2027

One-page festivalsite voor DIALEK op 27 februari 2027 in de ECI Cultuurfabriek in Roermond.

## Lokaal bekijken

De site bestaat uit statische HTML, CSS en JavaScript. Start vanuit deze map een lokale server:

```sh
python3 -m http.server 4173
```

Open daarna `http://localhost:4173`.

## Inhoud en vertalingen

Nederlands is de standaardtaal. De Nederlandse bronteksten staan met vaste sleutels in `copy-nl.js`; `copy-li.js` bevat de gedeelde Limburgse werkvertaling en de streekgebonden aanvullingen. `i18n.js` koppelt deze aan de elf taalkeuzes. De dialectteksten zijn nog niet goedgekeurd door lokale dialectsprekers. De website vermeldt die status bij de taalkeuze en in de footer.

Een taalkeuze wordt voor beta 2 apart onthouden. Een oude voorkeur uit beta 1 verhindert daardoor niet dat de nieuwe versie eerst in het Nederlands opent.

Bij het aanleveren van definitieve vertalingen zijn per wijziging nodig:

- de vaste tekstsleutel uit `copy-nl.js` / `copy-li.js`;
- de huidige Nederlandse of Remunjse brontekst;
- de goedgekeurde dialecttekst;
- naam of initialen van de controleur.

## Nog te vervangen placeholders

- directe ticketlink van de DIALEK-pagina bij ECI;
- naam, bio, foto en Spotify-profiel van de TBA-act;
- definitieve invulling van de interactieve taalactiviteiten;
- gecontroleerde teksten voor alle dialectvarianten.

De aanmeldlink en vier Spotify-profielen zijn overgenomen uit de aangeleverde bronnen. Het programma volgt Draaiboek DIALEK 2027, versie 0.1. Technische wissels en presentatiemomenten worden niet apart getoond. Het draaiboek noemt technische bevestiging van de wisseltijden nog als open punt; de website toont op verzoek de huidige publieksplanning.

## Versies en behoud van beta 1

- `website-beta-1`: vaste Git-tag op `bd91edd`, vóór deze update.
- `codex/website-beta-2`: aparte werkbranch met de nieuwe versie.
- `website-beta-2`: controlepunt van de afgeronde eerste beta 2-versie.
- `main` blijft ongewijzigd totdat Juul de preview heeft gecontroleerd en akkoord geeft voor samenvoegen en pushen. De beta-tags zijn vooralsnog lokaal.

Beta 1 is onafhankelijk van beta 2 terug te halen via de tag. Om beta 1 te bekijken zonder de huidige bestanden te wijzigen, kan een apart archief of een aparte checkout van die tag gemaakt worden. Gebruik geen harde reset op de werkmap.

## Beta 2: inhoudelijke keuzes

1. Eerst de Nederlandse copy geplaatst, als afzonderlijk controlepunt in de geschiedenis.
2. Expliciete feedback gaat vóór oudere tekst: ticketprijs €6, daginloop 13:00, avondinloop 19:30. De laatste act speelt 22:20–22:45.
3. Tekstverslaafd: 13:45–14:30 en 15:45–16:30. Taalmatch: 14:30–15:45. Taalactiviteiten en netwerken tonen op verzoek alleen de begin- en eindtijd: 13:00–18:00. De toelichting over pauzes tijdens Tekstverslaafd blijft staan. De voorlopige statuslabels bij alle vier de dagonderdelen zijn verwijderd; de Taalmatch-aanmeldknop blijft beschikbaar.
4. Tekst uit het Word-document is op de bijbehorende sleutels gezet. Alleen duidelijke schrijf-/spatiefouten zijn licht gecorrigeerd; de losse opmerkingen in het document zijn geen aanvullende wijzigingsopdrachten. Lottes nieuwe biografie staat onder de bestaande presentatorvermelding, uitklapbaar en zonder fictief tijdslot.
5. Foto's zijn afgeleid van de vier aangeleverde persfoto's. De oorspronkelijke bestanden in `Pressfoto's` zijn niet gewijzigd. De webversies zijn niet kunstmatig verscherpt of opgeschaald.
6. Partners: Tekstverslaafd, Lotte Zeptner en Ons Limburgs Museum. Lotte krijgt op expliciet verzoek geen logo. Bronvermelding van de andere logo's staat bij de assets.
7. De bestaande kleurstelling, wolken, vlaai met touw en parallax zijn behouden. Alleen de gevraagde onderdelen en noodzakelijke responsive aanpassingen zijn gewijzigd.

## Controle

De browsercontrole in `../tools/check-beta2.cjs` test de Nederlandse tekstkoppeling, alle tijdslots, links, fotoafmetingen, toetsenbordbediening, het onthouden van de taal en de ongewijzigde lucht-/vlaaicode. Layoutcontrole: 320, 375, 390, 768, 900, 1024, 1280, 1440 en 1512 pixels breed, telkens alle elf taalkeuzes. Deze technische controle is geen taalkundige goedkeuring van de dialecten.

De test gebruikt Node.js met Playwright. Optioneel kunnen `DIALEK_PLAYWRIGHT_PATH` en `DIALEK_BROWSER_PATH` naar een bestaande installatie verwijzen. Screenshots worden in een tijdelijke map bewaard. Er worden geen formulieren ingestuurd en er wordt niets gepubliceerd.

## Belangrijkste bestanden

- `index.html` — pagina-inhoud en programmastructuur;
- `styles.css` — visuele stijl, responsive layout en animaties;
- `script.js` — dialectwisseling, uitklapkaarten, reveals en parallax;
- `copy-nl.js` — Nederlandse redactionele bron;
- `copy-li.js` — voorlopige regionale vertalingen;
- `i18n.js` — taalkeuzes en samenstellen van de teksten;
- `assets/` — vlaai, wolken, persfoto-webversies en partnerlogo's.
