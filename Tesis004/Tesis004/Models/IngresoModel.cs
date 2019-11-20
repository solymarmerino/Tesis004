using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class IngresoModel
	{
        public int IngresoID { get; set; }
		public string ServicioIngreso { get; set; }
		public string DescripcionIngreso { get; set; }
		public decimal ValorIngreso { get; set; }
		public DateTime FechaIngreso { get; set; }
        public string FechaString { get; set; }
    }
}