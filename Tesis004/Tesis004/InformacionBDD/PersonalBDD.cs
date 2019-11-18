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

            string sentenciaSql = "INSERT INTO PERSONAL (Nombre, Cedula, Telefono, Cargo, Usuario, Contrasena, Especialidad, Codigo) " +
                         "VALUES (@Nombre, @Cedula, @Telefono, @Cargo, @Usuario, @Contrasena, @Especialidad, @Codigo)";
            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@Nombre", personal.Nombre);
            sentenciaSQL.Parameters.AddWithValue("@Cedula", personal.Cedula);
            sentenciaSQL.Parameters.AddWithValue("@Telefono", personal.Telefono);
            sentenciaSQL.Parameters.AddWithValue("@Cargo", personal.Cargo);
            sentenciaSQL.Parameters.AddWithValue("@Usuario", personal.Usuario);
            sentenciaSQL.Parameters.AddWithValue("@Contrasena", personal.Contrasena);
            sentenciaSQL.Parameters.AddWithValue("@Especialidad", personal.Especialidad);
            sentenciaSQL.Parameters.AddWithValue("@Codigo", personal.Codigo);

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
                PersonalModel personalResultado = new PersonalModel();
                personalResultado.PersonalID = tablaDatos.Rows[i].Field<int>("PersonalID");
                personalResultado.Nombre = tablaDatos.Rows[i].Field<string>("Nombre");
                personalResultado.Telefono = tablaDatos.Rows[i].Field<string>("Telefono");
                personalResultado.CargoNombre = tablaDatos.Rows[i].Field<string>("Cargo");

                listaPersonalResultado.Add(personalResultado);
            }

            return listaPersonalResultado;
        }

        public List<PersonalModel> ListaPersonalNombrePorEspecialidad(int especialidad)
        {
            List<PersonalModel> listaPersonalResultado = new List<PersonalModel>();

            string sentenciaSql = "SELECT PersonalID, Nombre " +
                                  "FROM Personal " +
                                  $"WHERE Especialidad = '{especialidad}'";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                PersonalModel personalResultado = new PersonalModel();
                personalResultado.PersonalID = tablaDatos.Rows[i].Field<int>("PersonalID");
                personalResultado.Nombre = tablaDatos.Rows[i].Field<string>("Nombre");

                listaPersonalResultado.Add(personalResultado);
            }

            return listaPersonalResultado;
        }

        public PersonalModel OptenerPersonal(int idPersonal)
        {
            PersonalModel personalResultado = new PersonalModel();

            string sentenciaSql = "SELECT TOP(1) PersonalID, Nombre, Cedula, Telefono , Cargo, Usuario, Especialidad, Codigo " +
                                  "FROM Personal " +
                                  $"WHERE PersonalID = {idPersonal} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            personalResultado.PersonalID = tablaDatos.Rows[0].Field<int>("PersonalID");
            personalResultado.Nombre = tablaDatos.Rows[0].Field<string>("Nombre");
            personalResultado.Cedula = tablaDatos.Rows[0].Field<string>("Cedula");
            personalResultado.Telefono = tablaDatos.Rows[0].Field<string>("Telefono");
            personalResultado.Cargo = tablaDatos.Rows[0].Field<int>("Cargo");
            personalResultado.Usuario = tablaDatos.Rows[0].Field<string>("Usuario");
            personalResultado.Especialidad = tablaDatos.Rows[0].Field<int>("Especialidad");
            personalResultado.Codigo = tablaDatos.Rows[0].Field<int>("Codigo");

            return personalResultado;
        }

        public PersonalModel OptenerPersonalPorUsuario(string usuario)
        {
            PersonalModel personalResultado = new PersonalModel();

            string sentenciaSql = "SELECT TOP(1) PersonalID, Cargo, Usuario, Contrasena " +
                                  "FROM Personal " +
                                  $"WHERE PersonalID = {usuario} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            personalResultado.PersonalID = tablaDatos.Rows[0].Field<int>("PersonalID");
            personalResultado.Cargo = tablaDatos.Rows[0].Field<int>("Cargo");
            personalResultado.Usuario = tablaDatos.Rows[0].Field<string>("Usuario");
            personalResultado.Especialidad = tablaDatos.Rows[0].Field<int>("Contrasena");

            return personalResultado;
        }

        public bool GuardarPersonalModificado(PersonalModel personal)
        {
            bool modificado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE Personal "+
                                  "SET Nombre = @Nombre, Cedula = @Cedula, Telefono = @Telefono, Cargo = @Cargo, Usuario = @Usuario, Especialidad = @Especialidad, Contrasena = @Contrasena, Codigo = @Codigo  " +
                                  "WHERE PersonalID = @PersonalID ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@PersonalID", personal.PersonalID);
            sentenciaSQL.Parameters.AddWithValue("@Nombre", personal.Nombre);
            sentenciaSQL.Parameters.AddWithValue("@Cedula", personal.Cedula);
            sentenciaSQL.Parameters.AddWithValue("@Telefono", personal.Telefono);
            sentenciaSQL.Parameters.AddWithValue("@Cargo", personal.Cargo);
            sentenciaSQL.Parameters.AddWithValue("@Usuario", personal.Usuario);
            sentenciaSQL.Parameters.AddWithValue("@Contrasena", personal.Contrasena);
            sentenciaSQL.Parameters.AddWithValue("@Especialidad", personal.Especialidad);
            sentenciaSQL.Parameters.AddWithValue("@Codigo", personal.Codigo);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                modificado = true;
            }

            return modificado;
        }

        public List<PersonalServicioModel> ListaPersonalServicio(int personalID)
        {
            List<PersonalServicioModel> listaPersonalServicioResultado = new List<PersonalServicioModel>();

            string sentenciaSql = "SELECT ServicioID, PersonalID, Detalle , Valor " +
                                  "FROM Servicio " +
                                  $"WHERE PersonalID = {personalID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                PersonalServicioModel personalServicoResultado = new PersonalServicioModel();
                personalServicoResultado.ServicioID = tablaDatos.Rows[i].Field<int>("ServicioID");
                personalServicoResultado.PersonalID = tablaDatos.Rows[i].Field<int>("PersonalID");
                personalServicoResultado.Detalle = tablaDatos.Rows[i].Field<string>("Detalle");
                personalServicoResultado.Valor = tablaDatos.Rows[i].Field<decimal>("Valor");

                listaPersonalServicioResultado.Add(personalServicoResultado);
            }

            return listaPersonalServicioResultado;
        }

        public PersonalServicioModel ObtenerServicio(int ServicioID)
        {

            string sentenciaSql = "SELECT TOP(1) ServicioID, PersonalID, Detalle , Valor " +
                                  "FROM Servicio " +
                                  $"WHERE ServicioID = {ServicioID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            PersonalServicioModel personalServicoResultado = new PersonalServicioModel();
            personalServicoResultado.ServicioID = tablaDatos.Rows[0].Field<int>("ServicioID");
            personalServicoResultado.PersonalID = tablaDatos.Rows[0].Field<int>("PersonalID");
            personalServicoResultado.Detalle = tablaDatos.Rows[0].Field<string>("Detalle");
            personalServicoResultado.Valor = tablaDatos.Rows[0].Field<decimal>("Valor");

            return personalServicoResultado;
        }

        public bool AnadirServicio(PersonalServicioModel personalServicio)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO SERVICIO (PersonalID, Detalle , Valor) " +
                                  "VALUES (@PersonalID, @Detalle , @Valor)";
            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@PersonalID", personalServicio.PersonalID);
            sentenciaSQL.Parameters.AddWithValue("@Detalle", personalServicio.Detalle);
            sentenciaSQL.Parameters.AddWithValue("@Valor", personalServicio.Valor);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool ModificarServicio(PersonalServicioModel personalServicio)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE SERVICIO " +
                                  "SET Detalle = @Detalle, Valor = @Valor " +
                                  "WHERE ServicioID = @ServicioID ";
            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@Detalle", personalServicio.Detalle);
            sentenciaSQL.Parameters.AddWithValue("@Valor", personalServicio.Valor);
            sentenciaSQL.Parameters.AddWithValue("@ServicioID", personalServicio.ServicioID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool EliminarServicio(PersonalServicioModel personalServicio)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM SERVICIO " +
                                  "WHERE ServicioID = @ServicioID ";
            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ServicioID", personalServicio.ServicioID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }
    }
}