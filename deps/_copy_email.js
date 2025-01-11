function getEmailTitle(){
    return `${app.value} - ${branch.customBranchName} - ${action.value}`;
}

function getEmail(){
    testString = (tests.value ? tests.value + '. ' : '') + (resolutor.value == 'N1' ? 'Solucionado en llamada.' : 'Derivado a ' + resolutor.value + ' para ' + action.value + '.');

    return `• Ticket Service Now: ${capitalize(ticket_No.value)}
• Servicio: ${capitalize(app.value)}
• Oficina: ${branch.selectedBranch} ${capitalize(branch.customBranchName)}
• Nombre Funcionario: ${capitalize(employee.fullname)}
• Correo: ${employee.emails.email[0]}
• Estación: ${stations.stations} 
• Número de Contacto Respaldo:  ${employee.phones.phone[0]}
• Síntoma: ${problem.value}
• Diagnóstico: ${testString}

Saludos, 

Mesa de Servicios Nuevo SIDIV

${agent_name.value}

Email : mdsf@nuevosidiv.registrocivil.cl`;
}