// Definir la clase Station
class Station {
    constructor(type, id = '', ip = '', branch = '') {
        this.type = type;
        this.id = id;
        this.ip = ip;
        this.branch = branch;
    }

    updateType(newType) {
        this.type = newType;
    }

    updateID(newID) {
        this.id = newID;
    }

    updateIP(newIP) {
        this.ip = newIP;
    }

    updateBranch(newBranch) {
        this.branch = newBranch;
    }
}

// Array para almacenar las instancias de Station
window.stations = [];

// Función para crear el div de estación
function createStationDiv() {
    const stationDiv = document.createElement('div');

    // Crear los elementos internos
    const stationTypeSelect = document.createElement('select');
    stationTypeSelect.name = 'opciones';
    stationTypeSelect.id = 'station';

    // Agregar opciones al select de tipo de estación
    const types = ['ETF', 'EEN', 'ECL', 'TER', 'CON'];
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        stationTypeSelect.appendChild(option);
    });
    stationDiv.appendChild(stationTypeSelect);

    stationDiv.appendChild(document.createTextNode(' - '));

    const stationIDInput = document.createElement('input');
    stationIDInput.type = 'text';
    stationIDInput.name = 'station';
    stationIDInput.placeholder = 'ID de estacion';
    stationDiv.appendChild(stationIDInput);

    const copyIDButton = document.createElement('button');
    copyIDButton.textContent = 'Copiar';
    stationDiv.appendChild(copyIDButton);
    stationDiv.appendChild(document.createElement('br'));

    const ipDirElement = document.createElement('t');
    ipDirElement.id = 'ip-dir';
    ipDirElement.textContent = '164.96.';
    stationDiv.appendChild(ipDirElement);

    const ipInput = document.createElement('input');
    ipInput.type = 'text';
    ipInput.name = 'ip';
    ipInput.placeholder = 'Direccion IP';
    stationDiv.appendChild(ipInput);

    const copyIPButton = document.createElement('button');
    copyIPButton.textContent = 'Copiar';
    stationDiv.appendChild(copyIPButton);

    return {
        stationDiv,
        stationTypeSelect,
        stationIDInput,
        ipInput,
        ipDirElement,
    };
}

// Función para inicializar la estación al cargar la página
function initializeStation() {
    const stationContainer = document.getElementById('stations');

    // Crear el primer stationDiv
    const {
        stationDiv,
        stationTypeSelect,
        stationIDInput,
        ipInput,
        ipDirElement,
    } = createStationDiv();

    stationContainer.appendChild(stationDiv);

    const initialStation = new Station(
        stationTypeSelect.value,
        stationIDInput.value,
        ipInput.value
    );

    stations.push({ stationObj: initialStation, elements: stationDiv });

    // Event listeners para actualizar la estación inicial
    stationTypeSelect.addEventListener('change', () => {
        initialStation.updateType(stationTypeSelect.value);
        updateBaseIP(stationTypeSelect, ipDirElement);
    });

    stationIDInput.addEventListener('input', () => {
        initialStation.updateID(stationIDInput.value);
    });

    ipInput.addEventListener('input', () => {
        initialStation.updateIP(ipInput.value);
    });

    // Actualizar la IP base inicialmente
    updateBaseIP(stationTypeSelect, ipDirElement);

    // Asignar eventos a los botones '+' y '-'
    const addButton = document.querySelector('.col-6 > button[onclick="addStation()"]');
    const removeButton = document.querySelector('.col-6 > button[onclick="removeStation()"]');

    // Eliminar los atributos 'onclick' del HTML para evitar llamadas duplicadas
    addButton.removeAttribute('onclick');
    removeButton.removeAttribute('onclick');

    // Asignar los eventos a los botones
    addButton.addEventListener('click', addStation);
    removeButton.addEventListener('click', removeStation);
}

// Función para actualizar la IP base basada en el tipo de estación seleccionado
function updateBaseIP(stationTypeSelect, ipDirElement) {
    const selectedType = stationTypeSelect.value;
    let baseIP = '164.96.'; // Valor por defecto

    if (selectedType === 'TER' || selectedType === 'CON') {
        baseIP = '10.90.';
    }

    ipDirElement.textContent = baseIP;
}

// Función para agregar una nueva estación
function addStation() {
    const stationContainer = document.getElementById('stations');

    const {
        stationDiv,
        stationTypeSelect,
        stationIDInput,
        ipInput,
        ipDirElement,
    } = createStationDiv();

    stationContainer.appendChild(stationDiv);

    const newStation = new Station(
        stationTypeSelect.value,
        stationIDInput.value,
        ipInput.value
    );

    stations.push({ stationObj: newStation, elements: stationDiv });

    // Event listeners para actualizar la nueva estación
    stationTypeSelect.addEventListener('change', () => {
        newStation.updateType(stationTypeSelect.value);
        updateBaseIP(stationTypeSelect, ipDirElement);
    });

    stationIDInput.addEventListener('input', () => {
        newStation.updateID(stationIDInput.value);
    });

    ipInput.addEventListener('input', () => {
        newStation.updateIP(ipInput.value);
    });

    // Actualizar la IP base inicialmente
    updateBaseIP(stationTypeSelect, ipDirElement);
}

// Función para remover la última estación agregada
function removeStation() {
    if (stations.length > 0) {
        const lastStation = stations.pop();
        lastStation.elements.parentNode.removeChild(lastStation.elements);
    } else {
        alert('No hay estaciones para eliminar.');
    }
}

// Inicializar el script al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initializeStation();
});
