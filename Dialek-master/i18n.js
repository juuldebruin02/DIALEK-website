(function () {
  "use strict";

  // Goedgekeurde documentteksten overschrijven alleen de aangeleverde dialecten.
  var dutch = window.DIALEK_COPY_NL;
  var regional = window.DIALEK_DIALECT_COPY;
  var reviewed = window.DIALEK_REVIEWED_COPY || {};
  var places = [
    ["remunjs", "Remunjs", "Roermond"],
    ["mestreechs", "Mestreechs", "Maastricht"],
    ["zitterds", "Zittesj", "Sittard"],
    ["venloos", "Venloos", "Venlo"],
    ["kirchroodsj", "Kirchröadsj", "Kerkrade"],
    ["heeles", "Heëlesj", "Heerlen"],
    ["wieerts", "Wierts", "Weert"],
    ["echts", "Echs", "Echt"],
    ["meels", "Mééls", "Meijel"]
  ];
  var dialects = [{ code: "nl", name: "Nederlands", town: "", strings: dutch }];
  places.forEach(function (place) {
    dialects.push({
      code: place[0],
      name: place[1],
      town: place[2],
      reviewed: Object.prototype.hasOwnProperty.call(reviewed, place[0]),
      strings: Object.assign({}, dutch, regional.common, regional.variants[place[0]], reviewed[place[0]])
    });
  });
  // Actuele publicatiestatus staat los van de letterlijk bewaarde documentteksten.
  // Alleen deze twee statusvelden overschrijven oudere werkvertaling-meldingen.
  var translationFooters = {
    "nl": "Alle dialectvertalingen zijn nagekeken door dialectsprekers.",
    "remunjs": "Alle dialekvertalinge zeen nagekeke door dialeksjpraekers.",
    "mestreechs": "Alle dialekvertaolinge zien naogekeke door dialeksprekers.",
    "zitterds": "Alle dialekvertalinge zeen naogekeke door dialeksjpraekers.",
    "venloos": "Alle dialekvertalinge zien naogekeke door dialekspraekers.",
    "kirchroodsj": "Alle dialekvertalinge zunt noagekeke durch dialeksjprekers.",
    "heeles": "Alle dialekvertalinge zint noagekieëke durch dialeksjpreëkers.",
    "wieerts": "Alle dialekvertalinge zeen nagekeke door dialeksprekers.",
    "echts": "Alle dialekvertalinge zeen naogekeke door dialekspraekers.",
    "meels": "Alle diejalèktvertaalinge zin naogekeeke dur diejalèktspréékers."
  };
  dialects.forEach(function (dialect) {
    dialect.strings = Object.assign({}, dialect.strings, {
      dialectNote: dialect.code === "mestreechs" ? "Dees vertaoling is nog in oontwikkeling." : "",
      translationFooter: translationFooters[dialect.code]
    });
  });
  window.DIALEK_I18N = { dialects: dialects, defaultCode: "remunjs" };
})();
