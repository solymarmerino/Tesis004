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

function limpiarTablaDiagnostico() {
    document.getElementById("tipodiagnostico").selectedIndex = 0;
    $("#enfermedad").val("");
    $("#cie10").val("");
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
    $("#descripcionTexto").val("");
    $("#descripcionProcedimiento").val("");
    $("#tblProcedimiento").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Procedimiento</th>" +
        "<th scope=\"col\">Descripción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblProcedimiento").append(cabecera);
}

function limpiarTablaCertificado() {
    $("#observacionCertificado").val("");
}

function limpiarTablaAtencionPrevia() {
    $("#tblAtencionPrevia").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Fecha</th>" +
        "<th scope=\"col\">Medico</th>" +
        "<th scope=\"col\">Diagnostico</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblAtencionPrevia").append(cabecera);
}

function limpiarTablaAtecedentePersonal() {
    $("#tblAntecedentePersonal").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Antecedente</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblAntecedentePersonal").append(cabecera);
}

function limpiarTablaAtecedenteFamiliar() {
    $("#tblAntecedenteFamiliar").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Antecedente</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblAntecedenteFamiliar").append(cabecera);
}

function limpiarTablaAtecedenteSocial() {
    $("#tblAntecedenteSocial").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Antecedente</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblAntecedenteSocial").append(cabecera);
}

function limpiarTablaHabito() {
    $("#tblHabito").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Antecedente</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblHabito").append(cabecera);
}

function limpiarAlergia() {
    $("#txtAlergia").text("");
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
                fila += "<td scope=\"col\"> <button name=\"btnEliminarDiagnostico\" id=\"btnEliminarDiagnostico\" onclick=\"eliminarDiagnostico(" + resultado[i]["DiagnosticoID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                $("#tblDiagnostico").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarDiagnostico.error = function () {
        toastr.error("Error al consultar los diagnosticos");
    };
    $.ajax(ConsultarDiagnostico);
}

function ingresarDiagnostico() {
    var IngresarDiagnostico = {};
    IngresarDiagnostico.url = "/HistoriaClinica/IngresarDiagnostico";
    IngresarDiagnostico.type = "POST";
    IngresarDiagnostico.data = JSON.stringify({
        consultaMedicaID: $("#ConsultaMedicaID").val(),
        CIE10ID: $("#idCie10").val(),
        EstadoDiagnostico: $("#tipodiagnostico").val(),
    });
    IngresarDiagnostico.datatype = "json";
    IngresarDiagnostico.contentType = "application/json";
    IngresarDiagnostico.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Diagnostico ingresado");
            limpiarTablaDiagnostico();
            consultarDiagnostico();
        }
        else {
            toastr.error("Diagnostico NO ingresado");
        }
    };
    IngresarDiagnostico.error = function () {
        toastr.error("Error al ingresar diagnostico");
    };
    $.ajax(IngresarDiagnostico);
}

function eliminarDiagnostico(idDiagnostico) {
    var EliminarDiagnostico = {};
    EliminarDiagnostico.url = "/HistoriaClinica/EliminarDiagnostico";
    EliminarDiagnostico.type = "POST";
    EliminarDiagnostico.data = JSON.stringify({
        diagnosticoID: idDiagnostico
    });
    EliminarDiagnostico.datatype = "json";
    EliminarDiagnostico.contentType = "application/json";
    EliminarDiagnostico.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Diagnostico eliminado");
            limpiarTablaDiagnostico();
            consultarDiagnostico();
        }
        else {
            toastr.error("Diagnostico NO eliminado");
        }
    };
    EliminarDiagnostico.error = function () {
        toastr.error("Error al eliminar diagnostico");
    };
    $.ajax(EliminarDiagnostico);
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
        $("#idReceta").val(resultado["RecetaID"]);
    };
    ConsultarReceta.error = function () {
        toastr.error("Error al consultar la receta");
    };
    $.ajax(ConsultarReceta);
}

