using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class ContabilidadBDD
	{
        private ConexionBDD conexion = new ConexionBDD();
        public ContabilidadBDD()
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

		public List<IngresoModel> ListarIngreso()
		{
			List<IngresoModel> listaIngresoResultado = new List<IngresoModel>();

			string sentenciaSql = "SELECT IngresoID, DescripcionIngreso, ServicioIngreso, ValorIngreso, FechaIngreso"+
                                  "FROM Ingreso";

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

		///EGRESO

		public bool IngresarEgreso(EgresoModel egreso)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "INSERT INTO EGRESO (DescripcionEgreso,ServicioEgreso,ValorEgreso,FechaEgreso) " +
								  "VALUES (@DescripcionEgreso,@ServicioEgreso,@ValorEgreso,@FechaEgreso)";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

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

	}
}