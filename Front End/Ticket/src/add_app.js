addElement(
    'app',
    'aplicacion',
    `    <select name="resolutor" id="resolutor" class="notAPI">
        <option value="N1">N1 - Mesa Idemia</option>
        <option value="N2 Idemia">N2 - Sitios Remotos</option>
        <option value="N2 TI">N2 - TI</option>
        <option value="N2 SRCEI">N2 - SRCeI</option>
        <option value="N3">N3 - CECOM</option>
    </select>
    <select name="action" id="action" class="notAPI">
        <option value="reconfigurar">Reconfigurar</option>
        <option value="revisar">Revisar</option>
    </select> <br>
    <select name="tax" id="tax" class="API" hidden></select>
    <input type="text" name="tax" id="tax" class="notAPI" placeholder="Ingrese nombre de la aplicacion">
    <select name="resolutor" id="resolutor" class="API" hidden>
    </select>
    <select name="action" id="action" class="API" hidden>
    </select>`
);

let app = new Value("tax");
let action = new Value("action");
let resolutor = new Value("resolutor");