function getElementValueWithFallback(id) {
    const elements = document.querySelectorAll(`#${id}`);
    
    if (elements[0].value === "") {
        return elements[1].value;
    }
    
    return elements[0].value;
}

function get_ticket_title() {
    const action = capitalize(getElementValueWithFallback("action"));
    const taxonomy = capitalize(getElementValueWithFallback("tax"));

    return `${action} - ${taxonomy}`;
}

function get_ticket() {
    function filter_data(data) {
        if (data && data.trim() !== "") {
            return data;
        } else {
            return "Sin información";
        }
    }

    const oficial_name = document.getElementById("name").value;
    const oficial_user = document.getElementById("user").value;

    const app = document.getElementById("tax").value;
    const mantain = document.getElementById("mantain").value;
    const remote = document.getElementById("remote").value;

    const problem = document.getElementById("problem").value;

    // Pruebas de la mesa
    const tests = document.getElementById("tests").value;
    const group = document.getElementById("resolutor").value;
    const action = document.getElementById("action").value;

    let station_type = [];
    let station_list = [];

    let _count = 0;
    stations.stations.forEach(element => {
        if(element.length === 4){
            station_type.append("sin informacion");
        } else {
            station_list.append(element);
            station_type.append(stations.station_types[_count]);
        }
        _count++;
    });

    let ip_list = [];
    station.stations.forEach(element => {
        if(element === "164.96" || element === "10.90" ){
            ip_list.append("sin informacion");
        } else {
            ip_list.append(element);
        }
    });


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