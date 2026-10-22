(function () {
  "use strict";

  // Nederlands is de bron; alle tien dialecten zijn gelabelde werkvertalingen.
  var dutch = window.DIALEK_COPY_NL;
  var regional = window.DIALEK_DIALECT_COPY;
  var places = [
    ["remunjs", "Remunjs", "Roermond"],
    ["mestreechs", "Mestreechs", "Maastricht"],
    ["zitterds", "Zitterds", "Sittard"],
    ["venloos", "Venloos", "Venlo"],
    ["kirchroodsj", "Kirchröadsj", "Kerkrade"],
    ["heeles", "Heëlesj", "Heerlen"],
    ["wieerts", "Wieërts", "Weert"],
    ["echts", "Echs", "Echt"],
    ["valkebergs", "Valkebergs", "Valkenburg"],
    ["venroads", "Venrods", "Venray"]
  ];
  var dialects = [{ code: "nl", name: "Nederlands", town: "", strings: dutch }];
  places.forEach(function (place) {
    dialects.push({
      code: place[0],
      name: place[1],
      town: place[2],
      strings: Object.assign({}, dutch, regional.common, regional.variants[place[0]])
    });
  });
  window.DIALEK_I18N = { dialects: dialects, defaultCode: "remunjs" };
})();
