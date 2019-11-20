using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    /**********
    * Objeto utilziado para guardar los datos del personal
    * Base: DBVACARI
    * Tabla: Personal
    * Campos: 
    **********/
    public class PersonalModel
    {
        public string Nombre { get; set; }
        public string Cedula { get; set; }
        public string Telefono { get; set; }
        public int Cargo { get; set; }
        public string CargoNombre { get; set; }
        public string Usuario { get; set; }
        public string Contrasena { get; set; }
        public string ConfContrasena { get; set; }
        public int Especialidad { get; set; }
        public int PersonalID { get; set; }
		public string Codigo { get; set; }
	}
}