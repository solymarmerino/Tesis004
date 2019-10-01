using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;

namespace Tesis004.Controllers
{
    public class HistoriaClinicaController : Controller
    {
        PacienteBDD pacienteBDD = new InformacionBDD.PacienteBDD();
        // GET: HistoriaClinica
        //public ActionResult HistoriaClinica(string idPaciente)
        public ActionResult HistoriaClinica()
		{
            //ViewData["paciente"] = pacienteBDD.PacientePorId(idPaciente);
            return View();
		}


	}
}