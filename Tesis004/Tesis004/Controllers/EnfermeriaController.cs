using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class EnfermeriaController : Controller
    {
        PacienteBDD pacienteBDD = new PacienteBDD();
        SignosVitalesBDD signosVitalesBDD = new SignosVitalesBDD();
        // GET: Enfermeria
        public ActionResult GestionEnfermeria(int idPaciente)
		{
            ViewData["paciente"] = pacienteBDD.PacientePorId(idPaciente);
            return View();
		}

        [HttpPost]
        public JsonResult GuardarSignosVitales(SignosVitalesModel signosVitales)
        {
            List<bool> resultado = new List<bool>();
            resultado.Add(signosVitalesBDD.IngresarSignosVitales(signosVitales));
            //resultado.Add(false);
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult ConsultarUltimoSignosVitales(int numeroHistoriaClinica)
        {
            SignosVitalesModel signosVitalesResultado = new SignosVitalesModel();
            signosVitalesResultado = signosVitalesBDD.UltimoSignosVitales(numeroHistoriaClinica);
            return Json(signosVitalesResultado);
        }

        [HttpPost]
        public JsonResult ListarSignosVitales(int numeroHistoriaClinica)
        {
            List<bool> resultado = new List<bool>();
            //resultado.Add(signosVitalesBDD.IngresarSignosVitales(signosVitales));
            //resultado.Add(false);
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