// Función para recalcular el índice botrista_index
function recalculateIndex(data) {
  console.log(data);
  // Calcular el valor máximo de total_influx
  var maxInflux = data.reduce(
    (max, item) => Math.max(max, item.total_influx),
    0
  );

  // Recalcular el índice botrista_index
  data.forEach(function (item) {
    item.botrista_index = item.total_influx / maxInflux; // Normalizar siempre
  });

  // Calcular la distribución de los valores de botrista_index en los intervalos
  let range_0_02 = data.filter(
    (item) => item.botrista_index >= 0 && item.botrista_index < 0.2
  ).length;
  let range_02_04 = data.filter(
    (item) => item.botrista_index >= 0.2 && item.botrista_index < 0.4
  ).length;
  let range_04_06 = data.filter(
    (item) => item.botrista_index >= 0.4 && item.botrista_index < 0.6
  ).length;
  let range_06_08 = data.filter(
    (item) => item.botrista_index >= 0.6 && item.botrista_index < 0.8
  ).length;
  let range_08_1 = data.filter(
    (item) => item.botrista_index >= 0.8 && item.botrista_index <= 1
  ).length;

  // Mostrar la distribución por consola
  console.log("Distribución de valores de botrista_index:");
  console.log("0 - 0.2: " + range_0_02);
  console.log("0.2 - 0.4: " + range_02_04);
  console.log("0.4 - 0.6: " + range_04_06);
  console.log("0.6 - 0.8: " + range_06_08);
  console.log("0.8 - 1.0: " + range_08_1);

  // Calcular el valor máximo de botrista_index
  var maxBotristaIndex = data.reduce(
    (max, item) => Math.max(max, item.botrista_index),
    0
  );

  // Retornar los puntos y el valor máximo de botrista_index
  return {
    points: data.map(function (item) {
      return [item.lat, item.lng, item.botrista_index];
    }),
    maxBotristaIndex: maxBotristaIndex,
  };
}

// Sobreescribir la creación del canvas para optimizarlo con "willReadFrequently"
L.DomUtil.create = function (tagName, className, container) {
  var el = document.createElement(tagName);

  if (className) {
    el.className = className;
  }

  if (tagName.toLowerCase() === "canvas") {
    el = document.createElement("canvas");
    var context = el.getContext("2d", { willReadFrequently: true }); // Añadir "willReadFrequently: true"
  }

  if (container) {
    container.appendChild(el);
  }

  return el;
};
