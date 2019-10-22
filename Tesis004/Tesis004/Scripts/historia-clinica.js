function limpiarTablaSubjetivo() {
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

function ingresarSubjetivo() {
    var IngresarSubjetivo = {};
    IngresarSubjetivo.url = "/HistoriaClinica/IngresarSubjetivo";
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
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombreSubjetivo"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["DescripcionSubjetivo"] + "</td>";
                fila += "<td scope=\"col\"> <button name=\"btnEliminarSubjetivo\" id=\"btnEliminarSubjetivo\" onclick=\"eliminarSubjetivo(" + resultado[i]["SubjetivoID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                $("#tblSubjetivo").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarSubjetivo.error = function () {
        toastr.error("Error al consultar los subjetivos");
    };
    $.ajax(ConsultarSubjetivo);

}

$(document).ready(function () {
    limpiarTablaSubjetivo();
    limpiarTablaObjetivo();
    consultarSignosVitales();
    consultarSubjetivo();
});

$("#btnSubjetivo").click(function () {
    ingresarSubjetivo();
});
