﻿using System;
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
            if(TempData["mensaje"] != null)
            {
                ViewBag.Mensaje = TempData["mensaje"].ToString();
            }            
            return View();            
        }

        [HttpPost]
        public ActionResult Ingresar(PersonalModel personal)
        {
            PersonalModel personalIngreso = personalBDD.OptenerPersonalPorUsuario(personal.Usuario);
            if (!string.IsNullOrEmpty(personal.Usuario) && !string.IsNullOrEmpty(personal.Contrasena) && personal.Usuario.Equals(personalIngreso.Usuario) && personal.Contrasena.Equals(personalIngreso.Contrasena))
            {
                Session["ingreso"] = "true";
                Session["tipoUsuario"] = personalIngreso.Cargo.ToString();
                Session["nombreUsuario"] = personalIngreso.Nombre;
                Session["personalID"] = personalIngreso.PersonalID.ToString();
                return RedirectToAction("Presentacion", "Ingreso");
            }
            else
            {
                TempData["mensaje"] = "Usuario o contraseña incorrecto";
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
            Session["personalID"] = "";
            return RedirectToAction("Ingreso", "Ingreso");
		}

        public ActionResult SinAcceso()
        {
            return View();
        }

    }
}