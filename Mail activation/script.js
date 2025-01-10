function getGettings() {
    const employeeName = capitalize(document.getElementById('name').value);
    return `Estimado(a) ${employeeName ? employeeName : ''}:\n`;
}

const account = "Para casos de contraseñas expiradas se debe llamar al número 229636200, un agente de mesa de ayuda lo atenderá.";
const forbidden = "De acuerdo al listado de personas autorizadas por el SRCeI, usted no se encuentra autorizado(a) para solicitar esta acción.";

const hasInfo = "Se adjunta información de contacto para escalar el caso y realizar solicitud.";
const hasntInfo = "Caso debe ser escalado y solicitado por su autorizador de cuentas de la zona.";

function clean() {
    document.getElementById('name').value = "";
    document.getElementById('contact-data').value = "";
}

function updateTextbox(){
    const element = document.getElementById('error-type');
    const textbox = document.getElementById('contact-container');

    if (element.value === "forbidden") {
        textbox.hidden = false;
    } else {
        textbox.hidden = true;
    }
}

document.getElementById('error-type').addEventListener("click", updateTextbox);

function getMail() {
    const type = document.getElementById('error-type').value;
    let message;
    let emailBody;

    if(type == "forbidden"){
        footer = capitalize(document.getElementById('contact-data').value);
        if(footer === ""){
            message = hasntInfo;
        } else {
            message = hasInfo + '\n\n' + footer;
        }
        emailBody = forbidden + '\n' + message + '\n';
    } else {
        emailBody = account + '\n';
    }

    return `${getGettings()}\n${emailBody}\nSaludos cordiales.`;
}

updateTextbox();

let selector = document.getElementById('selector');

selector.addEventListener("click", () => {
    if(selector.checked){
        document.getElementById('mail').hidden = true;
        document.getElementById('exception').hidden = false;
    } else {
        document.getElementById('mail').hidden = false;
        document.getElementById('exception').hidden = true;
    }
})

document.getElementById('mail').hidden = false;
document.getElementById('exception').hidden = true;