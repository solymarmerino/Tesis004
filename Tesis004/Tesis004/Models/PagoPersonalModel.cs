using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class PagoPersonalModel
    {
        public int PersonalID { get; set; }
        public string NombrePersonal { get; set; }
        public decimal TotalPersonal { get; set; }
        public int NumeroCitas { get; set; }
        public decimal PagoCita { get; set; }
    }
}