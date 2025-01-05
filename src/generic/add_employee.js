class Employee{
    constructor(){
        //Gestor de contacto
        addElement(
            "employee-phone",
            "linea de contacto",
            '<div id="phone-container"></div>'
        )
        
        //Gestor de correos
        addElement(
            "employee-email",
            "email",
            '<div id="email-container"></div>'
        )

        //Nombre funcionario
        addElement(
            "employee-name",
            "nombre de funcionario",
            `<input type="text" name="nombre"  id="name" placeholder="Nombre del funcionario">
            <button class="API" hidden>Validar</button>`
        )

        //Nombre funcionario
        addElement(
            "employee-username",
            "nombre de usuario",
            `<input type="text" name="name" id="user" placeholder="Nombre de usuario">`
        )

        this.phones = new ContactManager("phone");
        this.emails = new EmailManager("email");
    }
}

// Inicializar la clase después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new Employee();
  });