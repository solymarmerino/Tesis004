using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tesis004.Controllers
{
    public class PacienteController : Controller
    {
		// GET: Paciente
		public ActionResult IngresarPaciente()
		{
			return View();
		}

		public ActionResult BuscarPaciente()
		{
			return View();
		}

		public ActionResult ActualizarPaciente()
		{
			return View();
		}
	}
}