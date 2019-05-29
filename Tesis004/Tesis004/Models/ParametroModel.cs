using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tesis004.Models
{
    /**********
    * Objeto utilziado para guardar los datos de los parametros
    * Base: DBVACARI
    * Tabla: Perametro
    * Campos: ParametroID, Tipo, Valor
    **********/
    public class ParametroModel
    {
        //Identificador del parametro
        public int Identificador { get; set; }

        //Tipo del parametro
        public string Tipo { get; set; }

        //Valor del parametro
        public string Valor { get; set; }
    }
}