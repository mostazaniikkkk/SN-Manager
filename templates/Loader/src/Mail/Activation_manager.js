function getClientMail(){
    ticket = document.getElementById("ticket").value;
    
    return `Buenos días estimado, 
Según documento adjunto, se genera número de ticket ${ticket}, por favor revisar.
    
Saludos cordiales.`;
}

function getInternalMail(){
    ext_id = document.getElementById("extern").value;
    if(ext_id === ""){
        ticket = document.getElementById("ticket").value;

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
    signature = signature !== "" ? `, \n${signature}` : '.' 

    return `${header !== "" ? header + '\n\n' : ""}ESTIMADOS,
SOLICITO ACTIVAR LOS SIGUIENTES DOCUMENTOS. ADJUNTO ARCHIVO CON DATOS DE LOS DOCUMENTOS DE IDENTIDAD. 

${document.getElementById("data").value.toUpperCase()}

POR FAVOR ACTIVAR DOCUMENTOS SOLICITADOS. DE ANTEMANO QUEDO MUY AGRADECIDO POR LA GESTIÓN. 
SALUDOS CORDIALES${signature}`
}

function copyToClipboard(text) {
    // Crear un elemento de texto temporal
    const tempElement = document.createElement('textarea');
    tempElement.value = text;
  
    // Añadir el elemento al documento
    document.body.appendChild(tempElement);
  
    // Seleccionar el texto
    tempElement.select();
    tempElement.setSelectionRange(0, 99999); // Para dispositivos móviles
  
    // Copiar el texto al portapapeles
    document.execCommand('copy');
  
    // Eliminar el elemento temporal
    document.body.removeChild(tempElement);
  
    console.log('Texto copiado al portapapeles:', text);
  }

function clearPage(){
    document.getElementById("header").value = "";
    document.getElementById("signature").value = "";
    clearTicket();
}

function clearTicket(){
    document.getElementById("extern").value = "";
    document.getElementById("ticket").value = "";
    document.getElementById("data").value = "";
}

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

