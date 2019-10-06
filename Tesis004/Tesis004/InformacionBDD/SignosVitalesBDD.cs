using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class SignosVitalesBDD
    {
        private ConexionBDD conexion = new ConexionBDD();
        public SignosVitalesBDD()
        {

        }

        public bool IngresarSignosVitales(SignosVitalesModel signosVitales)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO SignosVitales (HistoriaClinicaID, Fecha, PrecionArterial, Temperatura, Peso, Talla, FrecuenciaCardiaca, FrecuenciaRespiratoria, IndiceMasaCorporal, SaturacionOxigeno) " +
                                  "VALUES (@HistoriaClinicaID, @Fecha, @PrecionArterial, @Temperatura, @Peso, @Talla, @FrecuenciaCardiaca, @FrecuenciaRespiratoria, @IndiceMasaCorporal, @SaturacionOxigeno)";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", signosVitales.HistoriaClinica);
            sentenciaSQL.Parameters.AddWithValue("@Fecha", DateTime.Now);
            sentenciaSQL.Parameters.AddWithValue("@PrecionArterial", signosVitales.PrecionArterial);
            sentenciaSQL.Parameters.AddWithValue("@Temperatura", signosVitales.Temperatura);
            sentenciaSQL.Parameters.AddWithValue("@Peso", signosVitales.Peso);
            sentenciaSQL.Parameters.AddWithValue("@Talla", signosVitales.Talla);
            sentenciaSQL.Parameters.AddWithValue("@FrecuenciaCardiaca", signosVitales.FrecuenciaCardiaca);
            sentenciaSQL.Parameters.AddWithValue("@FrecuenciaRespiratoria", signosVitales.FrecuenciaRespiratoria);
            sentenciaSQL.Parameters.AddWithValue("@IndiceMasaCorporal", signosVitales.IndiceMasaCorporal);
            sentenciaSQL.Parameters.AddWithValue("@SaturacionOxigeno", signosVitales.SaturacionOxigeno);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }
    }
}