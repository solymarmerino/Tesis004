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

		public ActionResult GuardarIngreso()
		{
			return View();
		}

		//INGRESOS

		[HttpPost]
		public JsonResult GuardarIngreso(IngresoModel ingreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.contabilidadBDD.IngresarIngreso(ingreso));
			return Json(ingresado);
		}

		[HttpPost]
		public JsonResult ListarIngreso(IngresoModel listaIngreso) 
		{
			List<IngresoModel> ingresoResultado = new List<IngresoModel>();
			ingresoResultado = this.contabilidadBDD.ListarIngreso(listaIngreso.FechaIngreso);
			return Json(ingresoResultado);
		}

		////EGRESOS

		[HttpPost]
		public JsonResult GuardarEgreso(EgresoModel egreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.contabilidadBDD.IngresarEgreso(egreso));
			return Json(ingresado);
		}
	}
}