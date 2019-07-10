using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;

namespace Tesis004.Controllers
{
    public class ServicioController : Controller
    {
        InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
        // GET: Servicio
        public ActionResult IngresarServicio()
		{
            ViewData["especialidades"] = informacionGeneral.ObtenerInformacionParametro("especialidad");
            ViewData["citas"] = informacionGeneral.ObtenerInformacionParametro("tipo cita");
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