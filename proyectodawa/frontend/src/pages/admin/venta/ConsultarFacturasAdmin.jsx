// src/pages/admin/venta/ConsultarFacturasAdmin.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import {
  getInvoices,
  voidInvoice,
  sendInvoiceByEmail,
} from "../../../api/ventasApi";
import FacturasTable from "../../../components/ventas/FacturasTable";
import FacturaDetallesModal from "../../../components/ventas/FacturaDetallesModal";
import RegistrarPagoModal from "../../../components/ventas/RegistrarPagoModal";
import FacturaDeleteDialog from "../../../components/ventas/FacturaDeleteDialog";
import FacturaEmailDialog from "../../../components/ventas/FacturaEmailDialog";

const ConsultarFacturasAdmin = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [invoiceToPay, setInvoiceToPay] = useState(null);

  const [isVoidModalOpen, setVoidModalOpen] = useState(false);
  const [invoiceToVoid, setInvoiceToVoid] = useState(null);
  const [voiding, setVoiding] = useState(false);

  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [invoiceToSend, setInvoiceToSend] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const rawInvoices = await getInvoices();
      const processedInvoices = rawInvoices.map((invoice) => {
        const totalPaid = Number(invoice.total_paid || 0);
        const grandTotal = Number(invoice.inv_grand_total || 0);
        const status = totalPaid >= grandTotal ? "Pagada" : "Pendiente de Pago";
        return { ...invoice, inv_status: status };
      });
      setFacturas(processedInvoices);
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al cargar facturas.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleViewDetails = (factura) => {
    setSelectedInvoice(factura);
    setDetailsModalOpen(true);
  };

  const handleOpenPaymentModal = (factura) => {
    setInvoiceToPay(factura);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setInvoiceToPay(null);
    setPaymentModalOpen(false);
  };

  const handlePaymentSuccess = (paidAmount) => {
    setFacturas((currentFacturas) =>
      currentFacturas.map((factura) => {
        if (factura.inv_id === invoiceToPay.inv_id) {
          const newTotalPaid =
            Number(factura.total_paid || 0) + Number(paidAmount);
          const grandTotal = Number(factura.inv_grand_total);
          return {
            ...factura,
            total_paid: newTotalPaid,
            inv_status:
              newTotalPaid >= grandTotal ? "Pagada" : "Pendiente de Pago",
          };
        }
        return factura;
      })
    );
    handleClosePaymentModal();
    setNotification({
      open: true,
      message: "¡Pago registrado exitosamente!",
      severity: "success",
    });
  };

  const handleOpenVoidModal = (factura) => {
    setInvoiceToVoid(factura);
    setVoidModalOpen(true);
  };

  const handleCloseVoidModal = () => {
    setInvoiceToVoid(null);
    setVoidModalOpen(false);
  };

  const handleConfirmVoid = async () => {
    setVoiding(true);
    try {
      await voidInvoice(invoiceToVoid.inv_id);
      setFacturas((currentFacturas) =>
        currentFacturas.map((f) =>
          f.inv_id === invoiceToVoid.inv_id ? { ...f, inv_state: false } : f
        )
      );
      setNotification({
        open: true,
        message: "Factura anulada correctamente.",
        severity: "success",
      });
      handleCloseVoidModal();
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al anular la factura.",
        severity: "error",
      });
    } finally {
      setVoiding(false);
    }
  };

  const handleOpenEmailModal = (factura) => {
    setInvoiceToSend(factura);
    setEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setInvoiceToSend(null);
    setEmailModalOpen(false);
  };

  const handleConfirmSendEmail = async () => {
    if (!invoiceToSend) return;
    setIsSendingEmail(true);
    try {
      await sendInvoiceByEmail(invoiceToSend.inv_id);
      setNotification({
        open: true,
        message: `Factura ${invoiceToSend.inv_number} enviada por correo.`,
        severity: "success",
      });
      handleCloseEmailModal();
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error al enviar el correo.",
        severity: "error",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Consulta de Facturas
      </Typography>
      <FacturasTable
        facturas={facturas}
        loading={loading}
        onVer={handleViewDetails}
        onPagar={handleOpenPaymentModal}
        onAnular={handleOpenVoidModal}
        onEnviar={handleOpenEmailModal}
      />

      <FacturaDetallesModal
        open={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        invoice={selectedInvoice}
      />

      <RegistrarPagoModal
        open={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        invoice={invoiceToPay}
        onSuccess={handlePaymentSuccess}
      />

      <FacturaDeleteDialog
        open={isVoidModalOpen}
        onClose={handleCloseVoidModal}
        onConfirm={handleConfirmVoid}
        invoiceNumber={invoiceToVoid?.inv_number}
        loading={voiding}
      />

      <FacturaEmailDialog
        open={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        onConfirm={handleConfirmSendEmail}
        invoiceNumber={invoiceToSend?.inv_number}
        loading={isSendingEmail}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConsultarFacturasAdmin;
