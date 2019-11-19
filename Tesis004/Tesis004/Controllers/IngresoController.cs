using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class IngresoController : Controller
    {
        PersonalBDD personalBDD = new PersonalBDD();
        // GET: Ingreso

        [HttpGet]
		public ActionResult Ingreso()
		{
            Session["ingreso"] = "false";
            return View();            
        }

        [HttpPost]
        public ActionResult Ingresar(PersonalModel personal)
        {
            PersonalModel personalIngreso = personalBDD.OptenerPersonalPorUsuario(personal.Usuario);
            if (!string.IsNullOrEmpty(personal.Usuario) && !string.IsNullOrEmpty(personal.Contrasena) && personal.Usuario.Equals(personalIngreso.Usuario) && personal.Contrasena.Equals(personalIngreso.Contrasena))
            {
                Session["ingreso"] = "true";
                Session["tipoUsuario"] = personalIngreso.Cargo;
                Session["nombreUsuario"] = personalIngreso.Nombre;
                return RedirectToAction("Presentacion", "Ingreso");
            }
            else
            {
                return RedirectToAction("Ingreso", "Ingreso");
            }
        }

        public ActionResult Presentacion()
		{
			return View();
		}

		public ActionResult Salir()
		{
            Session["ingreso"] = "false";
            Session["tipoUsuario"] = "";
            Session["nombreUsuario"] = "";
            return RedirectToAction("Ingreso", "Ingreso");
		}

	}
}