function addElement(id, title, elementHTML, func = null) {
    const titleHTML = `<h5>${title.toUpperCase()}:</h5>`;
    const parentElement = document.getElementById(`${id}-container`);

    if (parentElement) {
        parentElement.innerHTML += titleHTML + elementHTML;

        if (func) {
            // Encontrar el último elemento añadido para el event listener
            const addedElements = parentElement.querySelectorAll('*');
            const lastAddedElement = addedElements[addedElements.length - 1];

            if (lastAddedElement) {
                lastAddedElement.addEventListener("click", func);
            } else {
                console.error("No se pudo agregar el event listener. Elemento no encontrado.");
            }
        }
    } else {
        console.error(`Elemento con ID "${id}" no encontrado.`);
    }
}

export default addElement;