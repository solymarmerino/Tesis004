///// INICIO Validacion de cedulas ingresadas en el sistema //////
$("#Cedula").change(function () {
    $("#Salida").empty();
    var cedula = $("#Cedula").val();
    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {
        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);
        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {
            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);
            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) { var numero1 = (numero1 - 9); }

            var numero3 = cedula.substring(2, 3);
            var numero3 = (numero3 * 2);
            if (numero3 > 9) { var numero3 = (numero3 - 9); }

            var numero5 = cedula.substring(4, 5);
            var numero5 = (numero5 * 2);
            if (numero5 > 9) { var numero5 = (numero5 - 9); }

            var numero7 = cedula.substring(6, 7);
            var numero7 = (numero7 * 2);
            if (numero7 > 9) { var numero7 = (numero7 - 9); }

            var numero9 = cedula.substring(8, 9);
            var numero9 = (numero9 * 2);
            if (numero9 > 9) { var numero9 = (numero9 - 9); }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);
            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0, 1);
            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1) * 10;
            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;
            //Si el digito validador es = a 10 toma el valor de 0
            if (digito_validador == 10)
                var digito_validador = 0;
            //Validamos que el digito validador sea igual al de la cedula
            if (digito_validador == ultimo_digito) {
                $("#Salida").prop("disable",true);
            } else {
                $("#Salida").append("Cédula Inválida");
            }
        } else {
            // imprimimos inválida si la region no pertenece
            $("#Salida").append("Cédula Inválida");
        }
    } else {
        //imprimimos inválida si la cedula tiene mas o menos de 10 digitos
        $("#Salida").append("Cédula Inválida: debe tener 10 caracteres");
    }
});


/////PACIENTE NUEVO
$("#IptCedula").change(function () {
	$("#ValidacionCedulaPaciente").empty();
	var cedula = $("#IptCedula").val();
	//Preguntamos si la cedula consta de 10 digitos
	if (cedula.length == 10) {
		//Obtenemos el digito de la region que sonlos dos primeros digitos
		var digito_region = cedula.substring(0, 2);
		//Pregunto si la region existe ecuador se divide en 24 regiones
		if (digito_region >= 1 && digito_region <= 24) {
			// Extraigo el ultimo digito
			var ultimo_digito = cedula.substring(9, 10);
			//Agrupo todos los pares y los sumo
			var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

			//Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
			var numero1 = cedula.substring(0, 1);
			var numero1 = (numero1 * 2);
			if (numero1 > 9) { var numero1 = (numero1 - 9); }

			var numero3 = cedula.substring(2, 3);
			var numero3 = (numero3 * 2);
			if (numero3 > 9) { var numero3 = (numero3 - 9); }

			var numero5 = cedula.substring(4, 5);
			var numero5 = (numero5 * 2);
			if (numero5 > 9) { var numero5 = (numero5 - 9); }

			var numero7 = cedula.substring(6, 7);
			var numero7 = (numero7 * 2);
			if (numero7 > 9) { var numero7 = (numero7 - 9); }

			var numero9 = cedula.substring(8, 9);
			var numero9 = (numero9 * 2);
			if (numero9 > 9) { var numero9 = (numero9 - 9); }

			var impares = numero1 + numero3 + numero5 + numero7 + numero9;

			//Suma total
			var suma_total = (pares + impares);
			//extraemos el primero digito
			var primer_digito_suma = String(suma_total).substring(0, 1);
			//Obtenemos la decena inmediata
			var decena = (parseInt(primer_digito_suma) + 1) * 10;
			//Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
			var digito_validador = decena - suma_total;
			//Si el digito validador es = a 10 toma el valor de 0
			if (digito_validador == 10)
				var digito_validador = 0;
			//Validamos que el digito validador sea igual al de la cedula
			if (digito_validador == ultimo_digito) {
				$("#ValidacionCedulaPaciente").prop("disable", true);
			} else {
				$("#ValidacionCedulaPaciente").append("Cédula Inválida");
			}
		} else {
			// imprimimos inválida si la region no pertenece
			$("#ValidacionCedulaPaciente").append("Cédula Inválida");
		}
	} else {
		//imprimimos inválida si la cedula tiene mas o menos de 10 digitos
		$("#ValidacionCedulaPaciente").append("Cédula Inválida: debe tener 10 caracteres");
	}
});

