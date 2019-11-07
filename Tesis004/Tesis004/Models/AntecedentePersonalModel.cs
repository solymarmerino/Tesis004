using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class AntecedentePersonalModel
	{
        public int AntecedentePersonalID { get; set; }
		public int NombreAntecedentePersonal { get; set; }
		public string DescripcionAP { get; set; }
		public int HistoriaClinicaID { get; set; }
	}
}