function limpiarTablaSubjetivo() {
    $("#tblSubjetivo").empty();
    var cabecera = "<tr>" +
                   "<th scope=\"col\">Subjetivo</th>" +
                   "<th scope=\"col\">Descripcción</th>" +
                   "<th scope=\"col\"></th>" +
                   "</tr>";
    $("#tblSubjetivo").append(cabecera);
}

function limpiarTablaObjetivo() {
    $("#tblObjetivo").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Region</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblObjetivo").append(cabecera);
}

function limpiarTablaDiagnostico() {
    $("#tblDiagnostico").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Diagnostico</th>" +
        "<th scope=\"col\">CIE-10</th>" +
        "<th scope=\"col\">Tipo</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblDiagnostico").append(cabecera);
}

function limpiarTablaReceta() {
    $("#txtReceta").val("");
}

function limpiarTablaProcedimiento() {
    $("#tblProcedimiento").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Procedimiento</th>" +
        "<th scope=\"col\">Descripción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblProcedimiento").append(cabecera);
}

function consultarSignosVitales() {
    var ConsultarSignosVitales = {};
    ConsultarSignosVitales.url = "/Enfermeria/SignosVitalesPorCitaMedica";
    ConsultarSignosVitales.type = "POST";
    ConsultarSignosVitales.data = JSON.stringify({
        citaMedicaID: $("#ConsultaMedicaID").val()
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

function consultarDatosConsulta() {
    var ConsultarSubjetivo = {};
    ConsultarSubjetivo.url = "/HistoriaClinica/ConsultarDatosConsulta";
    ConsultarSubjetivo.type = "POST";
    ConsultarSubjetivo.data = JSON.stringify({
        ConsultaMedicaID: $("#ConsultaMedicaID").val()
    });
    ConsultarSubjetivo.datatype = "json";
    ConsultarSubjetivo.contentType = "application/json";
    ConsultarSubjetivo.success = function (resultado) {
        $("#tipoConsulta").val(resultado["TipoConsulta"]);
        $("#motivoConsulta").val(resultado["MotivoConsulta"]);
        $("#descripcionAnalisis").val(resultado["Analisis"]);
        $("#descripcionPlan").val(resultado["PlanTratamiento"]);
    };
    ConsultarSubjetivo.error = function () {
        toastr.error("Error al consultar los datos de la consulta");
    };
    $.ajax(ConsultarSubjetivo);
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
                $("#tblSubjetivo").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarSubjetivo.error = function () {
        toastr.error("Error al consultar los subjetivos");
    };
    $.ajax(ConsultarSubjetivo);
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
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombreObjetivo"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["DetalleObjetivo"] + "</td>";
                $("#tblObjetivo").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarObjetivo.error = function () {
        toastr.error("Error al consultar los objetivos");
    };
    $.ajax(ConsultarObjetivo);
}

function consultarDiagnostico() {
    var ConsultarDiagnostico = {};
    ConsultarDiagnostico.url = "/HistoriaClinica/ConsultarDiagnostico";
    ConsultarDiagnostico.type = "POST";
    ConsultarDiagnostico.data = JSON.stringify({
        ConsultaMedicaID: $("#ConsultaMedicaID").val()
    });
    ConsultarDiagnostico.datatype = "json";
    ConsultarDiagnostico.contentType = "application/json";
    ConsultarDiagnostico.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["Cie10Detalle"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["Cie10Codigo"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["TipoDiagnostico"] + "</td>";
                $("#tblDiagnostico").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarDiagnostico.error = function () {
        toastr.error("Error al consultar los diagnosticos");
    };
    $.ajax(ConsultarDiagnostico);
}

function consultarReceta() {
    var ConsultarReceta = {};
    ConsultarReceta.url = "/HistoriaClinica/ConsultarReceta";
    ConsultarReceta.type = "POST";
    ConsultarReceta.data = JSON.stringify({
        ConsultaMedicaID: $("#ConsultaMedicaID").val()
    });
    ConsultarReceta.datatype = "json";
    ConsultarReceta.contentType = "application/json";
    ConsultarReceta.success = function (resultado) {
        $("#txtReceta").val(resultado["RecetaTexto"]);
    };
    ConsultarReceta.error = function () {
        toastr.error("Error al consultar la receta");
    };
    $.ajax(ConsultarReceta);
}

function consultarProcedimiento() {
    var ConsultarProcedimiento = {};
    ConsultarProcedimiento.url = "/HistoriaClinica/ConsultarProcedimiento";
    ConsultarProcedimiento.type = "POST";
    ConsultarProcedimiento.data = JSON.stringify({
        ConsultaMedicaID: $("#ConsultaMedicaID").val()
    });
    ConsultarProcedimiento.datatype = "json";
    ConsultarProcedimiento.contentType = "application/json";
    ConsultarProcedimiento.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["ProcedimientoTexto"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["Detalle"] + "</td>";
                $("#tblProcedimiento").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarProcedimiento.error = function () {
        toastr.error("Error al consultar los procedimientos");
    };
    $.ajax(ConsultarProcedimiento);
}

$(document).ready(function () {
    limpiarTablaSubjetivo();
    limpiarTablaObjetivo();
    limpiarTablaDiagnostico();
    limpiarTablaReceta();
    limpiarTablaProcedimiento();
    consultarSignosVitales();
    consultarDatosConsulta();
    consultarSubjetivo();
    consultarObjetivo();
    consultarDiagnostico();
    consultarReceta();
    consultarProcedimiento();
});