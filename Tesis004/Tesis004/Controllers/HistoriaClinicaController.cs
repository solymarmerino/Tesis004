using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class HistoriaClinicaController : Controller
    {
        InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
        PacienteBDD pacienteBDD = new PacienteBDD();
        HistoriaClinicaBDD historiaClinicaBDD = new HistoriaClinicaBDD();

        // GET: HistoriaClinica
        //public ActionResult HistoriaClinica(int idPaciente)
        //public ActionResult HistoriaClinica()
        public ActionResult HistoriaClinica(CitaModel cita)
		{
            ConsultaMedicaModel consultaMedica = new ConsultaMedicaModel();
            
            if (historiaClinicaBDD.ValidarConsultaMedica(cita.CitaMedicaID))
            {
                consultaMedica = historiaClinicaBDD.ConsultarConsultaMedica(cita.CitaMedicaID);
            }
            else
            {
                consultaMedica.ConsultaMedicaID = cita.CitaMedicaID;
                consultaMedica.HistoriaClinicaID = cita.HistoriaClinica;
                historiaClinicaBDD.InsertarConsultaMedica(consultaMedica);
            }

            ViewData["consulta"] = consultaMedica;
            ViewData["generos"] = informacionGeneral.ObtenerInformacionParametro("genero");
            ViewData["estados"] = informacionGeneral.ObtenerInformacionParametro("estado civil");
            ViewData["tipos"] = informacionGeneral.ObtenerInformacionParametro("tipo sangre");
            ViewData["etnias"] = informacionGeneral.ObtenerInformacionParametro("etnia");
            ViewData["subjetivos"] = informacionGeneral.ObtenerInformacionParametro("subjetivo");
            ViewData["objetivos"] = informacionGeneral.ObtenerInformacionParametro("objetivo");
            ViewData["paciente"] = pacienteBDD.PacientePorId(cita.PacienteID);
            return View();
		}

        [HttpPost]
        public JsonResult ActualizarDatosConsulta(ConsultaMedicaModel consultaMedica)
        {
            List<bool> ingresado = new List<bool>();
            ingresado.Add(this.historiaClinicaBDD.ActualizarConsultaMedica(consultaMedica));
            return Json(ingresado);
        }

        [HttpPost]
        public JsonResult IngresarSubjetivo(SubjetivoModel subjetivo)
        {
            List<bool> ingresado = new List<bool>();
            ingresado.Add(this.historiaClinicaBDD.InsertarSubjetivo(subjetivo));
            return Json(ingresado);
        }

        [HttpPost]
        public JsonResult ConsultarSubjetivo(int consultaMedicaID)
        {
            List<SubjetivoModel> resultado = new List<SubjetivoModel>();
            resultado = this.historiaClinicaBDD.ListarSubjetivo(consultaMedicaID);
            return Json(resultado);
        }
    }
}