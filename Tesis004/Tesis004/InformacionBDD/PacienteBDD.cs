﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class PacienteBDD
    {
        private ConexionBDD conexion = new ConexionBDD();
        public PacienteBDD()
        {

        }

        public List<PacienteModel> ListaSugerenciaPacienteBusqueda(string opcionBusqueda, string parametroBusqueda)
        {
            List<PacienteModel> listaSugerenciaResultado = new List<PacienteModel>();

            string sentenciaSql = "";
            DataTable tablaDatos = new DataTable();

            switch (opcionBusqueda)
            {
                case "Nombre":
                    sentenciaSql = "SELECT TOP(10) NombreCompleto " +
                                   "FROM Paciente " +
                                   $"WHERE NombreCompleto LIKE '%{parametroBusqueda}%' "+
                                   "ORDER BY PacienteID desc ";

                    tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

                    for (int i = 0; i < tablaDatos.Rows.Count; i++)
                    {
                        PacienteModel pacienteResultado = new PacienteModel();
                        pacienteResultado.ParametroBusqueda = tablaDatos.Rows[i].Field<string>("NombreCompleto");

                        listaSugerenciaResultado.Add(pacienteResultado);
                    }
                    break;

                case "Cedula":
                    sentenciaSql = "SELECT TOP(10) Cedula " +
                                   "FROM Paciente " +
                                   $"WHERE Cedula LIKE '{parametroBusqueda}%' " +
                                   "ORDER BY PacienteID desc ";

                    tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

                    for (int i = 0; i < tablaDatos.Rows.Count; i++)
                    {
                        PacienteModel pacienteResultado = new PacienteModel();
                        pacienteResultado.ParametroBusqueda = tablaDatos.Rows[i].Field<string>("Cedula");

                        listaSugerenciaResultado.Add(pacienteResultado);
                    }
                    break;

                case "HCPaciente":
                    sentenciaSql = "SELECT TOP(10) NumHistoriaClinica " +
                                   "FROM Paciente " +
                                   $"WHERE NumHistoriaClinica LIKE '{parametroBusqueda}%' " +
                                   "ORDER BY PacienteID desc ";

                    tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

                    for (int i = 0; i < tablaDatos.Rows.Count; i++)
                    {
                        PacienteModel pacienteResultado = new PacienteModel();
                        pacienteResultado.ParametroBusqueda = tablaDatos.Rows[i].Field<int>("NumHistoriaClinica").ToString();

                        listaSugerenciaResultado.Add(pacienteResultado);
                    }
                    break;
            } 

            return listaSugerenciaResultado;
        }

        public List<PacienteModel> ListaPacienteBusqueda(string opcionBusqueda, string parametroBusqueda)
        {
            List<PacienteModel> listaPacienteResultado = new List<PacienteModel>();

            string sentenciaSql = "SELECT TOP(10) PacienteID, NumHistoriaClinica, NombreCompleto , Cedula " +
                                  "FROM Paciente ";
            switch (opcionBusqueda)
            {
                case "Nombre":
                    sentenciaSql += $"WHERE NombreCompleto = '{parametroBusqueda}' ";
                    break;

                case "Cedula":
                    sentenciaSql += $"WHERE Cedula = {parametroBusqueda}";
                    break;

                case "HCPaciente":
                    sentenciaSql += $"WHERE NumHistoriaClinica = {parametroBusqueda}";
                    break;
            }
            sentenciaSql += "ORDER BY PacienteID desc ";


            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                PacienteModel pacienteResultado = new PacienteModel();
                pacienteResultado.PacienteID = tablaDatos.Rows[i].Field<int>("PacienteID");
                pacienteResultado.NumHistoriaClinica = tablaDatos.Rows[i].Field<int>("NumHistoriaClinica");
                pacienteResultado.NombreCompleto = tablaDatos.Rows[i].Field<string>("NombreCompleto");
                pacienteResultado.Cedula = tablaDatos.Rows[i].Field<string>("Cedula");

                listaPacienteResultado.Add(pacienteResultado);
            }

            return listaPacienteResultado;
        }

        public PacienteModel PacientePorId(string idPaciente)
        {
            string sentenciaSql = "SELECT TOP(1) PacienteID, NumHistoriaClinica, NombreCompleto , Cedula, FechaNacimiento, Direccion, Telefono, Sexo, EstadoCivil, TipoSangre, Etnia, NombreContactoEmergencia, AfinidadContactoEmergencia, TelefonoContactoEmergencia, Representante, Discapacidad, Email, Ocupacion " +
                                  "FROM Paciente "+
                                  $"WHERE PacienteID = '{idPaciente}' ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);
            PacienteModel pacienteResultado = new PacienteModel();
            pacienteResultado.PacienteID = tablaDatos.Rows[0].Field<int>("PacienteID");
            pacienteResultado.NumHistoriaClinica = tablaDatos.Rows[0].Field<int>("NumHistoriaClinica");
            pacienteResultado.NombreCompleto = tablaDatos.Rows[0].Field<string>("NombreCompleto");
            pacienteResultado.Cedula = tablaDatos.Rows[0].Field<string>("Cedula");
            pacienteResultado.FechaNacimiento = tablaDatos.Rows[0].Field<DateTime>("FechaNacimiento");
            pacienteResultado.Direccion = tablaDatos.Rows[0].Field<string>("Direccion");
            pacienteResultado.Telefono = tablaDatos.Rows[0].Field<string>("Telefono");
            pacienteResultado.Sexo = tablaDatos.Rows[0].Field<int>("Sexo");
            pacienteResultado.EstadoCivil = tablaDatos.Rows[0].Field<int>("EstadoCivil");
            pacienteResultado.TipoSangre = tablaDatos.Rows[0].Field<int>("TipoSangre");
            pacienteResultado.Etnia = tablaDatos.Rows[0].Field<int>("Etnia");
            pacienteResultado.NombreContactoEmergencia = tablaDatos.Rows[0].Field<string>("NombreContactoEmergencia");
            pacienteResultado.NombreContactoEmergencia = tablaDatos.Rows[0].Field<string>("AfinidadContactoEmergencia");
            pacienteResultado.NombreContactoEmergencia = tablaDatos.Rows[0].Field<string>("TelefonoContactoEmergencia");
            pacienteResultado.Representante = tablaDatos.Rows[0].Field<bool>("Representante");
            pacienteResultado.Discapacidad = tablaDatos.Rows[0].Field<bool>("Discapacidad");
            pacienteResultado.Email = tablaDatos.Rows[0].Field<string>("Email");
            pacienteResultado.Ocupacion = tablaDatos.Rows[0].Field<string>("Ocupacion");

            DateTime fechaActual = DateTime.Today;
            //TimeSpan diferencia = fechaActual.Subtract(pacienteResultado.FechaNacimiento);
            int anos = fechaActual.Year - pacienteResultado.FechaNacimiento.Year;
            int meses = fechaActual.Month - pacienteResultado.FechaNacimiento.Month;

            pacienteResultado.Edad = anos + " Años " + meses + " Meses ";

            return pacienteResultado;
        } 

        public int ObtenerUltimoNumeroHC()
        {
            int ultimoNumeroHC = 0;

            string sentenciaSql = "SELECT max(NumHistoriaClinica) as Ultimo " +
                                  "FROM Paciente ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            ultimoNumeroHC = tablaDatos.Rows[0].Field<int>("ultimo") + 1;

            return ultimoNumeroHC;
        }

        public int ObtenerIdPacientePorHC(int numHistoriaClinica)
        {
            int idPaciente = 0;

            string sentenciaSql = "SELECT PacienteID " +
                                  "FROM Paciente "+
                                  $"WHERE NumHistoriaClinica = {numHistoriaClinica}";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            idPaciente = tablaDatos.Rows[0].Field<int>("PacienteID");

            return idPaciente;
        }

        public bool IngresarPaciente(PacienteModel paciente)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO PACIENTE (NumHistoriaClinica, NombreCompleto, Cedula, Direccion, Telefono, FechaNacimiento, Sexo, EstadoCivil, TipoSangre, Etnia, NombreContactoEmergencia, AfinidadContactoEmergencia, TelefonoContactoEmergencia, Representante, Discapacidad, Email, Ocupacion) " +
                                  "VALUES (@NumHistoriaClinica, @NombreCompleto, @Cedula, @Direccion, @Telefono, @FechaNacimiento, @Sexo, @EstadoCivil, @TipoSangre, @Etnia, @NombreContactoEmergencia, @AfinidadContactoEmergencia, @TelefonoContactoEmergencia, @Representante, @Discapacidad, @Email, @Ocupacion)";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@NumHistoriaClinica", paciente.NumHistoriaClinica);
            sentenciaSQL.Parameters.AddWithValue("@NombreCompleto", paciente.NombreCompleto);
            sentenciaSQL.Parameters.AddWithValue("@Cedula", paciente.Cedula);
            sentenciaSQL.Parameters.AddWithValue("@Direccion", paciente.Direccion);
            sentenciaSQL.Parameters.AddWithValue("@Telefono", paciente.Telefono);
            sentenciaSQL.Parameters.AddWithValue("@FechaNacimiento", paciente.FechaNacimiento);
            sentenciaSQL.Parameters.AddWithValue("@Sexo", paciente.Sexo);
            sentenciaSQL.Parameters.AddWithValue("@EstadoCivil", paciente.EstadoCivil);
            sentenciaSQL.Parameters.AddWithValue("@TipoSangre", paciente.TipoSangre);
            sentenciaSQL.Parameters.AddWithValue("@Etnia", paciente.Etnia);
            sentenciaSQL.Parameters.AddWithValue("@NombreContactoEmergencia", paciente.NombreContactoEmergencia);
            sentenciaSQL.Parameters.AddWithValue("@AfinidadContactoEmergencia", paciente.AfinidadContactoEmergencia);
            sentenciaSQL.Parameters.AddWithValue("@TelefonoContactoEmergencia", paciente.TelefonoContactoEmergencia);
            sentenciaSQL.Parameters.AddWithValue("@Representante", paciente.Representante);
            sentenciaSQL.Parameters.AddWithValue("@Discapacidad", paciente.Discapacidad);
            sentenciaSQL.Parameters.AddWithValue("@Email", paciente.Email);
            sentenciaSQL.Parameters.AddWithValue("@Ocupacion", paciente.Ocupacion);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            paciente.PacienteID = this.ObtenerIdPacientePorHC(paciente.NumHistoriaClinica);

            sentenciaSql = "SET IDENTITY_INSERT HistoriaClinica ON; "+
                           "INSERT INTO HistoriaClinica (HistoriaClinicaID, PacienteID) " +
                           "VALUES (@HistoriaClinicaID, @PacienteID); ";

            sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@HistoriaClinicaID", paciente.NumHistoriaClinica);
            sentenciaSQL.Parameters.AddWithValue("@PacienteID", paciente.PacienteID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }
    }
}