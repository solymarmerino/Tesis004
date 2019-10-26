﻿function limpiarTablaSubjetivo() {
    $("#descripcionsubjetivo").val("");
    document.getElementById("sltSubjetivo").selectedIndex = 0;
    $("#tblSubjetivo").empty();
    var cabecera = "<tr>" +
                   "<th scope=\"col\">Subjetivo</th>" +
                   "<th scope=\"col\">Descripcción</th>" +
                   "<th scope=\"col\"></th>" +
                   "</tr>";
    $("#tblSubjetivo").append(cabecera);
}

function limpiarTablaObjetivo() {
    document.getElementById("sltObjetivo").selectedIndex = 0;
    $("#tblObjetivo").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Region</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblObjetivo").append(cabecera);
}

function consultarSignosVitales() {
    var ConsultarSignosVitales = {};
    ConsultarSignosVitales.url = "/Enfermeria/ConsultarUltimoSignosVitales";
    ConsultarSignosVitales.type = "POST";
    ConsultarSignosVitales.data = JSON.stringify({
        numeroHistoriaClinica: $("#IptNumeroHistoriaClinica").val()
    });
    ConsultarSignosVitales.datatype = "json";
    ConsultarSignosVitales.contentType = "application/json";
    ConsultarSignosVitales.success = function (resultado) {
        $("#Peso").val(resultado["Peso"]);
        $("#Talla").val(resultado["Talla"]);
        $("#PA").val(resultado["PrecionArterial"]);
        $("#Temperatura").val(resultado["Temperatura"]);
        $("#FC").val(resultado["FrecuenciaCardiaca"]);
        $("#FR").val(resultado["FrecuenciaRespiratoria"]);
        $("#IMC").val(resultado["IndiceMasaCorporal"]);
        $("#Saturacion").val(resultado["SaturacionOxigeno"]);
        $("#ObservacionesEnfermeria").val(resultado["Observacion"]);
    };
    ConsultarSignosVitales.error = function () {
        toastr.error("Error al consultar los signos vitales");
    };
    $.ajax(ConsultarSignosVitales);
}

function actualizarDatosConsulta() {
    var TipoConsultaHC = "";
    if ($("#Primera").is(':checked')) {
        TipoConsultaHC= "Primera";
    }
    if ($("#Subsecuente").is(':checked')) {
        TipoConsultaHC= "Subsecuente";
    }
    var DatosConsulta = {};
    DatosConsulta.url = "/HistoriaClinica/ActualizarDatosConsulta";
    DatosConsulta.type = "POST";
    DatosConsulta.data = JSON.stringify({
        consultaMedicaID: $("#ConsultaMedicaID").val(),        
        tipoConsulta: TipoConsultaHC,
        motivoConsulta: $("#motivoconsulta").val(),
        analisis: $("#descripcionanalisis").val(),
        planTratamiento: $("#descripcionplan").val()
    });
    DatosConsulta.datatype = "json";
    DatosConsulta.contentType = "application/json";
    DatosConsulta.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Datos de la consulta actualizados");
        }
        else {
            toastr.error("Datos de la consulta NO actualizados");
        }
    };
    DatosConsulta.error = function () {
        toastr.error("Error al actualizar los datos de la consultas");
    };
    $.ajax(DatosConsulta);
}

function validarSubjetivoGeneral() {
    var IngresarSubjetivo = {};
    IngresarSubjetivo.url = "/HistoriaClinica/ValidarSubjetivo";
    IngresarSubjetivo.type = "POST";
    IngresarSubjetivo.data = JSON.stringify({
        itemSubjetivo: $("#idSubjetivoGeneral").val(),
        descripcionSubjetivo: $("#descripcionSubjetivo").val(),
        consultaMedicaID: $("#ConsultaMedicaID").val(),
        SubjetivoID: $("#idSubjetivo").val()
    });
    IngresarSubjetivo.datatype = "json";
    IngresarSubjetivo.contentType = "application/json";
    IngresarSubjetivo.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Subjetivo ingresado");
            limpiarTablaSubjetivo();
            consultarSubjetivo();
        }
        else {
            toastr.error("Subjetivo NO ingresado");
        }
    };
    IngresarSubjetivo.error = function () {
        toastr.error("Error al ingresar subjetivo");
    };
    $.ajax(IngresarSubjetivo);
}

