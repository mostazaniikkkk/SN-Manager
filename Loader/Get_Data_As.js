function get_ticket_title(){
    const action = document.getElementById("action").value;
    const taxonomy = document.getElementById("tax").value;
    return `${action} - ${taxonomy}`
}

function get_ticket() {
    function filter_data(data) {
        if (data && data.trim() !== "") {
            return data;
        } else {
            return "Sin información";
        }
    }

    // Función para obtener el base IP según el tipo de estación
    function getBaseIP(stationType) {
        let baseIP = '164.96.'; // Valor por defecto

        if (stationType === 'TER' || stationType === 'CON') {
            baseIP = '10.90.';
        }

        return baseIP;
    }

    const problem = document.getElementById("problem").value;
    const oficial_name = document.getElementById("name").value;
    const oficial_user = document.getElementById("user").value;

    const app = document.getElementById("tax").value;
    const mantain = document.getElementById("mantain").value;
    const remote = document.getElementById("remote").value;

    // Pruebas de la mesa
    const tests = document.getElementById("tests").value;
    const group = document.getElementById("resolutor").value;
    const action = document.getElementById("action").value;

    // Capturar la información de las estaciones
    let stationTypes = [];
    let machineNames = [];
    let ips = [];

    if (window.stations && window.stations.length > 0) {
        window.stations.forEach((stationWrapper) => {
            const stationObj = stationWrapper.stationObj;
            const stationTypeRaw = stationObj.type;
            const stationIDRaw = stationObj.id;
            const stationIPInputRaw = stationObj.ip; // Los últimos octetos de la IP ingresados por el usuario

            const stationType = filter_data(stationTypeRaw);
            const stationID = filter_data(stationIDRaw);

            // Obtener el nombre de la máquina
            let machineName = "";
            if (stationType === "Sin información" || stationID === "Sin información") {
                machineName = "Sin información";
            } else {
                machineName = `${stationType}-${stationID}`;
            }

            // Obtener la IP completa o "Sin información" si el campo está vacío
            let fullIP = "";
            if (
                stationIPInputRaw && stationIPInputRaw.trim() !== "" &&
                stationType !== "Sin información"
            ) {
                const baseIP = getBaseIP(stationTypeRaw.trim()); // Obtenemos el base IP según el tipo de estación
                fullIP = baseIP + stationIPInputRaw;
            } else {
                fullIP = "Sin información";
            }

            stationTypes.push(stationType);
            machineNames.push(machineName);
            ips.push(fullIP);
        });
    } else {
        // Si no hay estaciones, dejar los campos vacíos o con "Sin información"
        stationTypes.push("Sin información");
        machineNames.push("Sin información");
        ips.push("Sin información");
    }

    // Unir los valores de las estaciones, separados por coma
    const stationTypesStr = stationTypes.join(", ");
    const machineNamesStr = machineNames.join(", ");
    const ipsStr = ips.join(", ");

    // Armar el ticket con el formato exacto requerido
    return `TIPO ESTACION:${stationTypesStr}
NOMBRE MAQUINA:${machineNamesStr}
NOMBRE:${filter_data(oficial_name)}
EMAIL:
FONO FIJO:
CELULAR:
OFICINA:
IP:${ipsStr}
CUENTA USUARIO:${filter_data(oficial_user)}
APLICACIÓN CON PROBLEMA:${filter_data(app)}
PROBLEMA:${filter_data(problem)}.
PRUEBAS DE LA MESA:${filter_data(tests)}.
${(group === "N1 – Mesa Idemia") ? "Solucionado en llamada" : "Derivado a " + group.replace(" - ", " ") + " para " + action}.
MANTENCION PREVENTIVA:${filter_data(mantain)}
REMOTO:${filter_data(remote)}`.toUpperCase();
}