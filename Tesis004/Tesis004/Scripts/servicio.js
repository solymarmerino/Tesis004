$("#sltEspecialidad").change(function () {
    var ListarPersonal = {};
    ListarPersonal.url = "/Personal/ListarPersonalNombrePorEspecialidad";
    ListarPersonal.type = "POST";
    ListarPersonal.data = JSON.stringify({
        especialidad: $("#sltEspecialidad").val()
    });
    ListarPersonal.datatype = "json";
    ListarPersonal.contentType = "application/json";
    ListarPersonal.success = function (listaPersonalPorEspecialidad) {
        $("#sltIdentificadorPersonal").empty();
        $("#sltIdentificadorPersonal").append("<option value=\"0\"> Seleccionar </option>");
        for (var i = 0; i < listaPersonalPorEspecialidad.length; i++) {
            $("#sltIdentificadorPersonal").append("<option value=\"" + listaPersonalPorEspecialidad[i]["PersonalID"] +"\"> "+ listaPersonalPorEspecialidad[i]["Nombre"] +" </option>");
        }
    };
    ListarPersonal.error = function () {
        alert("Error al listar personal!!");
    };
    $.ajax(ListarPersonal);
});