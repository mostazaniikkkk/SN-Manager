// Funcionario.js (Definición de la clase Employee)

export class Employee {
    constructor(container) {
        // Referencia al elemento contenedor del DOM
        this.container = container;
        // Propiedades del funcionario
        this.name = '';
        this.username = '';
        this.email = '';
        this.contactNumbers = [];
        this.contactNumberContainers = []; // Arreglo para almacenar los contenedores de cada número de contacto
        this.render();
    }

    render() {
        // Generar el HTML para el funcionario dentro del contenedor
        this.container.innerHTML =
            `<h3 id="employee-name"></h3>
            <p>Username: <input type="text" id="employee-username"></p>
            <p>Email: <input type="text" id="employee-email"> @ <select id="email"></select></p>
            <p>Números de Contacto:</p>
            <div id="employee-contact-numbers"></div>
            <button id="employee-add-contact-number">Agregar Número</button>`;

        // Obtener los dominios de correo electrónico a través del Excel Controller
        window.fillEmailDomains('email');

        // Agregar un listener al botón para agregar números de contacto
        this.container.querySelector('#employee-add-contact-number').addEventListener('click', () => {
            this.addContactNumber();
        });

        // Inicializar los contenedores de números de contacto
        this.initializeContactNumbers();

        // Obtener valores del DOM y actualizar las propiedades
        this.updateFromDom();
        // Actualizar el HTML con los valores de las propiedades
        this.container.querySelector('#employee-name').textContent = this.name;
        this.container.querySelector('#employee-username').value = this.username;
        this.container.querySelector('#employee-email').value = this.email;
    }

    updateFromDom() {
        // Obtener valores del DOM y actualizar las propiedades
        this.name = this.container.querySelector('#employee-name').textContent;
        this.username = this.container.querySelector('#employee-username').value;
        this.email = this.container.querySelector('#employee-email').value;
        // Los números de contacto se actualizan en initializeContactNumbers()
    }

    addContactNumber() {
        // Obtener el contenedor principal de los números de contacto
        const contactNumbersContainer = this.container.querySelector('#employee-contact-numbers');

        // Crear un nuevo contenedor para el número de contacto
        const newContactNumberContainer = document.createElement('div');
        newContactNumberContainer.classList.add('contact-number-container');

        // Agregar el HTML para el nuevo número de contacto
        newContactNumberContainer.innerHTML = `
            <select name="phone.id">
                <option value="+569">+569</option>
                <option value="+562">+562</option>
                <option value="+">+</option>
            </select>
            <input type="phone" name="phone" placeholder="Numero de linea">
            <button class="copy-button">Copiar</button>
        `;

        // Agregar el contenedor del nuevo número al contenedor principal
        contactNumbersContainer.appendChild(newContactNumberContainer);
        this.contactNumberContainers.push(newContactNumberContainer);
    }

    initializeContactNumbers() {
        // Obtener todos los divs contenedores de números de contacto
        this.contactNumberContainers = Array.from(this.container.querySelectorAll('#employee-contact-numbers .contact-number-container'));
    }

    destroy() {
        // Eliminar el funcionario del DOM
        if (this.container) {
            this.container.remove();
        }
    }
}