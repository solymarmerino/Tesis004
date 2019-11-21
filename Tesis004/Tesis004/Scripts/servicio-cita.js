function limpiarTablaCita() {
    $("#tblCita").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Paciente</th>" +
        "<th scope=\"col\">C&eacute;dula</th>" +
        "<th scope=\"col\">Historia Clinica</th>" +
        "<th scope=\"col\">M&eacute;dico</th>" +
        "<th scope=\"col\">Pagado</th>" +
        "<th scope=\"col\">Enfermer&iacute;a</th>" +
        "<th scope=\"col\">Atenci&oacute;n</th>" +
        "<th scope=\"col\"></th>" +
        "<th scope=\"col\"></th>" +
        "<th scope=\"col\"></th>" +
        "<th scope=\"col\"></th>" +
        "</tr >";
    $("#tblCita").append(cabecera);
}

function limpiarTablaCitaEnfermeria() {
    $("#tblCita").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Paciente</th>" +
        "<th scope=\"col\">C&eacute;dula</th>" +
        "<th scope=\"col\">Historia Clinica</th>" +
        "<th scope=\"col\"></th>" +
        "</tr >";
    $("#tblCita").append(cabecera);
}

function consultarCita() {
    var ConsultarCita = {};
    ConsultarCita.url = "/Servicio/ListarCitaGeneral";
    ConsultarCita.type = "POST";
    ConsultarCita.data = JSON.stringify({
    });
    ConsultarCita.datatype = "json";
    ConsultarCita.contentType = "application/json";
    ConsultarCita.success = function (resultado) {
        if (resultado[0]["TipoUsuario"] == 18) {
            limpiarTablaCita();
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombrePaciente"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Cedula"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["HistoriaClinica"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["NombreMedico"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Pagado"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Enfermeria"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Atencion"] + "</th >";
                fila += "<td scope=\"col\"> <button name=\"btnPagarCita\" id=\"btnPagarCita\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:35px; cursor:pointer\" onclick=\"pagarCita(" + resultado[i]["CitaMedicaID"] + ")\"><i class=\"far fa-money-bill-alt\"></i></button></th >";
                fila += "<th scope=\"col\"></th>";
                fila += "<th scope=\"col\"></th>";
                //fila += "<td scope=\"col\"> <form action=\"../HistoriaClinica/HistoriaClinica\" method=\"POST\"> <input name=\"\" value=\"\" hidden> <input name=\"\" value=\"\" hidden> <input name=\"\" value=\"\" hidden> <button name=\"PacienteID\" id=\"btnHistoriaClinica\" value=\"" + resultado[i]["PacienteID"] + "\"><i class=\"fas fa-minus-square\"></i></button></form></th >";
                fila += "<th scope=\"col\"></th>";
                fila += "<th scope=\"col\"></th>";
                $("#tblCita").append("<tr>" + fila + "</tr>");
            }
            $("#btnNuevaCita").prop("hidden", false);
        } 
        if (resultado[0]["TipoUsuario"] == 20) {
            limpiarTablaCitaEnfermeria();
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombrePaciente"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Cedula"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["HistoriaClinica"] + "</th >";
                fila += "<td scope=\"col\"> <form action=\"../Enfermeria/GestionEnfermeria\" method=\"POST\"><button style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:35px; cursor:pointer\" name=\"idPaciente\" id=\"btnEnfermeria\" value=\"" + resultado[i]["PacienteID"] + "\"><i class=\"fas fa-heartbeat\"></i></button></form></th >";
                $("#tblCita").append("<tr>" + fila + "</tr>");
            }            
        }      
        if (resultado[0]["TipoUsuario"] == 21) {
            limpiarTablaCita();
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombrePaciente"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Cedula"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["HistoriaClinica"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["NombreMedico"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Pagado"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Enfermeria"] + "</th >";
                fila += "<td scope=\"col\">" + resultado[i]["Atencion"] + "</th >";
                fila += "<th scope=\"col\"></th>";
                fila += "<th scope=\"col\"></th>";
                fila += "<td scope=\"col\"> <form action=\"../HistoriaClinica/HistoriaClinica\" method=\"POST\"> <input name=\"PacienteID\" value=\"" + resultado[i]["PacienteID"] + "\" hidden> <input name=\"CitaMedicaID\" value=\"" + resultado[i]["CitaMedicaID"] + "\" hidden> <input name=\"HistoriaClinica\" value=\"" + resultado[i]["HistoriaClinica"] + "\" hidden> <button style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:35px; cursor:pointer\" type=\"submit\"><i class=\"fas fa-user-md\"></i></button></form></th >";
                //fila += "<td scope=\"col\"> <form action=\"../HistoriaClinica/HistoriaClinica\" method=\"POST\"> <input name=\"\" value=\"\" hidden> <input name=\"\" value=\"\" hidden> <input name=\"\" value=\"\" hidden> <button name=\"PacienteID\" id=\"btnHistoriaClinica\" value=\"" + resultado[i]["PacienteID"] + "\"><i class=\"fas fa-minus-square\"></i></button></form></th >";
                fila += "<th scope=\"col\"></th>";
                fila += "<th scope=\"col\"></th>";
                $("#tblCita").append("<tr>" + fila + "</tr>");
            }
        } 
    };
	ConsultarCita.error = function () {
		toastr.error("Error al listar cita!!");
    };
    $.ajax(ConsultarCita);
}

function pagarCita(idCitaMedica) {
    var ListarPersonal = {};
    ListarPersonal.url = "/Servicio/PagarCita";
    ListarPersonal.type = "POST";
    ListarPersonal.data = JSON.stringify({
        CitaMedicaID: idCitaMedica
    });
    ListarPersonal.datatype = "json";
    ListarPersonal.contentType = "application/json";
    ListarPersonal.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Cita pagada");
            limpiarTablaCita();
            consultarCita();
        }
		else {
			toastr.error("Cita NO pagada");
            limpiarTablaCita();
            consultarCita();
        }
    };
	ListarPersonal.error = function () {
		toastr.error("Error al eliminar al pagar!!");
        limpiarTablaCita();
        consultarCita();
    };
    $.ajax(ListarPersonal);
}

$(document).ready(function () {
    limpiarTablaCita();
    consultarCita();
});