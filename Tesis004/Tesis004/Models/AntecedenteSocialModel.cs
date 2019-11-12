using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class AntecedenteSocialModel
	{
        public int AntecedenteSocialID { get; set; }

		public int NumAntecedenteSocial { get; set; }

		public string NombreAntecedenteSocial { get; set; }

		public string DescripcionAS { get; set; }

		public int HistoriaClinicaID { get; set; }
	}
}