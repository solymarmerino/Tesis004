using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    /**********
    * Clase utilizada para obtener informacion general, devuelve 
    * Base: DBVACARI
    * Tabla: Parametro
    **********/
    public class InformacionGeneralBDD
    {
        //Conexion a la base de datos para realziar las consultas
        private ConexionBDD conexion = new ConexionBDD();

        //Constructor vacio
        public InformacionGeneralBDD()
        {

        }

        //Funcion para obtener el identificardor y el valor del parametro de la base datos y los retorna en una lista de objetos ParametroModel
        public List<ParametroModel> ObtenerInformacionParametro(string tipo)
        {
            List<ParametroModel> listaParametroResultado = new List<ParametroModel>();

            string sentenciaSql = "SELECT ParametroID, Valor " +
                                  "FROM Parametro " +
                                  $"WHERE Tipo like '{tipo}' ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                ParametroModel parametroResultado = new ParametroModel();
                parametroResultado.Identificador = tablaDatos.Rows[i].Field<int>("ParametroID");
                parametroResultado.Valor = tablaDatos.Rows[i].Field<string>("Valor").Replace("_", " ");

                listaParametroResultado.Add(parametroResultado);
            }

            return listaParametroResultado;
        }
    }
}