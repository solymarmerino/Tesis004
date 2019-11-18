using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class FacturaBDD
	{
        private ConexionBDD conexion = new ConexionBDD();
        public FacturaBDD()
        {

        }

		public bool IngresarCliente(ClienteModel cliente)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "INSERT INTO CLIENTE (NombreCliente,CedulaCliente,TelefonoCliente,DireccionCliente) " +
								  "VALUES (@NombreCliente,@CedulaCliente,@TelefonoCliente,@DireccionCliente)";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@NombreCliente", cliente.NombreCliente);
			sentenciaSQL.Parameters.AddWithValue("@CedulaCliente", cliente.CedulaCliente);
			sentenciaSQL.Parameters.AddWithValue("@TelefonoCliente", cliente.TelefonoCliente);
			sentenciaSQL.Parameters.AddWithValue("@DireccionCliente", cliente.DireccionCliente);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}



	}
}