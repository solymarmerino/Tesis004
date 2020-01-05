//////////INICIO FUNCIONES DE USO DE INGRESOS//////////////////////////////////

///////////INICIO LIMPIAR TABLA INGRESOS////////////////////////////
function limpiarTablaIngreso() {
	$("#IptIngresoServicio").val("");
	$("#IptIngresoDetalle").val("");
	$("#IptIngresoMonto").val("");
	$("#tblIngresos").empty();
	var cabecera = "<tr>" +
		"<th scope=\"col\">Servicio</th>" +
		"<th scope=\"col\">Detalle</th>" +
		"<th scope=\"col\">Ingreso</th>" +
		"<th scope=\"col\"></th>" +
		"<th scope=\"col\"></th>" +
		"</tr>";
	$("#tblIngresos").append(cabecera);
}
///////////FIN LIMPIAR TABLA INGRESOS////////////////////////////

///////////INICIO LISTAR INGRESOS////////////////////////////
function listarIngreso() {
	var ListarIngreso = {};
	ListarIngreso.url = "/Contabilidad/ListarIngreso";
	ListarIngreso.type = "POST";
	ListarIngreso.data = JSON.stringify({
		FechaIngreso: $("#iptFechaIngreso").val()
	});
	ListarIngreso.datatype = "json";
	ListarIngreso.contentType = "application/json";
	ListarIngreso.success = function (ingresoResultado) {
		for (var i = 0; i < ingresoResultado.length; i++) {
			var fila = "";
			fila += "<td scope=\"col\">" + ingresoResultado[i]["ServicioIngreso"] + "</th >";
			fila += "<td scope=\"col\">" + ingresoResultado[i]["DescripcionIngreso"] + "</th >";
			fila += "<td scope=\"col\">" + ingresoResultado[i]["ValorIngreso"] + "</th >";
			fila += "<td scope=\"col\"> <button name=\"btnEditarIngreso\" id=\"btnEditarIngreso\" value=\"" + ingresoResultado[i]["IngresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"obtenerIngreso(" + ingresoResultado[i]["IngresoID"] + ")\"><i class=\"fas fa-edit\"></i></button></th >"
			fila += "<td scope=\"col\"> <button name=\"btnEliminarIngreso\" id=\"btnEliminarIngreso\"  value=\"" + ingresoResultado[i]["IngresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"eliminarIngreso(" + ingresoResultado[i]["IngresoID"] + ")\"><i class=\"fas fa-trash-alt\"></i></button></th >"
			$("#tblIngresos").append("<tr>" + fila + "</tr>");
		}
	};
	ListarIngreso.error = function () {
		toastr.error("Error al listar ingreso!!");
	};
	$.ajax(ListarIngreso);
}
///////////FIN LISTAR INGRESOS////////////////////////////

///////////INICIO OBTENER INGRESOS////////////////////////////
function obtenerIngreso(IngresoID) {
	var ObtenerIngreso = {};
	ObtenerIngreso.url = "/Contabilidad/ObtenerIngreso";
	ObtenerIngreso.type = "POST";
	ObtenerIngreso.data = JSON.stringify({
		IngresoID: IngresoID
	});
	ObtenerIngreso.datatype = "json";
	ObtenerIngreso.contentType = "application/json";
	ObtenerIngreso.success = function (ingresoResultado) {
		$("#IptIngresoServicio").prop("value", ingresoResultado["ServicioIngreso"]);
		$("#IptIngresoDetalle").prop("value", ingresoResultado["DescripcionIngreso"]);
		$("#IptIngresoMonto").prop("value", ingresoResultado["ValorIngreso"]);
		$("#btnAgregarIngreso").attr("onclick", "editarIngreso(" + ingresoResultado["IngresoID"] + ")");      ///cambia la llamada de la funcion agragar a editar 
		$("#btnAgregarIngreso").prop("title", "Modificar servicio");

	};
	ObtenerIngreso.error = function () {
		toastr.error("Error al obtener el ingreso!!");
	};
	$.ajax(ObtenerIngreso);
}
///////////FIN OBTENER INGRESOS////////////////////////////

///////////INICIO EDITAR INGRESOS////////////////////////////
function editarIngreso(IngresoID) {
	var EditarIngreso = {};
	EditarIngreso.url = "/Contabilidad/ModificarIngreso";
	EditarIngreso.type = "POST";
	EditarIngreso.data = JSON.stringify({
		DescripcionIngreso: $("#IptIngresoDetalle").val(),
		ServicioIngreso: $("#IptIngresoServicio").val(),
		ValorIngreso: $("#IptIngresoMonto").val(),
		FechaIngreso: $("#iptFechaIngreso").val(),
		IngresoID: IngresoID
	});
	EditarIngreso.datatype = "json";
	EditarIngreso.contentType = "application/json";
	EditarIngreso.success = function (modificado) {
		if (modificado[0] == true) {
			toastr.success("Ingreso modificado!!");
			limpiarTablaIngreso();
			listarIngreso();
		}
		else {
			toastr.error("Ingreso NO modificado!!!!");
		}
	};
	EditarIngreso.error = function () {
		toastr.error("Error al modificar ingreso!!");
	};
	$.ajax(EditarIngreso);
}
///////////FIN EDITAR INGRESOS////////////////////////////

///////////INICIO ELIMINAR INGRESOS////////////////////////////
function eliminarIngreso(ingresoID) {
	var EliminarIngreso = {};
	EliminarIngreso.url = "/Contabilidad/EliminarIngreso";
	EliminarIngreso.type = "POST";
	EliminarIngreso.data = JSON.stringify({
		IngresoID: ingresoID
	});
	EliminarIngreso.datatype = "json";
	EliminarIngreso.contentType = "application/json";
	EliminarIngreso.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Ingreso eliminada");
			limpiarTablaIngreso();
			listarIngreso();
		}
		else {
			toastr.error("Ingreso NO eliminada");

		}
	};
	EliminarIngreso.error = function () {
		toastr.error("Error al eliminar ingreso!!");
	};
	$.ajax(EliminarIngreso);
}
///////////FIN ELIMINAR INGRESOS////////////////////////////

