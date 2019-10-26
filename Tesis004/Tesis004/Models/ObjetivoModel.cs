using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class ObjetivoModel
	{
        public int ObjetivoID { get; set; }
		public int ItemObjetivo { get; set; }
        public string NombreObjetivo { get; set; }
        public string DetalleObjetivo { get; set; }
		public int ConsultaMedicaID { get; set; }
	}
}