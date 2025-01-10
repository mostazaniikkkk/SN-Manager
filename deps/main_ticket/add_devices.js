class HardwareManager extends Autoincremental {
    constructor() {
        const elementHTML = `
            <input type="text" name="" id="item-name" placeholder="Nombre del dispositivo"> <br>
            <input type="text" name="" id="item-rotule" placeholder="Rotulo del dispositivo"> <br>
            <label for="item-damage">Falla fisica: </label>
            <select name="item-damage" id="item-damage">
                <option value="si">Si</option>
                <option value="no">No</option>
            </select>
        `;

        const idContainer = "hardware";

        const listenedElements = ["item-name", "item-rotule", "item-damage"];

        super(idContainer, elementHTML, listenedElements);

        this.names = [];
        this.rotules = [];
        this.damages = [];

        this.generateTemplate();
        this.updateInitialData();
        this.updateDeviceLists();
    }

    generateTemplate() {
        super.generateTemplate();
        this.updateDeviceLists();
    }

    updateDeviceLists() {
        this.names = [];
        this.rotules = [];
        this.damages = [];

        const nameData = this._data["item-name"];
        const rotuleData = this._data["item-rotule"];
        const damageData = this._data["item-damage"];

        if (!nameData || !rotuleData || !damageData) {
            return;
        }

        for (let i = 0; i < nameData.length; i++) {
            this.names.push(nameData[i].value);
            this.rotules.push(rotuleData[i].value);
            this.damages.push(damageData[i].value);
        }
    }

    removeLastTemplate() {
        super.removeLastTemplate();
        this.updateDeviceLists();
    }

    updateInitialData() {
        this._listenedElements.forEach(element => {
            const elements = document.querySelectorAll(`[id^="${element}"]`);
            elements.forEach((el, index) => {
                this.updateData(element, el.id, el.value);
            });
        });
        this.updateDeviceLists();
    }
}


let device;

document.addEventListener('DOMContentLoaded', () => {
    device = new HardwareManager();
  });