function ingresarSubjetivo() {
    var IngresarSubjetivo = {};
    IngresarSubjetivo.url = "/HistoriaClinica/ValidarSubjetivo";
    IngresarSubjetivo.type = "POST";
    IngresarSubjetivo.data = JSON.stringify({
        itemSubjetivo: $("#sltSubjetivo").val(),              
        descripcionSubjetivo: $("#descripcionsubjetivo").val(),
        consultaMedicaID: $("#ConsultaMedicaID").val()
    });
    IngresarSubjetivo.datatype = "json";
    IngresarSubjetivo.contentType = "application/json";
    IngresarSubjetivo.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Subjetivo ingresado");
            limpiarTablaSubjetivo();
            consultarSubjetivo();
        }
        else {
            toastr.error("Subjetivo NO ingresado");
        }
    };
    IngresarSubjetivo.error = function () {
        toastr.error("Error al ingresar subjetivo");
    };
    $.ajax(IngresarSubjetivo);
}

function eliminarSubjetivo(idSubjetivo) {
    var EliminarSubjetivo = {};
    EliminarSubjetivo.url = "/HistoriaClinica/EliminarSubjetivo";
    EliminarSubjetivo.type = "POST";
    EliminarSubjetivo.data = JSON.stringify({
        subjetivoID: idSubjetivo
    });
    EliminarSubjetivo.datatype = "json";
    EliminarSubjetivo.contentType = "application/json";
    EliminarSubjetivo.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Subjetivo eliminnado");
            limpiarTablaSubjetivo();
            consultarSubjetivo();
        }
        else {
            toastr.error("Subjetivo NO eliminado");
        }
    };
    EliminarSubjetivo.error = function () {
        toastr.error("Error al eliminar subjetivo");
    };
    $.ajax(EliminarSubjetivo);
}

function consultarSubjetivo() {
    var ConsultarSubjetivo = {};
    ConsultarSubjetivo.url = "/HistoriaClinica/ConsultarSubjetivo";
    ConsultarSubjetivo.type = "POST";
    ConsultarSubjetivo.data = JSON.stringify({
        ConsultaMedicaID: $("#ConsultaMedicaID").val()
    });
    ConsultarSubjetivo.datatype = "json";
    ConsultarSubjetivo.contentType = "application/json";
    ConsultarSubjetivo.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                if (resultado[i]["NombreSubjetivo"] != "General") {
                    var fila = "";
                    fila += "<td scope=\"col\">" + resultado[i]["NombreSubjetivo"] + "</td>";
                    fila += "<td scope=\"col\">" + resultado[i]["DescripcionSubjetivo"] + "</td>";
                    fila += "<td scope=\"col\"> <button name=\"btnEliminarSubjetivo\" id=\"btnEliminarSubjetivo\" onclick=\"eliminarSubjetivo(" + resultado[i]["SubjetivoID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                    $("#tblSubjetivo").append("<tr>" + fila + "</tr>");
                }
                else {
                    $("#descripcionSubjetivo").val(resultado[i]["DescripcionSubjetivo"]);
                    $("#idSubjetivo").val(resultado[i]["SubjetivoID"]);
                }                
            }
        }
    };
    ConsultarSubjetivo.error = function () {
        toastr.error("Error al consultar los subjetivos");
    };
    $.ajax(ConsultarSubjetivo);
}

