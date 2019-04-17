using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tesis004.Controllers
{
    public class ServicioController : Controller
    {
		// GET: Servicio
		public ActionResult IngresarServicio()
		{
			return View();
		}

		public ActionResult ListarCita()
		{
			return View();
		}

		public ActionResult ListarLaboratorio()
		{
			return View();
		}

		public ActionResult ModificarLaboratorio()
		{
			return View();
		}

		public ActionResult MostrarResultadoExamenMedico()
		{
			return View();
		}
	}
}