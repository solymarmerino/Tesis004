using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tesis004.Controllers
{
    public class FacturacionController : Controller
    {
        // GET: Facturacion
        public ActionResult IngresoFactura()
        {
            return View();
        }
    }
}