function validarObjetivoGeneral() {
    var ObjetivoGeneral = {};
    ObjetivoGeneral.url = "/HistoriaClinica/ValidarObjetivo";
    ObjetivoGeneral.type = "POST";
    ObjetivoGeneral.data = JSON.stringify({
        itemObjetivo: $("#idObjetivoGeneral").val(),
        detalleObjetivo: $("#descripcionObjetivoGeneral").val(),
        consultaMedicaID: $("#ConsultaMedicaID").val(),
        ObjetivoID: $("#idObjetivo").val()
    });
    ObjetivoGeneral.datatype = "json";
    ObjetivoGeneral.contentType = "application/json";
    ObjetivoGeneral.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Objetivo ingresado");
            limpiarTablaObjetivo();
            consultarObjetivo();
        }
        else {
            toastr.error("Objetivo NO ingresado");
        }
    };
    ObjetivoGeneral.error = function () {
        toastr.error("Error al ingresar objetivo");
    };
    $.ajax(ObjetivoGeneral);
}

function ingresarObjetivo() {
    var IngresarObjetivo = {};
    IngresarObjetivo.url = "/HistoriaClinica/ValidarObjetivo";
    IngresarObjetivo.type = "POST";
    IngresarObjetivo.data = JSON.stringify({
        itemObjetivo: $("#sltObjetivo").val(),
        detalleObjetivo: $("#descripcionObjetivo").val(),
        consultaMedicaID: $("#ConsultaMedicaID").val()
    });
    IngresarObjetivo.datatype = "json";
    IngresarObjetivo.contentType = "application/json";
    IngresarObjetivo.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Objetivo ingresado");
            limpiarTablaObjetivo();
            consultarObjetivo();
        }
        else {
            toastr.error("Objetivo NO ingresado");
        }
    };
    IngresarObjetivo.error = function () {
        toastr.error("Error al ingresar objetivo");
    };
    $.ajax(IngresarObjetivo);
}

function eliminarObjetivo(idObjetivo) {
    var EliminarObjetivo = {};
    EliminarObjetivo.url = "/HistoriaClinica/EliminarObjetivo";
    EliminarObjetivo.type = "POST";
    EliminarObjetivo.data = JSON.stringify({
        objetivoID: idObjetivo
    });
    EliminarObjetivo.datatype = "json";
    EliminarObjetivo.contentType = "application/json";
    EliminarObjetivo.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Objetivo eliminnado");
            limpiarTablaObjetivo();
            consultarObjetivo();
        }
        else {
            toastr.error("Objetivo NO eliminado");
        }
    };
    EliminarObjetivo.error = function () {
        toastr.error("Error al eliminar objetivo");
    };
    $.ajax(EliminarObjetivo);
}

function consultarObjetivo() {
    var ConsultarObjetivo = {};
    ConsultarObjetivo.url = "/HistoriaClinica/ConsultarObjetivo";
    ConsultarObjetivo.type = "POST";
    ConsultarObjetivo.data = JSON.stringify({
        ConsultaMedicaID: $("#ConsultaMedicaID").val()
    });
    ConsultarObjetivo.datatype = "json";
    ConsultarObjetivo.contentType = "application/json";
    ConsultarObjetivo.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                if (resultado[i]["NombreObjetivo"] != "General") {
                    var fila = "";
                    fila += "<td scope=\"col\">" + resultado[i]["NombreObjetivo"] + "</td>";
                    fila += "<td scope=\"col\">" + resultado[i]["DetalleObjetivo"] + "</td>";
                    fila += "<td scope=\"col\"> <button name=\"btnEliminarObjetivo\" id=\"btnEliminarObjetivo\" onclick=\"eliminarObjetivo(" + resultado[i]["ObjetivoID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                    $("#tblObjetivo").append("<tr>" + fila + "</tr>");
                }
                else {
                    $("#descripcionObjetivoGeneral").val(resultado[i]["DetalleObjetivo"]);
                    $("#idObjetivo").val(resultado[i]["ObjetivoID"]);
                }
            }
        }
    };
    ConsultarObjetivo.error = function () {
        toastr.error("Error al consultar los objetivos");
    };
    $.ajax(ConsultarObjetivo);
}

$(document).ready(function () {
    limpiarTablaSubjetivo();
    limpiarTablaObjetivo();
    consultarSignosVitales();
    consultarSubjetivo();
    consultarObjetivo();
});

$("#btnSubjetivo").click(function () {
    ingresarSubjetivo();
});

$("#btnObjetivo").click(function () {
    ingresarObjetivo();
});
