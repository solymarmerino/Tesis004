using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class ConsultaMedicaModel
    {
        public int ConsultaMedicaID { get; set; }
		public string MotivoConsulta { get; set; }
		public string Analisis { get; set; }
		public string PlanTratamiento { get; set; }
		public DateTime FechaConsulta { get; set; }
		public int TipoConsulta { get; set; }
		public int HistoriaClinicaID { get; set; }
	}
}