let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer E54V5B4NJ0MT8WM000NG0ZFY9J5K");
myHeaders.append("Content-Type", "application/json");

async function fetchData() {
  try {
    let raw = JSON.stringify({
      "emission_factor": {
        "activity_id": "heat_and_steam-type_district",
        "data_version": "^1"
      },
      "parameters": {
        "energy": 100,
        "energy_unit": "kWh"
      }
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch("https://beta4.api.climatiq.io/estimate", requestOptions);
    const result = await response.json();
    console.log(result);

    const dataTable = document.getElementById("data-table");

    const row = document.createElement("tr");
    const activityCell = document.createElement("td");
    const emissionsCell = document.createElement("td");

    activityCell.textContent = result.emission_factor.activity_id;
    emissionsCell.textContent = result.co2e + " " + result.co2e_unit;

    row.appendChild(activityCell);
    row.appendChild(emissionsCell);

    dataTable.appendChild(row);
  } catch (error) {
    console.log('error', error);
  }
}

fetchData();