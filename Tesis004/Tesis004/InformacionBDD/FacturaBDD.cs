using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Tesis004.Models;

namespace Tesis004.InformacionBDD
{
    public class FacturaBDD
	{
        InformacionGeneralBDD informacionGeneral = new InformacionGeneralBDD();
        private ConexionBDD conexion = new ConexionBDD();

        public FacturaBDD()
        {

        }

        public int ConsultarUltimoFacturaId()
        {
            int ultimoFacturaId = 0;
            string numero = "";

            List<ParametroModel> listaParametroResultado = informacionGeneral.ObtenerInformacionParametro("inicioNumFactura");

            numero = listaParametroResultado[0].Valor;

            listaParametroResultado = informacionGeneral.ObtenerInformacionParametro("finNumFactura");

            numero += listaParametroResultado[0].Valor;

            string sentenciaSql = "SELECT FacturaID  " +
                                  "FROM Factura " +
                                  "WHERE FechaFactura IS NULL AND SubTotal IS NULL AND ClienteID IS NULL " +
                                  $"AND Numero LIKE '{numero}' ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            if(tablaDatos.Rows.Count == 0)
            {
                sentenciaSql = "INSERT INTO Factura (Numero) " +
                               "VALUES (@Numero)";

                SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

                sentenciaSQL.Parameters.AddWithValue("@Numero", numero);
                this.conexion.ComandoModificacion(sentenciaSQL);

                sentenciaSql = "SELECT FacturaID  " +
                               "FROM Factura " +
                               "WHERE FechaFactura IS NULL AND SubTotal IS NULL AND ClienteID IS NULL " +
                               $"AND Numero LIKE '{numero}' ";

                tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

                ultimoFacturaId = tablaDatos.Rows[0].Field<int>("FacturaID");
            }
            else
            {
                ultimoFacturaId = tablaDatos.Rows[0].Field<int>("FacturaID");
            }

            return ultimoFacturaId;
        }

        public ClienteModel ConsultarCliente(string cedulaCliente)
        {
            string sentenciaSql = "SELECT TOP(1) ClienteID, NombreCliente, CedulaCliente, TelefonoCliente, DireccionCliente " +
                                  "FROM Cliente " +
                                  $"WHERE CedulaCliente = {cedulaCliente} ";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            ClienteModel resultado = new ClienteModel();

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                resultado.ClienteID = tablaDatos.Rows[0].Field<int>("ClienteID");
                resultado.NombreCliente = tablaDatos.Rows[0].Field<string>("NombreCliente");
                resultado.CedulaCliente = tablaDatos.Rows[0].Field<string>("CedulaCliente");
                resultado.TelefonoCliente = tablaDatos.Rows[0].Field<string>("TelefonoCliente");
                resultado.DireccionCliente = tablaDatos.Rows[0].Field<string>("DireccionCliente");
            }

            return resultado;
        }

        public bool IngresarCliente(ClienteModel cliente)
		{
			bool ingresado = false;
			int resultado = 0;

			string sentenciaSql = "INSERT INTO CLIENTE (NombreCliente,CedulaCliente,TelefonoCliente,DireccionCliente) " +
								  "VALUES (@NombreCliente,@CedulaCliente,@TelefonoCliente,@DireccionCliente)";

			SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

			sentenciaSQL.Parameters.AddWithValue("@NombreCliente", cliente.NombreCliente);
			sentenciaSQL.Parameters.AddWithValue("@CedulaCliente", cliente.CedulaCliente);
			sentenciaSQL.Parameters.AddWithValue("@TelefonoCliente", cliente.TelefonoCliente);
			sentenciaSQL.Parameters.AddWithValue("@DireccionCliente", cliente.DireccionCliente);

			resultado = this.conexion.ComandoModificacion(sentenciaSQL);

			if (resultado > 0)
			{
				ingresado = true;
			}

			return ingresado;
		}

