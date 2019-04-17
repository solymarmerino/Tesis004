using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tesis004.Controllers
{
    public class EnfermeriaController : Controller
    {
		// GET: Enfermeria
		public ActionResult IngresarSignosVitales()
		{
			return View();
		}

		public ActionResult IngresarVacunas()
		{
			return View();
		}
	}
}