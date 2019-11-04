using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    public class RecetaModel
	{
        public int RecetaID { get; set; }
		public string RecetaTexto { get; set; }
		public int ConsultaMedicaID { get; set; }
	}
}