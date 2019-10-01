using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;

namespace Tesis004.Controllers
{
    public class EnfermeriaController : Controller
    {
        PacienteBDD pacienteBDD = new PacienteBDD();
        // GET: Enfermeria
        public ActionResult GestionEnfermeria(string idPaciente)
		{
            ViewData["paciente"] = pacienteBDD.PacientePorId(idPaciente);
            return View();
		}

        [HttpPost]
        public JsonResult GuardarSignosVitales()
        {
            List<bool> resultado = new List<bool>();
            //resultado.Add(servicioBDD.IngresarCita(cita));
            return Json(resultado);
        }

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