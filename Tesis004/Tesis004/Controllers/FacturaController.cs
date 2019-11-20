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
            if (Session["ingreso"] != null)
            {
                if (Session["ingreso"].Equals("true"))
                {
                    if (Session["tipoUsuario"].Equals("17") || Session["tipoUsuario"].Equals("18"))
                    {
                        ViewData["inicioNumFactura"] = informacionGeneral.ObtenerInformacionParametro("inicioNumFactura");
                        ViewData["finNumFactura"] = informacionGeneral.ObtenerInformacionParametro("finNumFactura");
                        ViewData["facturaId"] = facturaBDD.ConsultarUltimoFacturaId();
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
		public JsonResult GuardarCliente(ClienteModel ingreso)
		{
			List<bool> ingresado = new List<bool>();
			ingresado.Add(this.facturaBDD.IngresarCliente(ingreso));
			return Json(ingresado);
		}

        [HttpPost]
        public JsonResult ActualizarFactura(FacturaModel factura)
        {
            List<bool> ingresado = new List<bool>();
            ingresado.Add(this.facturaBDD.ActualizarFactura(factura));
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
		public JsonResult ObtenerCliente(string cedula)
		{
			ClienteModel resultado = new ClienteModel();
            resultado = this.facturaBDD.ConsultarCliente(cedula);
			return Json(resultado);
		}

        [HttpPost]
        public JsonResult GuardarDetalle(DetalleFacturaModel ingreso)
        {
            List<bool> ingresado = new List<bool>();
            ingresado.Add(this.facturaBDD.IngresarDetalle(ingreso));
            return Json(ingresado);
        }

        [HttpPost]
        public JsonResult ListarDetalle(int facturaId)
        {
            List<DetalleFacturaModel> resultado = new List<DetalleFacturaModel>();
            resultado = this.facturaBDD.ListarDetalle(facturaId);
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult EliminarDetalle(int detalleFacturaId)
        {
            List<bool> resultado = new List<bool>();
            resultado.Add(facturaBDD.EliminarDetalle(detalleFacturaId));
            return Json(resultado);
        }
    }
}