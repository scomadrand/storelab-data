// Lista de todos los estados de EE.UU.
var states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

// Ciudades principales de EE.UU.
var cities = {
  Alabama: ["Birmingham", "Montgomery", "Mobile"],
  Alaska: ["Anchorage", "Juneau", "Fairbanks"],
  Arizona: ["Phoenix", "Tucson", "Mesa"],
  Arkansas: ["Little Rock", "Fort Smith", "Fayetteville"],
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Colorado: ["Denver", "Colorado Springs", "Aurora"],
  Connecticut: ["Bridgeport", "New Haven", "Hartford"],
  Delaware: ["Wilmington", "Dover", "Newark"],
  Florida: ["Miami", "Orlando", "Tampa"],
  Georgia: ["Atlanta", "Augusta", "Columbus"],
  Hawaii: ["Honolulu", "Hilo", "Kailua"],
  Idaho: ["Boise", "Meridian", "Nampa"],
  Illinois: ["Chicago", "Springfield", "Naperville"],
  Indiana: ["Indianapolis", "Fort Wayne", "Evansville"],
  Iowa: ["Des Moines", "Cedar Rapids", "Davenport"],
  Kansas: ["Wichita", "Overland Park", "Kansas City"],
  Kentucky: ["Louisville", "Lexington", "Bowling Green"],
  Louisiana: ["New Orleans", "Baton Rouge", "Shreveport"],
  Maine: ["Portland", "Lewiston", "Bangor"],
  Maryland: ["Baltimore", "Frederick", "Gaithersburg"],
  Massachusetts: ["Boston", "Worcester", "Springfield"],
  Michigan: ["Detroit", "Grand Rapids", "Warren"],
  Minnesota: ["Minneapolis", "Saint Paul", "Rochester"],
  Mississippi: ["Jackson", "Gulfport", "Southaven"],
  Missouri: ["Kansas City", "St. Louis", "Springfield"],
  Montana: ["Billings", "Missoula", "Great Falls"],
  Nebraska: ["Omaha", "Lincoln", "Bellevue"],
  Nevada: ["Las Vegas", "Henderson", "Reno"],
  "New Hampshire": ["Manchester", "Nashua", "Concord"],
  "New Jersey": ["Newark", "Jersey City", "Paterson"],
  "New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho"],
  "New York": ["New York City", "Buffalo", "Rochester"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro"],
  "North Dakota": ["Fargo", "Bismarck", "Grand Forks"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati"],
  Oklahoma: ["Oklahoma City", "Tulsa", "Norman"],
  Oregon: ["Portland", "Salem", "Eugene"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown"],
  "Rhode Island": ["Providence", "Cranston", "Warwick"],
  "South Carolina": ["Charleston", "Columbia", "North Charleston"],
  "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen"],
  Tennessee: ["Nashville", "Memphis", "Knoxville"],
  Texas: ["Houston", "Dallas", "Austin"],
  Utah: ["Salt Lake City", "West Valley City", "Provo"],
  Vermont: ["Burlington", "South Burlington", "Rutland"],
  Virginia: ["Virginia Beach", "Norfolk", "Chesapeake"],
  Washington: ["Seattle", "Spokane", "Tacoma"],
  "West Virginia": ["Charleston", "Huntington", "Morgantown"],
  Wisconsin: ["Milwaukee", "Madison", "Green Bay"],
  Wyoming: ["Cheyenne", "Casper", "Laramie"],
};

// Llenar el filtro de estados
var stateFilter = document.getElementById("stateFilter");
states.forEach(function (state) {
  var option = document.createElement("option");
  option.value = state;
  option.text = state;
  stateFilter.appendChild(option);
});

// Función para llenar el filtro de ciudades basado en el estado seleccionado
function populateCityFilter(selectedState) {
  var cityFilter = document.getElementById("cityFilter");
  cityFilter.innerHTML = '<option value="">Selecciona una Ciudad</option>'; // Limpiar opciones anteriores

  if (cities[selectedState]) {
    cities[selectedState].forEach(function (city) {
      var option = document.createElement("option");
      option.value = city;
      option.text = city;
      cityFilter.appendChild(option);
    });
  }
}

// Función para llenar el filtro de empresas basado en la columna "company_name"
function populateCompanyFilter(data) {
  var companyFilter = document.getElementById("companyFilter");
  var companyNames = [...new Set(data.map((item) => item.company_name))]; // Eliminar duplicados

  companyNames.forEach(function (company) {
    var option = document.createElement("option");
    option.value = company;
    option.text = company;
    companyFilter.appendChild(option);
  });
}

// Hacer zoom al estado seleccionado
function zoomToState() {
  var selectedState = document.getElementById("stateFilter").value;
  if (selectedState) {
    fetch(
      `https://nominatim.openstreetmap.org/search?state=${selectedState}&country=USA&format=geojson&polygon_geojson=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          var bounds = L.geoJSON(data.features[0].geometry).getBounds();
          map.fitBounds(bounds); // Hacer zoom al estado seleccionado

          populateCityFilter(selectedState); // Llenar el filtro de ciudades basado en el estado seleccionado
        } else {
          alert("No se encontraron límites para el estado seleccionado");
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    // Si no hay estado seleccionado, mostrar EE.UU. continental
    map.fitBounds(usBounds);
  }
}

// Hacer zoom a la ciudad seleccionada
function zoomToCity() {
  var selectedCity = document.getElementById("cityFilter").value;
  if (selectedCity) {
    fetch(
      `https://nominatim.openstreetmap.org/search?city=${selectedCity}&country=USA&format=geojson&polygon_geojson=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          var bounds = L.geoJSON(data.features[0].geometry).getBounds();
          map.fitBounds(bounds); // Hacer zoom a la ciudad seleccionada
        } else {
          alert("No se encontraron límites para la ciudad seleccionada");
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    // Si no hay ciudad seleccionada, mostrar EE.UU. continental
    map.fitBounds(usBounds);
  }
}

// Función para filtrar por empresa y recalcular el índice
// Función para filtrar por empresa
function filterByCompany() {
  var selectedCompany = document.getElementById("companyFilter").value;

  // Llamar a loadData() con el filtro de la empresa seleccionada
  loadData(selectedCompany);
}

// Inicializar Select2 en los filtros para que sean de autocompletar
$(document).ready(function () {
  $("#stateFilter").select2({
    placeholder: "Write or select a STATE",
    allowClear: true,
    minimumInputLength: 1, // El usuario debe escribir al menos 1 carácter
  });

  $("#cityFilter").select2({
    placeholder: "Write or select a CITY",
    allowClear: true,
    minimumInputLength: 1, // El usuario debe escribir al menos 1 carácter
  });

  $("#companyFilter").select2({
    placeholder: "Select a COMPANY",
    allowClear: true,
  });
});
