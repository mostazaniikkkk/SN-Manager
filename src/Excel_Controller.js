// Función para gestionar las aplicaciones y añadir opciones al select
function populateSelect(data, segmentName, selectId, itemName) {
  const segmentData = data[segmentName];
  const selectElement = document.getElementById(selectId);

  segmentData.forEach(item => {
    let option = document.createElement('option');
    option.value = item[itemName];
    option.textContent = item[itemName];
    selectElement.appendChild(option);
  });
}

// Función para asignar la IP correspondiente al elemento con nombre de estación especificado
function assignIpToElement(data, segmentName, elementId, selectedStationName) {
  const segmentData = data[segmentName];
  const element = document.getElementById(elementId);

  const station = segmentData.find(item => item['Tipo Estacion'] === selectedStationName);
  if (station) {
    element.textContent = station["Base IP"];
  }
}

// Función para mostrar las acciones correspondientes al grupo resolutor seleccionado
function showActions(data, segmentName, actionsElementId, selectedGroupName) {
  const segmentData = data[segmentName];
  const actionsElement = document.getElementById(actionsElementId);

  const group = segmentData.find(item => item['Nombre Grupo'] === selectedGroupName);
  if (group) {
    actionsElement.innerHTML = '';  // Limpiar acciones anteriores
    group.Acciones.split(', ').forEach(action => {
      let option = document.createElement('option');
      option.value = action;
      option.textContent = action;
      actionsElement.appendChild(option);
    });
  }
}

let excel_data;

// URL del recurso que deseas obtener
const url = 'http://127.0.0.1:5000/excel_data';

// Hacer la solicitud GET
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    excel_data = data;

    // Llamar a las funciones para gestionar las aplicaciones y asignar la IP
    populateSelect(excel_data, 'Dominios', 'email', 'Dominio');
    populateSelect(excel_data, 'Tipos Estaciones', 'station', 'Tipo Estacion');
    populateSelect(excel_data, 'Tipo Sucursal', 'branch', 'Tipo Sucursal');
    populateSelect(excel_data, 'Grupos resolutores', 'resolutor', 'Nombre Grupo');
    populateSelect(excel_data, 'Taxonomia', 'tax', 'Resumen');

    // Inicializar la IP correspondiente al elemento con el ID `ip-dir` inicialmente
    const initialStationName = excel_data['Tipos Estaciones'][0]['Tipo Estacion'];
    assignIpToElement(excel_data, 'Tipos Estaciones', 'ip-dir', initialStationName);

    // Inicializar las acciones del primer grupo resolutor al cargar la página
    const initialResolutorName = excel_data['Grupos resolutores'][0]['Nombre Grupo'];
    showActions(excel_data, 'Grupos resolutores', 'action', initialResolutorName);

    // Añadir event listener al select `station` para actualizar la IP dinámicamente
    const stationSelect = document.getElementById('station');
    stationSelect.addEventListener('change', (event) => {
      const selectedStationName = event.target.value;
      assignIpToElement(excel_data, 'Tipos Estaciones', 'ip-dir', selectedStationName);
    });

    // Añadir event listener al select `resolutor` para actualizar las acciones dinámicamente
    const resolutorSelect = document.getElementById('resolutor');
    resolutorSelect.addEventListener('change', (event) => {
      const selectedGroupName = event.target.value;
      showActions(excel_data, 'Grupos resolutores', 'action', selectedGroupName);
    });

    console.log(excel_data['Grupos resolutores']); // Verificar que los datos están correctamente cargados
  })
  .catch(error => {
    console.error('Error:', error);
  });
