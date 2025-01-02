// Branch.js (Definición de la clase Branch)

export class Branch {
    constructor(container) {
        this.container = container;
        this.name = '';
        this.type = 'SRCEI'; // Valor predeterminado
        this.address = '';
        this.openingHours = '';
        this.contactNumber = '';
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <h3 id="branch-name"></h3>
            <p>Tipo: 
                <select id="branch-type">
                    <option value="SRCEI">SRCEI</option>
                    <option value="Consulado">Consulado</option>
                </select>
            </p>
            <p>Dirección: <input type="text" id="branch-address"></p>
            <p>Horario de Atención: <input type="text" id="branch-opening-hours"></p>
            <p>Número de Contacto: <input type="text" id="branch-contact-number"></p>
        `;

        // Establecer el valor seleccionado en el select
        this.container.querySelector(`#branch-type`).value = this.type;

        // Agregar event listeners para actualizar propiedades y DOM cuando cambian los valores
        this.container.querySelector(`#branch-type`).addEventListener('change', (event) => {
            this.type = event.target.value;
        });

        this.container.querySelector(`#branch-address`).addEventListener('input', (event) => {
            this.address = event.target.value;
        });

        this.container.querySelector(`#branch-opening-hours`).addEventListener('input', (event) => {
            this.openingHours = event.target.value;
        });

        this.container.querySelector(`#branch-contact-number`).addEventListener('input', (event) => {
            this.contactNumber = event.target.value;
        });

        // Obtener valores del DOM y actualizar las propiedades
        this.updateFromDom();

        // Actualizar el HTML con los valores de las propiedades
        this.container.querySelector('#branch-name').textContent = this.name;
        this.container.querySelector('#branch-address').value = this.address;
        this.container.querySelector('#branch-opening-hours').value = this.openingHours;
        this.container.querySelector('#branch-contact-number').value = this.contactNumber;

    }

    updateFromDom() {
        // Obtener valores del DOM y actualizar las propiedades
        this.name = this.container.querySelector('#branch-name').textContent;
        this.type = this.container.querySelector('#branch-type').value;
        this.address = this.container.querySelector('#branch-address').value;
        this.openingHours = this.container.querySelector('#branch-opening-hours').value;
        this.contactNumber = this.container.querySelector('#branch-contact-number').value;
    }

    destroy() {
        // Eliminar la sucursal del DOM
        if (this.container) {
            this.container.remove();
        }
    }
}