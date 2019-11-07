using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class HabitoModel
	{
        public int HabitoID { get; set; }
		public int NombreHabito { get; set; }
		public string DescripcionHabito { get; set; }
		public int HistoriaClinicaID { get; set; }
	}
}