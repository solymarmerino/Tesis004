using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class FacturaModel
	{
        public int FacturaID { get; set; }
		public DateTime FechaEmision { get; set; }
		public decimal Subtotal { get; set; }
		public decimal Total { get; set; }
		public string NumeroFactura { get; set; }
		public int ClienteID { get; set; }
        public string NombreCliente { get; set; }
        public string CedulaCliente { get; set; }
        public string DireccionCliente { get; set; }
        public string TelefonoCliente { get; set; }
    }
}