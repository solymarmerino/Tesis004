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
            Session["login"] = "false";
            return View();            
        }

        [HttpPost]
        public ActionResult Ingresar(PersonalModel personal)
        {
            PersonalModel personalIngreso = personalBDD.OptenerPersonalPorUsuario(personal.Usuario);
            if (personal.Usuario.Equals(personalIngreso.Usuario) && personal.Contrasena.Equals(personalIngreso.Contrasena))
            {
                Session["login"] = "true";
                Session["typeUser"] = personalIngreso.Cargo;
                return RedirectToAction("Presentacion", "Ingreso");
            }
            else
            {
                return View();
            }
        }

        public ActionResult Presentacion()
		{
			return View();
		}

		public ActionResult Salir()
		{
            Session["login"] = "false";
            Session["typeUser"] = "";
            return RedirectToAction("Ingreso", "Ingreso");
		}

	}
}