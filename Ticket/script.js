function getElementValueWithFallback(id) {
    const elements = document.querySelectorAll(`#${id}`);
    
    if (elements.length > 1 && elements[0].value === "") {
        return elements[1].value;
    }
    
    return elements[0]?.value || "";
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

// Gestor de hardware y ciudadanos
let hasCitizen = false;
let hasHardware = false;

document.getElementById('has-citizen').addEventListener("click", () => {
    document.getElementById('citizen-container').hidden = !document.getElementById('has-citizen').checked;
    hasCitizen = document.getElementById('has-citizen').checked;
});

document.getElementById('has-hardware').addEventListener("click", () => {
    document.getElementById('hardware-container').hidden = !document.getElementById('has-hardware').checked;
    hasHardware = document.getElementById('has-hardware').checked;
});

function generateCombinedString(hardwareManager, citizenManager) {
    hardwareManager.updateDeviceLists();
    citizenManager.updateCitizenLists();

    const combinedStrings = [];

    if (hasCitizen) {
        const citizenMaxLength = Math.max(citizenManager.ruts.length, citizenManager.names.length, citizenManager.additionals.length);
        for (let i = 0; i < citizenMaxLength; i++) {
            const citizenString = `RUT: ${citizenManager.ruts[i] || ''}\nNOMBRE: ${citizenManager.names[i] || ''}${citizenManager.additionals[i] ? '\n' + citizenManager.additionals[i] : ''}`;
            combinedStrings.push(citizenString);
        }
    }

    if (hasHardware) {
        const hardwareMaxLength = Math.max(hardwareManager.names.length, hardwareManager.rotules.length, hardwareManager.damages.length);
        for (let i = 0; i < hardwareMaxLength; i++) {
            const hardwareString = `NOMBRE PIEZA: ${hardwareManager.names[i] || ''}\nROTULO: ${hardwareManager.rotules[i] || ''}\nDAÑO: ${hardwareManager.damages[i] || ''}`;
            combinedStrings.push(hardwareString);
        }
    }

    return combinedStrings.join("\n\n");
}

// Gestor de grupo resolutor
document.getElementById('action').addEventListener("click", () => {
    checkState();
});

function checkState() {
    // Error: "array" no es una propiedad de los NodeList, usamos forEach de NodeList.prototype
    document.querySelectorAll(".N2S").forEach(element => {
        element.hidden = true;
    });

    switch (resolutor.value) {
        case 'N2 SRCEI':
            document.querySelectorAll(".N2S").forEach(element => {
                element.hidden = false;
            });
    }
}
