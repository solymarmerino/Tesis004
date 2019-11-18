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
		/*
		public List<ClienteModel> ListaSugerenciaCliente(string cliente)
		{
			List<ClienteModel> listaSugerenciaResultado = new List<ClienteModel>();

			string sentenciaSql = "";
			DataTable tablaDatos = new DataTable();

			 sentenciaSql = "SELECT NombreCliente " +
						    "FROM Cliente " +
							$"WHERE NombreCliente LIKE '%{cliente}%' " +
							"ORDER BY ClienteID desc ";

					tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

					for (int i = 0; i < tablaDatos.Rows.Count; i++)
					{
						ClienteModel clienteResultado = new ClienteModel();
						clienteResultado.NombreCliente = tablaDatos.Rows[i].Field<string>("NombreCliente");

						listaSugerenciaResultado.Add(clienteResultado);
					}

			return listaSugerenciaResultado;
		}
		*/

		public ClienteModel ConsultarIdCliente(string CedulaCliente)
		{
			string sentenciaSql = "SELECT TOP(1) ClienteID " +
								  "FROM Cliente " +
								  $"WHERE CedulaCliente = {CedulaCliente} ";

			DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

			ClienteModel ingresoResultado = new ClienteModel();
			ingresoResultado.IngresoID = tablaDatos.Rows[0].Field<int>("IngresoID");

			return ingresoResultado;
		}
	}
}