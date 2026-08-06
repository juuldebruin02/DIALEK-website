/* ============================================================
   DIALEK. — localization, but the "languages" are Limburgs dialects.
   10 prominent dialects spread across Limburg (Roermond, Maastricht en
   Sittard zitten d'r zeker bij).

   NOTE: the dialect strings are a best-effort starting point that leans on
   well-known features of each tongue (e.g. Kirchröadsj g→j / sj-klanken,
   Mestreechs "dat", northern "aovend"). A native speaker should still give
   each variant a proofread — the i18n engine itself swaps any string you
   correct here without further code changes.
   ============================================================ */
(function () {
  "use strict";

  // Default = Remunjs (the event is in Remunj/Roermond and matches the poster).
  var BASE = {
    navLineup:   "Line-up",
    navInfo:     "Info",
    navTickets:  "Tickets",
    selectLabel: "Kies dien dialek",

    kicker:       "Unne bandoavend in 't plat",
    subtitle:     "det klink good",
    presentLabel: "presentatie door",
    heroDate:     "6 meert 2026",
    heroDoors:    "inloup 19:30 oer",
    heroVenue:    "De Azijnfabriek, Remunj",

    lineupEyebrow: "'t Programma",
    lineupTitle:   "Wae kump speule",
    act1: "Luuke liedjes, recht oet 't hart — gezonge in 't plat.",
    act2: "Rauwe indie mit 'n Limburgse twist die blief hange.",
    act3: "'n Collectief oet de kelder dat de boel op z'n kop zit.",
    actsHost: "Gepresenteerd door",

    infoWhen:     "Wanneer",
    infoWhere:    "Woa",
    infoEntry:    "Entree",
    infoDate:     "6 meert 2026",
    infoDoors:    "Inloup 19:30 oer\nAanvang 20:00 oer",
    infoVenueBig: "De Azijnfabriek",
    infoVenueSub: "Remunj (Roermond)\nLimburg, NL",
    infoPrice:    "Gratis",
    infoPriceSub: "Mit aanmelding\nvol = vol",

    ticketsTitle: "Link veur gratis tickets",
    ticketsSub:   "Unne bandoavend in 't plat — in de Azijnfabriek in Remunj. Vol = vol, dus wees d'r snel bie.",
    ticketsBtn:   "Reserveer dien plek",

    footerTag:  "det klink good",
    footerMeta: "© 2026 · De Azijnfabriek, Remunj",
    soundLabel: "Geluid",
    scrollHint: "scroll"
  };

  // merge: each dialect overrides only what differs from BASE
  function D(over) {
    var o = {}, k;
    for (k in BASE) o[k] = BASE[k];
    for (k in over) o[k] = over[k];
    return o;
  }

  // The 10 dialects. `code` is the stored id, `name`/`town` show in the menu.
  var DIALECTS = [
    { code: "remunjs", name: "Remunjs", town: "Roermond", strings: D({}) },

    { code: "mestreechs", name: "Mestreechs", town: "Maastricht", strings: D({
      kicker: "Eine bandoavond in 't plat",
      subtitle: "dat klink good",
      lineupTitle: "Wae kump speule",
      act1: "Sjoean leedsjes, recht oet 't hart — gezonge in 't plat.",
      act2: "Rauw indie mèt eine Mestreechter twist dee blijf hange.",
      act3: "Eine collectief oet de kelder dee de boel op de kop zèt.",
      infoWhere: "Woea",
      infoPriceSub: "Mèt aanmelding\nvol = vol",
      ticketsTitle: "Link veur graotis tickets",
      ticketsSub: "Eine bandoavond in 't plat — in de Azijnfabriek in Remunj. Vol = vol, dus wees d'r gauw bie.",
      ticketsBtn: "Reservere dien plaots",
      footerTag: "dat klink good"
    }) },

    { code: "zitterds", name: "Zitterds", town: "Sittard", strings: D({
      kicker: "Ein bandj-oavend in 't plat",
      act1: "Sjoeën leedjes, recht oet 't hart — gezónge in 't plat.",
      act2: "Rauwe indie mèt 'ne Zitterse twist dae blief hange.",
      act3: "'n Collectief oet de kelder dat de boel op z'ne kop zèt.",
      heroDate: "6 mieërt 2026",
      infoDate: "6 mieërt 2026",
      ticketsBtn: "Reserveer dien plaatsj"
    }) },

    { code: "venloos", name: "Venloos", town: "Venlo", strings: D({
      kicker: "'n Bandj-aovend in 't plat",
      act1: "Mooie ledjes, recht oet 't hart — gezónge in 't plat.",
      act2: "Rouw indie mit 'n Venloos twistje wat blief hange.",
      act3: "'n Collectief oet de kelder dat de boel op de kop zet.",
      ticketsBtn: "Reserveer dien plaatsj"
    }) },

    { code: "kirchroodsj", name: "Kirchröadsj", town: "Kerkrade", strings: D({
      kicker: "Ing bandj-oavend in 't plat",
      subtitle: "dat klingk jod",
      presentLabel: "presentatie va",
      lineupEyebrow: "'t Programm",
      lineupTitle: "Wèr kunt sjpele",
      act1: "Sjun leedsjer, róng oes 't hats — jezónge in 't plat.",
      act2: "Rauw indie mèt enne Kirchröadsjer twist die blief hange.",
      act3: "Ing collectief oes de kelder die de saach op d'r kop zètt.",
      actsHost: "Jepresenteerd va",
      infoWhen: "Wienieë",
      infoEntry: "Entree",
      infoPrice: "Ömzöss",
      infoPriceSub: "Mèt aanmelding\nvol = vol",
      ticketsTitle: "Link vér jratis tickets",
      ticketsSub: "Ing bandj-oavend in 't plat — in de Azijnfabriek in Remunj. Vol = vol, dus wees d'r flot bie.",
      ticketsBtn: "Reservere ding plaatsj",
      footerTag: "dat klingk jod",
      soundLabel: "Jeluud"
    }) },

    { code: "heeles", name: "Heëls", town: "Heerlen", strings: D({
      kicker: "'n Bandj-oavend in 't plat",
      subtitle: "dat klink jód",
      lineupTitle: "Wae kump sjpele",
      act1: "Sjun leedjes, recht oes 't hart — gezónge in 't plat.",
      act2: "Rauw indie mèt 'ne Heëlse twist dae blief hange.",
      act3: "'n Collectief oes de kelder dat de boel op de kop zèt.",
      infoPrice: "Ömzöss",
      ticketsTitle: "Link veur jratis tickets",
      ticketsBtn: "Reserveer ding plaatsj",
      footerTag: "dat klink jód",
      soundLabel: "Jeluud"
    }) },

    { code: "wieerts", name: "Wieërts", town: "Weert", strings: D({
      kicker: "'n Bandj-aovend in 't plat",
      act1: "Sjoeën ledjes, recht oet 't hart — gezónge in 't plat.",
      act2: "Rouw indie mit 'ne Wieërter twist dae blieuf hange.",
      act3: "'n Collectief oet de kelder dat de boel op de kop zit.",
      heroDate: "6 mieërt 2026",
      infoDate: "6 mieërt 2026",
      ticketsBtn: "Reserveer dien plaatsj"
    }) },

    { code: "echts", name: "Echts", town: "Echt", strings: D({
      kicker: "'n Bandj-oavend in 't plat",
      act1: "Sjoeën leedjes, recht oet 't hart — gezónge in 't plat.",
      act2: "Rauwe indie mèt 'ne Echter twist dae blief hange.",
      act3: "'n Collectief oet de kelder dat de boel op z'ne kop zèt.",
      heroDate: "6 mieërt 2026",
      infoDate: "6 mieërt 2026",
      ticketsBtn: "Reserveer dien plaatsj"
    }) },

    { code: "valkebergs", name: "Valkebergs", town: "Valkenburg", strings: D({
      kicker: "'n Bandj-oavend in 't plat",
      subtitle: "dat klink good",
      act1: "Sjoean leedsjes, recht oet 't hart — gezonge in 't plat.",
      act2: "Rauw indie mèt 'ne Valkebergse twist dee blijf hange.",
      act3: "'ne Collectief oet de kelder dee de boel op de kop zèt.",
      infoWhere: "Woea",
      ticketsBtn: "Reservere dien plaots",
      footerTag: "dat klink good"
    }) },

    { code: "venroads", name: "Venroads", town: "Venray", strings: D({
      kicker: "'n Bandj-aovend in 't plat",
      subtitle: "det klinkt good",
      act1: "Mooie ledjes, recht oet 't hart — gezónge in 't plat.",
      act2: "Rouw indie mit 'n Venroads twissie wat blif hange.",
      act3: "'n Collectief oet de kelder dat de boel op de kop zet.",
      infoWhere: "Woar",
      ticketsBtn: "Reserveer ow plek",
      footerTag: "det klinkt good"
    }) }
  ];

  window.DIALEK_I18N = { dialects: DIALECTS, defaultCode: "remunjs" };
})();
