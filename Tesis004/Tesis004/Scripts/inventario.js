//////////////INICIO FUNCIONES INVENTARIO//////////////

///////////INICIO LIMPIAR CAMPOS Y TABLA PRODUCTOS////////////////////////////
function limpiarTablaProductos() {
	$("#iptProducto").empty();
	$("#sltTipoProducto").empty();
	$("#iptCantidad").empty();
	$("#iptLote").empty();
	$("#iptFechaVencimiento").empty();
	var cabecera = "<tr>" +
		"<th scope=\"col\">Producto</th>" +
		"<th scope=\"col\">Tipo</th>" +
		"<th scope=\"col\">Cantidad</th>" +
		"<th scope=\"col\">Lote</th>" +
		"<th scope=\"col\">Fecha Vencimiento</th>" +
		"</tr>";
	$("#tblProducto").append(cabecera);
}
///////////FIN LIMPIAR CAMPOS Y TABLA PRODUCTOS////////////////////////////

///////////INICIO AGREGAR PRODUCTO////////////////////////////
function AgregarProducto() {
	var NuevoProducto = {};
	NuevoProducto.url = "/Inventario/GuardarProducto";
	NuevoProducto.type = "POST";
	NuevoProducto.data = JSON.stringify({
		Producto: $("#iptProducto").val(),
		TipoProducto: $("#iptTipoProducto").val(),
		CantidadProducto: $("#iptCantidad").val(),
		LoteProducto: $("#iptLote").val(),
		FechaVencimientoProducto: $("#iptFechaVencimiento").val()
	});
	NuevoProducto.datatype = "json";
	NuevoProducto.contentType = "application/json";
	NuevoProducto.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Producto Guardado");
			limpiarTablaProductos();
			
		}
		else {
			toastr.error("Producto NO Guardado");
		}
	};
	NuevoProducto.error = function () {
		toastr.error("Error al guardar el producto");
	};
	$.ajax(NuevoProducto);
}
///////////FIN AGREGAR PRODUCTO////////////////////////////


//////////////FIN FUNCIONES INVENTARIO//////////////