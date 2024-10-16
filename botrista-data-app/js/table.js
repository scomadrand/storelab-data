function generateTable(data, selectedCompany = "") {
  // Seleccionar el cuerpo de la tabla
  var tableBody = document.querySelector("#info-table tbody");
  var tableHeader = document.querySelector("#info-table thead");

  // Limpiar el contenido actual de la tabla
  tableBody.innerHTML = "";
  tableHeader.innerHTML = "";

  if (selectedCompany === "") {
    // Tabla: Top Chains (sin empresa filtrada)

    // Calcular el botrista_index por empresa (company)
    var companyData = {};

    // Agrupar los datos por company_name
    data.forEach(function (item) {
      if (!companyData[item.name]) {
        companyData[item.name] = { total_influx: 0 };
      }
      companyData[item.name].total_influx += item.total_influx;
    });

    // Normalizar los valores de influx usando reduce
    var maxTotalInflux = Object.values(companyData).reduce(
      (max, company) => Math.max(max, company.total_influx),
      0
    );

    for (var company in companyData) {
      companyData[company].botrista_index =
        companyData[company].total_influx / maxTotalInflux;
    }

    // Crear encabezado de la tabla: Rank, Company Name, Botrista Index
    tableHeader.innerHTML = `
        <tr>
          <th>Rank</th>
          <th>Company Name</th>
          <th>Botrista Index</th>
        </tr>
      `;

    // Ordenar los datos por botrista_index y mostrar los top 50
    var sortedCompanies = Object.keys(companyData).sort(
      (a, b) => companyData[b].botrista_index - companyData[a].botrista_index
    );

    sortedCompanies.slice(0, 50).forEach(function (company, index) {
      var row = document.createElement("tr");

      var rankCell = document.createElement("td");
      rankCell.textContent = index + 1;

      var companyNameCell = document.createElement("td");
      companyNameCell.textContent = company;

      var botristaIndexCell = document.createElement("td");
      botristaIndexCell.textContent =
        companyData[company].botrista_index.toFixed(4);

      row.appendChild(rankCell);
      row.appendChild(companyNameCell);
      row.appendChild(botristaIndexCell);

      tableBody.appendChild(row);
    });
  } else {
    // Tabla: Top Locations (con empresa filtrada)

    // Crear encabezado de la tabla: Rank, Location Address, Botrista Index
    tableHeader.innerHTML = `
        <tr>
          <th>Rank</th>
          <th>Location Address</th>
          <th>Botrista Index</th>
        </tr>
      `;

    // Ordenar los datos por botrista_index y mostrar los top 50
    var sortedLocations = data.sort(
      (a, b) => b.botrista_index - a.botrista_index
    );

    sortedLocations.slice(0, 50).forEach(function (item, index) {
      var row = document.createElement("tr");

      var rankCell = document.createElement("td");
      rankCell.textContent = index + 1;

      var addressCell = document.createElement("td");
      addressCell.textContent = item.adress; // Mostrar la dirección (atributo "adress")

      var botristaIndexCell = document.createElement("td");
      botristaIndexCell.textContent = item.botrista_index.toFixed(4);

      row.appendChild(rankCell);
      row.appendChild(addressCell);
      row.appendChild(botristaIndexCell);

      tableBody.appendChild(row);
    });
  }
}
