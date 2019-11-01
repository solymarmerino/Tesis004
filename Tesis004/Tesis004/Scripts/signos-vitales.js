function limpiarTablaSignoVital() {
    $("#Temperatura").val("");
    $("#PrecionArterial").val("");
    $("#Fr").val("");
    $("#Fc").val("");
    $("#Peso").val("");
    $("#Talla").val("");
    $("#Saturacion").val("");
}

function atencionEnfermeriaCita() {
    var ActualizarCita = {};
    ActualizarCita.url = "/Servicio/AtencionEnfermeriaCita";
    ActualizarCita.type = "POST";
    ActualizarCita.data = JSON.stringify({
        pacienteID: $("#IdPaciente").val(),
    });
    ActualizarCita.datatype = "json";
    ActualizarCita.contentType = "application/json";
    ActualizarCita.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Cita actualizada");
        }
        else {
            toastr.error("Cita NO actualizada");
        }
    };
    ActualizarCita.error = function () {
        toastr.error("Error al actualizar cita");
    };
    $.ajax(ActualizarCita);
}


$("#btnGuardarSignosVitales").click(function () {
    var SignosVitales = {};
    SignosVitales.url = "/Enfermeria/GuardarSignosVitales";
    SignosVitales.type = "POST";
    SignosVitales.data = JSON.stringify({
        HistoriaClinica: $("#HistoriaClinica").val(),
        PrecionArterial: $("#PrecionArterial").val(),
        Temperatura: $("#Temperatura").val(),
        Peso: $("#Peso").val(),
        Talla: $("#Talla").val(),
        FrecuenciaCardiaca: $("#Fc").val(),
        FrecuenciaRespiratoria: $("#Fr").val(),
        SaturacionOxigeno: $("#Saturacion").val(),
        Observacion: $("#ObservacionesEnfermeria").val()
    });
    SignosVitales.datatype = "json";
    SignosVitales.contentType = "application/json";
    SignosVitales.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Signos Vitales Guardados");
            limpiarTablaSignoVital();
            atencionEnfermeriaCita();
            setTimeout("location.href='../Servicio/ListarCita'", 3000);
        }
        else {
            toastr.error("Signos Vitales NO Guardados");
        }
    };
    SignosVitales.error = function () {
        toastr.error("Error al guardar los signos vitales");
    };
    $.ajax(SignosVitales);
});

$(document).ready(function () {
    limpiarTablaSignoVital();
});
