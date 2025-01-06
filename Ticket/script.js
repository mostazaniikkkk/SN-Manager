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
    employee.phones.updatePhoneList();
    employee.emails.updateEmailList();

    return `
TIPO ESTACION:ETF
NOMBRE MAQUINA:ETF-
NOMBRE:${employee.employee}
EMAIL:${employee.emails.emails}
FONO FIJO:SIN INFORMACION
CELULAR:${employee.phones.phone}
OFICINA:SRCEI
IP:164.96
CUENTA USUARIO:${employee.username}
APLICACIÓN CON PROBLEMA:MORPHO EVA
PROBLEMA:
PRUEBAS DE LA MESA:
MANTENCION PREVENTIVA:NO
REMOTO:NO`.toUpperCase();
}