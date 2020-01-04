using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tesis004.InformacionBDD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tesis004.InformacionBDD.Tests
{
	[TestClass()]
	public class ContabilidadBDDTests
	{
		[TestMethod()]
		public void IngresarIngresoTest()
		{
			//Arrange
			var descripcion = "se realiza por arte de enfermeria";
			var servicio = "COLOCACION ARETES";
			var valor = 5;
			var fecha = "10/12/2019";
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.IngresarIngreso(descripcion, servicio, valor, fecha);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ListarIngresoTest()
		{
			//Arrange
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.ListarIngreso();

			//Assert
			Assert.IsTrue(resultado);
		}
	}
}