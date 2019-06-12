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

        [HttpPost]
        public JsonResult ModificarPersonal(int idPersonal)
        {
            PersonalModel personal = new PersonalModel();
            personal = this.personalBDD.OptenerPersonal(idPersonal);
            return Json(personal);
        }

        [HttpPost]
        public JsonResult GuardarPersonalModificado(PersonalModel personal)
        {
            List<bool> modificado = new List<bool>();
            PersonalModel personalOriginal = this.personalBDD.OptenerPersonal(personal.PersonalID);
            return Json(modificado);
        }

        [HttpPost]
        public JsonResult ListarPersonalServico(PersonalServicioModel personalServico)
        {
            List<PersonalServicioModel> listaPersonalServicio = new List<PersonalServicioModel>();
            listaPersonalServicio = this.personalBDD.ListaPersonalServicio(personalServico.PersonalID);
            return Json(listaPersonalServicio);
        }

        

        [HttpPost]
        public JsonResult AnadirServicio(PersonalServicioModel personalServicio)
        {
            List<bool> anadido = new List<bool>();
            anadido.Add(this.personalBDD.AnadirServicio(personalServicio));
            return Json(anadido);
        }

        [HttpPost]
        public JsonResult ObtenerServicio(PersonalServicioModel personalServico)
        {
            PersonalServicioModel servicioResultado = new PersonalServicioModel();
            servicioResultado = this.personalBDD.ObtenerServicio(personalServico.ServicioID);
            return Json(servicioResultado);
        }

        [HttpPost]
        public JsonResult ModificarServicio(PersonalServicioModel personalServicio)
        {
            List<bool> modificado = new List<bool>();
            modificado.Add(this.personalBDD.ModificarServicio(personalServicio));
            return Json(modificado);
        }

        [HttpPost]
        public JsonResult EliminarServicio(PersonalServicioModel personalServicio)
        {
            List<bool> eliminado = new List<bool>();
            eliminado.Add(this.personalBDD.EliminarServicio(personalServicio));
            return Json(eliminado);
        }

        /*[HttpPost]
        public JsonResult GuardarPersonalServicio(PersonalServicioModel personalServicio)
        {
            List<bool> modificado = new List<bool>();
            PersonalModel personalOriginal = this.personalBDD.OptenerPersonal(personalServicio.PersonalID);
            return Json(modificado);
        }*/

        /*public ActionResult ModificarPersonal()
		{
			return View();
		}*/


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