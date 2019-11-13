function limpiarTablaIngreso() {
	$("#IptIngresoServicio").val("");
	$("#IptIngresoDetalle").val("");
	$("#IptIngresoDetalle").val("");
}

$("#btnAgregarIngreso").click(function () {
    var ContabilidadIngreso = {};
	ContabilidadIngreso.url = "/Contabilidad/GestionContabilidad";
    ContabilidadIngreso.type = "POST";
    ContabilidadIngreso.data = JSON.stringify({
		DescripcionIngreso: $("#IptIngresoServicio").val(),
		ServicioIngreso: $("#IptIngresoDetalle").val(),
		ValorIngreso: $("#IptIngresoDetalle").val(),
		FechaIngreso: $("#iptFechaIngreso").val(),

    });
    ContabilidadIngreso.datatype = "json";
    ContabilidadIngreso.contentType = "application/json";
    ContabilidadIngreso.success = function (resultado) {
        if (resultado[0] == true) {
            toastr.success("Ingreso Guardado");
			limpiarTablaIngreso();
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

$(document).ready(function () {
	limpiarTablaIngreso();
});
