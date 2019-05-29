using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class PersonalController : Controller
    {
        InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
        PersonalBDD personalBDD = new PersonalBDD();

        // GET: Personal
        public ActionResult GestionPersonal()
        {
            ViewData["cargos"] = informacionGeneral.ObtenerInformacionParametro("cargo");
            return View();
        }

        [HttpPost]
        public JsonResult IngresarPersonal(PersonalModel personal)
        {
            List<bool> ingresado = new List<bool>();
            ingresado.Add(this.personalBDD.IngresarPersonal(personal));
            return Json(ingresado);
        }

        [HttpPost]
        public JsonResult ListarPersonal()
        {
            List<PersonalModel> listaPersonal = new List<PersonalModel>();
            listaPersonal = this.personalBDD.ListaPersonal();
            return Json(listaPersonal);
        }

        public ActionResult ModificarPersonal()
		{
			return View();
		}

		public ActionResult GestionServiciosMedicos()
		{
			return View();
		}

		public ActionResult ModificarServicioMedicos()
		{
			return View();
		}
	}
}