/////PACIENTE MODIFICAR
$("#IptCedula").change(function () {
	$("#ValidacionCedulaPaciente").empty();
	var cedula = $("#IptCedula").val();
	//Preguntamos si la cedula consta de 10 digitos
	if (cedula.length == 10) {
		//Obtenemos el digito de la region que sonlos dos primeros digitos
		var digito_region = cedula.substring(0, 2);
		//Pregunto si la region existe ecuador se divide en 24 regiones
		if (digito_region >= 1 && digito_region <= 24) {
			// Extraigo el ultimo digito
			var ultimo_digito = cedula.substring(9, 10);
			//Agrupo todos los pares y los sumo
			var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

			//Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
			var numero1 = cedula.substring(0, 1);
			var numero1 = (numero1 * 2);
			if (numero1 > 9) { var numero1 = (numero1 - 9); }

			var numero3 = cedula.substring(2, 3);
			var numero3 = (numero3 * 2);
			if (numero3 > 9) { var numero3 = (numero3 - 9); }

			var numero5 = cedula.substring(4, 5);
			var numero5 = (numero5 * 2);
			if (numero5 > 9) { var numero5 = (numero5 - 9); }

			var numero7 = cedula.substring(6, 7);
			var numero7 = (numero7 * 2);
			if (numero7 > 9) { var numero7 = (numero7 - 9); }

			var numero9 = cedula.substring(8, 9);
			var numero9 = (numero9 * 2);
			if (numero9 > 9) { var numero9 = (numero9 - 9); }

			var impares = numero1 + numero3 + numero5 + numero7 + numero9;

			//Suma total
			var suma_total = (pares + impares);
			//extraemos el primero digito
			var primer_digito_suma = String(suma_total).substring(0, 1);
			//Obtenemos la decena inmediata
			var decena = (parseInt(primer_digito_suma) + 1) * 10;
			//Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
			var digito_validador = decena - suma_total;
			//Si el digito validador es = a 10 toma el valor de 0
			if (digito_validador == 10)
				var digito_validador = 0;
			//Validamos que el digito validador sea igual al de la cedula
			if (digito_validador == ultimo_digito) {
				$("#ValidacionCedulaPaciente").prop("disable", true);
			} else {
				$("#ValidacionCedulaPaciente").append("Cédula Inválida");
			}
		} else {
			// imprimimos inválida si la region no pertenece
			$("#ValidacionCedulaPaciente").append("Cédula Inválida");
		}
	} else {
		//imprimimos inválida si la cedula tiene mas o menos de 10 digitos
		$("#ValidacionCedulaPaciente").append("Cédula Inválida: debe tener 10 caracteres");
	}
});


// FIN Validacion de cedulas ingresadas en el sistema //////


//////INICIO validacion de nombres ingresados en el sistema ////
$("#Nombre").change(function () {
	$("#SalidaNombre").empty();
	var nombre = $("#Nombre").val();
// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#SalidaNombre").append("Ingresar Nombre");	
	}
	else {
		$("#SalidaNombre").prop("disable", true);

		//preguntar si contiene solo letras
		if (/[A-Za-z]/.test(nombre) && !(/[0-9]/.test(nombre)) && !(/[-_.;:*/+!·$%&()=]/.test(nombre))) {
			$("#SalidaNombre").prop("disable", true);
		}
		else {
			$("#SalidaNombre").append("Ingresar solo letras");	
		}
	}
});

///////PACIENTE NUEVO

$("#IptNombreCompleto").change(function () {
	$("#ValidacionNombrePaciente").empty();
	var nombre = $("#IptNombreCompleto").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionNombrePaciente").append("Ingresar Nombre");
	}
	else {
		$("#ValidacionNombrePaciente").prop("disable", true);

		//preguntar si contiene solo letras
		if (/[A-Za-z]/.test(nombre) && !(/[0-9]/.test(nombre)) && !(/[-_.;:*/+!·$%&()=]/.test(nombre))) {
			$("#ValidacionNombrePaciente").prop("disable", true);
		}
		else {
			$("#ValidacionNombrePaciente").append("Ingresar solo letras");
		}
	}
});

///////PACIENTE MODIFICAR

