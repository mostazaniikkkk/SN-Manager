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

export default copyToClipboard;