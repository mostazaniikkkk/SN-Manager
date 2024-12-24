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
    ticket = document.getElementById("data").value;
    return `ESTIMADOS,
SOLICITO ACTIVAR LOS SIGUIENTES DOCUMENTOS. ADJUNTO ARCHIVO CON DATOS DE LOS DOCUMENTOS DE IDENTIDAD. 

${ticket.toUpperCase()}

DE ANTEMANO QUEDO MUY AGRADECIDO POR LA GESTIÓN. 
SALUDOS CORDIALES,

POR FAVOR ACTIVAR DOCUMENTOS SOLICITADOS.`
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