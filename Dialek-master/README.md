# DIALEK. 2027

One-page festivalsite voor DIALEK op 27 februari 2027 in de ECI Cultuurfabriek in Roermond.

## Lokaal bekijken

De site bestaat uit statische HTML, CSS en JavaScript. Start vanuit deze map een lokale server:

```sh
python3 -m http.server 4173
```

Open daarna `http://localhost:4173`.

## Inhoud en vertalingen

Alle wisselende dialectteksten staan centraal in `i18n.js`. `BASE` bevat de Remunjse werkversie; iedere dialectvariant overschrijft alleen de teksten die afwijken. De huidige vertalingen zijn voorlopige redactieteksten en worden nog gecontroleerd door dialectsprekers.

Bij het aanleveren van definitieve vertalingen zijn per wijziging nodig:

- de sleutel uit `i18n.js`;
- de huidige Nederlandse of Remunjse brontekst;
- de goedgekeurde dialecttekst;
- naam of initialen van de controleur.

## Nog te vervangen placeholders

- directe ticketlink van de DIALEK-pagina bij ECI;
- Google Form-link voor de DIALEK Taalmatch;
- exacte tijdsloten van het dagprogramma en de acts;
- geverifieerde Spotify-profielen;
- definitieve artiestenbiografieën;
- definitieve interactieve taalactiviteiten en partnerstatussen;
- gecontroleerde teksten voor alle dialectvarianten.

## Belangrijkste bestanden

- `index.html` — pagina-inhoud en programmastructuur;
- `styles.css` — visuele stijl, responsive layout en animaties;
- `script.js` — dialectwisseling, uitklapkaarten, reveals en parallax;
- `i18n.js` — centrale dialectteksten;
- `assets/` — vlaai- en wolkenassets.