function validarReceta() {
    var IngresarReceta = {};
    IngresarReceta.url = "/HistoriaClinica/ValidarReceta";
    IngresarReceta.type = "POST";
    IngresarReceta.data = JSON.stringify({
        recetaID: $("#idReceta").val(),        
        recetaTexto: $("#txtReceta").val(),
        consultaMedicaID: $("#ConsultaMedicaID").val()        
    });
    IngresarReceta.datatype = "json";
    IngresarReceta.contentType = "application/json";
    IngresarReceta.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Receta ingresada");
            limpiarTablaReceta();
            consultarReceta();
        }
        else {
            toastr.error("Receta NO ingresada");
        }
    };
    IngresarReceta.error = function () {
        toastr.error("Error al ingresar receta");
    };
    $.ajax(IngresarReceta);
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
                fila += "<td scope=\"col\"> <button name=\"btnEliminarProcedimiento\" id=\"btnEliminarProcedimiento\" onclick=\"eliminarProcedimiento(" + resultado[i]["ProcedimientoID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                $("#tblProcedimiento").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarProcedimiento.error = function () {
        toastr.error("Error al consultar los procedimientos");
    };
    $.ajax(ConsultarProcedimiento);
}

function ingresarProcedimiento() {
    var IngresarProcedimiento = {};
    IngresarProcedimiento.url = "/HistoriaClinica/IngresarProcedimiento";
    IngresarProcedimiento.type = "POST";
    IngresarProcedimiento.data = JSON.stringify({
        procedimientoTexto: $("#descripcionTexto").val(),
        detalle: $("#descripcionProcedimiento").val(),
        consultaMedicaID: $("#ConsultaMedicaID").val()
    });
    IngresarProcedimiento.datatype = "json";
    IngresarProcedimiento.contentType = "application/json";
    IngresarProcedimiento.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Procedimiento ingresado");
            limpiarTablaProcedimiento();
            consultarProcedimiento();
        }
        else {
            toastr.error("Procedimiento NO ingresado");
        }
    };
    IngresarProcedimiento.error = function () {
        toastr.error("Error al ingresar procedimiento");
    };
    $.ajax(IngresarProcedimiento);
}

function eliminarProcedimiento(idProcedimiento) {
    var EliminarProcedimiento = {};
    EliminarProcedimiento.url = "/HistoriaClinica/EliminarProcedimiento";
    EliminarProcedimiento.type = "POST";
    EliminarProcedimiento.data = JSON.stringify({
        procedimientoID: idProcedimiento
    });
    EliminarProcedimiento.datatype = "json";
    EliminarProcedimiento.contentType = "application/json";
    EliminarProcedimiento.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Procedimiento eliminado");
            limpiarTablaProcedimiento();
            consultarProcedimiento();
        }
        else {
            toastr.error("Procedimiento NO eliminado");
        }
    };
    EliminarProcedimiento.error = function () {
        toastr.error("Error al eliminar procedimiento");
    };
    $.ajax(EliminarProcedimiento);
}

function ingresarCertificado() {
    var IngresarCertificado = {};
    IngresarCertificado.url = "/HistoriaClinica/IngresarCertificado";
    IngresarCertificado.type = "POST";
    IngresarCertificado.data = JSON.stringify({
        fechaInicio: $("#fechaInicio").val(),
        fechaFin: $("#fechaFin").val(),
        FechaCertificado: $("#fechaAtencion").val(),
        Observaciones: $("#observacionCertificado").val(),
        consultaMedicaID: $("#ConsultaMedicaID").val()
    });
    IngresarCertificado.datatype = "json";
    IngresarCertificado.contentType = "application/json";
    IngresarCertificado.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Certificado ingresado");
            limpiarTablaReceta();
            consultarReceta();
        }
        else {
            toastr.error("Certificado NO ingresado");
        }
    };
    IngresarCertificado.error = function () {
        toastr.error("Error al ingresar certificado");
    };
    $.ajax(IngresarCertificado);
}


