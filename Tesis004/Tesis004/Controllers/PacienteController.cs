﻿using System;
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

    }
}