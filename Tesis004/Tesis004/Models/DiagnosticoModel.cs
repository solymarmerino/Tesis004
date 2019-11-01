using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class DiagnosticoModel
	{
        public int DiagnosticoID { get; set; }
		public int EstadoDiagnostico { get; set; }
		public int CIE10ID { get; set; }
		public int ConsultaMedicaID { get; set; }
		public string Cie10Detalle { get; set; }
		public string Cie10Codigo { get; set; }
		public string TipoDiagnostico { get; set; }

	}
}