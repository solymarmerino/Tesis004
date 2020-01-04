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
            if (Session["ingreso"] != null)
            {
                if (Session["ingreso"].Equals("true"))
                {
                    if (Session["tipoUsuario"].Equals("17") || Session["tipoUsuario"].Equals("18"))
                    {
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

		[HttpPost]
		public JsonResult EliminarIngreso(int ingresoID)
		{
			List<bool> resultado = new List<bool>();
			resultado.Add(contabilidadBDD.EliminarIngreso(ingresoID));
			return Json(resultado);
		}

		[HttpPost]
		public JsonResult ObtenerIngreso(IngresoModel ingreso)
		{
            IngresoModel ingresoResultado = new IngresoModel();
			ingresoResultado = this.contabilidadBDD.ObtenerIngreso(ingreso.IngresoID);
			return Json(ingresoResultado);
		}

		[HttpPost]
		public JsonResult ModificarIngreso(IngresoModel ingreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.contabilidadBDD.ModificarIngreso(ingreso));
			ingresado.Add(false);
			return Json(ingresado);
		}

		////EGRESOS

		[HttpPost]
		public JsonResult GuardarEgreso(EgresoModel egreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.contabilidadBDD.IngresarEgreso(egreso));
			return Json(ingresado);
		}

		[HttpPost]
		public JsonResult ListarEgreso(EgresoModel listaEgreso)
		{
			List<EgresoModel> ingresoResultado = new List<EgresoModel>();
			ingresoResultado = this.contabilidadBDD.ListarEgreso(listaEgreso.FechaEgreso);
			return Json(ingresoResultado);
		}

		[HttpPost]
		public JsonResult EliminarEgreso(int egresoID)
		{
			List<bool> resultado = new List<bool>();
			resultado.Add(contabilidadBDD.EliminarEgreso(egresoID));
			return Json(resultado);
		}

		[HttpPost]
		public JsonResult ObtenerEgreso(EgresoModel egreso)
		{
			EgresoModel egresoResultado = new EgresoModel();
			egresoResultado = this.contabilidadBDD.ObtenerEgreso(egreso.EgresoID);
			return Json(egresoResultado);
		}

		[HttpPost]
		public JsonResult ModificarEgreso(EgresoModel egreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.contabilidadBDD.ModificarEgreso(egreso));
			ingresado.Add(false);
			return Json(ingresado);
		}

		///INFORME I/E

		[HttpPost]
		public JsonResult InformeIngreso(DateTime fechaInicio,DateTime fechaFin)
		{
			List<IngresoModel> ingresoResultado = new List<IngresoModel>();
			ingresoResultado = this.contabilidadBDD.InformeIngreso(fechaInicio,fechaFin);
			return Json(ingresoResultado);
		}

		[HttpPost]
		public JsonResult InformeEgreso(DateTime fechaInicio,DateTime fechaFin)
		{
			List<EgresoModel> ingresoResultado = new List<EgresoModel>();
			ingresoResultado = this.contabilidadBDD.InformeEgreso(fechaInicio, fechaFin);
			return Json(ingresoResultado);
		}
	}
}