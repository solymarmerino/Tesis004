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
            if (Session["ingreso"] != null)
            {
                if (Session["ingreso"].Equals("true"))
                {
                    if (Session["tipoUsuario"].Equals("20"))
                    {
                        ViewData["paciente"] = pacienteBDD.PacientePorId(idPaciente);
                        return View();
                    }
                    else
                    {
                        return RedirectToAction("SinAcceso", "Ingreso");
                    }
                }
                else
                {
                    return RedirectToAction("Ingreso", "Ingreso");
                }
            }
            else
            {
                return RedirectToAction("Ingreso", "Ingreso");
            }
        }

        [HttpPost]
        public JsonResult GuardarSignosVitales(SignosVitalesModel signosVitales)
        {
            if (string.IsNullOrEmpty(signosVitales.Observacion))
            {
                signosVitales.Observacion = "";
            }
            List<bool> resultado = new List<bool>();
            resultado.Add(signosVitalesBDD.IngresarSignosVitales(signosVitales));
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
        public JsonResult SignosVitalesPorCitaMedica(int citaMedicaID)
        {
            SignosVitalesModel signosVitalesResultado = new SignosVitalesModel();
            signosVitalesResultado = signosVitalesBDD.SignosVitalesPorCitaMedica(citaMedicaID);
            return Json(signosVitalesResultado);
        }

        [HttpPost]
        public JsonResult ListarSignosVitales(int numeroHistoriaClinica)
        {
            List<SignosVitalesModel> resultado = new List<SignosVitalesModel>();
            resultado = signosVitalesBDD.ListarSignosVitales(numeroHistoriaClinica);
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult ListarPediatria(int numeroHistoriaClinica)
        {
            List<SignosVitalesModel> resultado = new List<SignosVitalesModel>();
            resultado = signosVitalesBDD.ListarPediatria(numeroHistoriaClinica);
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