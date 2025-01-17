function getClientMail(){
    const ticket = document.getElementById("ticket").value;
    
    return `
Estimado/a funcionario/a 
Se genera ticket ${ticket} para atención del inconveniente informado.
Se adjuntan archivos solicitados en el correo

Para consultar avances y/o estado de su reporte, favor comunicarse al número 229636200 
Saluda Atte.`;
}

function getInternalMail(){
    let ext_id = document.getElementById("extern").value;
    if(ext_id === ""){
        let ticket = document.getElementById("ticket").value;

        return `Buenos días estimada,
De momento el número de servicio no pudo ser generado, adjunto número de ticket ${ticket}.
 
Saludos Cordiales.`
    } else {
        return `Buenos días estimada,
Su numero de Service Desk es ${ext_id}.

Saludos Cordiales.`
    }
}

function generateEmail() {
    const header = document.getElementById('header').value.toUpperCase();   
    let signature = document.getElementById('signature').value.toUpperCase();
    const type = document.getElementById('type').value.toUpperCase();

    signature = signature !== "" ? `, \n${signature}` : '.' 

    return `${header !== "" ? header + '\n\n' : ""}ESTIMADO(A),
SE SOLICITA ${type} PARA FUNCIONARIO(A) QUE SE INDICA EN PLANILLA ADJUNTA.

${document.getElementById("data").value.replace(/(\r?\n){2,}/g, '\n').toUpperCase()}

SALUDOS CORDIALES${signature.replace(/(\r?\n){2,}/g, '\n')}

POR FAVOR ACTIVAR DOCUMENTOS SOLICITADOS. DE ANTEMANO QUEDO MUY AGRADECIDO POR LA GESTIÓN. `
}

const ticket = ["extern", "ticket", "data"];
const page = ["header", "signature"].concat(ticket);

// Muestra el contador de elementos del cuerpo
document.addEventListener('DOMContentLoaded', (event) => {
    var ticketBox = document.getElementById('data');
    ticketBox.addEventListener('input', updateCount);

    var headerBox = document.getElementById('header');
    headerBox.addEventListener('input', updateCount);

    var sigBox = document.getElementById('signature');
    sigBox.addEventListener('input', updateCount);
});

function updateCount() {
    var ticketLenght = document.getElementById('data').value.length;
    var headerLenght = document.getElementById('header').value.length;
    var sigLenght = document.getElementById('signature').value.length;

    var tickets = Math.ceil(ticketLenght / 4000);
    document.getElementById('counter').textContent = `${(228 * tickets) + headerLenght + ticketLenght + sigLenght} Caracteres usados, se requiere${tickets  !== 1 ? 'n' : ''} ${tickets} ticket${tickets  !== 1 ? 's' : ''} para subir todo.`;
}