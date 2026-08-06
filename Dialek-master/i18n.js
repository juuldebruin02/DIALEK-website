(function () {
  "use strict";

  /*
   * DIALEK 2027 translation layer.
   * These regional versions are a best-effort editorial starting point.
   * The website labels them as provisional until a speaker of each dialect
   * has reviewed the matching column in the future translation matrix.
   */
  var BASE = {
    navProgram: "Programma",
    navInfo: "Info",
    navTickets: "Tickets",
    dialectNote: "vertaling in ontwikkeling",

    kicker: "Ein daags festival in 't plat",
    subtitle: "det klink good",
    dayDoorsLabel: "Inloup daagprogramma",
    showDoorsLabel: "Inloup aovendshowcase",
    heroDate: "27 fibberwari 2027",
    heroTown: "Remunj",
    scrollHint: "bekiek 't programma",

    programEyebrow: "27 fibberwari 2027 · ECI Cultuurfabriek",
    programTitle: "'t ganse programma",
    programIntro: "Van tekst en taol tot de nuujste Limburgstalige muziek. Ontdek de ganse festivaldaag.",
    dayKicker: "Cultuurcafé · vanaaf 12:00",
    dayTitle: "Daagprogramma",
    dayNote: "De definitieve tiedsjlotte volge later.",
    nightKicker: "Popzaal · inloup 19:30 · start 20:00",
    nightTitle: "Aovendshowcase",
    nightNote: "Vief acts, twee showblokke, ein nuuj generatie Limburgstalige makers.",
    dayProgramLabel: "Daagprogramma",
    artistLabel: "Artiest",
    timeTba: "tied volg",
    programFollows: "Volledig programma volgt",
    inDevelopment: "In ontwikkeling",
    showBlockOne: "Showblok 01",
    showBlockTwo: "Showblok 02",
    pause: "Pauze",
    presentedBy: "De aovend weurt gepresenteerd door",

    textStageTitle: "Tekstverslaafd-podium",
    textStageShort: "Limburgstalige poëzie, spoken word, liedjes en verhaole.",
    textStageLong: "Drik Heffels en Stichting Tekstverslaafd make plek veur Limburgstalige dichters, spoken word-artieste, singer-songwriters en angere tekstmakers. Ein toegankelijke plek woa nuuj talent werk kan oetprebere en podiumervaring opdeit.",
    matchShort: "Jónk en aad in gesprek euver de taol van toen, noe en later.",
    matchLong: "De Taalmatch koppelt ein jongere Limburgsspreker of geïnteresseerde bezeuker aan ein oudere Limburgsspreker. Mit ein korte gesprekskaart deile ze herinneringe, ervaringen en hun blik op de toekomst van 't Limburgs.",
    matchCta: "Aanmeldlink volgt",
    languageTitle: "Interactieve taalactiviteiten",
    languageShort: "Speul, deel en ontdek wat 't Limburgs veur dich beteikent.",
    languageLong: "Dink aan ein Limburgse taalquiz, ein kaart mit favoriete wäörd en streekvariante, of ein live podcast woa bezeukers bie aansloete. De definitieve vörm weurt same mit potentiële partner Limburgs Museum oetgewirk.",
    networkTitle: "Netwerkevenement",
    networkShort: "Ein ontmoetingsplek veur makers, programmeurs en professionals.",
    networkLong: "In 't Cultuurcafé kriege makers, programmeurs en professionals oet de Limburgstalige culturele sector de ruumte om kennis te deile, kontakte te legge en nuuj samewerkinge te starte.",

    sophieShort: "Limburgstalige liedjes, dichtbij en recht oet 't hart.",
    sophieLong: "Sophie Albert geuf 't Limburgs ein persoonlijke, eigentiedse plek. Verwach liedjes die klein dörve te beginne en op 't podium groots binnekomme. Deze artiestentekst is veurluipig en weurt later aangevuld.",
    tbaShort: "Ein nuuj Limburgstalige act weurt later bekindgemaak.",
    tbaLong: "De viefde act van de aovendshowcase is nog neet bekind. Volg DIALEK veur de aankondiging.",
    toBeAnnounced: "Wordt bekendgemaakt",
    limboShort: "Rauwe indie mit ein Limburgse twist die blief hange.",
    limboLong: "In Limbo verbindt rauwe gitaren en eigentiedse indie mit de klank van 't Limburgs. Ein liveset mit energie, rafelrendsjes en ruimte veur verhaole. Deze artiestentekst is veurluipig.",
    riethamerShort: "Oldschoolhiphop oet Limburg, direk en vol karakter.",
    riethamerLong: "Riethamer Rekords bringk ein collectieve hiphopenergie nao 't podium. Limburgse flows, oldschool invleude en ein sound die de taol stevig in 't noe zet. Deze artiestentekst is veurluipig.",
    basementShort: "Ein veertienkoppig collectief mit ein explosieve live-energie.",
    basementLong: "The Basement Collective sleut de showcase aaf mit de energie van ein groot livecollectief. Ein volle bezetting, ein feestelijke podiumpresentatie en 't Limburgs veurop. Deze artiestentekst is veurluipig.",
    spotifySearch: "Zeuk op Spotify",

    infoEyebrow: "Waorum DIALEK?",
    infoTitle: "Limburgs klink van noe",
    infoLead: "DIALEK geuf ein nuuj generatie Limburgstalige makers ein professioneel podium. Ein festival woa muziek, taol, talentontwikkeling en ontmoeting samekómme — en woa 't Limburgs klinkt in pop, rock, hiphop, poëzie en spoken word van noe.",
    dateHeading: "Wanneer",
    dateValue: "27 fibberwari 2027",
    dateDetail: "Daagprogramma vanaaf 12:00\nAovendshowcase vanaaf 19:30",
    locationHeading: "Woa",
    ticketsHeading: "Tickets",
    ticketsDetail: "Exclusief administratiekoste\nVerkoop via ECI Cultuurfabriek",
    visitors: "bezeukers",
    festivalDay: "festivaldaag",
    dialects: "dialekke op de website",
    partnersHeading: "Same mit",
    translationFooter: "De dialekvertalinge zeen veurluipig en waere nog gecontroleerd mit dialeksprekers."
  };

  function merge(overrides) {
    var result = {};
    var key;
    for (key in BASE) result[key] = BASE[key];
    for (key in overrides) result[key] = overrides[key];
    return result;
  }

  var DIALECTS = [
    {
      code: "remunjs",
      name: "Remunjs",
      town: "Roermond",
      strings: merge({})
    },
    {
      code: "mestreechs",
      name: "Mestreechs",
      town: "Maastricht",
      strings: merge({
        kicker: "Eine daags festival in 't plat",
        subtitle: "dat klink good",
        dayDoorsLabel: "Inloup daagprogramma",
        showDoorsLabel: "Inloup oavondshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t ganse programma",
        programIntro: "Vaan teks en taol tot de nuujste Limburgstaolige meziek. Ontdek de ganse festivaldaag.",
        dayTitle: "Daagprogramma",
        nightTitle: "Oavondshowcase",
        timeTba: "tied volg",
        locationHeading: "Woea",
        infoTitle: "Limburgs klink vaan noe",
        translationFooter: "De dialekvertalinge zien veurluipig en weure nog nagekeke mèt dialeksprekers."
      })
    },
    {
      code: "zitterds",
      name: "Zitterds",
      town: "Sittard",
      strings: merge({
        kicker: "Ein daags festival in 't plat",
        dayDoorsLabel: "Inloup daagprogramma",
        showDoorsLabel: "Inloup oavendshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t ganse programma",
        dayTitle: "Daagprogramma",
        nightTitle: "Oavendshowcase",
        infoTitle: "Limburgs klink van noe"
      })
    },
    {
      code: "venloos",
      name: "Venloos",
      town: "Venlo",
      strings: merge({
        kicker: "'n Daags festival in 't plat",
        subtitle: "det klink good",
        dayDoorsLabel: "Inloup daagprogramma",
        showDoorsLabel: "Inloup aovendshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t ganse programma",
        dayTitle: "Daagprogramma",
        nightTitle: "Aovendshowcase",
        timeTba: "tiéd volg",
        infoTitle: "Limburgs klink van noe"
      })
    },
    {
      code: "kirchroodsj",
      name: "Kirchröadsj",
      town: "Kerkrade",
      strings: merge({
        kicker: "In daags festival in 't plat",
        subtitle: "dat klingk jod",
        dayDoorsLabel: "Inloep daagprogramm",
        showDoorsLabel: "Inloep oavendsjowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t janse programm",
        dayTitle: "Daagprogramm",
        nightTitle: "Oavendsjowcase",
        timeTba: "tsiet kunt nog",
        artistLabel: "Artiest",
        locationHeading: "Woa",
        infoEyebrow: "Vierwat DIALEK?",
        infoTitle: "Limburgs klingk va noe",
        spotifySearch: "Zeuk op Spotify"
      })
    },
    {
      code: "heeles",
      name: "Heëls",
      town: "Heerlen",
      strings: merge({
        kicker: "'n Daags festival in 't plat",
        subtitle: "dat klink jód",
        dayDoorsLabel: "Inloep daagprogramma",
        showDoorsLabel: "Inloep oavendshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t ganse programma",
        dayTitle: "Daagprogramma",
        nightTitle: "Oavendshowcase",
        infoTitle: "Limburgs klink va noe"
      })
    },
    {
      code: "wieerts",
      name: "Wieërts",
      town: "Weert",
      strings: merge({
        kicker: "'n Daags festival in 't plat",
        subtitle: "det klinktj good",
        dayDoorsLabel: "Inloup daagprogramma",
        showDoorsLabel: "Inloup aovendshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t ganse programma",
        dayTitle: "Daagprogramma",
        nightTitle: "Aovendshowcase",
        timeTba: "ti-jd volgtj",
        infoTitle: "Limburgs klinktj van noe"
      })
    },
    {
      code: "echts",
      name: "Echts",
      town: "Echt",
      strings: merge({
        kicker: "'n Daags festival in 't plat",
        dayDoorsLabel: "Inloup daagprogramma",
        showDoorsLabel: "Inloup oavendshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t ganse programma",
        dayTitle: "Daagprogramma",
        nightTitle: "Oavendshowcase",
        infoTitle: "Limburgs klink van noe"
      })
    },
    {
      code: "valkebergs",
      name: "Valkebergs",
      town: "Valkenburg",
      strings: merge({
        kicker: "'ne Daags festival in 't plat",
        subtitle: "dat klink good",
        dayDoorsLabel: "Inloup daagprogramma",
        showDoorsLabel: "Inloup oavondshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t ganse programma",
        dayTitle: "Daagprogramma",
        nightTitle: "Oavondshowcase",
        locationHeading: "Woea",
        infoTitle: "Limburgs klink vaan noe"
      })
    },
    {
      code: "venroads",
      name: "Venroads",
      town: "Venray",
      strings: merge({
        kicker: "'n Daags festival in 't plat",
        subtitle: "det klinkt good",
        dayDoorsLabel: "Inloop dagprogramma",
        showDoorsLabel: "Inloop aovendshowcase",
        heroDate: "27 fibberwari 2027",
        heroTown: "Remunj",
        programTitle: "'t hele programma",
        dayTitle: "Dagprogramma",
        nightTitle: "Aovendshowcase",
        timeTba: "tiêd volgt",
        locationHeading: "Woar",
        infoTitle: "Limburgs klinkt van now"
      })
    }
  ];

  window.DIALEK_I18N = { dialects: DIALECTS, defaultCode: "remunjs" };
})();
