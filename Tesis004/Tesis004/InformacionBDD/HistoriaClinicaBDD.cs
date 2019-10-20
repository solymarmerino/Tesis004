using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class HistoriaClinicaBDD
    {
        private ConexionBDD conexion = new ConexionBDD();

        public HistoriaClinicaBDD()
        {

        }

        public bool ValidarConsultaMedica(int consultaMedicaID)
        {
            bool resultado = false;
            string sentenciaSql = "SELECT ConsultaMedicaID " +
                                  "FROM ConsultaMedica " +
                                  $"WHERE ConsultaMedicaID = '{consultaMedicaID}' ";
            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            if(tablaDatos.Rows.Count > 0)
            {
                resultado = true;
            }

            return resultado;
        }

        public bool InsertarConsultaMedica(ConsultaMedicaModel consultaMedica)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "SET IDENTITY_INSERT ConsultaMedica ON; " +
                                  "INSERT INTO ConsultaMedica (ConsultaMedicaID, HistoriaClinicaID, Fecha) " +
                                  "VALUES (@ConsultaMedicaID, @HistoriaClinicaID, @Fecha); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", consultaMedica.ConsultaMedicaID);
            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", consultaMedica.HistoriaClinicaID);
            sentenciaSQL.Parameters.AddWithValue("@Fecha", DateTime.Now.Date);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool ActualizarConsultaMedica(ConsultaMedicaModel consultaMedica)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE ConsultaMedica " +
                                  "SET MotivoConsulta = @MotivoConsulta, Analisis = @Analisis, PlanTratamiento = @PlanTratamiento, TipoConsulta = @TipoConsulta " +
                                  "WHERE ConsultaMedicaID = @ConsultaMedicaID ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@MotivoConsulta", consultaMedica.MotivoConsulta);
            sentenciaSQL.Parameters.AddWithValue("@Analisis", consultaMedica.Analisis);
            sentenciaSQL.Parameters.AddWithValue("@PlanTratamiento", consultaMedica.PlanTratamiento);
            sentenciaSQL.Parameters.AddWithValue("@TipoConsulta", consultaMedica.TipoConsulta);
            sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", consultaMedica.ConsultaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public ConsultaMedicaModel ConsultarConsultaMedica(int consultaMedicaID)
        {
            ConsultaMedicaModel consultaMedicaResultado = new ConsultaMedicaModel();

            string sentenciaSql = "SELECT TOP(1) ConsultaMedicaID, MotivoConsulta, Analisis, PlanTratamiento, TipoConsulta " +
                                  "FROM ConsultaMedica " +
                                  $"WHERE ConsultaMedicaID = {consultaMedicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            consultaMedicaResultado.ConsultaMedicaID = tablaDatos.Rows[0].Field<int>("ConsultaMedicaID");
            consultaMedicaResultado.MotivoConsulta = tablaDatos.Rows[0].Field<string>("MotivoConsulta");
            consultaMedicaResultado.Analisis = tablaDatos.Rows[0].Field<string>("Analisis");
            consultaMedicaResultado.PlanTratamiento = tablaDatos.Rows[0].Field<string>("PlanTratamiento");
            consultaMedicaResultado.TipoConsulta = tablaDatos.Rows[0].Field<string>("TipoConsulta");            

            return consultaMedicaResultado;
        }
    }
}