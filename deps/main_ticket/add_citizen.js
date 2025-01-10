class CitizenManager extends Autoincremental {
    constructor() {
        const elementHTML = `
            <input type="text" name="" id="citizen-rut" placeholder="RUT del ciudadano"> <br>
            <input type="text" name="" id="citizen-name" placeholder="Nombre del ciudadano"><br>
            <input type="text" name="" id="citizen-additional" placeholder="Adicional">
        `;

        const listenedElements = ["citizen-rut", "citizen-name", "citizen-additional"];

        const idContainer = "citizen";

        super(idContainer, elementHTML, listenedElements);

        this.ruts = [];
        this.names = [];
        this.additionals = [];

        this.generateTemplate();
        this.updateInitialData();
        this.updateCitizenLists();
    }

    generateTemplate() {
        super.generateTemplate();
        this.updateCitizenLists();
    }

    updateCitizenLists() {
        this.ruts = [];
        this.names = [];
        this.additionals = [];

        const rutData = this._data["citizen-rut"];
        const nameData = this._data["citizen-name"];
        const additionalData = this._data["citizen-additional"];

        if (!rutData || !nameData || !additionalData) {
            return;
        }

        for (let i = 0; i < rutData.length; i++) {
            this.ruts.push(rutData[i].value);
            this.names.push(nameData[i].value);
            this.additionals.push(additionalData[i].value);
        }
    }

    removeLastTemplate() {
        super.removeLastTemplate();
        this.updateCitizenLists();
    }

    updateInitialData() {
        this._listenedElements.forEach(element => {
            const elements = document.querySelectorAll(`[id^="${element}"]`);
            elements.forEach((el, index) => {
                this.updateData(element, el.id, el.value);
            });
        });
        this.updateCitizenLists();
    }
}

let citizen;

document.addEventListener('DOMContentLoaded', () => {
    citizen = new CitizenManager();
  });