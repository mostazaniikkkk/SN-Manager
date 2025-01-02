// Station.js (Definición de la clase Station)

import { getStationsFromExcel } from '../Excel_Controller.js'; // Import the function to get data from Excel

export class Station {
    constructor(id, name = '', ip = '') {
        this.id = id;
        this.name = name;
        this.ip = ip;
        this.container = null; // Reference to the station's div element in the DOM
        this.render();
    }

    render() {
        if (!this.container) {
            // Create the station's div if it doesn't exist
            this.container = document.createElement('div');
            this.container.classList.add('station');
            
            
            // --- Gestión de las estaciones ---
            //si es la primera vez, se crea el contenedor
            if(this.id === 0){
                // Create the stations container div si es la primera estacion
                const stationsContainer = document.createElement('div');
                stationsContainer.setAttribute("id", "stations");
                document.getElementById('stations-container').appendChild(stationsContainer);
                //se inicializa el arreglo
                window.stations = [];
                // Counter for station IDs
                window.stationIdCounter = 0;
            }

            document.getElementById('stations').appendChild(this.container);

            // Obtener datos del Excel solo si es la primera estación
            if (this.id === 0) {
              const stationData = getStationsFromExcel();
              if (stationData && stationData.length > 0) {
                // Actualizar la estación actual con los datos del Excel
                this.name = stationData[0].name;
                this.ip = stationData[0].ip;

                // Crear nuevas estaciones para los datos adicionales del Excel
                for (let i = 1; i < stationData.length; i++) {
                  window.addStation(stationData[i].name, stationData[i].ip);
                }
              }
            }
        }

        //siempre se actualiza el html para no perder datos
        this.container.innerHTML = `
            <input type="text" id="station-name-${this.id}" placeholder="Station name" value="${this.name}">
            <input type="text" id="station-ip-${this.id}" placeholder="IP address" value="${this.ip}">
        `;

        // Add event listeners to update properties when values change in the DOM
        this.container.querySelector(`#station-name-${this.id}`).addEventListener('input', (event) => {
            this.name = event.target.value;
        });
        this.container.querySelector(`#station-ip-${this.id}`).addEventListener('input', (event) => {
            this.ip = event.target.value;
        });
    }

    destroy() {
        // Remove the station from the DOM
        if (this.container) {
            this.container.remove();
        }
    }
}

// Function to add a station
window.addStation = function(name = '', ip = '') {
    const newStation = new Station(window.stationIdCounter++, name, ip);
    window.stations.push(newStation);
}

// Function to remove a station
window.removeStation = function() {
    if (window.stations.length > 0) {
        const removedStation = window.stations.pop();
        removedStation.destroy(); // Remove the station from the DOM
        window.stationIdCounter--;
    }
}