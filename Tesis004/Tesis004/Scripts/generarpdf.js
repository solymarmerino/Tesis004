$("#btnCertificado").click(function () {
		
	/*var imgData = 'data: image/jpg;base64,' + Base64.encode('logovacari.jpg');
	console.log(imgData);*/
	var fechacertificado = new Date($("#fechaAtencion").val());
	var fechafin = new Date($("#fechaFin").val());
	var dias = 1;
	
	fechacertificado.setDate(fechacertificado.getDate() + dias);
	fechafin.setDate(fechafin.getDate() + dias);

	var options = { year: 'numeric', month: 'long', day: 'numeric' };
	var flarga1 = fechacertificado.toLocaleDateString("es-ES", options);
	var flarga2 = fechafin.toLocaleDateString("es-ES", options);
	   
	var cedula = $("#IptCedula").val();

	var NombreCompletoPaciente = $("#IptNombreCompleto").val();

	var Diagnosticos = "<td scope=\"col\">" + resultado[i]["Cie10Detalle"] + "</td>";

	var observaciones = $("#observacionCertificado").val();

	var certificado = new jsPDF();
	//encabezado
	//certificado.addImage(imgData, 'JPG', 15, 40, 180, 160);
	certificado.setTextColor(0, 0, 128);
	certificado.setFont('cambria');
	certificado.setFontType('bold');
	certificado.setFontSize(18);
	certificado.text(60, 20, 'CENTRO DE ESPECIALIDADES MÉDICAS');
	certificado.text(110, 30, '"VACARI"');

	//Cuerpo del certificado bold
	certificado.setTextColor(0, 0, 0);
	certificado.setFont('courier');
	certificado.setFontType('normal');
	certificado.setFontSize(12);
	certificado.text(120, 60, 'Quito,' + flarga1);

	certificado.setFontSize(14);
	certificado.setFontType('bold');
	certificado.text(90, 70, 'CERTIFICADO MEDICO');

	certificado.setFontType('normal');
	certificado.setFontSize(12);
	certificado.text(20, 80, 'Certifico: que el(a) Señor(a) ' + NombreCompletoPaciente + ' con');
	certificado.text(20, 90, 'cédula de identidad número ' +cedula+', fue atendido en esta Casa');
	certificado.text(20, 100, 'de Salud el dia ' + flarga1 + ', presentando un cuadro de:');
	certificado.text(20, 110, Diagnosticos);
	certificado.text(20, 130, 'Condición que amerita reposo desde el día ' + flarga1);
	certificado.text(20, 140, 'hasta el día ' + flarga2 + '.');
	certificado.text(20, 150, 'OBSERVACIONES: ' + observaciones);

	certificado.text(90, 180, 'Atentamente,');
	certificado.text(90, 190, 'Dr(a) ');
	certificado.text(90, 200, 'ESPECIALIDAD');
	//certificado.text(20, 170, 'Codigo');

	//Pie de pagina
	certificado.setFontSize(10);
	certificado.setTextColor(0, 0, 128);
	certificado.text(20, 275, 'Dirección: Carapungo, Calle Isidro Ayora Oe 11-258 y Quilotoa');
	certificado.text(20, 280, 'Telefono: 2422 589 0999 880 115');
	certificado.save('certificado.pdf');

});

