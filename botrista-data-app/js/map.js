// Limites geográficos del US Continental
var usBounds = [
  [24.396308, -125.0],
  [49.384358, -66.93457],
];

var map = L.map("map").fitBounds(usBounds); // Vista inicial en el territorio continental de EE.UU.

// Agregar mapa base de OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Powered by StoreLab",
}).addTo(map);

// Inicializar el mapa y cargar los datos
loadData();

// Crear una leyenda en la esquina inferior izquierda
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend-gradient");

  // Crear el gradiente visual
  div.innerHTML = `
      <h4>Botrista Index</h4>
      <div class="legend-scale">
        <span>Low 0</span>
        <div class="legend-bar"></div>
        <span>High 1</span>
      </div>
    `;

  return div;
};

// Añadir la leyenda al mapa
legend.addTo(map);