$("#IptNombreCompleto").change(function () {
	$("#ValidacionModificarNombrePaciente").empty();
	var nombre = $("#IptNombreCompleto").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionModificarNombrePaciente").append("Ingresar Nombre");
	}
	else {
		$("#ValidacionModificarNombrePaciente").prop("disable", true);

		//preguntar si contiene solo letras
		if (/[A-Za-z]/.test(nombre) && !(/[0-9]/.test(nombre)) && !(/[-_.;:*/+!·$%&()=]/.test(nombre))) {
			$("#ValidacionModificarNombrePaciente").prop("disable", true);
		}
		else {
			$("#ValidacionModificarNombrePaciente").append("Ingresar solo letras");
		}
	}
});
//// FIN validacion de nombres ingresados en el sistema ///

//// INICIO validar el numero de telefono ingresado al sistema
/////EMPLEADO
$("#Telefono").change(function () {
	$("#SalidaTelefono").empty();
	var telefono = $("#Telefono").val();
	// preguntar si el campo esta vacio
	if (telefono == null || telefono.length == 0 || /^\s+$/.test(telefono)) {
		$("#SalidaTelefono").append("Ingresar numero de telefono");
	}
	else {
		$("#SalidaTelefono").prop("disable", true);
		//preguntar si es de la longitud correcta
		if (telefono.length > 6) {
			$("#SalidaTelefono").prop("disable", true);

			//preguntar si contiene solo numeros
			if (!(/[A-Za-z]/.test(telefono)) && (/[0-9]/.test(telefono)) && !(/[-_.;*:/+!·$%&()=]/.test(telefono))) {
				$("#SalidaTelefono").prop("disable", true);
			}
			else {
				$("#SalidaTelefono").append("Ingresar solo numeros");
			}
		}
		else {
			$("#SalidaTelefono").append("Numero de telefono incompleto");
		}
	}
});

/////PACIENTE
$("#IptTelefono").change(function () {
	$("#ValidacionTelefonoPaciente").empty();
	var telefono = $("#IptTelefono").val();
	// preguntar si el campo esta vacio
	if (telefono == null || telefono.length == 0 || /^\s+$/.test(telefono)) {
		$("#ValidacionTelefonoPaciente").append("Ingresar numero de telefono");
	}
	else {
		$("#SalidValidacionTelefonoPacienteaNombre").prop("disable", true);
		//preguntar si es de la longitud correcta
		if (telefono.length > 6 && telefono.length < 11) {
			$("#ValidacionTelefonoPaciente").prop("disable", true);

			//preguntar si contiene solo numeros
			if (!(/[A-Za-z]/.test(telefono)) && (/[0-9]/.test(telefono)) && !(/[-_.;*:/+!·$%&()=]/.test(telefono))) {
				$("#ValidacionTelefonoPaciente").prop("disable", true);
			}
			else {
				$("#ValidacionTelefonoPaciente").append("Ingresar solo numeros");
			}
		}
		else {
			$("#ValidacionTelefonoPaciente").append("Numero de telefono incompleto");
		}
	}
});

//////TELEFONO CONTACTO DE EMERGENCIA

$("#IptTelefonoContactoEmergencia").change(function () {
	$("#ValidacionTelefonoContactoEmergencia").empty();
	var telefono = $("#IptTelefonoContactoEmergencia").val();
	// preguntar si el campo esta vacio
	if (telefono == null || telefono.length == 0 || /^\s+$/.test(telefono)) {
		$("#ValidacionTelefonoContactoEmergencia").append("Ingresar numero de telefono");
	}
	else {
		$("#SalidValidacionTelefonoPacienteaNombre").prop("disable", true);
		//preguntar si es de la longitud correcta
		if (telefono.length > 6 && telefono.length < 11) {
			$("#ValidacionTelefonoContactoEmergencia").prop("disable", true);

			//preguntar si contiene solo numeros
			if (!(/[A-Za-z]/.test(telefono)) && (/[0-9]/.test(telefono)) && !(/[-_.;*:/+!·$%&()=]/.test(telefono))) {
				$("#ValidacionTelefonoContactoEmergencia").prop("disable", true);
			}
			else {
				$("#ValidacionTelefonoContactoEmergencia").append("Numero de telefono incorrecto");
			}
		}
		else {
			$("#ValidacionTelefonoContactoEmergencia").append("Numero de telefono incorrecto");
		}
	}
});

//// FIN validar el numero de telefono ingresado al sistema


