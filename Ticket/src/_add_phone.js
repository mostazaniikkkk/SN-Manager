class ContactManager extends Autoincremental {
    constructor(idContainer) {
        const elementHTML = `
            <select name="phone-id-${idContainer}" id="phone-id-${idContainer}">
                <option value="+569">+569</option>
                <option value="+562">+562</option>
                <option value="+">+</option>
                <option value="Anexo ">Anexo</option>
            </select>
            <input type="phone" name="phone-${idContainer}" id="phone-${idContainer}" placeholder="Numero de linea">
            <button id="copy-button-${idContainer}" class="copy-button">Copiar 📋</button>
        `;

        const listenedElements = [`phone-id-${idContainer}`, `phone-${idContainer}`, `copy-button-${idContainer}`];

        super(idContainer, elementHTML, listenedElements);

        this._idContainer = idContainer;
        this.phone = [];

        this.generateTemplate();
        this.updateInitialData(); // Llamar a updateInitialData después de inicializar la vista
        this.updatePhoneList(); // Asegurarse de que updatePhoneList se llame después de inicializar los datos
    }

    generateTemplate() {
        super.generateTemplate();
        this.updatePhoneList();

        // Obtener el último número de teléfono agregado
        const lastPhoneIndex = this.phone.length - 1;
        const lastPhoneNumber = this.phone[lastPhoneIndex];

        // Pasar el número de teléfono a setCopyButtonEvent
        this.setCopyButtonEvent(lastPhoneIndex);
    }

    updatePhoneList() {
        this.phone = [];
        const phoneIdData = this._data[`phone-id-${this._idContainer}`];
        const phoneData = this._data[`phone-${this._idContainer}`];

        if (!phoneIdData || !phoneData) {
            return;
        }

        for (let i = 0; i < phoneIdData.length; i++) {
            const prefix = phoneIdData[i].value;
            const number = phoneData[i].value;
            this.phone.push(`${prefix}${number}`);
        }
    }

    removeLastTemplate() {
        super.removeLastTemplate();
        this.updatePhoneList();
    }

    setCopyButtonEvent(index) {
        // Obtener el identificador del botón de copiar combinando idContainer e iterationCount
        const copyButtonId = `copy-button-${this._idContainer}-${this._iterationCount}`;
        const copyButton = document.getElementById(copyButtonId);

        // Verificar si el elemento existe
        if (copyButton) {
            // Asignar el manejador de eventos al botón de copiar
            copyButton.addEventListener('click', () => {
                this.updatePhoneList(); // Llamar a updatePhoneList antes de copiar el número

                // Obtener el prefijo y el número del elemento actual
                const phoneNumber = this.phone[index];

                // Llamar a la función copyToClipboard externa
                copyToClipboard(phoneNumber);
            });
        } else {
            console.error(`No se encontró el botón de copiar con ID: ${copyButtonId}`);
        }
    }


    updateInitialData() {
        this._listenedElements.forEach(element => {
            const elements = document.querySelectorAll(`[id^="${element}"]`);
            elements.forEach((el, index) => {
                this.updateData(element, el.id, el.value);
            });
        });
        this.updatePhoneList(); // Asegurarse de que updatePhoneList se llame después de inicializar los datos
    }
}
