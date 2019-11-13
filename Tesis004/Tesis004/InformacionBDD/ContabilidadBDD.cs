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




	}
}