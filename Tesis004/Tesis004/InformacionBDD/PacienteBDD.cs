using System;
using System.Collections.Generic;
using System.Data;
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

        public int OptenerUltimoNumeroHC()
        {
            int ultimoNumeroHC = 0;

            string sentenciaSql = "SELECT max(NumHistoriaClinica) as Ultimo " +
                                  "FROM Paciente ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            ultimoNumeroHC = tablaDatos.Rows[0].Field<int>("ultimo") + 1;

            return ultimoNumeroHC;
        }
    }
}