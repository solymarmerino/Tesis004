////////////INICIO FUNCIONES FACTURACION////////////////
///////////INICIO AGREGAR CLIENTE////////////////////////////
function agregarCliente() {
	var FacturacionCliente = {};
	FacturacionCliente.url = "/Factura/GuardarCliente";
	FacturacionCliente.type = "POST";
	FacturacionCliente.data = JSON.stringify({
		NombreCliente: $("#iptClienteFactura").val(),
		CedulaCliente: $("#iptClienteCI").val(),
		DireccionCliente: $("#iptClienteDireccion").val(),
		TelefonoCliente: $("#iptClienteTelefono").val()
	});
	FacturacionCliente.datatype = "json";
	FacturacionCliente.contentType = "application/json";
	FacturacionCliente.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Datos cliente guardado");
			limpiarTablaIngreso();
			listarIngreso();
		}
		else {
			toastr.error("Datos cliente NO guardado");
		}
	};
	FacturacionCliente.error = function () {
		toastr.error("Error al guardar los datos del cliente");
	};
	$.ajax(FacturacionCliente);
}
///////////FIN AGREGAR CLIENTE////////////////////////////

////////////INICIO BUSCAR CLIENTE/////////////////////////
$("#parametroBusqueda").keypress(function () {
	var OpcionConsulta = "";
	if ($("#SltNombrePaciente").is(':checked')) {
		OpcionConsulta = $("#SltNombrePaciente").val();
	}
	if ($("#SltCedulaPaciente").is(':checked')) {
		OpcionConsulta = $("#SltCedulaPaciente").val();
	}
	if ($("#SltHistoriaClinicaPaciente").is(':checked')) {
		OpcionConsulta = $("#SltHistoriaClinicaPaciente").val();
	}
	var ConsultarPaciente = {};
	ConsultarPaciente.url = "/Paciente/ListarSugerenciaPacienteBusqueda";
	ConsultarPaciente.type = "POST";
	ConsultarPaciente.data = JSON.stringify({
		opcionBusqueda: OpcionConsulta,
		parametroBusqueda: $("#parametroBusqueda").val(),
	});
	ConsultarPaciente.datatype = "json";
	ConsultarPaciente.contentType = "application/json";
	ConsultarPaciente.success = function (listaSugenrenciaPaciente) {
		$("#sugerenciaPaciente").empty();
		for (var i = 0; i < listaSugenrenciaPaciente.length; i++) {
			var fila = "";
			fila += "<td scope=\"col\">" + listaSugenrenciaPaciente[i]["ParametroBusqueda"] + "</th >";
			$("#sugerenciaPaciente").append("<option value=\"" + listaSugenrenciaPaciente[i]["ParametroBusqueda"] + "\"></option>");
		}
	};
	ConsultarPaciente.error = function () {
		toastr.error("Error al consultar sugerencias del paciente!!");
	};
	$.ajax(ConsultarPaciente);
});
////////////FIN BUSCAR CLIENTE////////////////////////////
////////////FIN FUNCIONES FACTURACION//////////////////////