//validar contraseña
$("#Contrasena").change(function () {
	$("#SalidaContrasena").empty();
	var contrasena1 = $("#Contrasena").val();

	//preguntar si la contraseña no es nula
	if (contrasena1 == null || contrasena1.length == 0 || /^\s+$/.test(contrasena1)) {
		$("#SalidaContrasena").append("Ingresar contraseña");
	}
	else {
		$("#Salida").prop("disable", true);

		//preguntar si la contraseña tiene mas de 7 caracteres
		if (contrasena1.length > 7) {
			$("#Salida").prop("disable", true);
		}
		else {
			$("#SalidaContrasena").append("Contraseña debe tener minimo 8 caracteres");
		} 
	}
});

//Validar la contraseña de los usuarios
$("#ConfContrasena").change(function () {
	$("#SalidaContrasena2").empty();
	var contrasena1 = $("#Contrasena").val();
	var contrasena2 = $("#ConfContrasena").val();
	//preguntar si la contrasela es las misma en los dos campos
	if (contrasena1 === contrasena2) {
		$("#SalidaContrasena2").prop("disable", true);
	}
	else {
		$("#SalidaContrasena2").append("Contraseña no coinciden");
	}
});

//Validar que no se ingresen especialiades a empleados diferentes de medicos
$("#Cargo").change(function () {
	if ($("#Cargo").val() == 21) {
		$("#Especialidad").prop('disabled', false);
	}
	else {
		$("#Especialidad").prop('disabled', true);
		document.getElementById("Especialidad").selectedIndex = 0;
	}
});

//validar campo de detalle lleno
$("#DetalleSrv").change(function () {
	$("#SalidaDetalleSrv").empty();
	var detallesrv = $("#DetalleSrv").val();
	//preguntar si el detalle no es nula
	if (detallesrv == null || detallesrv.length == 0 || /^\s+$/.test(detallesrv)) {
		$("#SalidaDetalleSrv").append("Ingresar detalle del servicio");
	}
	else {
		$("#SalidaDetalleSrv").prop("disable", true);
	}
});

//validar campo de valor
$("#ValorSrv").change(function () {
	$("#SalidaValorSrv").empty();
	var valorsrv = $("#ValorSrv").val();
	//preguntar si valor es nulo
	if (valorsrv == null || valorsrv.length == 0 || /^\s+$/.test(valorsrv)) {
		$("#SalidaValorSrv").append("Ingresar valor del servicio");
	}
	else {
		$("#SalidaDetalleSrv").prop("disable", true);
		//preguntar si contiene solo numeros
		if (!(/[A-Za-z]/.test(valorsrv)) && (/[0-9]/.test(valorsrv)) && !(/[-_;*:/+!·$%&()=]/.test(valorsrv))) {
			$("#SalidaValorSrv").prop("disable", true);
		}
		else {
			$("#SalidaValorSrv").append("Ingresar solo numeros");
		}
	}
});

////INICIO validacion de email  
$('#IptEmail').change(function () {

	$("#ValidacionEmailPaciente").empty();

	var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	
	if (regex.test($('#IptEmail').val())) {
		$("#ValidacionEmailPaciente").prop("disable", true);
	}
	else {
		$("#ValidacionEmailPaciente").append('La dirección de correo no es válida');
	}
});

////FIN validacion de email

//////INICIO validacion de ocupacion ingresados en el sistema ////
$("#IptOcupacion").change(function () {
	$("#ValidacionOcupacionPaciente").empty();
	var nombre = $("#IptOcupacion").val();
	// preguntar si el campo esta vacio

		//preguntar si contiene solo letras
		if (/[A-Za-z]/.test(nombre) && !(/[0-9]/.test(nombre)) && !(/[-_.;:*/+!·$%&()=]/.test(nombre))) {
			$("#ValidacionOcupacionPaciente").prop("disable", true);
		}
		else {
			$("#ValidacionOcupacionPaciente").append("Ingresar solo letras");
		}
	
});
//////FIN validacion de ocupacion ingresados en el sistema ////

