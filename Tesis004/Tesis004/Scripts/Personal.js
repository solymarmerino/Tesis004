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
            $("#Cargo").empty();
            $("#Especialidad").empty();
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
            fila += "<td scope=\"col\"> <button name=\"btnModificar\" id=\"btnModificar\" onclick=\"modificar()\">Modificar</button></th >"
            fila += "<td scope=\"col\"> <button name=\"btnServicios\" id=\"btnServicios\" onclick=\"anadirServicio()\">Servicos</button></th >"
            $("#TablaPersonal").append("<tr>" + fila + "</tr>");

        }
    };
    ListarPersonal.error = function () {
        alert("Error al listar personal!!");
    };
    $.ajax(ListarPersonal);
}