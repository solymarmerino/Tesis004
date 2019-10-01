using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class DetalleFacturaModel
	{
        public int DetalleFacturaID { get; set; }
		public string Concepto { get; set; }
		public int Cantidad { get; set; }
		public decimal Precio { get; set; }
		public int FacturaID { get; set; }
	}
}