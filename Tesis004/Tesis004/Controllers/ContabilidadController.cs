using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class ContabilidadController : Controller
    {
		InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
		ContabilidadBDD contabilidadBDD = new ContabilidadBDD();

		// GET: Contabilidad
		public ActionResult GestionContabilidad()
		{
			return View();
		}

		public ActionResult IngresarIngreso()
		{
			return View();
		}

		[HttpPost]
		public JsonResult GuardarIngreso(IngresoModel ingreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.contabilidadBDD.IngresarIngreso(ingreso));
			return Json(ingresado);
		}

		[HttpPost]
		public JsonResult ListarIngreso(IngresoModel ingresoContabilidad)
		{
			List<IngresoModel> listaIngreso = new List<IngresoModel>();
			listaIngreso = this.contabilidadBDD.ListarIngreso(ingresoContabilidad.FechaIngreso);
			return Json(listaIngreso);
		}
	}
}