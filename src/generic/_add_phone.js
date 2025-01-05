class ContactManager extends Autoincremental {
    constructor(idContainer) {
        const elementHTML = `
            <select name="phone-id" id="phone-id">
                <option value="+569">+569</option>
                <option value="+562">+562</option>
                <option value="+">+</option>
                <option value="Anexo ">Anexo</option>
            </select>
            <input type="phone" name="phone" id="phone" placeholder="Numero de linea">
            <button id="copy-button-" class="copy-button">Copiar</button>
        `;

        const listenedElements = ["phone-id", "phone"];

        super(idContainer, elementHTML, listenedElements);

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
        const phoneIdData = this._data["phone-id"];
        const phoneData = this._data["phone"];

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
        // Obtener el ID del último botón generado
        const lastButtonId = `copy-button-${this._iterationCount}`;
    
        // Obtener el elemento
        const copyButton = document.getElementById("copy-button-");
        copyButton.setAttribute("id", lastButtonId);
    
        // Asignar el manejador de eventos al botón de copiar
        copyButton.addEventListener('click', () => {
            this.updatePhoneList(); // Llamar a updatePhoneList antes de copiar el número
    
            // Obtener el prefijo y el número del elemento actual
            const phoneNumber = this.phone[index];
    
            // Llamar a la función copyToClipboard externa
            copyToClipboard(phoneNumber);
        });
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