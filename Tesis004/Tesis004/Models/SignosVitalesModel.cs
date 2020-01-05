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
        public String FechaString { get; set; }
        public string PrecionArterial { get; set; }
        public decimal Temperatura { get; set; }
        public decimal Peso { get; set; }
        public decimal Talla { get; set; }
        public int FrecuenciaCardiaca { get; set; }
        public int FrecuenciaRespiratoria { get; set; }
        public int SaturacionOxigeno { get; set; }
        public decimal IndiceMasaCorporal { get; set; }
        public string Observacion { get; set; }
        public string Edad { get; set; }
        public string IndiceCrecimientoPeso { get; set; }
        public string IndiceCrecimientoTalla { get; set; }
    }
}