using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class SubjetivoModel
	{
        public int SubjetivoID { get; set; }
		public int ItemSubjetivo { get; set; }
		public string NombreSubjetivo { get; set; }
		public string DescripcionSubjetivo { get; set; }
		public int ConsultaMedicaID { get; set; }
	}
}