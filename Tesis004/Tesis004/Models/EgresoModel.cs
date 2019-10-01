using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class EgresoModel
	{
        public int EgresoID { get; set; }
		public string ServicioEgreso { get; set; }
		public string DetalleEgreso { get; set; }
		public decimal ValorEgreso { get; set; }
	}
}