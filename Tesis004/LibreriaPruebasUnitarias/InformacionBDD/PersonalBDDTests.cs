using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tesis004.InformacionBDD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tesis004.InformacionBDD.Tests
{
	[TestClass]
	public class PersonalBDDTests
	{
		[TestMethod]
		public void IngresarPersonalTest()
		{
			//Arrange
			var nombre = "DAVID GUERRA";
			var cedula = "1718724931";
			var telefono = "099586059";
			var cargo = 21;
			var usuario = "DGUERRA";
			var contrasena = "DGUERRA";
			var especialidad = 1011;
			var codigo = "XLP090912";
			var ingreso = new PersonalBDD();

			//Acc
			var resultado = ingreso.IngresarPersonal(nombre, cedula, telefono, cargo, usuario, contrasena, especialidad, codigo);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod]
		public void ListaPersonalTest()
		{
			//Arrange
			var listar = new PersonalBDD();

			//Acc
			var resultado = listar.ListaPersonal();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod]
		public void ListaPersonalNombrePorEspecialidadTest()
		{
			//Arrange
			var listar = new PersonalBDD();

			//Acc
			var resultado = listar.ListaPersonalNombrePorEspecialidad();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void OptenerPersonalTest()
		{
			//Arrange
			var idpersonal = 10;
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.OptenerPersonal(idpersonal);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void OptenerPersonalPorUsuarioTest()
		{
			//Arrange
			var usuario = "ACORDOVA"
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.OptenerPersonalPorUsuario(usuario);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void GuardarPersonalModificadoTest()
		{
			//Arrange
			var nombre = "DANIEL MENDEZ";
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.GuardarPersonalModificado(nombre);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ListaPersonalServicioTest()
		{
			//Arrange
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.ListaPersonalServicio();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ObtenerServicioTest()
		{
			//Arrange
			var idservicio = "15";
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.ObtenerServicio();

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void AnadirServicioTest()
		{
			//Arrange
			var idpersonal = "15";
			var detalle = "CITA";
			var valor = 10;
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.AnadirServicio(idpersonal, detalle, valor);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void ModificarServicioTest()
		{
			//Arrange
			var idservicio = "15";
			var detalle = "CITA";
			var valor = 10;
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.ModificarServicio(detalle, valor);

			//Assert
			Assert.IsTrue(resultado);
		}

		[TestMethod()]
		public void EliminarServicioTest()
		{
			//Arrange
			var idservicio = "15";
			var optener = new PersonalBDD();

			//Acc
			var resultado = optener.EliminarServicio();

			//Assert
			Assert.IsTrue(resultado);
		}


	}
}