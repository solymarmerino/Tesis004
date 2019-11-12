using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class HistoriaClinicaModel
    {
		public int HistoriaClinicaID { get; set; }

		public string Alergias { get; set; }

		public int PacienteID { get; set; }
	}
}