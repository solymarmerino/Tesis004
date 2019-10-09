using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class ServicioController : Controller
    {
        InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
        PacienteBDD pacienteBDD = new PacienteBDD();
        ServicioBDD servicioBDD = new ServicioBDD();
        // GET: Servicio
        [HttpPost]
        public ActionResult IngresarServicio(int idPaciente)
		{
            ViewData["especialidades"] = informacionGeneral.ObtenerInformacionParametro("especialidad");
            ViewData["citas"] = informacionGeneral.ObtenerInformacionParametro("tipo cita");
            ViewData["paciente"] = pacienteBDD.PacientePorId(idPaciente);
            return View();
		}

        [HttpPost]
        public JsonResult GuardarCita(CitaModel cita)
        {
            List<bool> resultado = new List<bool>();
            resultado.Add(servicioBDD.IngresarCita(cita));
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult EliminarCita(int citaMedicaID)
        {
            List<bool> resultado = new List<bool>();
            resultado.Add(servicioBDD.EliminarCita(citaMedicaID));
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult ListarCitaPaciente(int pacienteID)
        {
            List<CitaModel> resultado = new List<CitaModel>();
            resultado = servicioBDD.ListarCitaPorPaciente(pacienteID);
            return Json(resultado);
        }

        public ActionResult ListarCita()
		{
			return View();
		}

        [HttpPost]
        public JsonResult ListarCitaPorDia()
        {
            List<CitaModel> resultado = new List<CitaModel>();
            resultado = servicioBDD.ListarCita();
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult PagarCita(int citaMedicaID)
        {
            List<bool> resultado = new List<bool>();
            resultado.Add(servicioBDD.PagarCita(citaMedicaID));
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult AtencionEnfermeriaCita(int pacienteID)
        {
            List<bool> resultado = new List<bool>();
            resultado.Add(servicioBDD.AtencionEnfermeriaCita(pacienteID));
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult ListarCitaMedico()
        {
            return Json("");
        }

        [HttpPost]
        public JsonResult ListarCitaEnfermera()
        {
            return Json("");
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