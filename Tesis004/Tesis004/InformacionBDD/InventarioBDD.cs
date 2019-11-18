using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class InventarioBDD
	{
        private ConexionBDD conexion = new ConexionBDD();
        public InventarioBDD()
        {

        }

		public bool IngresarProducto(InventarioModel producto)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "INSERT INTO INVENTARIO (Producto,TipoProducto,CantidadProducto,LoteProducto,FechaVencimientoProducto ) " +
								  "VALUES (@Producto,@TipoProducto,@CantidadProducto,@LoteProducto,@FechaVencimientoProducto)";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@Producto", producto.Producto);
			sentenciaSQL.Parameters.AddWithValue("@TipoProducto", producto.TipoProducto);
			sentenciaSQL.Parameters.AddWithValue("@CantidadProducto", producto.CantidadProducto);
			sentenciaSQL.Parameters.AddWithValue("@LoteProducto", producto.LoteProducto);
			sentenciaSQL.Parameters.AddWithValue("@FechaVencimientoProducto", producto.FechaVencimientoProducto);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}
	}
}