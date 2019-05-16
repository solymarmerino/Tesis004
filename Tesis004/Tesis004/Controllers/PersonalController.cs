using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tesis004.Controllers
{
    public class PersonalController : Controller
    {
        // GET: Personal
        public ActionResult GestionPersonal()
        {
            return View();
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