        public bool ActualizarFactura(FacturaModel factura)
        {
            bool ingresado = false;
            int resultado = 0;

            if(factura.ClienteID == 0)
            {
                ClienteModel cliente = new ClienteModel();
                cliente.NombreCliente = factura.NombreCliente;
                cliente.CedulaCliente = factura.CedulaCliente;
                cliente.DireccionCliente = factura.DireccionCliente;
                cliente.TelefonoCliente = factura.TelefonoCliente;

                this.IngresarCliente(cliente);

                cliente = this.ConsultarCliente(factura.CedulaCliente);

                factura.ClienteID = cliente.ClienteID;
            }

            string sentenciaSql = "UPDATE Factura  " +
                                  "SET FechaFactura = @FechaFactura, SubTotal = @SubTotal, Total = @Total, ClienteID = @ClienteID  " +
                                  "WHERE FacturaID = @FacturaID ";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@FechaFactura", factura.FechaEmision.Date);
            sentenciaSQL.Parameters.AddWithValue("@SubTotal", factura.Subtotal);
            sentenciaSQL.Parameters.AddWithValue("@Total", factura.Total);
            sentenciaSQL.Parameters.AddWithValue("@ClienteID", factura.ClienteID);
            sentenciaSQL.Parameters.AddWithValue("@FacturaID", factura.FacturaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {      

                List<ParametroModel> listaParametroResultado = informacionGeneral.ObtenerInformacionParametro("finNumFactura");

                int numeroFacturaEntero = Int32.Parse(listaParametroResultado[0].Valor) + 1;

                sentenciaSql = "UPDATE Parametro  " +
                               "SET Valor = @Valor " +
                               "WHERE ParametroID = @ParametroID ";

                sentenciaSQL = new SqlCommand(sentenciaSql);

                sentenciaSQL.Parameters.AddWithValue("@Valor", numeroFacturaEntero.ToString("D9"));
                sentenciaSQL.Parameters.AddWithValue("@ParametroID", listaParametroResultado[0].Identificador);

                resultado = this.conexion.ComandoModificacion(sentenciaSQL);

                if (resultado > 0)
                {
                    ingresado = true;
                }

            }

            return ingresado;
        }

        /*
		public List<ClienteModel> ListaSugerenciaCliente(string cliente)
		{
			List<ClienteModel> listaSugerenciaResultado = new List<ClienteModel>();

			string sentenciaSql = "";
			DataTable tablaDatos = new DataTable();

			 sentenciaSql = "SELECT NombreCliente " +
						    "FROM Cliente " +
							$"WHERE NombreCliente LIKE '%{cliente}%' " +
							"ORDER BY ClienteID desc ";

					tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

					for (int i = 0; i < tablaDatos.Rows.Count; i++)
					{
						ClienteModel clienteResultado = new ClienteModel();
						clienteResultado.NombreCliente = tablaDatos.Rows[i].Field<string>("NombreCliente");

						listaSugerenciaResultado.Add(clienteResultado);
					}

			return listaSugerenciaResultado;
		}
		*/

        public bool IngresarDetalle(DetalleFacturaModel detalle)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "INSERT INTO DetalleFactura (Cantidad,Concepto,Precio,FacturaID) " +
                                  "VALUES (@Cantidad,@Concepto,@Precio,@FacturaID)";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@Cantidad", detalle.Cantidad);
            sentenciaSQL.Parameters.AddWithValue("@Concepto", detalle.Concepto);
            sentenciaSQL.Parameters.AddWithValue("@Precio", detalle.Precio);
            sentenciaSQL.Parameters.AddWithValue("@FacturaID", detalle.FacturaID);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }

        public List<DetalleFacturaModel> ListarDetalle(int facturaId)
        {
            List<DetalleFacturaModel> listaDetalleResultado = new List<DetalleFacturaModel>();

            string sentenciaSql = "SELECT DetalleFacturaID, Cantidad, Concepto, Precio " +
                                  "FROM DetalleFactura " +
                                  $"WHERE FacturaID = '{facturaId}'";

            DataTable tablaDatos = this.conexion.ComandoConsulta(sentenciaSql);

            for (int i = 0; i < tablaDatos.Rows.Count; i++)
            {
                DetalleFacturaModel detalleResultado = new DetalleFacturaModel();
                detalleResultado.DetalleFacturaID = tablaDatos.Rows[i].Field<int>("DetalleFacturaID");
                detalleResultado.Cantidad = tablaDatos.Rows[i].Field<int>("Cantidad");
                detalleResultado.Concepto = tablaDatos.Rows[i].Field<string>("Concepto");
                detalleResultado.Precio = tablaDatos.Rows[i].Field<decimal>("Precio");

                listaDetalleResultado.Add(detalleResultado);
            }

            return listaDetalleResultado;
        }

        public bool EliminarDetalle(int detalleFacturaId)
        {
            bool ingresado = false;
            int resultado = 0;

            string sentenciaSql = "DELETE FROM DetalleFactura " +
                                  "WHERE DetalleFacturaID = @DetalleFacturaID";

            SqlCommand sentenciaSQL = new SqlCommand(sentenciaSql);

            sentenciaSQL.Parameters.AddWithValue("@DetalleFacturaID", detalleFacturaId);

            resultado = this.conexion.ComandoModificacion(sentenciaSQL);

            if (resultado > 0)
            {
                ingresado = true;
            }

            return ingresado;
        }
    }
}