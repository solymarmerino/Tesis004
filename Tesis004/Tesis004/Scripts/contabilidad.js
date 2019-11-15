function limpiarTablaIngreso() {
	$("#IptIngresoServicio").val("");
	$("#IptIngresoDetalle").val("");
	$("#IptIngresoMonto").val("");
}


//////////INICIO FUNCIONES DE USO DE INGRESOS//////////////////////////////////

///////////INICIO LISTAR INGRESOS////////////////////////////
function listarIngreso() {
	var ListarIngreso = {};
	ListarIngreso.url = "/Contabilidad/ListarIngreso";
	ListarIngreso.type = "POST";
	ListarIngreso.data = JSON.stringify({
	});
	ListarIngreso.datatype = "json";
	ListarIngreso.contentType = "application/json";
	ListarIngreso.success = function (ingresoResultado) {
		for (var i = 0; i < ingresoResultado.length; i++) {
			var fila = "";
			fila += "<td scope=\"col\">" + ingresoResultado[i]["ServicioIngreso"] + "</th >";
			fila += "<td scope=\"col\">" + ingresoResultado[i]["DescripcionIngreso"] + "</th >";
			fila += "<td scope=\"col\">" + ingresoResultado[i]["ValorIngreso"] + "</th >";
			fila += "<td scope=\"col\"> <button name=\"btnEditarIngreso\" id=\"btnEditarIngreso\" value=\"" + ingresoResultado[i]["IngresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"modificar(" + ingresoResultado[i]["IngresoID"] + ")\"><i class=\"fas fa-edit\"></i></button></th >"
			fila += "<td scope=\"col\"> <button name=\"btnEliminarIngreso\" id=\"btnEliminarIngreso\" value=\"" + ingresoResultado[i]["IngresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"eliminar(" + ingresoResultado[i]["IngresoID"] + ")\"><i class=\"fas fa-trash-alt\"></i></button></th >"
			$("#tblIngresos").append("<tr>" + fila + "</tr>");
		}
	};
	ListarIngreso.error = function () {
		toastr.error("Error al listar ingreso!!");
	};
	$.ajax(ListarIngreso);
}
///////////FIN LISTAR INGRESOS////////////////////////////

///////////INICIO AGREGAR INGRESOS////////////////////////////
$("#btnAgregarIngreso").click(function () {
    var ContabilidadIngreso = {};
	ContabilidadIngreso.url = "/Contabilidad/GuardarIngreso";
    ContabilidadIngreso.type = "POST";
    ContabilidadIngreso.data = JSON.stringify({
		DescripcionIngreso: $("#IptIngresoServicio").val(),
		ServicioIngreso: $("#IptIngresoDetalle").val(),
		ValorIngreso: $("#IptIngresoMonto").val(),
		FechaIngreso: $("#iptFechaIngreso").val()
    });
    ContabilidadIngreso.datatype = "json";
    ContabilidadIngreso.contentType = "application/json";
    ContabilidadIngreso.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Ingreso Guardado");
			limpiarTablaIngreso();
			listarIngreso();
        }
        else {
            toastr.error("Ingreso NO Guardado");
        }
    };
    ContabilidadIngreso.error = function () {
        toastr.error("Error al guardar el ingreso");
    };
    $.ajax(ContabilidadIngreso);
});
///////////FIN AGREGAR INGRESOS////////////////////////////

//////////FIN FUNCIONES DE USO DE INGRESOS//////////////////////////////////


//////////INICIO FUNCIONES DE USO DE EGRESOS////////////////////////////////

function limpiarTablaEgreso() {
	$("#IptEgresoServicio").val("");
	$("#IptEgresoDetalle").val("");
	$("#IptEgresoMonto").val("");
}

///////////INICIO AGREGAR EGRESOS////////////////////////////
$("#btnAgregarEgreso").click(function () {
	var ContabilidadEgreso = {};
	ContabilidadEgreso.url = "/Contabilidad/GuardarEgreso";
	ContabilidadEgreso.type = "POST";
	ContabilidadEgreso.data = JSON.stringify({
		DescripcionEgreso: $("#iptEgresoDetalle").val(),
		ServicioEgreso: $("#iptEgresoServicio").val(),
		ValorEgreso: $("#iptEgresoMonto").val(),
		FechaEgreso: $("#iptFechaEgreso").val()
	});
	ContabilidadEgreso.datatype = "json";
	ContabilidadEgreso.contentType = "application/json";
	ContabilidadEgreso.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Egreso Guardado");
			limpiarTablaEgreso();
		}
		else {
			toastr.error("Egreso NO Guardado");
		}
	};
	ContabilidadEgreso.error = function () {
		toastr.error("Error al guardar el egreso");
	};
	$.ajax(ContabilidadEgreso);
});
///////////FIN AGREGAR EGRESOS////////////////////////////
//////////FIN FUNCIONES DE USO DE EGRESOS//////////////////////////////////




$(document).ready(function () {
	limpiarTablaIngreso();
});
