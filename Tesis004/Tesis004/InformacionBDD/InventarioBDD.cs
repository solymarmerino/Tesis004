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

        public List<InventarioModel> ListarProducto()
        {
            List<InventarioModel> listaProducto = new List<InventarioModel>();

            string sentenciaSql = "SELECT ProductoID, Producto, TipoProducto, CantidadProducto, LoteProducto, FechaVencimientoProducto " +
                                  "FROM Inventario ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                InventarioModel producto = new InventarioModel();
                producto.ProductoID = tablaDatos.Rows[i].Field<int>("ProductoID");
                producto.Producto = tablaDatos.Rows[i].Field<string>("Producto");
                producto.TipoProducto = tablaDatos.Rows[i].Field<string>("TipoProducto");
                producto.CantidadProducto = tablaDatos.Rows[i].Field<int>("CantidadProducto");
                producto.LoteProducto = tablaDatos.Rows[i].Field<string>("LoteProducto");
                producto.FechaVencimientoProducto = tablaDatos.Rows[i].Field<DateTime>("FechaVencimientoProducto");
                producto.FechaString = tablaDatos.Rows[i].Field<DateTime>("FechaVencimientoProducto").ToString("dd/MM/yyyy");

                listaProducto.Add(producto);
            }

            return listaProducto;
        }

        public int CantidadPorProducto(int productoId)
        {
            int cantidad = 0;

            string sentenciaSql = "SELECT TOP(1) CantidadProducto " +
                                  "FROM Inventario "+
                                  $"WHERE ProductoID = {productoId} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                cantidad = tablaDatos.Rows[i].Field<int>("CantidadProducto");
            }

            return cantidad;
        }

        public bool DisminuirProducto(int productoId, int cantidad)
        {
            bool respuesta = false;
            int resultado = 0;

            int inicial = this.CantidadPorProducto(productoId);

            if(inicial >= cantidad)
            {
                string sentenciaSql = "UPDATE Inventario " +
                                      "SET CantidadProducto = CantidadProducto - @cantidad " +
                                      "WHERE ProductoID = @ProductoID";

                SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

                sentenciaSQL.Parameters.AddWithValue("@ProductoID", productoId);
                sentenciaSQL.Parameters.AddWithValue("@cantidad", cantidad);

                resultado = this.conexion.ComandoModificacion(sentenciaSQL);
            }

            if (resultado > 0)
            {
                respuesta = true;
            }

            return respuesta;
        }

        public bool EliminarProducto(int productoId)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM Inventario " +
                                  "WHERE ProductoID = @ProductoID";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ProductoID", productoId);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }
    }
}