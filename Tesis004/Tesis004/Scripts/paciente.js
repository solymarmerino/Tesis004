$("#parametroBusqueda").keypress(function () {
    var OpcionConsulta = "";
    if ($("#SltNombrePaciente").is(':checked')) {
        OpcionConsulta = $("#SltNombrePaciente").val();
    }
    if ($("#SltCedulaPaciente").is(':checked')) {
        OpcionConsulta = $("#SltCedulaPaciente").val();
    }
    if ($("#SltHistoriaClinicaPaciente").is(':checked')) {
        OpcionConsulta = $("#SltHistoriaClinicaPaciente").val();
    }
    var ConsultarPaciente = {};
    ConsultarPaciente.url = "/Paciente/ListarSugerenciaPacienteBusqueda";
    ConsultarPaciente.type = "POST";
    ConsultarPaciente.data = JSON.stringify({
        opcionBusqueda: OpcionConsulta,
        parametroBusqueda: $("#parametroBusqueda").val(),
    });
    ConsultarPaciente.datatype = "json";
    ConsultarPaciente.contentType = "application/json";
    ConsultarPaciente.success = function (listaSugenrenciaPaciente) {
        $("#sugerenciaPaciente").empty();
        for (var i = 0; i < listaSugenrenciaPaciente.length; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + listaSugenrenciaPaciente[i]["ParametroBusqueda"] + "</th >";
            $("#sugerenciaPaciente").append("<option value=\""+ listaSugenrenciaPaciente[i]["ParametroBusqueda"] +"\"></option>");
        }
    };
    ConsultarPaciente.error = function () {
        alert("Error al consultar sugerencias del paciente!!");
    };
    $.ajax(ConsultarPaciente);
});

function iniciarTablaResultadoBusqueda() {
    $("#tblResultadoBusqueda").empty();
    var cabecera = "<tr> " +
        "<th scope=\"col\">Paciente</th> " +
        "<th scope=\"col\">Historia Cl&iacute;nica</th> " +
        "<th scope=\"col\">C&eacute;dula</th>" +
        "<th scope=\"col\"></th>" +
        "<th scope=\"col\"></th>" +        
        " </tr >";
    $("#tblResultadoBusqueda").append(cabecera);
}

function buscarPaciente() {
    var OpcionConsulta = "";
    if ($("#SltNombrePaciente").is(':checked')) {
        OpcionConsulta = $("#SltNombrePaciente").val();
    }
    if ($("#SltCedulaPaciente").is(':checked')) {
        OpcionConsulta = $("#SltCedulaPaciente").val();
    }
    if ($("#SltHistoriaClinicaPaciente").is(':checked')) {
        OpcionConsulta = $("#SltHistoriaClinicaPaciente").val();
    }
    var ConsultarPaciente = {};
    ConsultarPaciente.url = "/Paciente/ListarPacienteBusqueda";
    ConsultarPaciente.type = "POST";
    ConsultarPaciente.data = JSON.stringify({
        opcionBusqueda: OpcionConsulta,
        parametroBusqueda: $("#parametroBusqueda").val(),        
    });
    ConsultarPaciente.datatype = "json";
    ConsultarPaciente.contentType = "application/json";
    ConsultarPaciente.success = function (listaPaciente) {
        iniciarTablaResultadoBusqueda();
        for (var i = 0; i < listaPaciente.length; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + listaPaciente[i]["NombreCompleto"] + "</th >";
            fila += "<td scope=\"col\">" + listaPaciente[i]["NumHistoriaClinica"] + "</th >";
            fila += "<td scope=\"col\">" + listaPaciente[i]["Cedula"] + "</th >";
            fila += "<th scope=\"col\"></th>";
            fila += "<th scope=\"col\"></th>";  
            //fila += "<td scope=\"col\"> <button name=\"btnModificar\" id=\"btnModificar\" value=\"" + listaPersonal[i]["PersonalID"] + "\" style=\"background - color: darkturquoise; border - bottom - color: darkturquoise; color: white; border - radius: 0.3rem; width: 35px; height: 30px; cursor: pointer\" onclick=\"modificar(" + listaPersonal[i]["PersonalID"] + ")\"><i class=\"fas fa-edit\"></i></button></th >"
            //fila += "<td scope=\"col\"> <button name=\"btnServicios\" id=\"btnServicios\" onclick=\"anadirServicio()\">Servicos</button></th >"
            $("#tblResultadoBusqueda").append("<tr>" + fila + "</tr>");
        }
    };
    ConsultarPaciente.error = function () {
        alert("Error al consultar paciente!!");
    };
    $.ajax(ConsultarPaciente);
}

function guardarPaciente() {
    var OpcionConsulta = "";
    if ($("#SltNombrePaciente").is(':checked')) {
        OpcionConsulta = $("#SltNombrePaciente").val();
    }
    if ($("#SltCedulaPaciente").is(':checked')) {
        OpcionConsulta = $("#SltCedulaPaciente").val();
    }
    if ($("#SltHistoriaClinicaPaciente").is(':checked')) {
        OpcionConsulta = $("#SltHistoriaClinicaPaciente").val();
    }
    var ConsultarPaciente = {};
    ConsultarPaciente.url = "/Paciente/ListarPacienteBusqueda";
    ConsultarPaciente.type = "POST";
    ConsultarPaciente.data = JSON.stringify({
        opcionBusqueda: OpcionConsulta,
        parametroBusqueda: $("#parametroBusqueda").val(),
    });
    ConsultarPaciente.datatype = "json";
    ConsultarPaciente.contentType = "application/json";
    ConsultarPaciente.success = function (listaPaciente) {
        iniciarTablaResultadoBusqueda();
        for (var i = 0; i < listaPaciente.length; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + listaPaciente[i]["NombreCompleto"] + "</th >";
            fila += "<td scope=\"col\">" + listaPaciente[i]["NumHistoriaClinica"] + "</th >";
            fila += "<td scope=\"col\">" + listaPaciente[i]["Cedula"] + "</th >";
            fila += "<th scope=\"col\"></th>";
            fila += "<th scope=\"col\"></th>";
            //fila += "<td scope=\"col\"> <button name=\"btnModificar\" id=\"btnModificar\" value=\"" + listaPersonal[i]["PersonalID"] + "\" style=\"background - color: darkturquoise; border - bottom - color: darkturquoise; color: white; border - radius: 0.3rem; width: 35px; height: 30px; cursor: pointer\" onclick=\"modificar(" + listaPersonal[i]["PersonalID"] + ")\"><i class=\"fas fa-edit\"></i></button></th >"
            //fila += "<td scope=\"col\"> <button name=\"btnServicios\" id=\"btnServicios\" onclick=\"anadirServicio()\">Servicos</button></th >"
            $("#tblResultadoBusqueda").append("<tr>" + fila + "</tr>");
        }
    };
    ConsultarPaciente.error = function () {
        alert("Error al consultar paciente!!");
    };
    $.ajax(ConsultarPaciente);
}
