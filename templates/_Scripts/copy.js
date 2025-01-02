// copy_to_clipboard.js (Independiente)

function copyToClipboard(text) {
    const tempElement = document.createElement('textarea');
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    tempElement.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    console.log('Texto copiado al portapapeles:', text);
}