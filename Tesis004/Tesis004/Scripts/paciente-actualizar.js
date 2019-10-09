$("#btnGuardar").click(function () {
    var RepresentantePaciente = false;
    if ($("#CboxRepresentante").is(':checked')) {
        RepresentantePaciente = true;
    }
    var DiscapacidadPaciente = false;
    if ($("#CboxDiscapacidad").is(':checked')) {
        DiscapacidadPaciente = true;
    }
    var ModificarPaciente = {};
    ModificarPaciente.url = "/Paciente/ModificarPaciente";
    ModificarPaciente.type = "POST";
    ModificarPaciente.data = JSON.stringify({
        PacienteID: $("#IptPacienteID").val(),
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
    ModificarPaciente.datatype = "json";
    ModificarPaciente.contentType = "application/json";
    ModificarPaciente.success = function (ingresado) {
        if (ingresado[0] == true) {
            toastr.success("Paciente modificado");
            location.reload();
        }
        else {
            toastr.error("Paciente NO modificado");
        }
    };
    ModificarPaciente.error = function () {
        toastr.error("Error al modificar paciente");
    };
    $.ajax(ModificarPaciente);
});
