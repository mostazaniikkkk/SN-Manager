class OfficialLetter extends Autoincremental {
    constructor() {
        const elementHTML = `
            <input type="text" name="office-number" id="office-number" placeholder="Ingrese numero de oficio"> <br>
            <input type="text" name="office-id" id="office-id" placeholder="Ingrese el ID de oficina"> <br>
            <label for="document">Tipo documento</label>
            <select name="document" id="document">
              <option value="cedula">Cedula</option>
              <option value="pasaporte">Pasaporte</option>
            </select> <br>
    
            <label for="year">Año emision</label>
            <select name="year" id="year">
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
        `;

        const idContainer = "letter";
        const listenedElements = ["office-number", "office-id", "document", "year"];

        super(idContainer, elementHTML, listenedElements);

        this.officeData = {};

        this.generateTemplate();
        this.updateInitialData();
        this.updateOfficeData();
    }

    generateTemplate() {
        super.generateTemplate();
        this.updateOfficeData();
    }

    updateOfficeData() {
        const officeNumberData = this._data["office-number"];
        const officeIdData = this._data["office-id"];
        const documentData = this._data["document"];
        const yearData = this._data["year"];

        if (!officeNumberData || !officeIdData || !documentData || !yearData) {
            return;
        }

        this.officeData = {
            officeNumber: officeNumberData[0].value,
            officeId: officeIdData[0].value,
            document: documentData[0].value,
            year: yearData[0].value
        };
    }

    removeLastTemplate() {
        super.removeLastTemplate();
        this.updateOfficeData();
    }

    updateInitialData() {
        this._listenedElements.forEach(element => {
            const elements = document.querySelectorAll(`[id^="${element}"]`);
            elements.forEach((el, index) => {
                this.updateData(element, el.id, el.value);
            });
        });
        this.updateOfficeData();
    }
}
addElement(
    "letter-manager",
    "oficios",
    '<div id="letter-container"></div>'
)


// Inicializar la clase después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    let letter = new OfficialLetter();
});