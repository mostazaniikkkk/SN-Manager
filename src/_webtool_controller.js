fetch('http://localhost:5000/ping')
.then(response => {
if (response.ok) {
    console.log('Ping exitoso. Backend disponible.');
    const apiElements = document.querySelectorAll('.API');
    apiElements.forEach(element => {
        element.hidden = false;
        console.log(element.textContent); 
    });

    const notapiElements = document.querySelectorAll('.notAPI');
    notapiElements.forEach(element => {
        element.hidden = true;
        console.log(element.textContent); 
    });
} else {
    console.log('Ping fallido. Backend no disponible.');
}
})
.catch(error => {
    console.error('Error al hacer ping al backend:', error);
    document.getElementById('warning').hidden = false;
});