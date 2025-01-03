function getGettings() {
    const employeeName = document.getElementById('name').value;
    return `Estimado(a) ${employeeName ? ' ' + employeeName : ''}:\n`;
}

const account = "Para casos de contraseñas expiradas se debe llamar al número 229636200, un agente de mesa de ayuda lo atenderá.";
const forbidden = "De acuerdo al listado de personas autorizadas por el SRCeI, usted no se encuentra autorizado(a) para solicitar esta acción.";

const hasInfo = "Se adjunta información de contacto para escalar el caso y realizar solicitud.";
const hasntInfo = "Caso debe ser escalado y solicitado por su autorizador de cuentas de la zona.";

function clean() {
    document.getElementById('name').value = "";
    document.getElementById('contact-data').value = "";
}

document.getElementById('error-type').addEventListener("click", () => {
    const element = document.getElementById('error-type');
    const textbox = document.getElementById('contact-container');

    if (element.value === "forbidden") {
        textbox.hidden = false;
    } else {
        textbox.hidden = true;
    }
});

function getMail() {
    return `${getGettings()}\n`;
}