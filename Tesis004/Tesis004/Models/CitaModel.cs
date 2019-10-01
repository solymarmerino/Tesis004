using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class CitaModel
    {
        public int CitaMedicaID { get; set; }
        public int PacienteID { get; set; }
        public int HistoriaClinica { get; set; }
        public DateTime Fecha { get; set; }
        public int PersonalID { get; set; }
        public int TipoCita { get; set; }
        public string NombrePaciente { get; set; }
        public string NombreMedico  { get; set; }
        public string NombreCita { get; set; }
        public string NombreEspecialidad { get; set; }
        public string Cedula { get; set; }
        public bool Pagado { get; set; }
        public bool Atencion { get; set; }
        public bool Enfermeria { get; set; }
    }
}