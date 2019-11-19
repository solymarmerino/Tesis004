using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class InventarioController : Controller
    {
		InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
		InventarioBDD inventarioBDD = new InventarioBDD();

		// GET: Inventario
		public ActionResult GestionInventario()
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

		[HttpPost]
		public JsonResult GuardarProducto(InventarioModel producto)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.inventarioBDD.IngresarProducto(producto));
			return Json(ingresado);
		}

	}
}