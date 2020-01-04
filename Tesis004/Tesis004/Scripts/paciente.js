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
		toastr.error("Error al consultar sugerencias del paciente!!");
    };
    $.ajax(ConsultarPaciente);
});

function iniciarTablaResultadoBusqueda() {
    $("#tblResultadoBusqueda").empty();
    var cabecera = "<tr> " +
        "<th scope=\"col\">Paciente</th> " +
        "<th scope=\"col\">Historia Cl&iacute;nica</th> " +
        "<th scope=\"col\">C&eacute;dula</th>" +
        "<th scope=\"col\">Modificar</th>" +
        "<th scope=\"col\">Nueva Cita</th>" +        
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
            fila += "<td scope=\"col\"> <form action=\"../Paciente/ActualizarPaciente\" method=\"POST\"><button name=\"idPaciente\" id=\"btnModificar\" value=\"" + listaPaciente[i]["PacienteID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\"><i class=\"fas fa-edit\"></i></button></form></th >"
			fila += "<td scope=\"col\"> <form action=\"../Servicio/IngresarServicio\" method=\"POST\"><button name=\"idPaciente\" id=\"btnServicios\" value=\"" + listaPaciente[i]["PacienteID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\"><i class=\"fas fa-plus-square\"></i></button></form></th >"
            $("#tblResultadoBusqueda").append("<tr>" + fila + "</tr>");
        }
    };
    ConsultarPaciente.error = function () {
		toastr.error("Error al consultar paciente!!");
    };
    $.ajax(ConsultarPaciente);
}

function guardarPaciente() {
    var RepresentantePaciente = false;
    if ($("#CboxRepresentante").is(':checked')) {
        RepresentantePaciente = true;
    }
    var DiscapacidadPaciente = false;
    if ($("#CboxDiscapacidad").is(':checked')) {
        DiscapacidadPaciente = true;
    }
    var GuardarPaciente = {};
    GuardarPaciente.url = "/Paciente/GuardarPaciente";
    GuardarPaciente.type = "POST";
    GuardarPaciente.data = JSON.stringify({
        numHistoriaClinica: $("#IptNumeroHistoriaClinica").val(),
        nombreCompleto: $("#IptNombreCompleto").val(),
        cedula: $("#IptCedula").val(),
        direccion: $("#IptDireccion").val(),
        email: $("#IptEmail").val(),
        telefono: $("#IptTelefono").val(),
        ocupacion: $("#IptOcupacion").val(),
        fechaNacimiento: $("#IptFechaNacimiento").val(),
        sexo: $("#SltGenero").val(),
        estadoCivil: $("#SltEstadoCivil").val(),
        tipoSangre: $("#SltTipoSangre").val(),
        etnia: $("#SltEtnia").val(),
        nombreContactoEmergencia: $("#IptNombreContactoEmergencia").val(),
        afinidadContactoEmergencia: $("#IptAfinidadContactoEmergencia").val(),
        telefonoContactoEmergencia: $("#IptTelefonoContactoEmergencia").val(),
        representante: RepresentantePaciente,
        discapacidad: DiscapacidadPaciente,
    });
    GuardarPaciente.datatype = "json";
    GuardarPaciente.contentType = "application/json";
    GuardarPaciente.success = function (ingresado) {
		if (ingresado[0] == true) {
            toastr.success("Paciente ingresado!!");
            setTimeout("location.href='../Paciente/BuscarPaciente'", 2000);
        }
        else {
			toastr.error("Paciente NO ingresado!!!!");
        }
        
    };
	GuardarPaciente.error = function () {
		toastr.error("Error al guardar paciente!!");
    };
    $.ajax(GuardarPaciente);
}

$(document).ready(function () {
    buscarPaciente();
});
