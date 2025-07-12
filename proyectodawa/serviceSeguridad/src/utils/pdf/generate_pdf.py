from flask import Flask, send_file, make_response
from fpdf import FPDF
import io
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
import numpy as np
import os
from datetime import datetime

app = Flask(__name__)

# Clase PDF personalizada para la factura
class InvoicePDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        # añadir un logo 
        # self.image('logo.png', 10, 8, 33)
        self.cell(0, 10, 'FACTURA', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Página {self.page_no()}', 0, 0, 'C')

    def customer_details(self, invoice_data):
        self.set_font('Arial', 'B', 11)
        self.cell(0, 7, 'Detalles del Cliente:', 0, 1)
        self.set_font('Arial', '', 11)
        self.cell(0, 7, f"Cliente: {invoice_data.get('client_name', 'N/A')}", 0, 1)
        if invoice_data.get('patient_name'):
             self.cell(0, 7, f"Paciente: {invoice_data.get('patient_name')}", 0, 1)
        self.ln(5)

    def invoice_details(self, invoice_data):
        self.set_font('Arial', 'B', 11)
        self.cell(0, 7, 'Detalles de la Factura:', 0, 1)
        self.set_font('Arial', '', 11)
        self.cell(0, 7, f"Número de Factura: {invoice_data.get('inv_number', 'N/A')}", 0, 1)
        # Formatear la fecha para que sea más legible
        invoice_date = datetime.fromisoformat(invoice_data.get('inv_date')).strftime('%d/%m/%Y')
        self.cell(0, 7, f"Fecha: {invoice_date}", 0, 1)
        self.ln(10)

    def items_table(self, invoice_data):
        self.set_font('Arial', 'B', 11)
        # Encabezados de la tabla
        self.cell(100, 8, 'Descripción', 1, 0, 'C')
        self.cell(30, 8, 'Cantidad', 1, 0, 'C')
        self.cell(30, 8, 'P. Unitario', 1, 0, 'C')
        self.cell(30, 8, 'Total', 1, 1, 'C')
        
        self.set_font('Arial', '', 11)
        # Filas de la tabla
        for item in invoice_data.get('details', []):
            self.cell(100, 8, item.get('pro_name', ''), 1)
            self.cell(30, 8, str(item.get('ind_quantity', '')), 1, 0, 'C')
            self.cell(30, 8, f"${item.get('ind_unit_price', 0.0):.2f}", 1, 0, 'R')
            self.cell(30, 8, f"${item.get('ind_total', 0.0):.2f}", 1, 1, 'R')
        self.ln(5)

    def totals_section(self, invoice_data):
        self.set_font('Arial', 'B', 11)
        # Mover a la derecha para alinear los totales
        self.set_x(110)
        self.cell(50, 8, 'Subtotal:', 0, 0, 'R')
        self.cell(40, 8, f"${invoice_data.get('inv_subtotal', 0.0):.2f}", 0, 1, 'R')
        
        self.set_x(110)
        self.cell(50, 8, 'Descuento:', 0, 0, 'R')
        self.cell(40, 8, f"-${invoice_data.get('inv_discount', 0.0):.2f}", 0, 1, 'R')
        
        self.set_x(110)
        self.cell(50, 8, 'Impuesto:', 0, 0, 'R')
        self.cell(40, 8, f"${invoice_data.get('inv_tax', 0.0):.2f}", 0, 1, 'R')

        self.set_font('Arial', 'B', 12)
        self.set_x(110)
        self.cell(50, 8, 'TOTAL A PAGAR:', 1, 0, 'R')
        self.cell(40, 8, f"${invoice_data.get('inv_grand_total', 0.0):.2f}", 1, 1, 'R')


# Función principal para generar el PDF
def generate_invoice_pdf(invoice_data):
    pdf = InvoicePDF()
    pdf.add_page()
    
    # Añadir secciones al PDF
    pdf.customer_details(invoice_data)
    pdf.invoice_details(invoice_data)
    pdf.items_table(invoice_data)
    pdf.totals_section(invoice_data)
    
    # Generar el PDF en memoria
    pdf_output = pdf.output(dest='S').encode('latin1')
    pdf_buffer = io.BytesIO(pdf_output)
    pdf_buffer.seek(0)
    
    return pdf_buffer