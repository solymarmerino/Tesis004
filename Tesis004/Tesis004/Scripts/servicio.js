function limpiarTablaCita() {
    $("#tbltablaCita").empty();
    var cabecera = "<tr>"+
                   "<th scope=\"col\">Especialidad</th>"+
                   "<th scope=\"col\">Medico</th>"+
                   "<th scope=\"col\">Tipo cita</th>"+
                   "<th scope=\"col\">Emergencia</th>"+
                   "<th scope=\"col\">Eliminar</th>"+
                   "</tr>" ;
    $("#tbltablaCita").append(cabecera);
}

function consultarCitaPaciente() {
    var ListarPersonal = {};
    ListarPersonal.url = "/Servicio/ListarCitaPaciente";
    ListarPersonal.type = "POST";
    ListarPersonal.data = JSON.stringify({
        pacienteID: $("#IdPaciente").val()
    });
    ListarPersonal.datatype = "json";
    ListarPersonal.contentType = "application/json";
    ListarPersonal.success = function (resultado) {
        if (resultado.length > 0) {           
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombreEspecialidad"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["NombreMedico"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["NombreCita"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["CitaMedicaID"] + "</th >";
                fila += "<td scope=\"col\"> <button name=\"btnEliminarCita\" id=\"btnEliminarCita\" onclick=\"eliminarCita(" + resultado[i]["CitaMedicaID"] + ")\"><i class=\"fas fa - minus - square\"></i></button></th >";
                $("#tbltablaCita").append("<tr>"+fila+"</tr>");
            }            
        }
    };
	ListarPersonal.error = function () {
		toastr.error("Error al listar citas del paciente!!");
    };
    $.ajax(ListarPersonal);
}

function eliminarCita(idCitaMedica) {
    var ListarPersonal = {};
    ListarPersonal.url = "/Servicio/EliminarCIta";
    ListarPersonal.type = "POST";
    ListarPersonal.data = JSON.stringify({
        CitaMedicaID: idCitaMedica
    });
    ListarPersonal.datatype = "json";
    ListarPersonal.contentType = "application/json";
    ListarPersonal.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Cita eliminada");
            limpiarTablaCita();
            consultarCitaPaciente();
        }
		else {
			toastr.error("Cita NO eliminada");
            limpiarTablaCita();
            consultarCitaPaciente();
        }
    };
	ListarPersonal.error = function () {
		toastr.error("Error al eliminar cita del paciente!!");
    };
    $.ajax(ListarPersonal);
}

$("#sltEspecialidad").change(function () {
    var ListarPersonal = {};
    ListarPersonal.url = "/Personal/ListarPersonalNombrePorEspecialidad";
    ListarPersonal.type = "POST";
    ListarPersonal.data = JSON.stringify({
        especialidad: $("#sltEspecialidad").val()
    });
    ListarPersonal.datatype = "json";
    ListarPersonal.contentType = "application/json";
    ListarPersonal.success = function (listaPersonalPorEspecialidad) {
        $("#sltIdentificadorPersonal").empty();
        $("#sltIdentificadorPersonal").append("<option value=\"0\"> Seleccionar </option>");
        for (var i = 0; i < listaPersonalPorEspecialidad.length; i++) {
            $("#sltIdentificadorPersonal").append("<option value=\"" + listaPersonalPorEspecialidad[i]["PersonalID"] +"\"> "+ listaPersonalPorEspecialidad[i]["Nombre"] +" </option>");
        }
    };
	ListarPersonal.error = function () {
		toastr.error("Error al listar personal!!");
    };
    $.ajax(ListarPersonal);
});

$("#btnGuardarCita").click(function () {
    var ListarPersonal = {};
    ListarPersonal.url = "/Servicio/GuardarCita";
    ListarPersonal.type = "POST";
    ListarPersonal.data = JSON.stringify({
        PacienteID: $("#IdPaciente").val(),
        PersonalID: $("#sltIdentificadorPersonal").val(),
        Fecha: $("#Fecha").val(),
        TipoCita: $("#TipoCita").val()
    });
    ListarPersonal.datatype = "json";
    ListarPersonal.contentType = "application/json";
    ListarPersonal.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Cita guardada");
            limpiarTablaCita();
            consultarCitaPaciente();
        }
		else {
		    toastr.error("Cita NO guardada");
            limpiarTablaCita();
            consultarCitaPaciente();
        }
    };
	ListarPersonal.error = function () {
		toastr.error("Error al guardar cita!!");
        limpiarTablaCita();
        consultarCitaPaciente();
    };
    $.ajax(ListarPersonal);
});

$(document).ready(function () {
    limpiarTablaCita();
    consultarCitaPaciente();
});