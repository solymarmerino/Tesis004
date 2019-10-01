using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class HistorisClinicaModel
    {
		public int HistoriaClinicaID { get; set; }
		public string AntecedentesPersonales { get; set; }
		public string AntecedenesFamiliares { get; set; }
		public string AntecedetesSociales { get; set; }
		public string Habitos { get; set; }
		public string Alergias { get; set; }
		public int PacienteID { get; set; }
	}
}