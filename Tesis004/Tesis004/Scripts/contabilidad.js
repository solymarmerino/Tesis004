function limpiarTablaIngreso() {
	$("#IptIngresoServicio").val("");
	$("#IptIngresoDetalle").val("");
	$("#IptIngresoDetalle").val("");
}

$("#btnAgregarIngreso").click(function () {
    var ContabilidadIngreso = {};
	ContabilidadIngreso.url = "/Contabilidad/GuardarIngreso";
    ContabilidadIngreso.type = "POST";
    ContabilidadIngreso.data = JSON.stringify({
		DescripcionIngreso: $("#IptIngresoServicio").val(),
		ServicioIngreso: $("#IptIngresoDetalle").val(),
		ValorIngreso: $("#IptIngresoDetalle").val(),
		FechaIngreso: $("#iptFechaIngreso").val()

    });
    ContabilidadIngreso.datatype = "json";
    ContabilidadIngreso.contentType = "application/json";
    ContabilidadIngreso.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Ingreso Guardado");
			limpiarTablaIngreso();
			listar();
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

function listar() {
    var ListarIngreso = {};
    ListarIngreso.url = "/Personal/ListarIngreso";
    ListarIngreso.type = "POST";
    ListarIngreso.data = JSON.stringify({
    });
    ListarIngreso.datatype = "json";
    ListarIngreso.contentType = "application/json";
    ListarIngreso.success = function (listaIngreso) {
		$("#tblIngresos").empty();
		var cabecera = "< tr >" +
			"<th scope=\"col\">Servicio</th>"+
			"<th scope=\"col\">Detalle</th>"+
			"<th scope=\"col\">Ingreso</th>"+
			"<th scope=\"col\"></th>"+
			"<th scope=\"col\"></th>"+
			"</tr >";
		$("#tblIngresos").append(cabecera);
		for (var i = 0; i < listaIngreso.length ; i++) {
            var fila = "";
			fila += "<td scope=\"col\">" + listaIngreso[i]["ServicioIngreso"] + "</th >";
			fila += "<td scope=\"col\">" + listaIngreso[i]["DescripcionIngreso"] + "</th >";
			fila += "<td scope=\"col\">" + listaIngreso[i]["ValorIngreso"] + "</th >";
			fila += "<td scope=\"col\"> <button name=\"btnEditarIngreso\" id=\"btnEditarIngreso\" value=\"" + listaIngreso[i]["IngresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"modificar(" + listaIngreso[i]["IngresoID"]+")\"><i class=\"fas fa-edit\"></i></button></th >" 
			fila += "<td scope=\"col\"> <button name=\"btnEliminarIngreso\" id=\"btnEliminarIngreso\" value=\"" + listaIngreso[i]["IngresoID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"eliminar(" + listaIngreso[i]["IngresoID"] + ")\"><i class=\"fas fa-trash-alt\"></i></button></th >"
			$("#tblIngresos").append("<tr>" + fila + "</tr>");

        }
    };
	ListarIngreso.error = function () {
		toastr.error("Error al listar ingreso!!");
    };
    $.ajax(ListarIngreso);
}

$(document).ready(function () {
	limpiarTablaIngreso();
});
