from datetime import datetime
from typing import Optional, List
from decimal import Decimal
from marshmallow import Schema, fields


class LoginRequest(Schema):
    login_user = fields.String(required=True)
    login_password = fields.String(required=True)

class PersonGenreReq(Schema):
    person_genre_name = fields.String(required=True)

#==================================================================
# PERSON TABLE
#==================================================================
class PersonReq(Schema):
    per_identification = fields.String(required=True)
    per_names = fields.String(required=True)
    per_surnames = fields.String(required=True)
    per_genre_id = fields.Integer(required=True)
    per_marital_status_id = fields.Integer(required=True)
    per_country = fields.String(required=True)
    per_city = fields.String(required=True)
    per_address = fields.String(required=True)
    per_phone = fields.String(required=True)
    per_mail = fields.String(required=True)
    per_birth_date = fields.String(required=True)
class PersonIdReq(Schema):
    per_id = fields.Integer(required=True)
    per_identification = fields.String(required=True)
    per_names = fields.String(required=True)
    per_surnames = fields.String(required=True)
    per_genre_id = fields.Integer(required=True)
    per_marital_status_id = fields.Integer(required=True)
    per_country = fields.String(required=True)
    per_city = fields.String(required=True)
    per_address = fields.String(required=True)
    per_phone = fields.String(required=True)
    per_mail = fields.String(required=True)
    per_birth_date = fields.String(required=True)
class PersonDeleteReq(Schema):
    per_id = fields.Integer(required=True)
    per_state = fields.Boolean(required=True)
    
#==================================================================
# ROL TABLE
#==================================================================
class RolReq(Schema):
    rol_name = fields.String(required=True)
    rol_description = fields.String(required=True)
    is_admin_rol = fields.Boolean(required=True)
class RolIdReq(Schema):
    rol_id = fields.Integer(required=True)
    rol_name = fields.String(required=True)
    rol_description = fields.String(required=True)
    is_admin_rol = fields.Boolean(required=True)
class RolDeleteReq(Schema):
    rol_id = fields.Integer(required=True)
    rol_state = fields.Boolean(required=True)

#==================================================================
# USER TABLE
#==================================================================
class UserReq(Schema):
    user_person_id = fields.Integer(required=True)
    user_mail = fields.String(required=True)
    user_password = fields.String(required=True)
class UserIdReq(Schema):
    user_id = fields.Integer(required=True)
    user_person_id = fields.Integer(required=True)
    user_mail = fields.String(required=True)
    user_password = fields.String(required=True)
    user_locked = fields.Boolean(required=True)
class UserDeleteReq(Schema):
    user_id = fields.Integer(required=True)
    user_state = fields.Boolean(required=True)

#====================================================================
# User_Rol  
#====================================================================
class UserRolReq(Schema):
    id_user = fields.Integer(required=True)
    id_rol = fields.Integer(required=True)
class UserRolIdReq(Schema):
    id_user_rol = fields.Integer(required=True)
    id_rol = fields.Integer(required=True)
class UserRolDeleteReq(Schema):
    id_user_rol = fields.Integer(required=True)
    state = fields.Boolean(required=True)

class SendEmailPasswordReq(Schema):
    user_mail = fields.String(required=True)

class UpdatePasswordSchema(Schema):
    new_password = fields.String(required=True)
    token_temp = fields.String(required=True)

#====================================================================
# Custom 1 
#====================================================================
class Custom1Req(Schema):
    per_identification = fields.String(required=True)
    per_names = fields.String(required=True)
    per_surnames = fields.String(required=True)
    per_genre_id = fields.Integer(required=True)
    per_marital_status_id = fields.Integer(required=True)
    per_country = fields.String(required=True)
    per_city = fields.String(required=True)
    per_address = fields.String(required=True)
    per_phone = fields.String(required=True)
    per_mail = fields.String(required=True)
    per_birth_date = fields.String(required=True)
    id_rol = fields.Integer(required=True)

#=====================================================================
#Tabla tipo personal medico
#=====================================================================
# mpt_id,mpt_name,mpt_description,mpt_state
class TypeMedicReq(Schema):
    mpt_name = fields.String(required=True)
    mpt_description = fields.String(required=True)
class TypeMedicIdReq(Schema):
    mpt_id = fields.Integer(required=True)
    mpt_name = fields.String(required=True)
    mpt_description = fields.String(required=True)
class TypeMedicDeleteReq(Schema):
    mpt_id = fields.Integer(required=True)
    mpt_state = fields.Boolean(required=True)

#=====================================================================
#Tabla personal medico
#=====================================================================
#med_id,med_person_id,med_type_id,med_specialty,med_state
class MedicReq(Schema):
    med_person_id = fields.Integer(required=True)
    med_type_id = fields.Integer(required=True)
    med_specialty = fields.String(required=True)
class MedicIdReq(Schema):
    med_id = fields.Integer(required=True)
    med_type_id = fields.Integer(required=True)
    med_specialty = fields.String(required=True)
class MedicDeleteReq(Schema):
    med_id = fields.Integer(required=True)
    med_state = fields.Boolean(required=True)

