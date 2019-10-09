using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class PacienteController : Controller
    {
        InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
        PacienteBDD pacienteBDD = new InformacionBDD.PacienteBDD();
        // GET: Paciente
        public ActionResult IngresarPaciente()
		{
            ViewData["ultimo"] = pacienteBDD.ObtenerUltimoNumeroHC();
            ViewData["generos"] = informacionGeneral.ObtenerInformacionParametro("genero");
            ViewData["estados"] = informacionGeneral.ObtenerInformacionParametro("estado civil");
            ViewData["tipos"] = informacionGeneral.ObtenerInformacionParametro("tipo sangre");
            ViewData["etnias"] = informacionGeneral.ObtenerInformacionParametro("etnia");
            return View();
		}

		public ActionResult BuscarPaciente()
		{
			return View();
		}

        [HttpPost]
		public ActionResult ActualizarPaciente(int idPaciente)
		{
            ViewData["generos"] = informacionGeneral.ObtenerInformacionParametro("genero");
            ViewData["estados"] = informacionGeneral.ObtenerInformacionParametro("estado civil");
            ViewData["tipos"] = informacionGeneral.ObtenerInformacionParametro("tipo sangre");
            ViewData["etnias"] = informacionGeneral.ObtenerInformacionParametro("etnia");
            return View(pacienteBDD.PacientePorId(idPaciente));
		}

        [HttpPost]
        public JsonResult ListarSugerenciaPacienteBusqueda(PacienteModel paciente)
        {
            List<PacienteModel> listaSugenrenciaPaciente = new List<PacienteModel>();
            listaSugenrenciaPaciente = this.pacienteBDD.ListaSugerenciaPacienteBusqueda(paciente.OpcionBusqueda, paciente.ParametroBusqueda);
            return Json(listaSugenrenciaPaciente);
        }

        [HttpPost]
        public JsonResult ListarPacienteBusqueda(PacienteModel paciente)
        {
            List<PacienteModel> listaPaciente = new List<PacienteModel>();
            listaPaciente = this.pacienteBDD.ListaPacienteBusqueda(paciente.OpcionBusqueda, paciente.ParametroBusqueda);
            return Json(listaPaciente);
        }

        [HttpPost]
        public JsonResult GuardarPaciente(PacienteModel paciente)
        {
            List<bool> ingresado = new List<bool>();
            ingresado.Add(this.pacienteBDD.IngresarPaciente(paciente));
            return Json(ingresado);
        }

        [HttpPost]
        public JsonResult ModificarPaciente(PacienteModel paciente)
        {
            List<bool> ingresado = new List<bool>();
            //ingresado.Add(this.pacienteBDD.IngresarPaciente(paciente));
            ingresado.Add(false);
            return Json(ingresado);
        }

    }
}