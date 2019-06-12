using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class PersonalServicioModel
    {
        public int ServicioID { get; set; }
        public int PersonalID { get; set; }
        public string Detalle { get; set; }
        public decimal Valor { get; set; }
    }
}