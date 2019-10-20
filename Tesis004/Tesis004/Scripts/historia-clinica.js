function limpiarTablas() {

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

$(document).ready(function () {
    consultarSignosVitales();
});
