class Autoincremental {
    constructor(idContainer, elementHTML, listenedElements) {
        if (this.constructor === Autoincremental) {
            throw new Error("Cannot instantiate abstract class 'Autoincremental'");
        }

        this._idContainer = idContainer;
        this._data = {};
        this._iterationCount = 0;
        this._template = elementHTML;
        this._listenedElements = listenedElements;
        this._lastContainer = null;

        this._listenedElements.forEach(element => {
            this._data[element] = [];
        });

        // Obtener el contenedor principal por su ID
        const mainContainer = document.getElementById(`${this._idContainer}-container`);

        // Crear un div para los subcontenedores (plantillas generadas)
        const subcontainersWrapper = document.createElement('div');
        subcontainersWrapper.className = `${this._idContainer}-subcontainers-wrapper`;

        // Agregar el div para los subcontenedores al contenedor principal
        mainContainer.appendChild(subcontainersWrapper);

        // Crear un div para los botones
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = `${this._idContainer}-buttons`;
        buttonsContainer.innerHTML = `
            <button id="+${this._idContainer}" class="plus">+</button>
            <button id="--${this._idContainer}" class="minus">-</button>
        `;

        // Agregar el div de botones al contenedor principal
        mainContainer.appendChild(buttonsContainer);

        // Obtener referencias a los botones
        const addButton = document.getElementById(`+${this._idContainer}`);
        const removeButton = document.getElementById(`--${this._idContainer}`);

        // Agregar event listeners a los botones
        addButton.addEventListener('click', () => this.generateTemplate());
        removeButton.addEventListener('click', () => this.removeLastTemplate());
    }

    generateTemplate() {
        this._iterationCount += 1;
        let modifiedTemplate = this._template;

        this._listenedElements.forEach(element => {
            const baseId = element;
            const newId = `${baseId}-${this._iterationCount}`;

            // Reemplazar solo el ID específico en lugar de todos los elementos con el mismo nombre
            const regex = new RegExp(`id="${baseId}"`, 'g');
            modifiedTemplate = modifiedTemplate.replace(regex, `id="${newId}"`);

            this._data[element].push({ id: newId, value: "" });

            setTimeout(() => {
                const newElement = document.getElementById(newId);
                if (newElement) {
                    if (newElement.tagName.toLowerCase() === 'select') {
                        newElement.addEventListener('click', (event) => {
                            this.updateData(element, newId, event.target.value);
                        });
                    } else {
                        newElement.addEventListener('input', (event) => {
                            this.updateData(element, newId, event.target.value);
                        });
                    }
                }
            }, 0);
        });

        // Crear un nuevo div contenedor para la plantilla
        const newContainer = document.createElement('div');
        newContainer.className = `${this._idContainer}-subcontainer`;
        newContainer.innerHTML = modifiedTemplate;

        // Obtener el contenedor de los subcontenedores
        const subcontainersWrapper = document.querySelector(`.${this._idContainer}-subcontainers-wrapper`);

        // Agregar el nuevo contenedor al contenedor de subcontenedores
        subcontainersWrapper.appendChild(newContainer);

        // Guardar la referencia al último contenedor
        this._lastContainer = newContainer;
    }

    removeLastTemplate() {
        if (this._lastContainer) {
            this._listenedElements.forEach(element => {
                if (this._data[element].length > 0) {
                    const lastData = this._data[element].pop();
                    const lastElement = document.getElementById(lastData.id);
                    if (lastElement) {
                        lastElement.remove();
                    }
                }
            });

            this._lastContainer.remove();
            this._lastContainer = document.querySelector(`.${this._idContainer}-subcontainer:last-child`);
            this._iterationCount -= 1;
        }
    }

    updateData(element, id, value) {
        const index = this._data[element].findIndex(item => item.id === id);
        if (index !== -1) {
            this._data[element][index].value = value;
        }
    }
}