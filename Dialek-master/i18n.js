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
  window.DIALEK_I18N = { dialects: dialects, defaultCode: "remunjs" };
})();
