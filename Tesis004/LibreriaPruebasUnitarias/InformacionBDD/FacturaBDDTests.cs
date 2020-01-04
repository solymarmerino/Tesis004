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
	public class FacturaBDDTests
	{
		[TestMethod()]
		public void ConsultarUltimoFacturaIdTest()
		{
			//Arrange
			var obtener = new FacturaBDD();

			//Acc
			var resultado = obtener.ConsultarUltimoFacturaId();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ConsultarClienteTest()
		{
			//Arrange
			var cedula = "1718724931"
			var obtener = new FacturaBDD();

			//Acc
			var resultado = obtener.ConsultarCliente(cedula);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void IngresarClienteTest()
		{
			//Arrage
			var nombre = "CARLOS HERRERA";
			var cedula = "1718725227";
			var direccion = "carapungo";
			var telefono = "0984681250";
			var obtener = new FacturaBDD();

			//Acc
			var resultado = obtener.IngresarCliente(nombre, cedula, direccion, telefono);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void IngresarDetalleTest()
		{
			//Arrage
			var cantidad = 1;
			var concepto = "CITA MEDICA";
			var precio = 10;
			var obtener = new FacturaBDD();

			//Acc
			var resultado = obtener.IngresarDetalle(cantidad, concepto, precio);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ListarDetalleTest()
		{
			//Arrage
			var obtener = new FacturaBDD();

			//Acc
			var resultado = obtener.ListarDetalle();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void EliminarDetalleTest()
		{
			//Arrage
			var iddetalle = 16;
			var obtener = new FacturaBDD();

			//Acc
			var resultado = obtener.ListarDetalle(iddetalle);

			//Assert
			Assert.IsTrue(resultado);
		}
	}
}