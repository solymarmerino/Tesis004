$("#btnCertificado").click(function () {

	
	var imgData = 'data: image/jpg;base64,' + Base64.encode('logovacari.jpg');
	var fechacertificado = $("#fechaAtencion").val();
	var fechainicio = $("#fechaInicio").val();
	var fechafin = $("#fechaFin").val();
	var cedula = $("#IptCedula").val();

	var NombreCompletoPaciente = $("#IptNombreCompleto").val();

	var observaciones = $("#observacionCertificado").val();

	var certificado = new jsPDF();
	certificado.addImage(imgData, 'JPEG', 15, 40, 180, 160);
	certificado.text(20, 20, 'CENTRO DE ESPECIALIDADES MÉDICAS VACARI');
	certificado.text(20, 30, '"VACARI"');
	certificado.text(20, 40, 'Quito,' + fechacertificado);
	certificado.text(20, 50, 'CERTIFICADO MEDICO');
	certificado.text(20, 60, 'Certifico: que el(a) Señor(a) ' + NombreCompletoPaciente);
	certificado.text(20, 70, 'con cédula de identidad número ' +cedula+', fue atendido en esta Casa de');
	certificado.text(20, 80, 'Salud el dia ' + fechacertificado);
	certificado.text(20, 90, ',presentando un cuadro de ;');
	certificado.text(20, 100, ',presentando un cuadro de ;');

	certificado.text(20, 110, 'Condición que amerita reposo domiciliario desde ');
	certificado.text(20, 120, fechainicio + 'hasta el ' + fechafin + '.');
	certificado.text(20, 130, 'OBSERVACIONES: ' + observaciones);

	certificado.text(20, 140, 'Atentamente');
	certificado.text(20, 150, 'Dr(a) ');
	certificado.text(20, 160, 'ESPECIALIDAD');
	certificado.text(20, 170, 'Codigo');


	certificado.text(20, 180, 'Dirección: Carapungo, Calle Isidro Ayora Oe 11-258 y Quilotoa');
	certificado.text(20, 190, 'Telefono: 2422 589 0999 880 115');
	certificado.save('certificado.pdf');

});

