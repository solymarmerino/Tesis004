function modificar(PersonalID) {
    $("#TituloCabeceraNuevo").prop("hidden", true);
    $("#TituloCabeceraModificar").prop("hidden", false);
    $("#BtnGuardarNuevo").prop("hidden", true);
    $("#BtnGuardarModificar").prop("hidden", false);
    $("#BtnBtnGuardarModificar").prop("value", PersonalID);
    $("#AItemPersonal").click();
    var ConsultarPersonal = {};
    ConsultarPersonal.url = "/Personal/ModificarPersonal";
    ConsultarPersonal.type = "POST";
    ConsultarPersonal.data = JSON.stringify({
        idPersonal: PersonalID
    });
    ConsultarPersonal.datatype = "json";
    ConsultarPersonal.contentType = "application/json";
    ConsultarPersonal.success = function (personal) {
        $("#Nombre").prop("value",personal["Nombre"]);
        $("#Cedula").prop("value",personal["Cedula"]);
        $("#Telefono").prop("value",personal["Telefono"]);
        $("#Cargo").prop("value",personal["Cargo"]);
        $("#Especialidad").prop("value",personal["Especialidad"]);
        $("#Usuario").prop("value",personal["Usuario"]);
    };
    ConsultarPersonal.error = function () {
        alert("Error al consultar personal!!");
    };
    $.ajax(ConsultarPersonal);
}

function ingresar() {
    var IngresarPersonal = {};
    IngresarPersonal.url = "/Personal/IngresarPersonal";
    IngresarPersonal.type = "POST";
    IngresarPersonal.data = JSON.stringify({
        nombre: $("#Nombre").val(),
        cedula: $("#Cedula").val(),
        telefono: $("#Telefono").val(),
        cargo: $("#Cargo").val(),
        especialidad: $("#Especialidad").val(),
        usuario: $("#Usuario").val(),
        contrasena: $("#Contrasena").val(),
        confcontrasena: $("#ConfContrasena").val(),
    });
    IngresarPersonal.datatype = "json";
    IngresarPersonal.contentType = "application/json";
    IngresarPersonal.success = function (ingresado) {
        if (ingresado[0] == true) {
            alert("Personal ingresado!!");
            $("#Nombre").empty();
            $("#Cedula").empty();
            $("#Telefono").empty();
            $("#Cargo").prop("value",0);
            $("#Especialidad").prop("value", 0);
            $("#Usuario").empty();
            $("#Contrasena").empty();
            $("#ConfContrasena").empty();
        }
        else {
            alert("Personal NO ingresado!!!!");
        }
    };
    IngresarPersonal.error = function () {
        alert("Error al ingresar personal!!");
    };
    $.ajax(IngresarPersonal);
}

