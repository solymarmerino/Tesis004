using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Tesis004.InformacionBDD
{
    /**********
    * Clase utilizada para conectarse a la base de datos
    * Gestor de Base de Datos: SQLSERVER 
    * Servidor: 192.168.56.101
    * Base: DBVACARI
    * Usuario: sa
    * Contraseña: Tesis2018
    **********/
    public class ConexionBDD
    {
        //String con los parametros que se utiliza para la conexion a la base de datos.
        private string stringConexion = "data source = 192.168.56.101; initial catalog = DBVACARI; user id = sa; password = Tesis2018";

        public ConexionBDD()
        {

        }

        //Se ejecuta una sentencia SQL del tipo SELECT en la base de datos y devuelve los campos en una tabla de datos.
        public DataTable ComandoConsulta(string sentenciaSQL)
        {
            DataTable tablaDatos = new DataTable();
            try
            {
                SqlConnection conexion = new SqlConnection(this.stringConexion);
                conexion.Open();
                SqlDataAdapter dataAdapter = new SqlDataAdapter(sentenciaSQL, conexion);
                dataAdapter.Fill(tablaDatos);
                conexion.Close();
            }
            catch (Exception e)
            {
                Trace.WriteLine("Error en la clase: ConexionBD, metodo: ComandoConsulta().");
                Trace.WriteLine("Error al ejecutar la senteciaSQL de modificaion.");
                Trace.WriteLine($"Sentencia: {sentenciaSQL}.");
                Trace.WriteLine(e.Message);
                Trace.Flush();
            }
            return tablaDatos;
        }

        //Se ejecuta una sentencia SQL del tipo INSERT, UPDATE o DELETE en la base de datos y devuelve el numero de filas afectadas.
        public int ComandoModificacion(SqlCommand sentenciaSQL)
        {
            int resultadoConsulta = 0;

            try
            {
                sentenciaSQL.Connection = new SqlConnection(this.stringConexion);
                sentenciaSQL.Connection.Open();
                resultadoConsulta = sentenciaSQL.ExecuteNonQuery();
                sentenciaSQL.Connection.Close();
            }
            catch (Exception e)
            {
                Trace.WriteLine("Error en la clase: ConexionBD, metodo: ComandoModificacion().");
                Trace.WriteLine("Error al ejecutar la senteciaSQL de modificaion.");
                Trace.WriteLine($"Sentencia: {sentenciaSQL.ToString()}.");
                Trace.WriteLine(e.Message);
                Trace.Flush();
            }

            return resultadoConsulta;
        }
    }
}