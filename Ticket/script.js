function getElementValueWithFallback(id) {
    const elements = document.querySelectorAll(`#${id}`);
    
    if (elements[0].value === "") {
        return elements[1].value;
    }
    
    return elements[0].value;
}

function get_ticket_title() {
    const action = capitalize(getElementValueWithFallback("action"));
    const taxonomy = capitalize(getElementValueWithFallback("tax"));

    return `${action} - ${taxonomy}`;
}

function copyTicket(){
    copyToClipboard(
        get_ticket(
            generateCombinedString(device, citizen)
        )
    )
}

//Gestor de hardware y ciudadanos
let hasCitizen = false;
let hasHardware = false;

document.getElementById('has-citizen').addEventListener("click", () => {
    document.getElementById('citizen-container').hidden = document.getElementById('has-citizen').checked + -1;
    hasCitizen = document.getElementById('has-citizen').checked;
});

document.getElementById('has-hardware').addEventListener("click", () => {
    document.getElementById('hardware-container').hidden = document.getElementById('has-hardware').checked + -1;
    hasHardware = document.getElementById('has-hardware').checked;
});

function generateCombinedString(hardwareManager, citizenManager) {
    hardwareManager.updateDeviceList();
    citizenManager.updateCitizenList();

    const combinedStrings = [];

    const citizenMaxLength = Math.max(citizenManager.citizenRuts.length, citizenManager.citizenNames.length, citizenManager.citizenAdditionals.length);
    for (let i = 0; i < citizenMaxLength; i++) {
        const citizenString = `RUT: ${citizenManager.citizenRuts[i]}\nNOMBRE: ${citizenManager.citizenNames[i]}\nHOLA SOY ADICIONAL ${citizenManager.citizenAdditionals[i]}`;
        combinedStrings.push(citizenString);
    }

    const hardwareMaxLength = Math.max(hardwareManager.deviceNames.length, hardwareManager.deviceRotules.length, hardwareManager.deviceDamages.length);
    for (let i = 0; i < hardwareMaxLength; i++) {
        const hardwareString = `NOMBRE PIEZA: ${hardwareManager.deviceNames[i]}\nROTULO: ${hardwareManager.deviceRotules[i]}\nDAÑO: ${hardwareManager.deviceDamages[i]}`;
        combinedStrings.push(hardwareString);
    }

    return combinedStrings.join("\n\n");
}

//Gestor de grupo resolutor

let resolutorGroup;

document.getElementById('action').addEventListener("click", () => {
    resolutorGroup = document.getElementById('action').value;
});