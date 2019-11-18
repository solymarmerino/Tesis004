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
    public class InventarioModel
	{
        public int ProductoID { get; set; }
        public string Producto { get; set; }
        public string TipoProducto { get; set; }
        public int CantidadProducto { get; set; }
        public string LoteProducto { get; set; }
        public DateTime FechaVencimientoProducto { get; set; }
	}
}