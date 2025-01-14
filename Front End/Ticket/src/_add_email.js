class EmailManager extends Autoincremental {
    constructor(idContainer) {
        const elementHTML = `
            <input type="text" id="email-user" placeholder="correo electronico del funcionario"> @
            <select name="email" id="email-domain">
                <option value="registrocivil.gob.cl">registrocivil.gob.cl</option>
                <option value="srcei.cl">srcei.cl</option>
                <option value="srcei.gob.cl">srcei.gob.cl</option>
                <option value="nuevosidiv.registrocivil.cl">nuevosidiv.registrocivil.cl</option>
                <option value="minrel.gob.cl">minrel.gob.cl</option>
            </select>
            <button id="copy-button-" class="copy-button">Copiar 📋</button>
        `;

        const listenedElements = ["email-user", "email-domain"];

        super(idContainer, elementHTML, listenedElements);

        this.emails = [];

        this.generateTemplate();
        this.updateInitialData(); // Llamar a updateInitialData después de inicializar la vista
        this.updateEmailList(); // Asegurarse de que updateEmailList se llame después de inicializar los datos
    }

    generateTemplate() {
        super.generateTemplate();
        this.updateEmailList();

        // Obtener el último correo electrónico agregado
        const lastEmailIndex = this.emails.length - 1;
        const lastEmail = this.emails[lastEmailIndex];

        // Pasar el correo electrónico a setCopyButtonEvent
        this.setCopyButtonEvent(lastEmailIndex);
    }

    updateEmailList() {
        this.emails = [];
        const emailUserData = this._data["email-user"];
        const emailDomainData = this._data["email-domain"];

        if (!emailUserData || !emailDomainData) {
            return;
        }

        for (let i = 0; i < emailUserData.length; i++) {
            const user = emailUserData[i].value;
            const domain = emailDomainData[i].value;
            this.emails.push(`${user}@${domain}`);
        }
    }

    removeLastTemplate() {
        super.removeLastTemplate();
        this.updateEmailList();
    }

    setCopyButtonEvent(index) {
        // Obtener el ID del último botón generado
        const lastButtonId = `copy-button-${this._iterationCount}`;
    
        // Obtener el elemento
        const copyButton = document.getElementById("copy-button-");
        copyButton.setAttribute("id", lastButtonId);
    
        // Asignar el manejador de eventos al botón de copiar
        copyButton.addEventListener('click', () => {
            this.updateEmailList(); // Llamar a updateEmailList antes de copiar el correo
    
            // Obtener el correo del elemento actual
            const email = this.emails[index];
    
            // Llamar a la función copyToClipboard externa
            copyToClipboard(email);
        });
    }

    updateInitialData() {
        this._listenedElements.forEach(element => {
            const elements = document.querySelectorAll(`[id^="${element}"]`);
            elements.forEach((el, index) => {
                this.updateData(element, el.id, el.value);
            });
        });
        this.updateEmailList(); // Asegurarse de que updateEmailList se llame después de inicializar los datos
    }
}