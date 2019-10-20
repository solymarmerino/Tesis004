using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class CertificadoMedicoModel
	{
        public int CertificadoMedicoID { get; set; }
		public DateTime FechaInicio { get; set; }
		public DateTime FechaFin { get; set; }
		public DateTime FechaCertificado { get; set; }
		public string Observaciones { get; set; }
		public int ConsultaMedicaID { get; set; }
	}
}