////INICIO validacion de fecha de nacimiento/////
$("#IptFechaNacimiento").change(function () {
	$("#ValidacionFechaNacimientoPaciente").empty();
	var fechanacimiento = $("#IptFechaNacimiento").val();
	var fechamaxima = new Date();
	var fechacomparacion = (fechamaxima.getFullYear() + "-" + (fechamaxima.getMonth() + 1) + "-" + fechamaxima.getDate());

	if (fechanacimiento == null || fechanacimiento.length == 0 || /^\s+$/.test(fechanacimiento)) {
		$("#ValidacionFechaNacimientoPaciente").append("Fecha de nacimiento no valida");
	}
	else {
		$("#ValidacionFechaNacimientoPaciente").prop("disable", true);
		if (fechanacimiento > fechacomparacion) {
			$("#ValidacionFechaNacimientoPaciente").append("Fecha de nacimiento no valida");
		}
		else {
			$("#ValidacionFechaNacimientoPaciente").prop("disable", true);
		}
	}
});
////FIN validacion de fecha de nacimieto/////

//////INICIO validacion de nombre de contacto de emergencia ingresados en el sistema ////
$("#IptNombreContactoEmergencia").change(function () {
	$("#ValidacionNombreContactoEmergencia").empty();
	var nombre = $("#IptNombreContactoEmergencia").val();
	// preguntar si el campo esta vacio

	//preguntar si contiene solo letras
	if (/[A-Za-z]/.test(nombre) && !(/[0-9]/.test(nombre)) && !(/[-_.;:*/+!·$%&()=]/.test(nombre))) {
		$("#ValidacionNombreContactoEmergencia").prop("disable", true);
	}
	else {
		$("#ValidacionNombreContactoEmergencia").append("Ingresar solo letras");
	}

});
//////FIN validacion de nombre de contacto de emergencia ingresados en el sistema ////

//////INICIO validacion de afinidad de contacto de emergencia ingresados en el sistema ////
$("#IptAfinidadContactoEmergencia").change(function () {
	$("#ValidacionAfinidadContactoEmergencia").empty();
	var nombre = $("#IptAfinidadContactoEmergencia").val();
	// preguntar si el campo esta vacio

	//preguntar si contiene solo letras
	if (/[A-Za-z]/.test(nombre) && !(/[0-9]/.test(nombre)) && !(/[-_.;:*/+!·$%&()=]/.test(nombre))) {
		$("#ValidacionAfinidadContactoEmergencia").prop("disable", true);
	}
	else {
		$("#ValidacionAfinidadContactoEmergencia").append("Ingresar solo letras");
	}

});
//////FIN validacion de afinidad de contacto de emergencia ingresados en el sistema ////

