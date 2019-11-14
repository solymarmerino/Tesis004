using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class ServicioBDD
    {
        private ConexionBDD conexion = new ConexionBDD();

        public ServicioBDD()
        {

        }

        public bool IngresarCita (CitaModel cita)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO CITAMEDICA (PacienteID, Fecha, TipoCita, PersonalID, Pagado, Atencion, Enfermeria) " +
                                  "VALUES (@PacienteID, @Fecha, @TipoCita, @PersonalID, 0, 0, 0)";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@PacienteID", cita.PacienteID);
            sentenciaSQL.Parameters.AddWithValue("@Fecha", cita.Fecha);
            sentenciaSQL.Parameters.AddWithValue("@TipoCita", cita.TipoCita);
            sentenciaSQL.Parameters.AddWithValue("@PersonalID", cita.PersonalID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool EliminarCita(int citaMedicaID)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM CITAMEDICA " +
                                  "WHERE CitaMedicaID = @CitaMedicaID";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@CitaMedicaID", citaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool PagarCita(int citaMedicaID)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE CITAMEDICA " +
                                  "SET pagado = 1 " +
                                  "WHERE CitaMedicaID = @CitaMedicaID";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@CitaMedicaID", citaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool AtencionEnfermeriaCita(int pacienteID)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE CITAMEDICA " +
                                  "SET enfermeria = 1 " +
                                  "WHERE PacienteID = @PacienteID AND Fecha = @Fecha";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@PacienteID", pacienteID);
            sentenciaSQL.Parameters.AddWithValue("@Fecha", DateTime.Now.Date);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool AtencionMedicoCita(int citaMedicaID)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE CITAMEDICA " +
                                  "SET atencion = 1 " +
                                  "WHERE CitaMedicaID = @CitaMedicaID";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@CitaMedicaID", citaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<CitaModel> ListarCita()
        {
            List<CitaModel> listaCitaResultado = new List<CitaModel>();

            string sentenciaSql = "SELECT cm.CitaMedicaID, cm.PacienteID, pc.NombreCompleto, cm.PersonalID, pr.Nombre, cm.TipoCita, pm.Valor as Cita, cm.Fecha, cm.Pagado, cm.Atencion, cm.Enfermeria, pmo.Valor as Especialidad, pc.Cedula, pc.NumHistoriaClinica " +
                                  "FROM CitaMedica cm INNER JOIN Paciente pc " +
                                  "ON cm.PacienteID = pc.PacienteID " +
                                  "INNER JOIN Personal pr " +
                                  "ON cm.PersonalID = pr.PersonalID " +
                                  "INNER JOIN Parametro pm " +
                                  "ON cm.TipoCita = pm.ParametroID " +
                                  "INNER JOIN Parametro pmo " +
                                  "ON pr.Especialidad = pmo.ParametroID ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                CitaModel citaResultado = new CitaModel();
                citaResultado.CitaMedicaID = tablaDatos.Rows[i].Field<int>("CitaMedicaID");
                citaResultado.PacienteID = tablaDatos.Rows[i].Field<int>("PacienteID");
                citaResultado.NombrePaciente = tablaDatos.Rows[i].Field<string>("NombreCompleto");
                citaResultado.PersonalID = tablaDatos.Rows[i].Field<int>("PersonalID");
                citaResultado.NombreMedico = tablaDatos.Rows[i].Field<string>("Nombre");
                citaResultado.TipoCita = tablaDatos.Rows[i].Field<int>("TipoCita");
                citaResultado.NombreCita = tablaDatos.Rows[i].Field<string>("Cita").Replace("_", " ");
                citaResultado.Fecha = tablaDatos.Rows[i].Field<DateTime>("Fecha");
                citaResultado.Pagado = tablaDatos.Rows[i].Field<bool>("Pagado");
                citaResultado.Atencion = tablaDatos.Rows[i].Field<bool>("Atencion");
                citaResultado.Enfermeria = tablaDatos.Rows[i].Field<bool>("Enfermeria");
                citaResultado.NombreEspecialidad = tablaDatos.Rows[i].Field<string>("Especialidad").Replace("_", " ");
                citaResultado.Cedula = tablaDatos.Rows[i].Field<string>("Cedula");
                citaResultado.HistoriaClinica = tablaDatos.Rows[i].Field<int>("NumHistoriaClinica");

                listaCitaResultado.Add(citaResultado);
            }

            return listaCitaResultado;
        }

        public List<CitaModel> ListarCitaPorPaciente(int pacienteID)
        {
            List<CitaModel> listaCitaResultado = new List<CitaModel>();

            string sentenciaSql = "SELECT cm.CitaMedicaID, cm.PacienteID, pc.NombreCompleto, cm.PersonalID, pr.Nombre, cm.TipoCita, pm.Valor as Cita, cm.Fecha, cm.Pagado, cm.Atencion, cm.Enfermeria, pmo.Valor as Especialidad " +
                                  "FROM CitaMedica cm INNER JOIN Paciente pc " +
                                  "ON cm.PacienteID = pc.PacienteID " +
                                  "INNER JOIN Personal pr " +
                                  "ON cm.PersonalID = pr.PersonalID " +
                                  "INNER JOIN Parametro pm " +
                                  "ON cm.TipoCita = pm.ParametroID " +
                                  "INNER JOIN Parametro pmo "+
                                  "ON pr.Especialidad = pmo.ParametroID "+
                                  $"WHERE cm.PacienteID = {pacienteID}";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                CitaModel citaResultado = new CitaModel();
                citaResultado.CitaMedicaID = tablaDatos.Rows[i].Field<int>("CitaMedicaID");
                citaResultado.PacienteID = tablaDatos.Rows[i].Field<int>("PacienteID");
                citaResultado.NombrePaciente = tablaDatos.Rows[i].Field<string>("NombreCompleto");
                citaResultado.PersonalID = tablaDatos.Rows[i].Field<int>("PersonalID");
                citaResultado.NombreMedico = tablaDatos.Rows[i].Field<string>("Nombre");
                citaResultado.TipoCita = tablaDatos.Rows[i].Field<int>("TipoCita");
                citaResultado.NombreCita = tablaDatos.Rows[i].Field<string>("Cita").Replace("_"," ");
                citaResultado.Fecha = tablaDatos.Rows[i].Field<DateTime>("Fecha");
                citaResultado.Pagado = tablaDatos.Rows[i].Field<bool>("Pagado");
                citaResultado.Atencion = tablaDatos.Rows[i].Field<bool>("Atencion");
                citaResultado.Enfermeria = tablaDatos.Rows[i].Field<bool>("Enfermeria");
                citaResultado.NombreEspecialidad = tablaDatos.Rows[i].Field<string>("Especialidad").Replace("_", " ");

                listaCitaResultado.Add(citaResultado);
            }

            return listaCitaResultado;
        }

        public List<CitaModel> ListarCitaPorMedico(string personalID)
        {
            List<CitaModel> listaCitaResultado = new List<CitaModel>();

            string sentenciaSql = "SELECT cm.CitaMedicaID, cm.PacienteID, pc.NombreCompleto, cm.PersonalID, pr.Nombre, cm.TipoCita, pm.Valor, cm.Fecha, cm.Pagado, cm.Atencion, cm.Enfermeria " +
                                  "FROM CitaMedica cm INNER JOIN Paciente pc " +
                                  "ON cm.PacienteID = pc.PacienteID " +
                                  "INNER JOIN Personal pr " +
                                  "ON cm.PersonalID = pr.PersonalID " +
                                  "INNER JOIN Parametro pm " +
                                  "ON cm.TipoCita = pm.ParametroID " +
                                  $"WHERE cm.PersonalID = {personalID}";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                CitaModel citaResultado = new CitaModel();
                citaResultado.CitaMedicaID = tablaDatos.Rows[i].Field<int>("CitaMedicaID");
                citaResultado.PacienteID = tablaDatos.Rows[i].Field<int>("PacienteID");
                citaResultado.NombrePaciente = tablaDatos.Rows[i].Field<string>("NombreCompleto");
                citaResultado.PersonalID = tablaDatos.Rows[i].Field<int>("PersonalID");
                citaResultado.NombreMedico = tablaDatos.Rows[i].Field<string>("Nombre");
                citaResultado.TipoCita = tablaDatos.Rows[i].Field<int>("TipoCita");
                citaResultado.NombreCita = tablaDatos.Rows[i].Field<string>("Valor");
                citaResultado.Fecha = tablaDatos.Rows[i].Field<DateTime>("Fecha");
                citaResultado.Pagado = tablaDatos.Rows[i].Field<bool>("Pagado");
                citaResultado.Atencion = tablaDatos.Rows[i].Field<bool>("Atencion");
                citaResultado.Enfermeria = tablaDatos.Rows[i].Field<bool>("Enfermeria");

                listaCitaResultado.Add(citaResultado);
            }

            return listaCitaResultado;
        }

    }
}