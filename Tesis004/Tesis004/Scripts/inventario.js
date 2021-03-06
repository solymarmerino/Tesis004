﻿//////////////INICIO FUNCIONES INVENTARIO//////////////

///////////INICIO LIMPIAR CAMPOS Y TABLA PRODUCTOS////////////////////////////
function limpiarTablaProductos() {
    $("#iptProducto").val("");
    $("#iptTipoProducto").val("");
	$("#iptCantidad").val("");
	$("#iptLote").val("");
    $("#iptFechaVencimiento").val("");
    $("#tblProducto").empty();
	var cabecera = "<tr>" +
		"<th scope=\"col\">Producto</th>" +
		"<th scope=\"col\">Tipo</th>" +
		"<th scope=\"col\">Cantidad</th>" +
		"<th scope=\"col\">Lote</th>" +
		"<th scope=\"col\">Fecha Vencimiento</th>" +
		"<th scope=\"col\"></th>" +
		"<th scope=\"col\"></th>" +
		"</tr>";
	$("#tblProducto").append(cabecera);
}
///////////FIN LIMPIAR CAMPOS Y TABLA PRODUCTOS////////////////////////////

function listarProducto() {
    var ListarProducto = {};
    ListarProducto.url = "/Inventario/ListarProducto";
    ListarProducto.type = "POST";
    ListarProducto.data = JSON.stringify({
    });
    ListarProducto.datatype = "json";
    ListarProducto.contentType = "application/json";
    ListarProducto.success = function (resultado) {
        for (var i = 0; i < resultado.length; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + resultado[i]["Producto"] + "</td >";
            fila += "<td scope=\"col\">" + resultado[i]["TipoProducto"] + "</td >";
            fila += "<td scope=\"col\">" + resultado[i]["CantidadProducto"] + "</td >";
            fila += "<td scope=\"col\">" + resultado[i]["LoteProducto"] + "</td >";
            fila += "<td scope=\"col\">" + resultado[i]["FechaString"] + "</td >";
            fila += "<td scope=\"col\"> <input id=\"ipt" + resultado[i]["ProductoID"] + "\" name=\"ipt" + resultado[i]["ProductoID"] +"\" class=\"col-md\" style=\"text-align: left; border-radius: 0.3rem; width: 100 %; height: 40px;\" /></td >"
            fila += "<td scope=\"col\"> <button name=\"btnDisminuirProducto\" id=\"btnDisminuirProducto\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"disminuirProducto(" + resultado[i]["ProductoID"] + ")\"><i class=\"fas fa-minus-square\"></i></button></td >"
            fila += "<td scope=\"col\"> <button name=\"btnEliminarProducto\" id=\"btnEliminarProducto\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"eliminarProducto(" + resultado[i]["ProductoID"] + ")\"><i class=\"fas fa-trash-alt\"></i></button></td >"
            $("#tblProducto").append("<tr>" + fila + "</tr>");
        }
    };
    ListarProducto.error = function () {
        toastr.error("Error al listar productos");
    };
    $.ajax(ListarProducto);
}

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
            listarProducto();
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

function disminuirProducto(IdProducto) {
    var DisminuirProducto = {};
    DisminuirProducto.url = "/Inventario/DisminuirProducto";
    DisminuirProducto.type = "POST";
    DisminuirProducto.data = JSON.stringify({
        productoId: IdProducto,
        cantidad: $("#ipt"+IdProducto.toString()).val()
    });
    DisminuirProducto.datatype = "json";
    DisminuirProducto.contentType = "application/json";
    DisminuirProducto.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Producto descontado");
            limpiarTablaProductos();
            listarProducto();
        }
        else {
            toastr.error("Producto NO descontado");
        }
    };
    DisminuirProducto.error = function () {
        toastr.error("Error al descontar el producto");
    };
    $.ajax(DisminuirProducto);
}

function eliminarProducto(IdProducto) {
    var EliminarProducto = {};
    EliminarProducto.url = "/Inventario/EliminarProducto";
    EliminarProducto.type = "POST";
    EliminarProducto.data = JSON.stringify({
        productoId: IdProducto
    });
    EliminarProducto.datatype = "json";
    EliminarProducto.contentType = "application/json";
    EliminarProducto.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Producto eliminado");
            limpiarTablaProductos();
            listarProducto();
        }
        else {
            toastr.error("Producto NO eliminado");
        }
    };
    EliminarProducto.error = function () {
        toastr.error("Error al eliminar el producto");
    };
    $.ajax(EliminarProducto);
}

$("#btnGuardarProducto").click(function () {
    AgregarProducto();
})

$(document).ready(function () {
    limpiarTablaProductos();
    listarProducto();
});

//////////////FIN FUNCIONES INVENTARIO//////////////