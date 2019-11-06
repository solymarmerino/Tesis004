$("#btnagregarcertifica").click(function () {
	   
	var certificado = new jsPDF();
	certificado.text(20, 20, 'CENTRO MEDICO VACARI');
	certificado.save('sample-file.pdf');

});

