function get_ticket(extraValues = null) {
    const office = branchFilter(`${branch.selectedBranch} ${branch.customBranchName}`);
    employee.phones.updatePhoneList();
    employee.emails.updateEmailList();
    stations.updateStationList();

    return `
TIPO ESTACION:${stations.stationTypes}
NOMBRE MAQUINA:${leghtFiler(stations.stations)}
NOMBRE:${employee.employee}
EMAIL:${emailFilter(employee.emails.emails)}
FONO FIJO:${leghtFiler(branch._contactManager.phone)}
CELULAR:${leghtFiler(employee.phones.phone)}
OFICINA:${office}
IP:${ipFilter(stations.ips)}
CUENTA USUARIO:${employee.username}
APLICACIÓN CON PROBLEMA:${app.value}
PROBLEMA:${problem.value}
${extraValues === null ? "" : extraValues}
PRUEBAS DE LA MESA:${tests.value}
MANTENCION PREVENTIVA:${prevent.value}
REMOTO:${remote.value}`.toUpperCase();
}

function leghtFiler(phones) {
    return phones.map(element => element.length >= 4 ? "sin informacion" : element);
}
  
function emailFilter(emails) {
    return emails.map(element => element.charAt(0) === "@" ? "sin informacion" : element);
}

function ipFilter(ips) {
    return ips.map(element => ["164.96.", "10.90."].includes(element) ? "sin informacion" : element);
}

function branchFilter(branch) {
    return branch.trim().split(/\s+/).length >= 2 ? branch : "sin informacion";
  }  