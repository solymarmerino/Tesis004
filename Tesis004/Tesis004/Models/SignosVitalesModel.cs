using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class SignosVitalesModel
    {
        public int SignosVitalesID { get; set; }
        public int HistoriaClinica { get; set; }
        public DateTime Fecha { get; set; }
        public string PrecionArterial { get; set; }
        public double Temperatura { get; set; }
        public double Peso { get; set; }
        public double Talla { get; set; }
        public int FrecuenciaCardiaca { get; set; }
        public int FrecuenciaRespiratoria { get; set; }
        public int SaturacionOxigeno { get; set; }
        public double IndiceMasaCorporal { get; set; }

    }
}