using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class AntecedenteFamiliarModel
	{
        public int AntecedenteFamiliarID { get; set; }

		public int NumAntecedenteFamiliar { get; set; }

		public string NombreAntecedenteFamiliar { get; set; }

		public string DescripcionAF { get; set; }

		public int HistoriaClinicaID { get; set; }
	}
}