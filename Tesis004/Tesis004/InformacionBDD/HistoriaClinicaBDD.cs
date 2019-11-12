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

            if (tablaDatos.Rows.Count > 0)
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

        public bool InsertarSubjetivo(SubjetivoModel subjetivo)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO Subjetivo (ItemSubjetivo, DetalleSubjetivo, ConsultaMedicaID) " +
                                  "VALUES (@ItemSubjetivo, @DetalleSubjetivo, @ConsultaMedicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ItemSubjetivo", subjetivo.ItemSubjetivo);
            sentenciaSQL.Parameters.AddWithValue("@DetalleSubjetivo", subjetivo.DescripcionSubjetivo);
            sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", subjetivo.ConsultaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool EliminarSubjetivo(SubjetivoModel subjetivo)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM Subjetivo " +
                                  "WHERE SubjetivoID = @SubjetivoID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@SubjetivoID", subjetivo.SubjetivoID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        public bool ModificarSubjetivo(SubjetivoModel subjetivo)
        {
            bool modificado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE Subjetivo " +
                                  "SET DetalleSubjetivo = @DetalleSubjetivo " +
                                  "WHERE SubjetivoID = @SubjetivoID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@DetalleSubjetivo", subjetivo.DescripcionSubjetivo);
            sentenciaSQL.Parameters.AddWithValue("@SubjetivoID", subjetivo.SubjetivoID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                modificado = true;
            }

            return modificado;
        }

        public List<SubjetivoModel> ListarSubjetivo(int consultaMedicaID)
        {
            List<SubjetivoModel> listaSubjetivo = new List<SubjetivoModel>();

            string sentenciaSql = "SELECT s.SubjetivoID, s.ItemSubjetivo, s.DetalleSubjetivo, s.ConsultaMedicaID, p.Valor " +
                                  "FROM Subjetivo s " +
                                  "INNER JOIN Parametro p ON s.ItemSubjetivo = p.ParametroID " +
                                  $"WHERE s.ConsultaMedicaID = {consultaMedicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                SubjetivoModel subjetivo = new SubjetivoModel();
                subjetivo.SubjetivoID = tablaDatos.Rows[i].Field<int>("SubjetivoID");
                subjetivo.ItemSubjetivo = tablaDatos.Rows[i].Field<int>("ItemSubjetivo");
                subjetivo.DescripcionSubjetivo = tablaDatos.Rows[i].Field<string>("DetalleSubjetivo");
                subjetivo.ConsultaMedicaID = tablaDatos.Rows[i].Field<int>("ConsultaMedicaID");
                subjetivo.NombreSubjetivo = tablaDatos.Rows[i].Field<string>("Valor");

                listaSubjetivo.Add(subjetivo);
            }

            return listaSubjetivo;
        }

        public bool InsertarObjetivo(ObjetivoModel objetivo)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO Objetivo (ItemObjetivo, DetalleObjetivo, ConsultaMedicaID) " +
                                  "VALUES (@ItemObjetivo, @DetalleObjetivo, @ConsultaMedicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ItemObjetivo", objetivo.ItemObjetivo);
            sentenciaSQL.Parameters.AddWithValue("@DetalleObjetivo", objetivo.DetalleObjetivo);
            sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", objetivo.ConsultaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public bool EliminarObjetivo(ObjetivoModel objetivo)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM Objetivo " +
                                  "WHERE ObjetivoID = @ObjetivoID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ObjetivoID", objetivo.ObjetivoID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        public bool ModificarObjetivo(ObjetivoModel objetivo)
        {
            bool modificado = false;
            int resultado = 0;

            string sentenciaSql = "UPDATE Objetivo " +
                                  "SET DetalleObjetivo = @DetalleObjetivo " +
                                  "WHERE ObjetivoID = @ObjetivoID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@DetalleObjetivo", objetivo.DetalleObjetivo);
            sentenciaSQL.Parameters.AddWithValue("@ObjetivoID", objetivo.ObjetivoID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                modificado = true;
            }

            return modificado;
        }

        public List<ObjetivoModel> ListarObjetivo(int consultaMedicaID)
        {
            List<ObjetivoModel> listaObjetivo = new List<ObjetivoModel>();

            string sentenciaSql = "SELECT o.ObjetivoID, o.ItemObjetivo, o.DetalleObjetivo, o.ConsultaMedicaID, p.Valor " +
                                  "FROM Objetivo o " +
                                  "INNER JOIN Parametro p ON o.ItemObjetivo = p.ParametroID " +
                                  $"WHERE o.ConsultaMedicaID = {consultaMedicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                ObjetivoModel objetivo = new ObjetivoModel();
                objetivo.ObjetivoID = tablaDatos.Rows[i].Field<int>("ObjetivoID");
                objetivo.ItemObjetivo = tablaDatos.Rows[i].Field<int>("ItemObjetivo");
                objetivo.DetalleObjetivo = tablaDatos.Rows[i].Field<string>("DetalleObjetivo");
                objetivo.ConsultaMedicaID = tablaDatos.Rows[i].Field<int>("ConsultaMedicaID");
                objetivo.NombreObjetivo = tablaDatos.Rows[i].Field<string>("Valor");

                listaObjetivo.Add(objetivo);
            }

            return listaObjetivo;
        }

        public List<CIE10Model> ListarSugerenciaEnfermedad(string enfermedad)
        {
            List<CIE10Model> listaSugerenciaEnfermedad = new List<CIE10Model>();

            string sentenciaSql = "SELECT TOP(10) cie10id, detalle, codigo " +
                                  "FROM cie10 " +
                                  $"WHERE detalle LIKE '%{enfermedad}%' ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                CIE10Model cie10 = new CIE10Model();
                cie10.CIE10ID = tablaDatos.Rows[i].Field<int>("cie10id");
                cie10.Detalle = tablaDatos.Rows[i].Field<string>("detalle");
                cie10.Codigo = tablaDatos.Rows[i].Field<string>("codigo");

                listaSugerenciaEnfermedad.Add(cie10);
            }

            return listaSugerenciaEnfermedad;
        }

        public CIE10Model ConsultarEnfermedad(CIE10Model cie10)
        {
            string sentenciaSql = "";
            if (cie10.Detalle != null)
            {
                sentenciaSql = "SELECT TOP(10) cie10id, detalle, codigo " +
                               "FROM cie10 " +
                               $"WHERE detalle LIKE '%{cie10.Detalle}%' ";
            }
            if (cie10.Codigo != null)
            {
                sentenciaSql = "SELECT TOP(10) cie10id, detalle, codigo " +
                               "FROM cie10 " +
                               $"WHERE codigo LIKE '%{cie10.Codigo}' ";
            }

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);
            CIE10Model cie10Resultado = new CIE10Model();
            if (tablaDatos.Rows.Count > 0)
            {
                cie10Resultado.CIE10ID = tablaDatos.Rows[0].Field<int>("cie10id");
                cie10Resultado.Detalle = tablaDatos.Rows[0].Field<string>("detalle");
                cie10Resultado.Codigo = tablaDatos.Rows[0].Field<string>("codigo");
            }

            return cie10Resultado;
        }

        public bool InsertarDiagnostico(DiagnosticoModel diagnostico)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO Diagnostico (ConsultaMedicaID, CIE10ID, Estado) " +
                                  "VALUES (@ConsultaMedicaID, @CIE10ID, @Estado); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", diagnostico.ConsultaMedicaID);
            sentenciaSQL.Parameters.AddWithValue("@CIE10ID", diagnostico.CIE10ID);
            sentenciaSQL.Parameters.AddWithValue("@Estado", diagnostico.EstadoDiagnostico);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<DiagnosticoModel> ListarDiagnostico(int consultaMedicaID)
        {
            List<DiagnosticoModel> listaDiagnostico = new List<DiagnosticoModel>();

            string sentenciaSql = "SELECT d.DiagnosticoID, c.Detalle, c.Codigo, p.Valor " +
                                  "FROM Diagnostico d " +
                                  "INNER JOIN Cie10 c ON d.CIE10ID = c.CIE10ID " +
                                  "INNER JOIN Parametro p ON d.Estado = p.ParametroID " +
                                  $"WHERE d.ConsultaMedicaID = {consultaMedicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                DiagnosticoModel diagnostico = new DiagnosticoModel();
                diagnostico.DiagnosticoID = tablaDatos.Rows[i].Field<int>("DiagnosticoID");
                diagnostico.Cie10Detalle = tablaDatos.Rows[i].Field<string>("Detalle");
                diagnostico.Cie10Codigo = tablaDatos.Rows[i].Field<string>("Codigo");
                diagnostico.TipoDiagnostico = tablaDatos.Rows[i].Field<string>("Valor");

                listaDiagnostico.Add(diagnostico);
            }

            return listaDiagnostico;
        }

        public bool EliminarDiagnostico(DiagnosticoModel diagnostico)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM Diagnostico " +
                                  "WHERE DiagnosticoID = @DiagnosticoID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@DiagnosticoID", diagnostico.DiagnosticoID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        public bool ValidarReceta(RecetaModel receta)
        {
            bool ingresado = false;
            int resultado = 0;
            string sentenciaSql = "";
            SqlCommand sentenciaSQL = null;

            if (receta.RecetaID == 0)
            {
                sentenciaSql = "INSERT INTO Receta (Receta, ConsultaMedicaID) " +
                                "VALUES (@Receta, @ConsultaMedicaID) ";

                sentenciaSQL = new SqlCommand(sentenciaSql);

                sentenciaSQL.Parameters.AddWithValue("@Receta", receta.RecetaTexto);
                sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", receta.ConsultaMedicaID);
            }
            else
            {
                sentenciaSql = "UPDATE Receta " +
                               "SET Receta = @Receta " +
                               "WHERE RecetaID= @RecetaID) ";

                sentenciaSQL = new SqlCommand(sentenciaSql);

                sentenciaSQL.Parameters.AddWithValue("@Receta", receta.RecetaTexto);
                sentenciaSQL.Parameters.AddWithValue("@RecetaID", receta.RecetaID);
            }

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public RecetaModel ConsultarReceta(int consultaMedicaID)
        {
            string sentenciaSql = "SELECT RecetaID, Receta, ConsultaMedicaID " +
                                  "FROM Receta " +
                                  $"WHERE ConsultaMedicaID = {consultaMedicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);
            RecetaModel receta = new RecetaModel();

            if (tablaDatos.Rows.Count > 0)
            {
                receta.RecetaID = tablaDatos.Rows[0].Field<int>("RecetaID");
                receta.RecetaTexto = tablaDatos.Rows[0].Field<string>("Receta");
                receta.ConsultaMedicaID = tablaDatos.Rows[0].Field<int>("ConsultaMedicaID");
            }

            return receta;
        }

        public bool InsertarProcedimiento(ProcedimientoModel procedimiento)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO Procedimiento (Procedimiento, Detalle, ConsultaMedicaID) " +
                                  "VALUES (@Procedimiento, @Detalle, @ConsultaMedicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@Procedimiento", procedimiento.ProcedimientoTexto);
            sentenciaSQL.Parameters.AddWithValue("@Detalle", procedimiento.Detalle);
            sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", procedimiento.ConsultaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<ProcedimientoModel> ListarProcedimiento(int consultaMedicaID)
        {
            List<ProcedimientoModel> listaProcedimiento = new List<ProcedimientoModel>();

            string sentenciaSql = "SELECT ProcedimientoID, Procedimiento, Detalle " +
                                  "FROM Procedimiento " +
                                  $"WHERE ConsultaMedicaID = {consultaMedicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                ProcedimientoModel procedimiento = new ProcedimientoModel();
                procedimiento.ProcedimientoID = tablaDatos.Rows[i].Field<int>("ProcedimientoID");
                procedimiento.ProcedimientoTexto = tablaDatos.Rows[i].Field<string>("Procedimiento");
                procedimiento.Detalle = tablaDatos.Rows[i].Field<string>("Detalle");

                listaProcedimiento.Add(procedimiento);
            }

            return listaProcedimiento;
        }

        public bool EliminarProcedimiento(ProcedimientoModel procedimiento)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM Procedimiento " +
                                  "WHERE ProcedimientoID = @ProcedimientoID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@ProcedimientoID", procedimiento.ProcedimientoID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        public bool InsertarCertificado(CertificadoMedicoModel certificado)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO CertificadoMedico (FechaInicio, FechaFin, FechaCertificado, Observaciones, ConsultaMedicaID) " +
                                  "VALUES (@FechaInicio, @FechaFin, @FechaCertificado, @Observaciones, @ConsultaMedicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@FechaInicio", certificado.FechaInicio);
            sentenciaSQL.Parameters.AddWithValue("@FechaFin", certificado.FechaFin);
            sentenciaSQL.Parameters.AddWithValue("@FechaCertificado", certificado.FechaCertificado);
            sentenciaSQL.Parameters.AddWithValue("@Observaciones", certificado.Observaciones);
            sentenciaSQL.Parameters.AddWithValue("@ConsultaMedicaID", certificado.ConsultaMedicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<CitaModel> ListarAtencionPrevia(int pacienteID)
        {
            List<CitaModel> listaProcedimiento = new List<CitaModel>();

            string sentenciaSql = "SELECT c.CitaMedicaID, c.Fecha, per.Nombre, cie.Detalle " +
                                  "FROM Cita c" +
                                  "INNER JOIN Personal per ON c.PersonalID = per.PersonalID " +
                                  "INNER JOIN ConsultaMedica cm ON c.ConsultaMedicaID = cm.ConsultaMedicaID" +
                                  "INNER JOIN CIE10 cie ON cm.CIE10ID = cie.CIE10ID " +
                                  $"WHERE c.PacienteID = {pacienteID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                CitaModel cita = new CitaModel();
                cita.CitaMedicaID = tablaDatos.Rows[i].Field<int>("CitaMedicaID");
                cita.Fecha = tablaDatos.Rows[i].Field<DateTime>("Fecha");
                cita.NombreMedico = tablaDatos.Rows[i].Field<string>("Nombre");
                cita.DetalleDiagnostico = tablaDatos.Rows[i].Field<string>("Detalle");

                listaProcedimiento.Add(cita);
            }

            return listaProcedimiento;
        }

        /////////////////////////**************PERSONAL
        public bool InsertarAntecedentePersonal(AntecedentePersonalModel antecedente)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO AntecedentePersonal (AntecedentePersonal, DescripcionAP, HistoriaClinicaID) " +
                                  "VALUES (@AntecedentePersonal, @DescripcionAP, @HistoriaClinicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@AntecedentePersonal", antecedente.NumAntecedentePersonal);
            sentenciaSQL.Parameters.AddWithValue("@DescripcionAP", antecedente.DescripcionAP);
            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", antecedente.HistoriaClinicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<AntecedentePersonalModel> ListarAntecedentePersonal(int historiaClinicaID)
        {
            List<AntecedentePersonalModel> listaAntecedente = new List<AntecedentePersonalModel>();

            string sentenciaSql = "SELECT ap.AntecedentePersonalID, ap.AntecedentePersonal, ap.DescripcionAP, p.Valor " +
                                  "FROM AntecedentePersonal ap " +
                                  "INNER JOIN Parametro p ON ap.AntecedentePersonal = p.ParametroID " +
                                  $"WHERE ap.HistoriaClinicaID = {historiaClinicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                AntecedentePersonalModel antecedente = new AntecedentePersonalModel();
                antecedente.AntecedentePersonalID = tablaDatos.Rows[i].Field<int>("AntecedentePersonalID");
                antecedente.NombreAntecedentePersonal = tablaDatos.Rows[i].Field<string>("Valor");
                antecedente.DescripcionAP = tablaDatos.Rows[i].Field<string>("DescripcionAP");

                listaAntecedente.Add(antecedente);
            }

            return listaAntecedente;
        }

        public bool EliminarAntecedentePersonal(AntecedentePersonalModel antecedente)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM AntecedentePersonal " +
                                  "WHERE AntecedentePersonalID = @AntecedentePersonalID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@AntecedentePersonalID", antecedente.AntecedentePersonalID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        /////////////////////////**************FAMILIAR
        public bool InsertarAntecedenteFamiliar(AntecedenteFamiliarModel antecedente)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO AntecedenteFamiliar (AntecedenteFamiliar, DescripcionAF, HistoriaClinicaID) " +
                                  "VALUES (@AntecedenteFamiliar, @DescripcionAF, @HistoriaClinicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@AntecedenteFamiliar", antecedente.NumAntecedenteFamiliar);
            sentenciaSQL.Parameters.AddWithValue("@DescripcionAF", antecedente.DescripcionAF);
            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", antecedente.HistoriaClinicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<AntecedenteFamiliarModel> ListarAntecedenteFamiliar(int historiaClinicaID)
        {
            List<AntecedenteFamiliarModel> listaAntecedente = new List<AntecedenteFamiliarModel>();

            string sentenciaSql = "SELECT af.AntecedenteFamiliarID, af.AntecedenteFamiliar, af.DescripcionAF, p.Valor " +
                                  "FROM AntecedenteFamiliar af " +
                                  "INNER JOIN Parametro p ON af.AntecedenteFamiliar = p.ParametroID " +
                                  $"WHERE af.HistoriaClinicaID = {historiaClinicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                AntecedenteFamiliarModel antecedente = new AntecedenteFamiliarModel();
                antecedente.AntecedenteFamiliarID = tablaDatos.Rows[i].Field<int>("AntecedenteFamiliarID");
                antecedente.NombreAntecedenteFamiliar = tablaDatos.Rows[i].Field<string>("Valor");
                antecedente.DescripcionAF = tablaDatos.Rows[i].Field<string>("DescripcionAF");

                listaAntecedente.Add(antecedente);
            }

            return listaAntecedente;
        }

        public bool EliminarAntecedenteFamiliar(AntecedenteFamiliarModel antecedente)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM AntecedenteFamiliar " +
                                  "WHERE AntecedenteFamiliarID = @AntecedenteFamiliarID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@AntecedenteFamiliarID", antecedente.AntecedenteFamiliarID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        /////////////////////////**************SOCIAL
        public bool InsertarAntecedenteSocial(AntecedenteSocialModel antecedente)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO AntecedenteSocial (AntecedenteSocial, DescripcionAS, HistoriaClinicaID) " +
                                  "VALUES (@AntecedenteSocial, @DescripcionAS, @HistoriaClinicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@AntecedenteSocial", antecedente.NumAntecedenteSocial);
            sentenciaSQL.Parameters.AddWithValue("@DescripcionAS", antecedente.DescripcionAS);
            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", antecedente.HistoriaClinicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<AntecedenteSocialModel> ListarAntecedenteSocial(int historiaClinicaID)
        {
            List<AntecedenteSocialModel> listaAntecedente = new List<AntecedenteSocialModel>();

            string sentenciaSql = "SELECT aso.AntecedenteSocialID, aso.AntecedenteSocial, aso.DescripcionAS, p.Valor " +
                                  "FROM AntecedenteSocial aso " +
                                  "INNER JOIN Parametro p ON aso.AntecedenteSocial = p.ParametroID " +
                                  $"WHERE aso.HistoriaClinicaID = {historiaClinicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                AntecedenteSocialModel antecedente = new AntecedenteSocialModel();
                antecedente.AntecedenteSocialID = tablaDatos.Rows[i].Field<int>("AntecedenteSocialID");
                antecedente.NombreAntecedenteSocial = tablaDatos.Rows[i].Field<string>("Valor");
                antecedente.DescripcionAS = tablaDatos.Rows[i].Field<string>("DescripcionAS");

                listaAntecedente.Add(antecedente);
            }

            return listaAntecedente;
        }

        public bool EliminarAntecedenteSocial(AntecedenteSocialModel antecedente)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM AntecedenteSocial " +
                                  "WHERE AntecedenteSocialID = @AntecedenteSocialID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@AntecedenteSocialID", antecedente.AntecedenteSocialID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        /////////////////////////**************HABITO
        public bool InsertarHabito(HabitoModel habito)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO Habito (Habito, HabitoDetalle, HistoriaClinicaID) " +
                                  "VALUES (@Habito, @HabitoDetalle, @HistoriaClinicaID); ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@Habito", habito.NumHabito);
            sentenciaSQL.Parameters.AddWithValue("@HabitoDetalle", habito.DescripcionHabito);
            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", habito.HistoriaClinicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<HabitoModel> ListarHabito(int historiaClinicaID)
        {
            List<HabitoModel> listaHabito = new List<HabitoModel>();

            string sentenciaSql = "SELECT h.HabitoID, h.Habito, h.HabitoDetalle, p.Valor " +
                                  "FROM Habito h " +
                                  "INNER JOIN Parametro p ON h.Habito = p.ParametroID " +
                                  $"WHERE HistoriaClinicaID = {historiaClinicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                HabitoModel habito = new HabitoModel();
                habito.HabitoID = tablaDatos.Rows[i].Field<int>("HabitoID");
                habito.NombreHabito = tablaDatos.Rows[i].Field<string>("Valor");
                habito.DescripcionHabito = tablaDatos.Rows[i].Field<string>("HabitoDetalle");

                listaHabito.Add(habito);
            }

            return listaHabito;
        }

        public bool EliminarHabito(HabitoModel habito)
        {
            bool eliminado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM Habito " +
                                  "WHERE HabitoID = @HabitoID; ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@HabitoID", habito.HabitoID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                eliminado = true;
            }

            return eliminado;
        }

        public bool ModificarAlergia(HistoriaClinicaModel historiaClinica)
        {
            bool ingresado = false;
            int resultado = 0;
            string sentenciaSql = "UPDATE HistoriaClinica " +
                                  "SET Alergias = @Alergias " +
                                  "WHERE HistoriaClinicaID= @HistoriaClinicaID ";
            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@Alergias", historiaClinica.Alergias);
            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", historiaClinica.HistoriaClinicaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public HistoriaClinicaModel ConsultarAlergia(int historiaClinicaID)
        {
            string sentenciaSql = "SELECT HistoriaClinicaID, Alergias " +
                                  "FROM HistoriaClinica " +
                                  $"WHERE HistoriaClinicaID = {historiaClinicaID} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);
            HistoriaClinicaModel historiaClinica = new HistoriaClinicaModel();

            if (tablaDatos.Rows.Count > 0)
            {
                historiaClinica.HistoriaClinicaID = tablaDatos.Rows[0].Field<int>("HistoriaClinicaID");
                historiaClinica.Alergias = tablaDatos.Rows[0].Field<string>("Alergias");
            }

            return historiaClinica;
        }
    }
}