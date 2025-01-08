class Employee{
    constructor(){
        //Gestor de contacto
        addElement(
            "employee-phone",
            "linea de contacto",
            '<div id="phone-container"></div>'
        );
        
        //Gestor de correos
        addElement(
            "employee-email",
            "email",
            '<div id="email-container"></div>'
        );

        //Nombre funcionario
        addElement(
            "employee-name",
            "nombre de funcionario",
            `<input type="text" name="nombre"  id="name" placeholder="Nombre del funcionario">  <br>
            <input type="text" name="user" id="user" placeholder="Nombre de usuario">
            <button class="API" hidden>Validar</button>`
        );

        this.phones = new ContactManager("phone");
        this.emails = new EmailManager("email");
        this.employee = "";
        this.username = "";

        const fullname = document.getElementById('name');
        const user = document.getElementById('user');
        
        fullname.addEventListener('change', () => {
            this.employee = fullname.value;
        });

        fullname.addEventListener('change', () => {
            this.username = user.value;
        });
    }
}

// Inicializar la clase después de que el DOM esté cargado
let employee;

document.addEventListener('DOMContentLoaded', () => {
    employee = new Employee();
  });