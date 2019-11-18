﻿using System;
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
            return View();
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