//////INICIO validacion de campos obligatorios de MODULO PACIENTE////
//////NUEVO PACIENTE
$('#btnGuardarPacienteNuevo').click(function () {

	/////NOMBRE
	$("#ValidacionNombrePaciente").empty();
	var nombre = $("#IptNombreCompleto").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionNombrePaciente").append("***Ingresar Nombre");
	}

	/////CEDULA
	$("#ValidacionCedulaPaciente").empty();
	var cedula = $("#IptCedula").val();
	// preguntar si el campo esta vacio
	if (cedula == null || cedula.length == 0 || /^\s+$/.test(cedula)) {
		$("#ValidacionCedulaPaciente").append("***Ingresar Cedula");
	}

	/////DIRECCION
	$("#ValidacionDireccionPaciente").empty();
	var direccion = $("#IptDireccion").val();
	// preguntar si el campo esta vacio
	if (direccion == null || direccion.length == 0 || /^\s+$/.test(direccion)) {
		$("#ValidacionDireccionPaciente").append("***Ingresar Dirección");
	}

	/////EMAIL
	$("#ValidacionEmailPaciente").empty();
	var email = $("#IptEmail").val();
	// preguntar si el campo esta vacio
	if (email == null || email.length == 0 || /^\s+$/.test(email)) {
		$("#ValidacionEmailPaciente").append("***Ingresar Email");
	}

	/////TELEFONE
	$("#ValidacionTelefonoPaciente").empty();
	var telefono = $("#IptTelefono").val();
	// preguntar si el campo esta vacio
	if (telefono == null || telefono.length == 0 || /^\s+$/.test(telefono)) {
		$("#ValidacionTelefonoPaciente").append("***Ingresar Teléfono");
	}

	/////OCUPACION
	$("#ValidacionOcupacionPaciente").empty();
	var ocupacion = $("#IptOcupacion").val();
	// preguntar si el campo esta vacio
	if (ocupacion == null || ocupacion.length == 0 || /^\s+$/.test(ocupacion)) {
		$("#ValidacionOcupacionPaciente").append("***Ingresar Ocupación");
	}

	/////ETNIA
	if ($('#SltEtnia').val() == 0) {
		$("#ValidacionEtniaPaciente").append("***Seleccionar Etnia");
	}

	/////FECHA NACIMIENTO
	$("#ValidacionFechaNacimientoPaciente").empty();
	var fechanacimiento = $("#IptFechaNacimiento").val();
	// preguntar si el campo esta vacio
	if (fechanacimiento == null || fechanacimiento.length == 0 || /^\s+$/.test(fechanacimiento)) {
		$("#ValidacionFechaNacimientoPaciente").append("***Ingresar Fecha de Nacimiento");
	}

	/////GENERO
	if ($('#SltGenero').val() == 0) {
		$("#ValidacionGeneroPaciente").append("***Seleccionar Genero");
	}

	/////ESTADO CIVIL
	if ($('#SltEstadoCivil').val() == 0) {
		$("#ValidacionEstadoCivilPaciente").append("***Seleccionar Estado Civil");
	}

	/////TIPO DE SANGRE
	if ($('#SltEstadoCivil').val() == 0) {
		$("#ValidacionTipoSangrePaciente").append("***Seleccionar Tipo de sangre");
	}

	/////NOMBRE CONTACTO
	$("#ValidacionNombreContactoEmergencia").empty();
	var nombre = $("#IptNombreContactoEmergencia").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionNombreContactoEmergencia").append("***Ingresar Nombre de contacto");
	}

	/////AFINIDAD CONTACTO
	$("#ValidacionAfinidadContactoEmergencia").empty();
	var nombre = $("#IptAfinidadContactoEmergencia").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionAfinidadContactoEmergencia").append("***Ingresar Afinidad de contacto");
	}

	/////TELEFONE CONTACTO
	$("#ValidacionTelefonoContactoEmergencia").empty();
	var telefono = $("#IptTelefonoContactoEmergencia").val();
	// preguntar si el campo esta vacio
	if (telefono == null || telefono.length == 0 || /^\s+$/.test(telefono)) {
		$("#ValidacionTelefonoContactoEmergencia").append("***Ingresar Teléfono de contacto");
	}
});
/////// MODIFICAR PACIENTE
$('#btnGuardar').click(function () {

	/////NOMBRE
	$("#ValidacionNombrePaciente").empty();
	var nombre = $("#IptNombreCompleto").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionNombrePaciente").append("***Ingresar Nombre");
	}

	/////CEDULA
	$("#ValidacionCedulaPaciente").empty();
	var cedula = $("#IptCedula").val();
	// preguntar si el campo esta vacio
	if (cedula == null || cedula.length == 0 || /^\s+$/.test(cedula)) {
		$("#ValidacionCedulaPaciente").append("***Ingresar Cedula");
	}

	/////DIRECCION
	$("#ValidacionDireccionPaciente").empty();
	var direccion = $("#IptDireccion").val();
	// preguntar si el campo esta vacio
	if (direccion == null || direccion.length == 0 || /^\s+$/.test(direccion)) {
		$("#ValidacionDireccionPaciente").append("***Ingresar Dirección");
	}

	/////EMAIL
	$("#ValidacionEmailPaciente").empty();
	var email = $("#IptEmail").val();
	// preguntar si el campo esta vacio
	if (email == null || email.length == 0 || /^\s+$/.test(email)) {
		$("#ValidacionEmailPaciente").append("***Ingresar Email");
	}

	/////TELEFONE
	$("#ValidacionTelefonoPaciente").empty();
	var telefono = $("#IptTelefono").val();
	// preguntar si el campo esta vacio
	if (telefono == null || telefono.length == 0 || /^\s+$/.test(telefono)) {
		$("#ValidacionTelefonoPaciente").append("***Ingresar Teléfono");
	}

	/////OCUPACION
	$("#ValidacionOcupacionPaciente").empty();
	var ocupacion = $("#IptOcupacion").val();
	// preguntar si el campo esta vacio
	if (ocupacion == null || ocupacion.length == 0 || /^\s+$/.test(ocupacion)) {
		$("#ValidacionOcupacionPaciente").append("***Ingresar Ocupación");
	}

	/////ETNIA
	if ($('#SltEtnia').val() == 0) {
		$("#ValidacionEtniaPaciente").append("***Seleccionar Etnia");
	}

	/////FECHA NACIMIENTO
	$("#ValidacionFechaNacimientoPaciente").empty();
	var fechanacimiento = $("#IptFechaNacimiento").val();
	// preguntar si el campo esta vacio
	if (fechanacimiento == null || fechanacimiento.length == 0 || /^\s+$/.test(fechanacimiento)) {
		$("#ValidacionFechaNacimientoPaciente").append("***Ingresar Fecha de Nacimiento");
	}

	/////GENERO
	if ($('#SltGenero').val() == 0) {
		$("#ValidacionGeneroPaciente").append("***Seleccionar Genero");
	}

	/////ESTADO CIVIL
	if ($('#SltEstadoCivil').val() == 0) {
		$("#ValidacionEstadoCivilPaciente").append("***Seleccionar Estado Civil");
	}

	/////TIPO DE SANGRE
	if ($('#SltEstadoCivil').val() == 0) {
		$("#ValidacionTipoSangrePaciente").append("***Seleccionar Tipo de sangre");
	}

	/////NOMBRE CONTACTO
	$("#ValidacionNombreContactoEmergencia").empty();
	var nombre = $("#IptNombreContactoEmergencia").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionNombreContactoEmergencia").append("***Ingresar Nombre de contacto");
	}

	/////AFINIDAD CONTACTO
	$("#ValidacionAfinidadContactoEmergencia").empty();
	var nombre = $("#IptAfinidadContactoEmergencia").val();
	// preguntar si el campo esta vacio
	if (nombre == null || nombre.length == 0 || /^\s+$/.test(nombre)) {
		$("#ValidacionAfinidadContactoEmergencia").append("***Ingresar Afinidad de contacto");
	}

	/////TELEFONE CONTACTO
	$("#ValidacionTelefonoContactoEmergencia").empty();
	var telefono = $("#IptTelefonoContactoEmergencia").val();
	// preguntar si el campo esta vacio
	if (telefono == null || telefono.length == 0 || /^\s+$/.test(telefono)) {
		$("#ValidacionTelefonoContactoEmergencia").append("***Ingresar Teléfono de contacto");
	}
});

