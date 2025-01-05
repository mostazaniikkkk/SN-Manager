class BranchManager {
  static instance = null;

  constructor() {
    if (BranchManager.instance) {
      return BranchManager.instance;
    }

    // Ejecutar la función externa addElement para insertar el HTML
    addElement(
      "branch",
      "sucursal",
      `<select name="branch" id="branch">
          <option value="SRCeI">SRCeI</option>
          <option value="SRCeI Atencion terreno">Atencion terreno</option>
          <option value="Consulado">Consulado</option>
          <option value="MinRel">MinRel</option>
        </select>
        <input type="text" name="branch" placeholder="Nombre sucursal">
        <button class="API" hidden>Validar</button><br>
        <input type="text" name="branch_dir" placeholder="(Opcional) Direccion"><br>
        <input type="text" name="branch_dir" placeholder="(Opcional) Horario atencion"><br>
        <div id="branch-phone-container"></div>
        <input type="checkbox" name="showBranch" id="showBranch">
        <label for="showBranch">Mostrar mas</label>`
    );

    // Propiedades que almacenan el estado (valores recolectados)
    this.selectedBranch = null;
    this.customBranchName = null;
    this.branchAddress = null;
    this.branchSchedule = null;

    // Instancia de ContactManager para gestionar los teléfonos
    this._contactManager = new ContactManager("branch-phone");

    // Variables de control de la vista (privadas)
    this._showMore = false;

    // Referencias a elementos del DOM (privadas)
    this._selectElement = document.getElementById("branch");
    this._customBranchInput = document.querySelector('input[name="branch"][placeholder="Nombre sucursal"]');
    this._addressInput = document.querySelector('input[name="branch_dir"][placeholder="(Opcional) Direccion"]');
    this._scheduleInput = document.querySelector('input[name="branch_dir"][placeholder="(Opcional) Horario atencion"]');
    this._showMoreCheckbox = document.getElementById("showBranch");
    this._brElements = document.querySelectorAll("#branch ~ br"); // Selecciona los <br> que siguen a #branch
    this._phoneContainer = document.getElementById("branch-phone-container"); // Contenedor de los teléfonos

    this._addEventListeners();
    this._initialState();

    BranchManager.instance = this;
  }

  _addEventListeners() {
    this._selectElement.addEventListener('change', this._handleSelectChange.bind(this));
    this._customBranchInput.addEventListener('input', this._handleCustomBranchInput.bind(this));
    this._addressInput.addEventListener('input', this._handleAddressInput.bind(this));
    this._scheduleInput.addEventListener('input', this._handleScheduleInput.bind(this));
    this._showMoreCheckbox.addEventListener('change', this._handleShowMoreChange.bind(this));
  }

  _initialState() {
    this.selectedBranch = this._selectElement.value;
    this.customBranchName = this._customBranchInput.value;
    this.branchAddress = this._addressInput.value;
    this.branchSchedule = this._scheduleInput.value;
    this._showMore = this._showMoreCheckbox.checked;

    this._updateDom();
  }

  _handleSelectChange(event) {
    this.selectedBranch = event.target.value;
    this._updateDom();
  }

  _handleCustomBranchInput(event) {
    this.customBranchName = event.target.value;
    this._updateDom();
  }

  _handleAddressInput(event) {
    this.branchAddress = event.target.value;
    this._updateDom();
  }

  _handleScheduleInput(event) {
    this.branchSchedule = event.target.value;
    this._updateDom();
  }

  _handleShowMoreChange(event) {
    this._showMore = event.target.checked;
    this._updateDom();
  }

  _updateDom() {
      // Oculta el campo de texto si la opción es "MinRel"
      this._customBranchInput.hidden = this.selectedBranch === "MinRel";
  
      // Oculta o muestra el contenedor de teléfonos según _showMore
      this._phoneContainer.hidden = !this._showMore;
  
      // Oculta los <br> si el campo de texto está oculto o si _showMore es falso
      this._brElements.forEach(br => {
          br.hidden = this._customBranchInput.hidden || !this._showMore;
      });
  
      // Controla la visibilidad de dirección y horario según _showMore
      this._addressInput.hidden = !this._showMore;
      this._scheduleInput.hidden = !this._showMore;
  }
}

// Inicializar la clase después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  let branch = new BranchManager();
});