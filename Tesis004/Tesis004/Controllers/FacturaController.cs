using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tesis004.InformacionBDD;
using Tesis004.Models;

namespace Tesis004.Controllers
{
    public class FacturaController : Controller
    {
		InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
		FacturaBDD facturaBDD = new FacturaBDD();

		// GET: Facturacion
		public ActionResult IngresoFactura()
        {
            return View();
        }

		[HttpPost]
		public JsonResult GuardarCliente(ClienteModel ingreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.facturaBDD.IngresarCliente(ingreso));
			return Json(ingresado);
		}
		/*
		[HttpPost]
		public JsonResult ListarSugerenciaCliente(ClienteModel cliente)
		{
			List<ClienteModel> listaSugenrenciaPaciente = new List<ClienteModel>();
			listaSugenrenciaPaciente = this.facturaBDD.ListaSugerenciaCliente(cliente.NombreCliente);
			return Json(listaSugenrenciaPaciente);
		}
		*/

		[HttpPost]
		public JsonResult ObtenerIdCliente(ClienteModel cliente)
		{
			ClienteModel ingresoResultado = new ClienteModel();
			ingresoResultado = this.facturaBDD.ConsultarIdCliente(cliente.CedulaCliente);
			return Json(ingresoResultado);
		}
	}
}