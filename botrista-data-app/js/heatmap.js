// Crear una capa de heatmap
var heatLayer;

// Variable global para almacenar la capa de círculos
var circleLayer = null;

function generate_heatmap(points, maxBotristaIndex, totalPoints) {
  // Ajustar el radio y blur dinámicamente
  var dynamicRadius = totalPoints < 10000 ? 30 : 20;   // 50 : 20 // cambiar a radio adaptativo por zoom
  var dynamicBlur = totalPoints < 10000 ? 15 : 25;
  var dynamicMax = totalPoints < 10000 ? 0.01 : 0.05;

  // Eliminar el heatmap si ya existe
  if (heatLayer) {
    map.removeLayer(heatLayer);
  }

  // Crear un nuevo heatmap con las nuevas opciones
  heatLayer = L.heatLayer(points, {
    radius: dynamicRadius,
    blur: dynamicBlur,
    max: dynamicMax,
  }).addTo(map);

  console.log("Heatmap actualizado");
}

function generate_circleLayer(data) {
  if (circleLayer) {
    map.removeLayer(circleLayer); // Eliminar la capa existente
  }

  // Crear un nuevo layerGroup para los círculos
  circleLayer = L.layerGroup();

  // Añadir círculos según el botrista_index
  data.forEach(function (item) {
    var circleColor;

    // Asignar el color del círculo según el rango de botrista_index
    if (item.botrista_index >= 0 && item.botrista_index < 0.2) {
      circleColor = "blue";
    } else if (item.botrista_index >= 0.2 && item.botrista_index < 0.4) {
      circleColor = "green";
    } else if (item.botrista_index >= 0.4 && item.botrista_index < 0.6) {
      circleColor = "yellow";
    } else if (item.botrista_index >= 0.6 && item.botrista_index < 0.8) {
      circleColor = "orange";
    } else if (item.botrista_index >= 0.8 && item.botrista_index <= 1.0) {
      circleColor = "red";
    }

    // Crear el círculo en la ubicación con el color adecuado
    var circle = L.circle([item.lat, item.lng], {
      color: circleColor,
      fillColor: circleColor,
      fillOpacity: 0.5,
      radius: 500, // Ajustar el tamaño según sea necesario
    });

    // Añadir el círculo a la capa
    circle.addTo(circleLayer);
  });

  // Añadir la capa de círculos al mapa
  circleLayer.addTo(map);
}

function loadData(selectedCompany = "") {
  fetch(
    "https://raw.githubusercontent.com/scomadrand/storelab-data/refs/heads/main/botrista-data-app/data/data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // Filtrar por empresa si se ha seleccionado una
      if (selectedCompany !== "") {
        data = data.filter((item) => item.company_name === selectedCompany);
      }

      // Recalcular el índice y obtener los puntos
      var result = recalculateIndex(data);
      var points = result.points;
      var maxBotristaIndex = result.maxBotristaIndex;

      // Llamar a la función para generar el heatmap
      generate_heatmap(points, maxBotristaIndex, points.length);

      // Si hay una empresa seleccionada, generar la capa de círculos
      if (selectedCompany !== "") {
        generate_circleLayer(data);
      } else if (circleLayer) {
        // Si no hay empresa seleccionada, eliminar la capa de círculos
        map.removeLayer(circleLayer);
      }

      // Generar la tabla
      generateTable(data, selectedCompany);

      // Poblamos el filtro de empresas solo si no hay filtro aplicado
      if (selectedCompany === "") {
        populateCompanyFilter(data);
      }
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
}