///////////INICIO AGREGAR INGRESOS////////////////////////////
function agregarIngreso() {
    var ContabilidadIngreso = {};
	ContabilidadIngreso.url = "/Contabilidad/GuardarIngreso";
    ContabilidadIngreso.type = "POST";
    ContabilidadIngreso.data = JSON.stringify({
		DescripcionIngreso: $("#IptIngresoDetalle").val(),
		ServicioIngreso: $("#IptIngresoServicio").val(),
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
}
///////////FIN AGREGAR INGRESOS////////////////////////////

//////////FIN FUNCIONES DE USO DE INGRESOS//////////////////////////////////


//////////INICIO FUNCIONES DE USO DE EGRESOS////////////////////////////////

//////////INICIO LIMPIA TABLA EGRESO EGRESOS////////////////////////////////
function limpiarTablaEgreso() {
	$("#IptEgresoServicio").val("");
	$("#IptEgresoDetalle").val("");
	$("#IptEgresoMonto").val("");
	$("#tblEgresos").empty();
	var cabecera = "<tr>" +
		"<th scope=\"col\">Servicio</th>" +
		"<th scope=\"col\">Detalle</th>" +
		"<th scope=\"col\">Ingreso</th>" +
		"<th scope=\"col\"></th>" +
		"<th scope=\"col\"></th>" +
		"</tr>";
	$("#tblEgresos").append(cabecera);
}
//////////FIN LIMPIA TABLA EGRESO EGRESOS////////////////////////////////

///////////INICIO LISTAR EGRESOS////////////////////////////
function listarEgreso() {
	var ListarEgreso = {};
	ListarEgreso.url = "/Contabilidad/ListarEgreso";
	ListarEgreso.type = "POST";
	ListarEgreso.data = JSON.stringify({
		FechaEgreso: $("#iptFechaEgreso").val()
	});
	ListarEgreso.datatype = "json";
	ListarEgreso.contentType = "application/json";
	ListarEgreso.success = function (egresoResultado) {
		for (var i = 0; i < egresoResultado.length; i++) {
			var fila = "";
			fila += "<td scope=\"col\">" + egresoResultado[i]["ServicioEgreso"] + "</th >";
			fila += "<td scope=\"col\">" + egresoResultado[i]["DescripcionEgreso"] + "</th >";
			fila += "<td scope=\"col\">" + egresoResultado[i]["ValorEgreso"] + "</th >";
			fila += "<td scope=\"col\"> <button name=\"btnEditarEgreso\" id=\"btnEditarEgreso\" value=\"" + egresoResultado[i]["EgresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"obtenerEgreso(" + egresoResultado[i]["EgresoID"] + ")\"><i class=\"fas fa-edit\"></i></button></th >"
			fila += "<td scope=\"col\"> <button name=\"btnEliminarEgreso\" id=\"btnEliminarEgreso\"  value=\"" + egresoResultado[i]["EgresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"eliminarEgreso(" + egresoResultado[i]["EgresoID"] + ")\"><i class=\"fas fa-trash-alt\"></i></button></th >"
			$("#tblEgresos").append("<tr>" + fila + "</tr>");
		}
	};
	ListarEgreso.error = function () {
		toastr.error("Error al listar egreso!!");
	};
	$.ajax(ListarEgreso);
}
///////////FIN LISTAR EGRESOS////////////////////////////

///////////INICIO OBTENER EGRESOS////////////////////////////
function obtenerEgreso(egresoID) {
	var ObtenerEgreso = {};
	ObtenerEgreso.url = "/Contabilidad/ObtenerEgreso";
	ObtenerEgreso.type = "POST";
	ObtenerEgreso.data = JSON.stringify({
		EgresoID: egresoID
	});
	ObtenerEgreso.datatype = "json";
	ObtenerEgreso.contentType = "application/json";
	ObtenerEgreso.success = function (egresoResultado) {
		$("#iptEgresoServicio").prop("value", egresoResultado["ServicioEgreso"]);
		$("#iptEgresoDetalle").prop("value", egresoResultado["DescripcionEgreso"]);
		$("#iptEgresoMonto").prop("value", egresoResultado["ValorEgreso"]);
		$("#btnAgregarEgreso").attr("onclick", "editarEgreso(" + egresoResultado["EgresoID"] + ")");      ///cambia la llamada de la funcion agragar a editar 
		$("#btnAgregarEgreso").prop("title", "Modificar egreso");

	};
	ObtenerEgreso.error = function () {
		toastr.error("Error al obtener el egreso!!");
	};
	$.ajax(ObtenerEgreso);
}
///////////FIN OBTENER EGRESOS////////////////////////////

///////////INICIO EDITAR EGRESOS////////////////////////////
function editarEgreso(egresoID) {
	var EditarEgreso = {};
	EditarEgreso.url = "/Contabilidad/ModificarEgreso";
	EditarEgreso.type = "POST";
	EditarEgreso.data = JSON.stringify({
		DescripcionEgreso: $("#iptEgresoDetalle").val(),
		ServicioEgreso: $("#iptEgresoServicio").val(),
		ValorEgreso: $("#iptEgresoMonto").val(),
		FechaEgreso: $("#iptFechaEgreso").val(),
		EgresoID: egresoID
	});
	EditarEgreso.datatype = "json";
	EditarEgreso.contentType = "application/json";
	EditarEgreso.success = function (modificado) {
		if (modificado[0] == true) {
			toastr.success("Egreso modificado!!");
			limpiarTablaEgreso();
			listarEgreso();
		}
		else {
			toastr.error("Egreso NO modificado!!!!");
		}
	};
	EditarEgreso.error = function () {
		toastr.error("Error al modificar egreso!!");
	};
	$.ajax(EditarEgreso);
}
///////////FIN EDITAR INGRESOS////////////////////////////

///////////INICIO ELIMINAR EGRESOS////////////////////////////
function eliminarEgreso(egresoID) {
	var EliminarEgreso = {};
	EliminarEgreso.url = "/Contabilidad/EliminarEgreso";
	EliminarEgreso.type = "POST";
	EliminarEgreso.data = JSON.stringify({
		EgresoID: egresoID
	});
	EliminarEgreso.datatype = "json";
	EliminarEgreso.contentType = "application/json";
	EliminarEgreso.success = function (resultado) {
		if (resultado[0] == true) {
			toastr.success("Egreso eliminada");
			limpiarTablaEgreso();
			listarEgreso();
		}
		else {
			toastr.error("Egreso NO eliminada");

		}
	};
	EliminarEgreso.error = function () {
		toastr.error("Error al eliminar Egreso!!");
	};
	$.ajax(EliminarEgreso);
}
///////////FIN ELIMINAR EGRESOS////////////////////////////

///////////INICIO AGREGAR EGRESOS////////////////////////////
function AgregarEgreso() {
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
			listarEgreso();
		}
		else {
			toastr.error("Egreso NO Guardado");
		}
	};
	ContabilidadEgreso.error = function () {
		toastr.error("Error al guardar el egreso");
	};
	$.ajax(ContabilidadEgreso);
}
///////////FIN AGREGAR EGRESOS////////////////////////////
//////////FIN FUNCIONES DE USO DE EGRESOS//////////////////////////////////

//////////INICIO FUNCIONES DE INFORME I/E//////////////////////////////////

///////////INICIO LIMPIAR TABLA INGRESOS////////////////////////////
function limpiarTablaInforme() {
	$("#tblInforme").empty();
	var cabecera = "<tr>" +
		"<th scope=\"col\">Fecha</th>" +
		"<th scope=\"col\">Servicio</th>" +
		"<th scope=\"col\">Detalle</th>" +
		"<th scope=\"col\">Ingreso</th>" +
		"</tr>";
	$("#tblInforme").append(cabecera);
}
///////////FIN LIMPIAR TABLA INGRESOS////////////////////////////

///////////INICIO INFORME I/E ///////////////////////////
function Informe() {
	limpiarTablaInforme();
		var ListarInforme = {};
		if ($('#rdIngreso')[0].checked == true) {
			ListarInforme.url = "/Contabilidad/InformeIngreso";
		}
		if ($('#rdEgreso')[0].checked == true) {
			ListarInforme.url = "/Contabilidad/InformeEgreso";
		}
		ListarInforme.type = "POST";
		ListarInforme.data = JSON.stringify({
			FechaInicio: $("#iptFechaInicio").val(),
			FechaFin: $("#iptFechaFin").val()
		});
		ListarInforme.datatype = "json";
	ListarInforme.contentType = "application/json";

	if ($('#rdIngreso')[0].checked == true) {
		ListarInforme.success = function (informeResultado) {
            for (var i = 0; i < informeResultado.length; i++) {
                var fecha = Date(informeResultado[i]["FechaIngreso"]);
                var fila = "";
                fila += "<td scope=\"col\">" + informeResultado[i]["FechaString"] + "</th >";
				fila += "<td scope=\"col\">" + informeResultado[i]["ServicioIngreso"] + "</th >";
				fila += "<td scope=\"col\">" + informeResultado[i]["DescripcionIngreso"] + "</th >";
				fila += "<td scope=\"col\">" + informeResultado[i]["ValorIngreso"] + "</th >";
				$("#tblInforme").append("<tr>" + fila + "</tr>");
			}
		};
	}
	if ($('#rdEgreso')[0].checked == true) {
		ListarInforme.success = function (informeResultado) {
            for (var i = 0; i < informeResultado.length; i++) {
                var fecha = informeResultado[i]["FechaEgreso"];
				var fila = "";
                fila += "<td scope=\"col\">" + informeResultado[i]["FechaString"] + "</th >";
				fila += "<td scope=\"col\">" + informeResultado[i]["ServicioEgreso"] + "</th >";
				fila += "<td scope=\"col\">" + informeResultado[i]["DescripcionEgreso"] + "</th >";
				fila += "<td scope=\"col\">" + informeResultado[i]["ValorEgreso"] + "</th >";
				$("#tblInforme").append("<tr>" + fila + "</tr>");
			}
		};
	}
		
		ListarInforme.error = function () {
			toastr.error("Error al listar egreso!!");
		};
		$.ajax(ListarInforme);	
}
///////////FIN INFORME I/E ///////////////////////////

//////////FIN FUNCIONES DE INFORME I/E//////////////////////////////////

function limpiarTablaPagoPersonal() {
	$("#iptTotalPersonal").val("");
	$("#tblPagoPersonal").empty();
	var cabecera = "<tr>" +
		"<th scope=\"col\">Personal</th>" +
		"<th scope=\"col\">Citas</th>" +
		"<th scope=\"col\">Valor</th>" +
		"<th scope=\"col\">Total</th>" +
		"</tr>";
	$("#tblPagoPersonal").append(cabecera);
}

function listarPagoPersonal() {
	var PagoPersonal = {};
	PagoPersonal.url = "/Contabilidad/ListarPagoMedico";
	PagoPersonal.type = "POST";
	PagoPersonal.data = JSON.stringify({
	});
	PagoPersonal.datatype = "json";
	PagoPersonal.contentType = "application/json";
	PagoPersonal.success = function (resultado) {
		var totalDia = 0;
		for (var i = 0; i < resultado.length; i++) {
			totalDia += resultado[i]["TotalPersonal"];
			var fila = "";
			fila += "<td scope=\"col\">" + resultado[i]["NombrePersonal"] + "</th >";
			fila += "<td scope=\"col\">" + resultado[i]["NumeroCitas"] + "</th >";
			fila += "<td scope=\"col\">" + resultado[i]["PagoCita"] + "</th >";
			fila += "<td scope=\"col\">" + resultado[i]["TotalPersonal"] + "</th >";
			$("#tblPagoPersonal").append("<tr>" + fila + "</tr>");
		}
		$("#iptTotalPersonal").val(totalDia);
	};
	PagoPersonal.error = function () {
		toastr.error("Error al listar pago a personal!!");
	};
	$.ajax(PagoPersonal);
}

$("#btnActualizarTablaPago").click(function () {
	limpiarTablaPagoPersonal();
	listarPagoPersonal();
});

$(document).ready(function () {
	limpiarTablaIngreso();
	listarIngreso();
	limpiarTablaEgreso();
	listarEgreso();
	limpiarTablaInforme();
	limpiarTablaPagoPersonal();
	listarPagoPersonal();
});