function consultarAtencionPrevia() {
    limpiarTablaAtencionPrevia();
    var ConsultarAtencionesPrevias = {};
    ConsultarAtencionesPrevias.url = "/HistoriaClinica/ConsultarAtencionPrevia";
    ConsultarAtencionesPrevias.type = "POST";
    ConsultarAtencionesPrevias.data = JSON.stringify({
        PacienteID: $("#IptIdPaciente").val()
    });
    ConsultarAtencionesPrevias.datatype = "json";
    ConsultarAtencionesPrevias.contentType = "application/json";
    ConsultarAtencionesPrevias.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["Fecha"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["NombreMedico"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["DetalleDiagnostico"] + "</td>";
                fila += "<td scope=\"col\"> <button name=\"\" id=\"\" onclick=\"(" + resultado[i]["ProcedimientoID"] + ")\"><i class=\"fas fa-eye\"></i></button></th >";
                $("#tblProcedimiento").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarAtencionesPrevias.error = function () {
        toastr.error("Error al consultar los procedimientos");
    };
    $.ajax(ConsultarAtencionesPrevias);
}

$(document).ready(function () {
    limpiarTablaSubjetivo();
    limpiarTablaObjetivo();
    limpiarTablaDiagnostico();
    limpiarTablaReceta();
    limpiarTablaProcedimiento();
    limpiarTablaCertificado();
    limpiarTablaAtencionPrevia();
    limpiarTablaAtecedentePersonal();
    limpiarTablaAtecedenteFamiliar();
    limpiarTablaAtecedenteSocial();
    limpiarTablaHabito();
    limpiarAlergia();
    consultarSignosVitales();
    consultarSubjetivo();
    consultarObjetivo();
    consultarDiagnostico();
    consultarReceta();
    consultarProcedimiento();
    consultarAtencionPrevia();
});

$("#btnSubjetivo").click(function () {
    ingresarSubjetivo();
});

$("#btnObjetivo").click(function () {
    ingresarObjetivo();
});

$("#btnDiagnostico").click(function () {
    ingresarDiagnostico();
});

$("#btnProcedimiento").click(function () {
    ingresarProcedimiento();
});

$("#btnCertificado").click(function () {
    ingresarCertificado();
});

$("#enfermedad").keypress(function () {
    var ConsultarEnfermedad = {};
    ConsultarEnfermedad.url = "/HistoriaClinica/ListarSugerenciaEnfermedad";
    ConsultarEnfermedad.type = "POST";
    ConsultarEnfermedad.data = JSON.stringify({
        detalle: $("#enfermedad").val()
    });
    ConsultarEnfermedad.datatype = "json";
    ConsultarEnfermedad.contentType = "application/json";
    ConsultarEnfermedad.success = function (listaSugerencia) {
        $("#sugerenciaEnfermedad").empty();
        for (var i = 0; i < listaSugerencia.length; i++) {
            $("#sugerenciaEnfermedad").append("<option value=\"" + listaSugerencia[i]["Detalle"] + "\"></option>");
        }
    };
    ConsultarEnfermedad.error = function () {
        toastr.error("Error al consultar sugerencias de enfermedades");
    };
    $.ajax(ConsultarEnfermedad);
});

$("#enfermedad").change(function () {
    var ConsultarEnfermedad = {};
    ConsultarEnfermedad.url = "/HistoriaClinica/ConsultarCie10";
    ConsultarEnfermedad.type = "POST";
    ConsultarEnfermedad.data = JSON.stringify({
        detalle: $("#enfermedad").val()
    });
    ConsultarEnfermedad.datatype = "json";
    ConsultarEnfermedad.contentType = "application/json";
    ConsultarEnfermedad.success = function (resultado) {
        $("#idCie10").val(resultado["CIE10ID"]);
        $("#cie10").val(resultado["Codigo"]);
    };
    ConsultarEnfermedad.error = function () {
        toastr.error("Error al consultar la enfermedad");
    };
    $.ajax(ConsultarEnfermedad);
});

$("#cie10").change(function () {
    var ConsultarEnfermedad = {};
    ConsultarEnfermedad.url = "/HistoriaClinica/ConsultarCie10";
    ConsultarEnfermedad.type = "POST";
    ConsultarEnfermedad.data = JSON.stringify({
        codigo: $("#cie10").val()
    });
    ConsultarEnfermedad.datatype = "json";
    ConsultarEnfermedad.contentType = "application/json";
    ConsultarEnfermedad.success = function (resultado) {
        $("#idCie10").val(resultado["CIE10ID"]);
        $("#enfermedad").val(resultado["Detalle"]);
    };
    ConsultarEnfermedad.error = function () {
        toastr.error("Error al consultar la enfermedad");
    };
    $.ajax(ConsultarEnfermedad);
});
