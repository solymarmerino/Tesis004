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
/*$("#iptClienteFactura").keypress(function () {
	var ConsultarCliente = {};
	ConsultarCliente.url = "/Factura/ListarSugerenciaCliente";
	ConsultarCliente.type = "POST";
	ConsultarCliente.data = JSON.stringify({
		NombreCliente: $("#iptClienteFactura").val(),
	});
	ConsultarCliente.datatype = "json";
	ConsultarCliente.contentType = "application/json";
	ConsultarCliente.success = function (listaSugenrenciaCliente) {
		$("#sugerenciaCliente").empty();
		for (var i = 0; i < listaSugenrenciaCliente.length; i++) {
			var fila = "";
			fila += "<td scope=\"col\">" + listaSugenrenciaCliente[i]["NombreCliente"] + "</th >";
			$("#sugerenciaCliente").append("<option value=\"" + listaSugenrenciaCliente[i]["NombreCliente"] + "\"></option>");
		}
	};
	ConsultarCliente.error = function () {
		toastr.error("Error al consultar sugerencias de clientes!!");
	};
	$.ajax(ConsultarCliente);
});*/
////////////FIN BUSCAR CLIENTE///////////////////////////


///////////INICIO AGREGAR FACTURA////////////////////////////
function obtenerIdCliente(CedulaCliente) {
	var ObtenerIdCliente = {};
	ObtenerIdCliente.url = "/Factura/ObtenerIdCliente";
	ObtenerIdCliente.type = "POST";
	ObtenerIdCliente.data = JSON.stringify({
		CedulaCliente: CedulaCliente
	});
	ObtenerIdCliente.datatype = "json";
	ObtenerIdCliente.contentType = "application/json";
	ObtenerIdCliente.success = function (ingresoResultado) {
		$("#iptNumCliente").prop("value", ingresoResultado["ClienteID"]);
	};
	ObtenerIdCliente.error = function () {
		toastr.error("Error al obtener el dato!!");
	};
	$.ajax(ObtenerIdCliente);
}




function agregarFactura() {
	var Facturacion = {};
	Facturacion.url = "/Factura/GuardarFactura";
	Facturacion.type = "POST";
	Facturacion.data = JSON.stringify({
		FechaFactura: $("#iptClienteFactura").val(),
		CedulaCliente: $("#iptClienteCI").val(),
		DireccionCliente: $("#iptClienteDireccion").val(),
		TelefonoCliente: $("#iptClienteTelefono").val()
	});
	Facturacion.datatype = "json";
	Facturacion.contentType = "application/json";
	Facturacion.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Datos cliente guardado");
			limpiarTablaIngreso();
			listarIngreso();
		}
		else {
			toastr.error("Datos cliente NO guardado");
		}
	};
	Facturacion.error = function () {
		toastr.error("Error al guardar los datos del cliente");
	};
	$.ajax(Facturacion);
}
///////////FIN AGREGAR FACTURA////////////////////////////

////////////FIN FUNCIONES FACTURACION//////////////////////

$(document).ready(function () {
	//obtenerIdCliente();
});