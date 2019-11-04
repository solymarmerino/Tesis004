using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class ProcedimientoModel
    {
        public int ProcedimientoID { get; set; }
        public string ProcedimientoTexto { get; set; }
        public string Detalle { get; set; }
        public int ConsultaMedicaID { get; set; }
    }
}