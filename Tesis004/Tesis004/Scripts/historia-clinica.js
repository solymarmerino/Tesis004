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
    document.getElementById("atecedentePersonal").selectedIndex = 0;
    $("#atecedentePersonalTexto").val("");
    $("#tblAntecedentePersonal").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Antecedente</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblAntecedentePersonal").append(cabecera);
}

function limpiarTablaAtecedenteFamiliar() {
    document.getElementById("atecedenteFamiliar").selectedIndex = 0;
    $("#atecedenteFamiliarTexto").val("");
    $("#tblAntecedenteFamiliar").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Antecedente</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblAntecedenteFamiliar").append(cabecera);
}

function limpiarTablaAtecedenteSocial() {
    document.getElementById("atecedenteSocial").selectedIndex = 0;
    $("#atecedenteSocialTexto").val("");
    $("#tblAntecedenteSocial").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Antecedente</th>" +
        "<th scope=\"col\">Descripcción</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#tblAntecedenteSocial").append(cabecera);
}

function limpiarTablaHabito() {
    document.getElementById("habito").selectedIndex = 0;
    $("#habitoTexto").val("");
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

//////////////////////////////AP
function consultarAntecedentePersonal() {
    var ConsultarAntececente = {};
    ConsultarAntececente.url = "/HistoriaClinica/ConsultarAntecedentePersonal";
    ConsultarAntececente.type = "POST";
    ConsultarAntececente.data = JSON.stringify({
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    ConsultarAntececente.datatype = "json";
    ConsultarAntececente.contentType = "application/json";
    ConsultarAntececente.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombreAntecedentePersonal"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["DescripcionAP"] + "</td>";
                fila += "<td scope=\"col\"> <button name=\"btnEliminarAntecedentePersonal\" id=\"btnEliminarAntecedentePersonal\" onclick=\"eliminarAntecedentePersonal(" + resultado[i]["AntecedentePersonalID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                $("#tblAntecedentePersonal").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarAntececente.error = function () {
        toastr.error("Error al consultar los antecedentes personales");
    };
    $.ajax(ConsultarAntececente);
}

function ingresarAntecedentePersonal() {
    var IngresarAntecedente = {};
    IngresarAntecedente.url = "/HistoriaClinica/IngresarAntecedentePersonal";
    IngresarAntecedente.type = "POST";
    IngresarAntecedente.data = JSON.stringify({
        NumAntecedentePersonal: $("#atecedentePersonal").val(),
        DescripcionAP: $("#atecedentePersonalTexto").val(),
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    IngresarAntecedente.datatype = "json";
    IngresarAntecedente.contentType = "application/json";
    IngresarAntecedente.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Antecedente personal ingresado");
            limpiarTablaAtecedentePersonal();
            consultarAntecedentePersonal();
        }
        else {
            toastr.error("Antecedente personal NO ingresado");
        }
    };
    IngresarAntecedente.error = function () {
        toastr.error("Error al ingresar antecedente personal");
    };
    $.ajax(IngresarAntecedente);
}

function eliminarAntecedentePersonal(idAntecedentePersonal) {
    var EliminarAntecedente = {};
    EliminarAntecedente.url = "/HistoriaClinica/EliminarAntecedentePersonal";
    EliminarAntecedente.type = "POST";
    EliminarAntecedente.data = JSON.stringify({
        antecedentePersonalID: idAntecedentePersonal
    });
    EliminarAntecedente.datatype = "json";
    EliminarAntecedente.contentType = "application/json";
    EliminarAntecedente.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Antecedente personal eliminado");
            limpiarTablaAtecedentePersonal();
            consultarAntecedentePersonal();
        }
        else {
            toastr.error("Antecedente personal NO eliminado");
        }
    };
    EliminarAntecedente.error = function () {
        toastr.error("Error al eliminar antecedente personal");
    };
    $.ajax(EliminarAntecedente);
}

//////////////////////////////AF
function consultarAntecedenteFamiliar() {
    var ConsultarAntececente = {};
    ConsultarAntececente.url = "/HistoriaClinica/ConsultarAntecedenteFamiliar";
    ConsultarAntececente.type = "POST";
    ConsultarAntececente.data = JSON.stringify({
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    ConsultarAntececente.datatype = "json";
    ConsultarAntececente.contentType = "application/json";
    ConsultarAntececente.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombreAntecedenteFamiliar"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["DescripcionAF"] + "</td>";
                fila += "<td scope=\"col\"> <button name=\"btnEliminarAntecedenteFamiliar\" id=\"btnEliminarAntecedenteFamiliar\" onclick=\"eliminarAntecedenteFamiliar(" + resultado[i]["AntecedenteFamiliarID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                $("#tblAntecedenteFamiliar").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarAntececente.error = function () {
        toastr.error("Error al consultar los antecedentes familiares");
    };
    $.ajax(ConsultarAntececente);
}

function ingresarAntecedenteFamiliar() {
    var IngresarAntecedente = {};
    IngresarAntecedente.url = "/HistoriaClinica/IngresarAntecedenteFamiliar";
    IngresarAntecedente.type = "POST";
    IngresarAntecedente.data = JSON.stringify({
        NumAntecedenteFamiliar: $("#atecedenteFamiliar").val(),
        DescripcionAF: $("#atecedenteFamiliarTexto").val(),
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    IngresarAntecedente.datatype = "json";
    IngresarAntecedente.contentType = "application/json";
    IngresarAntecedente.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Antecedente familiar ingresado");
            limpiarTablaAtecedenteFamiliar();
            consultarAntecedenteFamiliar();
        }
        else {
            toastr.error("Antecedente familiar NO ingresado");
        }
    };
    IngresarAntecedente.error = function () {
        toastr.error("Error al ingresar antecedente familiar");
    };
    $.ajax(IngresarAntecedente);
}

function eliminarAntecedenteFamiliar(idAntecedenteFamiliar) {
    var EliminarAntecedente = {};
    EliminarAntecedente.url = "/HistoriaClinica/EliminarAntecedenteFamiliar";
    EliminarAntecedente.type = "POST";
    EliminarAntecedente.data = JSON.stringify({
        antecedenteFamiliarID: idAntecedenteFamiliar
    });
    EliminarAntecedente.datatype = "json";
    EliminarAntecedente.contentType = "application/json";
    EliminarAntecedente.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Antecedente familiar eliminado");
            limpiarTablaAtecedenteFamiliar();
            consultarAntecedenteFamiliar();
        }
        else {
            toastr.error("Antecedente familiar NO eliminado");
        }
    };
    EliminarAntecedente.error = function () {
        toastr.error("Error al eliminar antecedente familiar");
    };
    $.ajax(EliminarAntecedente);
}

//////////////////////////////AS
function consultarAntecedenteSocial() {
    var ConsultarAntececente = {};
    ConsultarAntececente.url = "/HistoriaClinica/ConsultarAntecedenteSocial";
    ConsultarAntececente.type = "POST";
    ConsultarAntececente.data = JSON.stringify({
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    ConsultarAntececente.datatype = "json";
    ConsultarAntececente.contentType = "application/json";
    ConsultarAntececente.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombreAntecedenteSocial"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["DescripcionAS"] + "</td>";
                fila += "<td scope=\"col\"> <button name=\"btnEliminarAntecedenteSocial\" id=\"btnEliminarAntecedenteSocial\" onclick=\"eliminarAntecedenteSocial(" + resultado[i]["AntecedenteSocialID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                $("#tblAntecedenteSocial").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarAntececente.error = function () {
        toastr.error("Error al consultar los antecedentes social");
    };
    $.ajax(ConsultarAntececente);
}

function ingresarAntecedenteSocial() {
    var IngresarAntecedente = {};
    IngresarAntecedente.url = "/HistoriaClinica/IngresarAntecedenteSocial";
    IngresarAntecedente.type = "POST";
    IngresarAntecedente.data = JSON.stringify({
        NumAntecedenteSocial: $("#atecedenteSocial").val(),
        DescripcionAS: $("#atecedenteSocialTexto").val(),
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    IngresarAntecedente.datatype = "json";
    IngresarAntecedente.contentType = "application/json";
    IngresarAntecedente.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Antecedente social ingresado");
            limpiarTablaAtecedenteSocial();
            consultarAntecedenteSocial();
        }
        else {
            toastr.error("Antecedente social NO ingresado");
        }
    };
    IngresarAntecedente.error = function () {
        toastr.error("Error al ingresar antecedente social");
    };
    $.ajax(IngresarAntecedente);
}

function eliminarAntecedenteSocial(idAntecedenteSocial) {
    var EliminarAntecedente = {};
    EliminarAntecedente.url = "/HistoriaClinica/EliminarAntecedenteSocial";
    EliminarAntecedente.type = "POST";
    EliminarAntecedente.data = JSON.stringify({
        AntecedenteSocialID: idAntecedenteSocial
    });
    EliminarAntecedente.datatype = "json";
    EliminarAntecedente.contentType = "application/json";
    EliminarAntecedente.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Antecedente social eliminado");
            limpiarTablaAtecedenteSocial();
            consultarAntecedenteSocial();
        }
        else {
            toastr.error("Antecedente social NO eliminado");
        }
    };
    EliminarAntecedente.error = function () {
        toastr.error("Error al eliminar antecedente social");
    };
    $.ajax(EliminarAntecedente);
}

//////////////////////////////H
function consultarHabito() {
    var ConsultarHabito = {};
    ConsultarHabito.url = "/HistoriaClinica/ConsultarHabito";
    ConsultarHabito.type = "POST";
    ConsultarHabito.data = JSON.stringify({
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    ConsultarHabito.datatype = "json";
    ConsultarHabito.contentType = "application/json";
    ConsultarHabito.success = function (resultado) {
        if (resultado.length > 0) {
            for (var i = 0; i < resultado.length; i++) {
                var fila = "";
                fila += "<td scope=\"col\">" + resultado[i]["NombreHabito"] + "</td>";
                fila += "<td scope=\"col\">" + resultado[i]["DescripcionHabito"] + "</td>";
                fila += "<td scope=\"col\"> <button name=\"btnEliminarHabito\" id=\"btnEliminarHabito\" onclick=\"eliminarHabito(" + resultado[i]["HabitoID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></th >";
                $("#tblHabito").append("<tr>" + fila + "</tr>");
            }
        }
    };
    ConsultarHabito.error = function () {
        toastr.error("Error al consultar los habitos");
    };
    $.ajax(ConsultarHabito);
}

function ingresarHabito() {
    var IngresarHabito = {};
    IngresarHabito.url = "/HistoriaClinica/IngresarHabito";
    IngresarHabito.type = "POST";
    IngresarHabito.data = JSON.stringify({
        NumHabito: $("#habito").val(),
        DescripcionHabito: $("#habitoTexto").val(),
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    IngresarHabito.datatype = "json";
    IngresarHabito.contentType = "application/json";
    IngresarHabito.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Habito ingresado");
            limpiarTablaHabito();
            consultarHabito();
        }
        else {
            toastr.error("Habito NO ingresado");
        }
    };
    IngresarHabito.error = function () {
        toastr.error("Error al ingresar habito");
    };
    $.ajax(IngresarHabito);
}

function eliminarHabito(idHabito) {
    var EliminarHabito = {};
    EliminarHabito.url = "/HistoriaClinica/EliminarHabito";
    EliminarHabito.type = "POST";
    EliminarHabito.data = JSON.stringify({
        habitoID: idHabito
    });
    EliminarHabito.datatype = "json";
    EliminarHabito.contentType = "application/json";
    EliminarHabito.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Habito eliminado");
            limpiarTablaHabito();
            consultarHabito();
        }
        else {
            toastr.error("Habito NO eliminado");
        }
    };
    EliminarHabito.error = function () {
        toastr.error("Error al eliminar habito");
    };
    $.ajax(EliminarHabito);
}

function consultarAlergia() {
    var ConsultarAlergia = {};
    ConsultarAlergia.url = "/HistoriaClinica/ConsultarAlergia";
    ConsultarAlergia.type = "POST";
    ConsultarAlergia.data = JSON.stringify({
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    ConsultarAlergia.datatype = "json";
    ConsultarAlergia.contentType = "application/json";
    ConsultarAlergia.success = function (resultado) {
        $("#txtAlergia").val(resultado["Alergias"]);
    };
    ConsultarAlergia.error = function () {
        toastr.error("Error al consultar las alergias");
    };
    $.ajax(ConsultarAlergia);
}

function modificarAlergia() {
    var ModificarAlergia = {};
    ModificarAlergia.url = "/HistoriaClinica/ModificarAlergia";
    ModificarAlergia.type = "POST";
    ModificarAlergia.data = JSON.stringify({
        Alergias: $("#txtAlergia").val(),
        HistoriaClinicaID: $("#IptNumeroHistoriaClinica").val()
    });
    ModificarAlergia.datatype = "json";
    ModificarAlergia.contentType = "application/json";
    ModificarAlergia.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Alergia ingresada");
            limpiarAlergia();
            consultarAlergia();
        }
        else {
            toastr.error("Alergia NO ingresada");
        }
    };
    ModificarAlergia.error = function () {
        toastr.error("Error al ingresar alergia");
    };
    $.ajax(ModificarAlergia);
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
                $("#tblAtencionPrevia").append("<tr>" + fila + "</tr>");
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
    consultarAntecedentePersonal();
    consultarAntecedenteFamiliar();
    consultarAntecedenteSocial();
    consultarHabito();
    consultarAlergia();
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

$("#btnAntecedentePersonal").click(function () {
    ingresarAntecedentePersonal();
});

$("#btnAntecedenteFamiliar").click(function () {
    ingresarAntecedenteFamiliar();
});

$("#btnAntecedenteSocial").click(function () {
    ingresarAntecedenteSocial();
});

$("#btnHabito").click(function () {
    ingresarHabito();
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
