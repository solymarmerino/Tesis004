function limpiarTablaDetalle() {
    $("#iptDetalleFactura").val("");
    $("#iptCantidadProductoFactura").val("");
    $("#iptValorProductoFactura").val("");
    $("#TablaDetalleFactura").empty();
    var cabecera = "<tr>" +
        "<th scope=\"col\">Cantidad</th>" +
        "<th scope=\"col\">Detalle</th>" +
        "<th scope=\"col\">Valor Unitario</th>" +
        "<th scope=\"col\">Valor Total</th>" +
        "<th scope=\"col\"></th>" +
        "</tr>";
    $("#TablaDetalleFactura").append(cabecera);
}

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
function obtenerCliente() {
	var ObtenerCliente = {};
	ObtenerCliente.url = "/Factura/ObtenerCliente";
	ObtenerCliente.type = "POST";
	ObtenerCliente.data = JSON.stringify({
        cedula: $("#iptClienteCI").val()
	});
	ObtenerCliente.datatype = "json";
	ObtenerCliente.contentType = "application/json";
	ObtenerCliente.success = function (resultado) {
        $("#iptNumCliente").prop("value", resultado["ClienteID"]);
        $("#iptClienteFactura").prop("value", resultado["NombreCliente"]);
        $("#iptClienteDireccion").prop("value", resultado["DireccionCliente"]);
        $("#iptClienteTelefono").prop("value", resultado["TelefonoCliente"]);
	};
	ObtenerCliente.error = function () {
		toastr.error("Error al obtener el cliente!!");
	};
	$.ajax(ObtenerCliente);
}

function actualizarFactura() {
    var Facturacion = {};
    Facturacion.url = "/Factura/ActualizarFactura";
    Facturacion.type = "POST";
    Facturacion.data = JSON.stringify({
        FacturaID: $("#iptFacturaID").val(),
        FechaEmision: $("#iptFechaFactura").val(),
        Subtotal: $("#iptValorTotalFactura").val(),
        Total: $("#iptValorTotalFactura").val(),
        NumeroFactura: $("#iptNumeroFactura").val(),
        ClienteID: $("#iptNumCliente").val(),
        NombreCliente: $("#iptClienteFactura").val(),
        CedulaCliente: $("#iptClienteCI").val(),
        DireccionCliente: $("#iptClienteDireccion").val(),
        TelefonoCliente: $("#iptClienteTelefono").val()
    });
    Facturacion.datatype = "json";
    Facturacion.contentType = "application/json";
    Facturacion.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Factura generada");
            location.reload();
        }
        else {
            toastr.error("Factura NO generada");
        }
    };
    Facturacion.error = function () {
        toastr.error("Error al generar la factura");
    };
    $.ajax(Facturacion);
}

/*function agregarFactura() {
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
}*/
///////////FIN AGREGAR FACTURA////////////////////////////

////////////FIN FUNCIONES FACTURACION//////////////////////

function listarDetalle() {
    var ListarDetalle = {};
    ListarDetalle.url = "/Factura/ListarDetalle";
    ListarDetalle.type = "POST";
    ListarDetalle.data = JSON.stringify({
        facturaId: $("#iptFacturaID").val()
    });
    ListarDetalle.datatype = "json";
    ListarDetalle.contentType = "application/json";
    ListarDetalle.success = function (resultado) {
        for (var i = 0; i < resultado.length; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + resultado[i]["Cantidad"] + "</th >";
            fila += "<td scope=\"col\">" + resultado[i]["Concepto"] + "</th >";
            fila += "<td scope=\"col\">" + resultado[i]["Precio"] + "</th >";
            fila += "<td scope=\"col\">" + (resultado[i]["Cantidad"] * resultado[i]["Precio"]) + "</th >";
            fila += "<td scope=\"col\"> <button name=\"btnEliminarDetalle\" id=\"btnEliminarDetalle\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"eliminarDetalle(" + resultado[i]["DetalleFacturaID"] + ")\"><i class=\"fas fa-trash-alt\"></i></button></th >"
            $("#TablaDetalleFactura").append("<tr>" + fila + "</tr>");
            
        }
        total = 0;
        for (var i = 0; i < resultado.length; i++) {
            total += (resultado[i]["Cantidad"] * resultado[i]["Precio"])
        }
        $("#iptValorTotalFactura").val(total);
    };
    ListarDetalle.error = function () {
        toastr.error("Error al listar detalles");
    };
    $.ajax(ListarDetalle);
}

function agregarDetalle() {
    var AgregarDetalle = {};
    AgregarDetalle.url = "/Factura/GuardarDetalle";
    AgregarDetalle.type = "POST";
    AgregarDetalle.data = JSON.stringify({
        Concepto: $("#iptDetalleFactura").val(),
        Cantidad: $("#iptCantidadProductoFactura").val(),
        Precio: $("#iptValorProductoFactura").val(),
        FacturaID: $("#iptFacturaID").val()
    });
    AgregarDetalle.datatype = "json";
    AgregarDetalle.contentType = "application/json";
    AgregarDetalle.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Detalle Guardado");
            limpiarTablaDetalle();
            listarDetalle();
        }
        else {
            toastr.error("Detalle NO Guardado");
        }
    };
    AgregarDetalle.error = function () {
        toastr.error("Error al guardar el detalle");
    };
    $.ajax(AgregarDetalle);
}

function eliminarDetalle(detalleId) {
    var EliminarDetalle = {};
    EliminarDetalle.url = "/Factura/EliminarDetalle";
    EliminarDetalle.type = "POST";
    EliminarDetalle.data = JSON.stringify({
        detalleFacturaId: detalleId
    });
    EliminarDetalle.datatype = "json";
    EliminarDetalle.contentType = "application/json";
    EliminarDetalle.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Detalle eliminado");
            limpiarTablaDetalle();
            listarDetalle();
        }
        else {
            toastr.error("Detalle NO eliminado");
        }
    };
    EliminarDetalle.error = function () {
        toastr.error("Error al eliminar el detalle");
    };
    $.ajax(EliminarDetalle);
}

$("#btnBuscarCliente").click(function () {
    obtenerCliente();
})

$("#btnAgregarDetalleFactura").click(function () {
    agregarDetalle();
})

$(document).ready(function () {
    limpiarTablaDetalle();
    listarDetalle();
});