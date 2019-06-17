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
        public string OpcionBusqueda { get; set; }
        public string ParametroBusqueda { get; set; }
    }
}