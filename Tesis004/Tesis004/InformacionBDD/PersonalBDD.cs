using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    /**********
     * Objeto utilziada para consultar los datos del usuario y almacenarlos en un objeto PersonalModel
     * Base: DBVACARI
     * Tabla: Personal
    **********/
    public class PersonalBDD
    {
        //Conexion a la base de datos para realziar las consultas
        private ConexionBDD conexion = new ConexionBDD();

        //Constructor vacio
        public PersonalBDD()
        {

        }

        public bool IngresarPersonal(PersonalModel personal)
        {
            bool ingresado = false;
            int resultado = 0;

            string sql = "INSERT INTO PERSONAL (Nombre, Cedula, Telefono, Cargo, Usuario, Contrasena, Especialidad) " +
                         "VALUES (@Nombre, @Cedula, @Telefono, @Cargo, @Usuario, @Contrasena, @Especialidad)";
            SqlCommand sentenciaSQL = new SqlCommand(sql);

            sentenciaSQL.Parameters.AddWithValue("@Nombre", personal.Nombre);
            sentenciaSQL.Parameters.AddWithValue("@Cedula", personal.Cedula);
            sentenciaSQL.Parameters.AddWithValue("@Telefono", personal.Telefono);
            sentenciaSQL.Parameters.AddWithValue("@Cargo", personal.Cargo);
            sentenciaSQL.Parameters.AddWithValue("@Usuario", personal.Usuario);
            sentenciaSQL.Parameters.AddWithValue("@Contrasena", personal.Contrasena);
            sentenciaSQL.Parameters.AddWithValue("@Especialidad", personal.Especialidad);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if(resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<PersonalModel> ListaPersonal()
        {
            List<PersonalModel> listaPersonalResultado = new List<PersonalModel>();

            string sentenciaSql = "SELECT PersonalID, Nombre, Telefono , par.Valor as Cargo " +
                                  "FROM Personal per inner join Parametro par " +
                                  "ON per.cargo = par.ParametroID ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                PersonalModel usuarioResultado = new PersonalModel();
                usuarioResultado.PersonalID = tablaDatos.Rows[i].Field<int>("PersonalID");
                usuarioResultado.Nombre = tablaDatos.Rows[i].Field<string>("Nombre");
                usuarioResultado.Telefono = tablaDatos.Rows[i].Field<string>("Telefono");
                usuarioResultado.CargoNombre = tablaDatos.Rows[i].Field<string>("Cargo");

                listaPersonalResultado.Add(usuarioResultado);
            }

            return listaPersonalResultado;
        }
    }
}