using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace LibreriaPruebasUnitarias
{
	[TestClass]
	public class IngresoPruebas
	{
		[TestMethod]
		public void PruebaAtenticacionCorrecta()
		{
			var autenticacion = new Ingreso();

			var resultado = autenticacion.sesion("ACORDOVA", "ACORDOVA");

			Assert.IsTrue(resultado);
		}

		[TestMethod]
		public void PruebaAtenticacionIncorrecta()
		{
			var autenticacion = new Ingreso();

			var resultado = autenticacion.sesion("usuario", "usuario");

			Assert.IsFalse(resultado);
		}
	}

}
