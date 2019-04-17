using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tesis004.Controllers
{
    public class IngresoController : Controller
    {
		// GET: Ingreso

		[HttpGet]
		public ActionResult Ingreso()
		{
			return View();
		}

		public ActionResult Presentacion()
		{
			return View();
		}

		public ActionResult Salir()
		{
			return View();
		}

	}
}