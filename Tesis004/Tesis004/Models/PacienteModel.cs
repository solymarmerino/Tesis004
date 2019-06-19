using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class PacienteModel
    {
        public int PacienteID { get; set; }
        public int NumHistoriaClinica { get; set; }
        public string NombreCompleto { get; set; }
        public string Cedula { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Sexo { get; set; }
        public int EstadoCivil { get; set; }
        public int TipoSangre { get; set; }
        public int Etnia { get; set; }
        public string NombreContactoEmergencia { get; set; }
        public string AfinidadContactoEmergencia { get; set; }
        public string TelefonoContactoEmergencia { get; set; }
        public string Email { get; set; }
        public string Ocupacion { get; set; }
        public bool Representante { get; set; }
        public bool Discapacidad { get; set; }
        public string OpcionBusqueda { get; set; }
        public string ParametroBusqueda { get; set; }
    }
}