function listar() {
    var ListarPersonal = {};
    ListarPersonal.url = "/Personal/ListarPersonal";
    ListarPersonal.type = "POST";
    ListarPersonal.data = JSON.stringify({
    });
    ListarPersonal.datatype = "json";
    ListarPersonal.contentType = "application/json";
    ListarPersonal.success = function (listaPersonal) {
        $("#TablaPersonal").empty();
        var cabecera = "< tr >"+
            "<th scope = \"col\">Nombre</th>" +
            "<th scope = \"col\">Telefono</th>" +
            "<th scope = \"col\">Cargo</th>" +
            "<th scope = \"col\"></th>" +
            "<th scope = \"col\"></th>" +
			"</tr >";
        $("#TablaPersonal").append(cabecera);
        for (var i = 0; i < listaPersonal.length ; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + listaPersonal[i]["Nombre"] + "</th >";
            fila += "<td scope=\"col\">" + listaPersonal[i]["Telefono"] + "</th >";
            fila += "<td scope=\"col\">" + listaPersonal[i]["CargoNombre"] + "</th >";
            fila += "<td scope=\"col\"> <button name=\"btnModificar\" id=\"btnModificar\" value=\"" + listaPersonal[i]["PersonalID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"modificar("+listaPersonal[i]["PersonalID"]+")\"><i class=\"fas fa-edit\"></i></button></th >" 
            $("#TablaPersonal").append("<tr>" + fila + "</tr>");

        }
    };
    ListarPersonal.error = function () {
        alert("Error al listar personal!!");
    };
    $.ajax(ListarPersonal);
}

function guardarModificado() {
    $("#TituloCabeceraNuevo").prop("hidden", false);
    $("#TituloCabeceraModificar").prop("hidden", true);
    $("#BtnGuardarNuevo").prop("hidden", false);
    $("#BtnGuardarModificar").prop("hidden", true);
    $("#AItemLista").click();
    var ModificarPersonal = {};
    ModificarPersonal.url = "/Personal/GuardarPersonalModificado";
    ModificarPersonal.type = "POST";
    ModificarPersonal.data = JSON.stringify({
        personalID: $("#BtnBtnGuardarModificar").val(),
        nombre: $("#Nombre").val(),
        cedula: $("#Cedula").val(),
        telefono: $("#Telefono").val(),
        cargo: $("#Cargo").val(),
        especialidad: $("#Especialidad").val(),
        usuario: $("#Usuario").val(),
        contrasena: $("#Contrasena").val(),
        confcontrasena: $("#ConfContrasena").val(),
    });
    ModificarPersonal.datatype = "json";
    ModificarPersonal.contentType = "application/json";
    ModificarPersonal.success = function (modificado) {
        if (modificado[0] == true) {
            alert("Personal modificado!!");
            $("#Nombre").empty();
            $("#Cedula").empty();
            $("#Telefono").empty();
            $("#Cargo").prop("value",0);
            $("#Especialidad").prop("value", 0);
            $("#Usuario").empty();
            $("#Contrasena").empty();
            $("#ConfContrasena").empty();
        }
        else {
            alert("Personal NO modificado!!!!");
        }
    };
    ModificarPersonal.error = function () {
        alert("Error al modificar personal!!");
    };
    $.ajax(ModificarPersonal);
}

function listarServicios() {
    var ListarPersonalParaServicios = {};
    ListarPersonalParaServicios.url = "/Personal/ListarPersonal";
    ListarPersonalParaServicios.type = "POST";
    ListarPersonalParaServicios.data = JSON.stringify({
    });
    ListarPersonalParaServicios.datatype = "json";
    ListarPersonalParaServicios.contentType = "application/json";
    ListarPersonalParaServicios.success = function (listaPersonal) {
        $("#UsuarioSrv").empty();
        $("#UsuarioSrv").append("<option value=\"0\">Seleccionar</option>");
        for (var i = 0; i < listaPersonal.length; i++) {
            $("#UsuarioSrv").append("<option value=\"" + listaPersonal[i]["PersonalID"] + "\">" + listaPersonal[i]["Nombre"] + "</option>");
        }
    };
    ListarPersonalParaServicios.error = function () {
        alert("Error al listar personal!!");
    };
    $.ajax(ListarPersonalParaServicios);
}

function editarServicio(idServicio) {
    var idPersonal = $("#UsuarioSrv").val();
    var EditarServicio = {};
    EditarServicio.url = "/Personal/ModificarServicio";
    EditarServicio.type = "POST";
    EditarServicio.data = JSON.stringify({
        detalle: $("#DetalleSrv").val(),
        valor: $("#ValorSrv").val(),
        ServicioID: idServicio
    });
    EditarServicio.datatype = "json";
    EditarServicio.contentType = "application/json";
    EditarServicio.success = function (modificado) {
        if (modificado[0] == true) {
            alert("Servicio modificado!!");
            $("#DetalleSrv").prop("value", "");
            $("#ValorSrv").prop("value", "");
            $("#UsuarioSrv").val(0).trigger("change");
            //$("#UsuarioSrv").val(idPersonal).trigger("change");
        }
        else {
            alert("Servicio NO modificado!!!!");
        }
    };
    EditarServicio.error = function () {
        alert("Error al modificar servicio!!");
    };
    $.ajax(EditarServicio);
}

function obtenerServicio(idServicio) {
    var ObtenerServicio = {};
    ObtenerServicio.url = "/Personal/ObtenerServicio";
    ObtenerServicio.type = "POST";
    ObtenerServicio.data = JSON.stringify({
        ServicioID: idServicio
    });
    ObtenerServicio.datatype = "json";
    ObtenerServicio.contentType = "application/json";
    ObtenerServicio.success = function (servicioResultado) {
        $("#DetalleSrv").prop("value", servicioResultado["Detalle"]);
        $("#ValorSrv").prop("value", servicioResultado["Valor"]);      
        $("#IdentificadorSrv").attr("onclick", "editarServicio(" + servicioResultado["ServicioID"] +")");      
        $("#IdentificadorSrv").prop("title", "Modificar servicio");      
        
    };
    ObtenerServicio.error = function () {
        alert("Error al listar personal!!");
    };
    $.ajax(ObtenerServicio);
}

function eliminarServicio(idServicio) {
    var idPersonal = $("#UsuarioSrv").val();
    var EliminarServicio = {};
    EliminarServicio.url = "/Personal/EliminarServicio";
    EliminarServicio.type = "POST";
    EliminarServicio.data = JSON.stringify({
        ServicioID: idServicio
    });
    EliminarServicio.datatype = "json";
    EliminarServicio.contentType = "application/json";
    EliminarServicio.success = function (eliminado) {
        if (eliminado[0] == true) {
            alert("Servicio eliminado!!");
        }
        else {
            alert("Servicio NO eliminado!!!!");
        }
    };
    EliminarServicio.error = function () {
        alert("Error al eliminar servicio!!");
    };
    $.ajax(EliminarServicio);
}

$("#UsuarioSrv").change(function () {
    var ListarPersonalServico = {};
    ListarPersonalServico.url = "/Personal/ListarPersonalServico";
    ListarPersonalServico.type = "POST";
    ListarPersonalServico.data = JSON.stringify({
        personalID: $("#UsuarioSrv").val()
    });
    ListarPersonalServico.datatype = "json";
    ListarPersonalServico.contentType = "application/json";
    ListarPersonalServico.success = function (listaPersonalServicio) {
        $("#TablaPersonalServicio").empty();
        var cabecera = "< tr >" +
            "<th scope = \"col\">Servicio</th>" +
            "<th scope = \"col\">Valor</th>" +
            "<th scope = \"col\"></th>" +
            "<th scope = \"col\"></th>" +
            "</tr >";
        $("#TablaPersonalServicio").append(cabecera);
        for (var i = 0; i < listaPersonalServicio.length; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + listaPersonalServicio[i]["Detalle"] + "</th >";
            fila += "<td scope=\"col\">" + listaPersonalServicio[i]["Valor"] + "</th >";
            fila += "<td scope=\"col\"> <button name=\"btnModificarServico\" id=\"btnModificarServico\" value=\"" + listaPersonalServicio[i]["ServicioID"] + "\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:30px; cursor:pointer\" onclick=\"obtenerServicio(" + listaPersonalServicio[i]["ServicioID"] + ")\"><i class=\"fas fa-edit\"></i></button></th >"
			fila += "<td scope=\"col\"> <button name=\"btnEliminarServicio\" id=\"btnEliminarServicio\" style=\"background-color:darkturquoise; border-bottom-color:darkturquoise; color:white; border-radius:0.3rem; width:35px; height:35px; cursor:pointer\" onclick=\"eliminarServicio(" + listaPersonalServicio[i]["ServicioID"] + ")\"><i class=\"fas fa-trash-alt\"></i></button></th >"
            $("#TablaPersonalServicio").append("<tr>" + fila + "</tr>");
        }
    };
    ListarPersonalServico.error = function () {
        alert("Error al listar los servicios!!");
    };
    $.ajax(ListarPersonalServico);
});

/*$("#UsuarioSrv").on("change", function () {
    var ListarPersonalServico = {};
    ListarPersonalServico.url = "/Personal/ListarPersonalServico";
    ListarPersonalServico.type = "POST";
    ListarPersonalServico.data = JSON.stringify({
        personalID: $("#UsuarioSrv").val()
    });
    ListarPersonalServico.datatype = "json";
    ListarPersonalServico.contentType = "application/json";
    ListarPersonalServico.success = function (listaPersonalServicio) {
        $("#TablaPersonalServicio").empty();
        var cabecera = "< tr >" +
            "<th scope = \"col\">Servicio</th>" +
            "<th scope = \"col\">Valor</th>" +
            "<th scope = \"col\"></th>" +
            "<th scope = \"col\"></th>" +
            "</tr >";
        $("#TablaPersonalServicio").append(cabecera);
        for (var i = 0; i < listaPersonalServicio.length; i++) {
            var fila = "";
            fila += "<td scope=\"col\">" + listaPersonalServicio[i]["Detalle"] + "</th >";
            fila += "<td scope=\"col\">" + listaPersonalServicio[i]["Valor"] + "</th >";
            fila += "<td scope=\"col\"> <button name=\"btnModificarServico\" id=\"btnModificarServico\" value=\"" + listaPersonalServicio[i]["ServicioID"] + "\" style=\"background - color: darkturquoise; border - bottom - color: darkturquoise; color: white; border - radius: 0.3rem; width: 35px; height: 30px; cursor: pointer\" onclick=\"modificarServicio(" + listaPersonalServicio[i]["ServicioID"] + ")\"><i class=\"fas fa-edit\"></i></button></th >"
            fila += "<td scope=\"col\"> <button name=\"btnEliminarServicio\" id=\"btnEliminarServicio\" onclick=\"eliminarServicio()\">Eliminar</button></th >"
            $("#TablaPersonalServicio").append("<tr>" + fila + "</tr>");
        }
    };
    ListarPersonalServico.error = function () {
        alert("Error al listar los servicios!!");
    };
    $.ajax(ListarPersonalServico);
});*/

function anadirServicio() {
    var idPersonal = $("#UsuarioSrv").val();
    var AnadirServicio = {};
    AnadirServicio.url = "/Personal/AnadirServicio";
    AnadirServicio.type = "POST";
    AnadirServicio.data = JSON.stringify({
        personalID: $("#UsuarioSrv").val(),
        detalle: $("#DetalleSrv").val(),
        valor: $("#ValorSrv").val()
    });
    AnadirServicio.datatype = "json";
    AnadirServicio.contentType = "application/json";
    AnadirServicio.success = function (anadido) {
        if (anadido[0] == true) {
			//alert("Personal ingresado!!")
			swal("Personal ingresado!!")
			$("#DetalleSrv").prop("value", "");
            $("#ValorSrv").prop("value", "");
            $("#UsuarioSrv").val(0).trigger("change");
            //$("#UsuarioSrv").val(idPersonal).trigger("change");
        }
        else {
			alert("Servicio NO ingresado!!!!");
			$.jGrowl("prueba mensaje", { life: 2000 });
        }
    };
    AnadirServicio.error = function () {
        alert("Error al ingresar servicio!!");
    };
    $.ajax(AnadirServicio);
}





