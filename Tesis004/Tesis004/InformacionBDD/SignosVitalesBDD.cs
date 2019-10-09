﻿using System;
using System.Collections.Generic;
using System.Data;
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

        public SignosVitalesModel UltimoSignosVitales(int numeroHistoriaClinica)
        {
            SignosVitalesModel signosVitalesResultado = new SignosVitalesModel();
            string sentenciaSql = "SELECT TOP(1) SignosVitalesID, HistoriaClinicaID, Fecha, PrecionArterial, Temperatura, Peso, Talla, FrecuenciaCardiaca, FrecuenciaRespiratoria, IndiceMasaCorporal, SaturacionOxigeno " +
                                  "FROM SignosVitales " +
                                  $"WHERE HistoriaClinicaID = {numeroHistoriaClinica} "+
                                  "ORDER BY Fecha desc ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);
            
            if(tablaDatos.Rows.Count > 0)
            {
                signosVitalesResultado.SignosVitalesID = tablaDatos.Rows[0].Field<int>("SignosVitalesID");
                signosVitalesResultado.HistoriaClinica = tablaDatos.Rows[0].Field<int>("HistoriaClinicaID");
                signosVitalesResultado.Fecha = tablaDatos.Rows[0].Field<DateTime>("Fecha");
                signosVitalesResultado.PrecionArterial = tablaDatos.Rows[0].Field<string>("PrecionArterial");
                signosVitalesResultado.Temperatura = tablaDatos.Rows[0].Field<decimal>("Temperatura");
                signosVitalesResultado.Peso = tablaDatos.Rows[0].Field<decimal>("Peso");
                signosVitalesResultado.Talla = tablaDatos.Rows[0].Field<decimal>("Talla");
                signosVitalesResultado.FrecuenciaCardiaca = tablaDatos.Rows[0].Field<int>("FrecuenciaCardiaca");
                signosVitalesResultado.FrecuenciaRespiratoria = tablaDatos.Rows[0].Field<int>("FrecuenciaRespiratoria");
                signosVitalesResultado.IndiceMasaCorporal = tablaDatos.Rows[0].Field<decimal>("IndiceMasaCorporal");
                signosVitalesResultado.SaturacionOxigeno = tablaDatos.Rows[0].Field<int>("SaturacionOxigeno");
            }                     
            
            return signosVitalesResultado;
        }

        public List<SignosVitalesModel> ListarSignosVitales(int numeroHistoriaClinica)
        {
            List<SignosVitalesModel> listaSignosVitalesResultado = new List<SignosVitalesModel>();
            string sentenciaSql = "SELECT SignosVitalesID, HistoriaClinicaID, Fecha, PrecionArterial, Temperatura, Peso, Talla, FrecuenciaCardiaca, FrecuenciaRespiratoria, IndiceMasaCorporal, SaturacionOxigeno " +
                                  "FROM SignosVitales " +
                                  $"WHERE HistoriaClinicaID = {numeroHistoriaClinica} " +
                                  "ORDER BY Fecha desc ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i <= tablaDatos.Rows.Count; i++)
            {
                SignosVitalesModel signosVitalesResultado = new SignosVitalesModel();
                signosVitalesResultado.SignosVitalesID = tablaDatos.Rows[i].Field<int>("SignosVitalesID");
                signosVitalesResultado.HistoriaClinica = tablaDatos.Rows[i].Field<int>("HistoriaClinicaID");
                signosVitalesResultado.Fecha = tablaDatos.Rows[i].Field<DateTime>("Fecha");
                signosVitalesResultado.PrecionArterial = tablaDatos.Rows[i].Field<string>("PrecionArterial");
                signosVitalesResultado.Temperatura = tablaDatos.Rows[i].Field<decimal>("Temperatura");
                signosVitalesResultado.Peso = tablaDatos.Rows[i].Field<decimal>("Peso");
                signosVitalesResultado.Talla = tablaDatos.Rows[i].Field<decimal>("Talla");
                signosVitalesResultado.FrecuenciaCardiaca = tablaDatos.Rows[i].Field<int>("FrecuenciaCardiaca");
                signosVitalesResultado.FrecuenciaRespiratoria = tablaDatos.Rows[i].Field<int>("FrecuenciaRespiratoria");
                signosVitalesResultado.IndiceMasaCorporal = tablaDatos.Rows[i].Field<decimal>("IndiceMasaCorporal");
                signosVitalesResultado.SaturacionOxigeno = tablaDatos.Rows[i].Field<int>("SaturacionOxigeno");
                listaSignosVitalesResultado.Add(signosVitalesResultado);
            }
            
            return listaSignosVitalesResultado;
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