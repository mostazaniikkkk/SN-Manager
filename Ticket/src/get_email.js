function getEmailTitle(){
    return `${getElementValueWithFallback("tax")} - ${branch.customBranchName} - ${action.value}`.toUpperCase();
}

function getEmail(){
    testString = (tests.value ? tests.value + '. ' : '') + (resolutor.value == 'N1' ? 'Solucionado en llamada.' : 'Derivado a ' + resolutor.value + ' para ' + action.value + '.');

    const empName = employee.employee.value ? employee.employee.value : '';
    const appName = app.value ? app.value : '';
    const branchName = branch.customBranchName ? branch.customBranchName : '';
    const signal = problem.value ? problem.value : '';
    const diagnostic = testString ? testString : '';

    return `• Ticket Service Now: ${ticket_No.value}
• Servicio: ${capitalize(appName)}
• Oficina: ${branch.selectedBranch} ${capitalize(branchName)}
• Nombre Funcionario: ${capitalize(empName)}
• Correo: ${employee.emails.emails}
• Estación: ${stations.stations} 
• Número de Contacto Respaldo:  ${employee.phones.phone[0]}
• Síntoma: ${capitalize(signal)}
• Diagnóstico: ${capitalize(diagnostic)}

Saludos, 

Mesa de Servicios Nuevo SIDIV

${agent_name.value}

Email : mdsf@nuevosidiv.registrocivil.cl`;
}