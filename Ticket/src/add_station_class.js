class StationManager extends Autoincremental {
    constructor() {
        const elementHTML = `
            <select name="stations" id="stations">
                <option value="etf">ETF</option>
                <option value="ecl">ECL</option>
                <option value="een">EEN</option>
                <option value="ter">TER</option>
                <option value="con">CON</option>
            </select> -
            <input type="text" name="hostname" id="hostname" placeholder="Ingrese el nombre de la estacion">
            <button id="copy-hostname-button-" class="copy-button">Copiar 📋</button> <br>
            <label id="ip-prefix"></label>
            <input type="text" name="ip-end" id="ip-end" placeholder="Ingrese la direccion IP de la estacion">
            <button id="copy-ip-button-" class="copy-button">Copiar 📋</button> <br>
        `;

        const idContainer = "station";
        const listenedElements = ["stations", "hostname", "ip-end"];

        super(idContainer, elementHTML, listenedElements);

        this.stations = [];
        this.ips = [];
        this.stationTypes = [];

        this.generateTemplate();
        this.updateInitialData(); // Llamar a updateInitialData después de inicializar la vista
        this.updateStationList(); // Asegurarse de que updateStationList se llame después de inicializar los datos
    }

    generateTemplate() {
        super.generateTemplate();
        this.updateStationList();

        // Obtener el último índice agregado
        const lastIndex = this.stations.length - 1;

        // Pasar los datos a setCopyButtonEvent
        this.setCopyButtonEvent(lastIndex);
    }

    updateStationList() {
        this.stations = [];
        this.ips = [];
        this.stationTypes = [];
        const stationData = this._data["stations"];
        const hostnameData = this._data["hostname"];
        const ipEndData = this._data["ip-end"];
    
        if (!stationData || !hostnameData || !ipEndData) {
            return;
        }
    
        for (let i = 0; i < stationData.length; i++) {
            const station = stationData[i].value;
            const hostname = hostnameData[i].value; // Convertir a mayúsculas
            const ipEnd = ipEndData[i].value;
            let ipStart = "164.96"; // Valor por defecto

            // Asignar automáticamente el prefijo de la IP según el tipo de estación
            if (station === "ter" || station === "con") {
                ipStart = "10.90";
            }

            this.stations.push(`${station.toUpperCase()}-${hostname}`); // Eliminar espacios alrededor del guion
            this.ips.push(`${ipStart}.${ipEnd}`);
            this.stationTypes.push(station.toUpperCase());

            // Actualizar el contenido del h4 con el prefijo de la IP
            const ipPrefixElement = document.getElementById("ip-prefix");
            if (ipPrefixElement) {
                ipPrefixElement.textContent = `${ipStart}`;
            }
        }
    }

    removeLastTemplate() {
        super.removeLastTemplate();
        this.updateStationList();
    }

    setCopyButtonEvent(index) {
        // Obtener los IDs de los últimos botones generados
        const lastHostnameButtonId = `copy-hostname-button-${this._iterationCount}`;
        const lastIpButtonId = `copy-ip-button-${this._iterationCount}`;
    
        // Obtener los elementos
        const copyHostnameButton = document.getElementById("copy-hostname-button-");
        copyHostnameButton.setAttribute("id", lastHostnameButtonId);
        const copyIpButton = document.getElementById("copy-ip-button-");
        copyIpButton.setAttribute("id", lastIpButtonId);
    
        // Asignar los manejadores de eventos a los botones de copiar
        copyHostnameButton.addEventListener('click', () => {
            this.updateStationList(); // Llamar a updateStationList antes de copiar el dato
    
            // Obtener el nombre de la estación del elemento actual
            const station = this.stations[index];
    
            // Llamar a la función copyToClipboard externa
            copyToClipboard(station);
        });

        copyIpButton.addEventListener('click', () => {
            this.updateStationList(); // Llamar a updateStationList antes de copiar el dato
    
            // Obtener la IP del elemento actual
            const ip = this.ips[index];
    
            // Llamar a la función copyToClipboard externa
            copyToClipboard(ip);
        });
    }

    updateInitialData() {
        this._listenedElements.forEach(element => {
            const elements = document.querySelectorAll(`[id^="${element}"]`);
            elements.forEach((el, index) => {
                this.updateData(element, el.id, el.value);
            });
        });
        this.updateStationList(); // Asegurarse de que updateStationList se llame después de inicializar los datos
    }
}

addElement(
    "station-manager",
    "estacion",
    '<div id="station-container"></div>'
)

let stations;

// Inicializar la clase después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    stations = new StationManager();
});