//////FIN validacion de campos obligatorios de MMODULO PACIENTE////

////////////INICIO validacion campos obligatorios en NUEVA CITA
$('#btnGuardarCita').click(function () {

	$("#ValidacionEspecialidad").empty();
	$("#ValidacionMedico").empty();
	$("#ValidacionTipoCita").empty();

	var prueba = $("#sltIdentificadorPersonal").val();

	/////ESPECIALIDAD
	if ($('#sltEspecialidad').val() == 0) {
		$("#ValidacionEspecialidad").append("***Seleccionar Especialidad");
	} 

	/////MEDICO
	if ($('#sltIdentificadorPersonal').val() == 0) {
		$("#ValidacionMedico").append("***Seleccionar Médico");
	} 

	/////TIPO CITA
	if ($('#TipoCita').val() == 0) {
		$("#ValidacionTipoCita").append("***Seleccionar Tipo de cita");
	} 
});

////////////FIN validacion campos obligatorios en NUEVA CITA
////////////INICIO validacion de signos vitales

////////////INICIO validacion TEMPERATURA
$("#Temperatura").change(function () {
	$("#ValidacionTemperatura").empty();
	var temperatura = $("#Temperatura").val();
	// preguntar si el campo esta vacio

	//preguntar si contiene solo numeros
	if (temperatura == null || temperatura.length == 0 || /^\s+$/.test(temperatura)) {
		$("#ValidacionTemperatura").append("Ingresar Temperatura");
	}
	else {
		if (!(/[A-Za-z]/.test(temperatura)) && (/[0-9]/.test(temperatura)) && !(/[-_;:*/+!$%&()=]/.test(temperatura))) {
			$("#ValidacionTemperatura").prop("disable", true);
			//validar temperatura maxima
			if (temperatura < 40) {
				$("#ValidacionTemperatura").prop("disable", true);
			}
			else {
				$("#ValidacionTemperatura").append("Temperatura erronea");
			}
		}
		else {
			$("#ValidacionTemperatura").append("Ingresar solo numeros");
		}
	}
});
////////////FIN validacion TEMPERATURA

////////////FIN validacion de signos vitales
