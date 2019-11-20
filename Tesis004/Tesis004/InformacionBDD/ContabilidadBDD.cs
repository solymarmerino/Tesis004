using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class ClienteBDD
	{
        private ConexionBDD conexion = new ConexionBDD();
        public ClienteBDD()
        {

        }

		///INGRESO

		public bool IngresarIngreso(IngresoModel ingreso)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "INSERT INTO INGRESO (DescripcionIngreso,ServicioIngreso,ValorIngreso,FechaIngreso) " +
								  "VALUES (@DescripcionIngreso,@ServicioIngreso,@ValorIngreso,@FechaIngreso)";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@DescripcionIngreso", ingreso.DescripcionIngreso);
			sentenciaSQL.Parameters.AddWithValue("@ServicioIngreso", ingreso.ServicioIngreso);
			sentenciaSQL.Parameters.AddWithValue("@ValorIngreso", ingreso.ValorIngreso);
			sentenciaSQL.Parameters.AddWithValue("@FechaIngreso", ingreso.FechaIngreso);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}

		public List<IngresoModel> ListarIngreso(DateTime fechaIngreso)
		{
			List<IngresoModel> listaIngresoResultado = new List<IngresoModel>();

			var fechaconsulta = fechaIngreso.ToString("yyyy-MM-dd");

			string sentenciaSql = "SELECT IngresoID, DescripcionIngreso, ServicioIngreso, ValorIngreso, FechaIngreso "+
                                  "FROM Ingreso "+
								  $"WHERE FechaIngreso = '{fechaconsulta}'";

			DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

			for (int i = 0; i < tablaDatos.Rows.Count; i++)
			{
                IngresoModel ingresoResultado = new IngresoModel();
				ingresoResultado.IngresoID = tablaDatos.Rows[i].Field<int>("IngresoID");
				ingresoResultado.DescripcionIngreso = tablaDatos.Rows[i].Field<string>("DescripcionIngreso");
				ingresoResultado.ServicioIngreso = tablaDatos.Rows[i].Field<string>("ServicioIngreso");
				ingresoResultado.ValorIngreso = tablaDatos.Rows[i].Field<decimal>("ValorIngreso");
				ingresoResultado.FechaIngreso = tablaDatos.Rows[i].Field<DateTime>("FechaIngreso");

				listaIngresoResultado.Add(ingresoResultado);
			}

			return listaIngresoResultado;
		}

		public bool EliminarIngreso(int ingresoID)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "DELETE FROM INGRESO " +
								  "WHERE IngresoID = @IngresoID";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@IngresoID", ingresoID);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}

		public IngresoModel ObtenerIngreso(int IngresoID)
		{

			string sentenciaSql = "SELECT TOP(1) IngresoID, DescripcionIngreso, ServicioIngreso, ValorIngreso, FechaIngreso " +
								  "FROM Ingreso " +
								  $"WHERE IngresoID = {IngresoID} ";

			DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            IngresoModel ingresoResultado = new IngresoModel();
			ingresoResultado.IngresoID = tablaDatos.Rows[0].Field<int>("IngresoID");
			ingresoResultado.DescripcionIngreso = tablaDatos.Rows[0].Field<string>("DescripcionIngreso");
			ingresoResultado.ServicioIngreso = tablaDatos.Rows[0].Field<string>("ServicioIngreso");
			ingresoResultado.ValorIngreso = tablaDatos.Rows[0].Field<decimal>("ValorIngreso");
			ingresoResultado.FechaIngreso = tablaDatos.Rows[0].Field<DateTime>("FechaIngreso");

			return ingresoResultado;
		}

		public bool ModificarIngreso(IngresoModel ingreso)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "UPDATE Ingreso " +
								  "SET DescripcionIngreso = @DescripcionIngreso, ServicioIngreso = @ServicioIngreso, ValorIngreso = @ValorIngreso, FechaIngreso = @FechaIngreso " +
								  "WHERE IngresoID = @IngresoID ";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@IngresoID", ingreso.IngresoID);
			sentenciaSQL.Parameters.AddWithValue("@DescripcionIngreso", ingreso.DescripcionIngreso);
			sentenciaSQL.Parameters.AddWithValue("@ServicioIngreso", ingreso.ServicioIngreso);
			sentenciaSQL.Parameters.AddWithValue("@ValorIngreso", ingreso.ValorIngreso);
			sentenciaSQL.Parameters.AddWithValue("@FechaIngreso", ingreso.FechaIngreso);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}



		///EGRESO

		public bool IngresarEgreso(EgresoModel egreso)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "INSERT INTO EGRESO (DescripcionEgreso, ServicioEgreso, ValorEgreso, FechaEgreso ) " +
								  "VALUES (@DescripcionEgreso,@ServicioEgreso,@MontoEgreso,@FechaEgreso)";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@DescripcionEgreso", egreso.DescripcionEgreso);
			sentenciaSQL.Parameters.AddWithValue("@ServicioEgreso", egreso.ServicioEgreso);
			sentenciaSQL.Parameters.AddWithValue("@MontoEgreso", egreso.ValorEgreso);
			sentenciaSQL.Parameters.AddWithValue("@FechaEgreso", egreso.FechaEgreso);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}

		public List<EgresoModel> ListarEgreso(DateTime fechaEgreso)
		{
			List<EgresoModel> listaEgresoResultado = new List<EgresoModel>();

			var fechaconsulta = fechaEgreso.ToString("yyyy-MM-dd");

			string sentenciaSql = "SELECT EgresoID, DescripcionEgreso, ServicioEgreso, ValorEgreso, FechaEgreso " +
								  "FROM Egreso " +
								  $"WHERE FechaEgreso = '{fechaconsulta}'";

			DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

			for (int i = 0; i < tablaDatos.Rows.Count; i++)
			{
				EgresoModel egresoResultado = new EgresoModel();
				egresoResultado.EgresoID = tablaDatos.Rows[i].Field<int>("EgresoID");
				egresoResultado.DescripcionEgreso = tablaDatos.Rows[i].Field<string>("DescripcionEgreso");
				egresoResultado.ServicioEgreso = tablaDatos.Rows[i].Field<string>("ServicioEgreso");
				egresoResultado.ValorEgreso = tablaDatos.Rows[i].Field<decimal>("ValorEgreso");
				egresoResultado.FechaEgreso = tablaDatos.Rows[i].Field<DateTime>("FechaEgreso");

				listaEgresoResultado.Add(egresoResultado);
			}

			return listaEgresoResultado;
		}

		public bool EliminarEgreso(int egresoID)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "DELETE FROM EGRESO " +
								  "WHERE EgresoID = @EgresoID";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@EgresoID", egresoID);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}

		public EgresoModel ObtenerEgreso(int EgresoID)
		{

			string sentenciaSql = "SELECT TOP(1) EgresoID, DescripcionEgreso, ServicioEgreso, ValorEgreso, FechaEgreso " +
								  "FROM Egreso " +
								  $"WHERE EgresoID = {EgresoID} ";

			DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

			EgresoModel egresoResultado = new EgresoModel();
			egresoResultado.EgresoID = tablaDatos.Rows[0].Field<int>("EgresoID");
			egresoResultado.DescripcionEgreso = tablaDatos.Rows[0].Field<string>("DescripcionEgreso");
			egresoResultado.ServicioEgreso = tablaDatos.Rows[0].Field<string>("ServicioEgreso");
			egresoResultado.ValorEgreso = tablaDatos.Rows[0].Field<decimal>("ValorEgreso");
			egresoResultado.FechaEgreso = tablaDatos.Rows[0].Field<DateTime>("FechaEgreso");

			return egresoResultado;
		}

		public bool ModificarEgreso(EgresoModel egreso)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "UPDATE Egreso " +
								  "SET DescripcionEgreso = @DescripcionEgreso, ServicioEgreso = @ServicioEgreso, ValorEgreso = @ValorEgreso, FechaEgreso = @FechaEgreso " +
								  "WHERE EgresoID = @EgresoID ";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@EgresoID", egreso.EgresoID);
			sentenciaSQL.Parameters.AddWithValue("@DescripcionEgreso", egreso.DescripcionEgreso);
			sentenciaSQL.Parameters.AddWithValue("@ServicioEgreso", egreso.ServicioEgreso);
			sentenciaSQL.Parameters.AddWithValue("@ValorEgreso", egreso.ValorEgreso);
			sentenciaSQL.Parameters.AddWithValue("@FechaEgreso", egreso.FechaEgreso);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}

		///INFORME I/E

		public List<IngresoModel> InformeIngreso(DateTime fechaInicio, DateTime fechaFin)
		{
			List<IngresoModel> listaEgresoResultado = new List<IngresoModel>();

			var fecha1 = fechaInicio.ToString("yyyy-MM-dd");
			var fecha2 = fechaFin.ToString("yyyy-MM-dd");

			string sentenciaSql = "SELECT IngresoID, DescripcionIngreso, ServicioIngreso, ValorIngreso, FechaIngreso " +
								  "FROM Ingreso " +
								  $"WHERE FechaIngreso  BETWEEN '{fecha1}' AND '{fecha2}'";

			DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

			for (int i = 0; i < tablaDatos.Rows.Count; i++)
			{
                IngresoModel egresoResultado = new IngresoModel();
				egresoResultado.IngresoID = tablaDatos.Rows[i].Field<int>("IngresoID");
				egresoResultado.DescripcionIngreso = tablaDatos.Rows[i].Field<string>("DescripcionIngreso");
				egresoResultado.ServicioIngreso = tablaDatos.Rows[i].Field<string>("ServicioIngreso");
				egresoResultado.ValorIngreso = tablaDatos.Rows[i].Field<decimal>("ValorIngreso");
				egresoResultado.FechaIngreso = tablaDatos.Rows[i].Field<DateTime>("FechaIngreso");
				egresoResultado.FechaString = tablaDatos.Rows[i].Field<DateTime>("FechaIngreso").ToString("dd/MM/yyyy");

				listaEgresoResultado.Add(egresoResultado);
			}

			return listaEgresoResultado;
		}

		public List<EgresoModel> InformeEgreso(DateTime fechaInicio, DateTime fechaFin)
		{
			List<EgresoModel> listaEgresoResultado = new List<EgresoModel>();

			var fecha1 = fechaInicio.ToString("yyyy-MM-dd");
			var fecha2 = fechaFin.ToString("yyyy-MM-dd");

			string sentenciaSql = "SELECT EgresoID, DescripcionEgreso, ServicioEgreso, ValorEgreso, FechaEgreso " +
								  "FROM Egreso " +
								  $"WHERE FechaEgreso BETWEEN '{fecha1}' AND '{fecha2}'";

			DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

			for (int i = 0; i < tablaDatos.Rows.Count; i++)
			{
				EgresoModel egresoResultado = new EgresoModel();
				egresoResultado.EgresoID = tablaDatos.Rows[i].Field<int>("EgresoID");
				egresoResultado.DescripcionEgreso = tablaDatos.Rows[i].Field<string>("DescripcionEgreso");
				egresoResultado.ServicioEgreso = tablaDatos.Rows[i].Field<string>("ServicioEgreso");
				egresoResultado.ValorEgreso = tablaDatos.Rows[i].Field<decimal>("ValorEgreso");
				egresoResultado.FechaEgreso = tablaDatos.Rows[i].Field<DateTime>("FechaEgreso");
                egresoResultado.FechaString = tablaDatos.Rows[i].Field<DateTime>("FechaEgreso").ToString("dd/MM/yyyy");

                listaEgresoResultado.Add(egresoResultado);
			}

			return listaEgresoResultado;
		}

	}
}