#=====================================================================
#Tabla paciente
#=====================================================================
#pat_id,pat_person_id,pat_medical_conditions,
#pat_allergies,pat_blood_type,pat_emergency_contact_name,pat_emergency_contact_phone,pat_state
class PatientReq(Schema):
    pat_person_id = fields.Integer(required=True)
    pat_medical_conditions = fields.String(required=True)
    pat_allergies = fields.String(required=True)
    pat_blood_type = fields.Integer(required=True)
    pat_emergency_contact_name = fields.String(required=True)
    pat_emergency_contact_phone = fields.String(required=True)
class PatientIdReq(Schema):
    pat_id = fields.Integer(required=True)
    pat_medical_conditions = fields.String(required=True)
    pat_allergies = fields.String(required=True)
    pat_blood_type = fields.Integer(required=True)
    pat_emergency_contact_name = fields.String(required=True)
    pat_emergency_contact_phone = fields.String(required=True)
class PatientDeleteReq(Schema):
    pat_id = fields.Integer(required=True)
    pat_state = fields.Boolean(required=True)

#=====================================================================
#Tabla Historial Medico
#=====================================================================
#hist_id,hist_patient_id,hist_primary_complaint,hist_related_trauma,hist_current_treatment,hist_notes
class MedHistoryReq(Schema):
    hist_patient_id = fields.Integer(required=True)
    hist_primary_complaint = fields.String(required=True)
    hist_related_trauma = fields.Boolean(required=True)
    hist_current_treatment = fields.String(required=True)
    hist_notes = fields.String(required=True)
class MedHistoryIdReq(Schema):
    hist_id = fields.Integer(required=True)
    hist_patient_id = fields.Integer(required=True)
    hist_primary_complaint = fields.String(required=True)
    hist_related_trauma = fields.Boolean(required=True)
    hist_current_treatment = fields.String(required=True)
    hist_notes = fields.String(required=True)
class MedHistoryDeleteReq(Schema):
    pat_id = fields.Integer(required=True)

#=====================================================================
#Tabla Producto
#=====================================================================
#pro_id, pro_name, pro_description, pro_price, pro_total_sessions,pro_duration_days,pro_therapy_type_id,pro_state
class ProductReq(Schema):
    pro_name = fields.String(required=True)
    pro_description = fields.String(required=True)
    pro_price = fields.Number(required=True)
    pro_total_sessions = fields.Integer(required=True)
    pro_therapy_type_id = fields.Integer(required=True)
class ProductIdReq(Schema):
    pro_id = fields.Integer(required=True)
    pro_name = fields.String(required=True)
    pro_description = fields.String(required=True)
    pro_price = fields.Number(required=True)
    pro_total_sessions = fields.Integer(required=True)
    pro_therapy_type_id = fields.Integer(required=True)
class ProductDeleteReq(Schema):
    pro_id = fields.Integer(required=True)
    pro_state = fields.Boolean(required=True)

#=====================================================================
#Tabla Therapy Type
#=====================================================================
#tht_id, tht_name, tht_description, tht_state
class TherapyTypeReq(Schema):
    tht_name = fields.String(required=True)
    tht_description = fields.String(required=True)
class TherapyTypeIdReq(Schema):
    tht_id = fields.Integer(required=True)
    tht_name = fields.String(required=True)
    tht_description = fields.String(required=True)
class TherapyTypeDeleteReq(Schema):
    tht_id = fields.Integer(required=True)
    tht_state = fields.Boolean(required=True)

#=====================================================================
# INVOICE (FACTURACIÓN)
#=====================================================================
class InvoiceDetailReq(Schema):
    ind_product_id = fields.Integer(required=True)
    ind_quantity = fields.Integer(required=True)
    ind_unit_price = fields.Decimal(required=True)
class InvoiceReq(Schema):
    inv_client_id = fields.Integer(required=True)
    inv_patient_id = fields.Integer(required=False) # Opcional
    inv_discount = fields.Decimal(required=False, missing=0.0)
    details = fields.List(fields.Nested(InvoiceDetailReq), required=True)
class InvoiceStateReq(Schema):
    inv_id = fields.Integer(required=True)
    inv_state = fields.Boolean(required=True)

#=====================================================================
#Tabla Pagos y Abonos
#=====================================================================
class PaymentReq(Schema):
    inp_invoice_id = fields.Integer(required=True)
    inp_payment_method_id = fields.Integer(required=True)
    inp_amount = fields.Decimal(required=True)
    inp_reference = fields.String(required=False)
    inp_proof_image_path = fields.String(required=False)
class PaymentIdReq(Schema):
    inp_id = fields.Integer(required=True)
    inp_invoice_id = fields.Integer(required=True)
    inp_payment_method_id = fields.Integer(required=True)
    inp_amount = fields.Decimal(required=True)
    inp_reference = fields.String(required=False)
    inp_proof_image_path = fields.String(required=False)
class PaymentDeleteReq(Schema):
    inp_id = fields.Integer(required=True)
    inp_state = fields.Boolean(required=True)

#=====================================================================
#Tabla clinic_session_control
#=====================================================================
class ScheduleSessionReq(Schema):
    session_id = fields.Integer(required=True)
    therapist_id = fields.Integer(required=True)
    scheduled_datetime = fields.DateTime(required=True) # Espera un formato como "YYYY-MM-DDTHH:MM:SS"
class UpdateScheduledSessionReq(Schema):
    session_id = fields.Integer(required=True)
    therapist_id = fields.Integer(required=True)
    scheduled_datetime = fields.DateTime(required=True)
class ConsumeSessionReq(Schema):
    session_id = fields.Integer(required=True)
       