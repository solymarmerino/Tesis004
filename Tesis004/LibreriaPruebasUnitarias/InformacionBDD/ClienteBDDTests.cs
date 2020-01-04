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
			var resultado = obtener.IngresarIngreso();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void EliminarIngresoTest()
		{
			//Arrange
			var idingreso = 5;
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.EliminarIngreso(idingreso);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ObtenerIngresoTest()
		{
			//Arrange
			var idingreso = 8;
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.ObtenerIngreso(idingreso);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ModificarIngresoTest()
		{
			//Arrange
			var idingreso = 8;
			var valor = 10;
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.ObtenerIngreso(idingreso, valor);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void IngresarEgresoTest()
		{
			//Arrange
			var descripcion = "pago de medicamento";
			var servicio = "PAGO PROVEEDOR";
			var valor = 500;
			var fecha = "10/12/2019";
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.IngresarEgreso();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ListarEgresoTest()
		{
			//Arrange
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.ListarEgreso();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void EliminarEgresoTest()
		{
			//Arrange
			var idegreso = 9;
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.IngresarIngreso(idegreso);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ObtenerEgresoTest()
		{
			//Arrange
			var idegreso = 15;
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.ObtenerEgreso(idegreso);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ModificarEgresoTest()
		{
			//Arrange
			var idegreso = 9;
			var valor = 14;
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.ModificarEgreso(idegreso, valor);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void InformeIngresoTest()
		{
			//Arrange
			var fecha1 = "11/10/2019";
			var fecha2 = "18/10/2019";
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.InformeIngreso(fecha1, fecha2);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void InformeEgresoTest()
		{
			//Arrange
			var fecha1 = "11/10/2019";
			var fecha2 = "18/10/2019";
			var obtener = new ContabilidadBDD();

			//Acc
			var resultado = obtener.InformeIngreso(fecha1, fecha2);

			//Assert
			Assert.IsTrue(resultado);
		}

	}
}