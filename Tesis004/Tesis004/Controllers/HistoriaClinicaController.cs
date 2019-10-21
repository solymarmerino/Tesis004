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
        InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
        PacienteBDD pacienteBDD = new InformacionBDD.PacienteBDD();

        // GET: HistoriaClinica
        public ActionResult HistoriaClinica(int idPaciente)
        //public ActionResult HistoriaClinica()
		{
            ViewData["generos"] = informacionGeneral.ObtenerInformacionParametro("genero");
            ViewData["estados"] = informacionGeneral.ObtenerInformacionParametro("estado civil");
            ViewData["tipos"] = informacionGeneral.ObtenerInformacionParametro("tipo sangre");
            ViewData["etnias"] = informacionGeneral.ObtenerInformacionParametro("etnia");
            ViewData["paciente"] = pacienteBDD.PacientePorId(idPaciente);
            return View();
		}

		// GET: HistoricoSignosVitales
		public ActionResult HistoricoSignosVitales()
		{
			return View();
		}
	}
}