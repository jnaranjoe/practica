from ..Services.SecuService import *

def load_routes(api):
    #metodo para el login
    api.add_resource(LoginService, '/security/login')
    
    #===================================================================
    #PERSONGENRE
    #===================================================================
    #metodo para listar los generos de las personas
    api.add_resource(PersonGenreGet, '/security/PersonGenre/list')

    #===================================================================
    #PERSONMARITALSTATUS
    #===================================================================
    #metodo para listar los generos de las personas
    api.add_resource(MaritalStatusGet, '/security/MaritalStatus/list')
    
    #===================================================================
    #PERSON_BlOOD_TYPE
    #===================================================================
    #metodo para listar los generos de las personas
    api.add_resource(BloodTypeGet, '/security/BloodType/list')

    #===================================================================
    #PERSON
    #===================================================================
    #metodo para listar
    api.add_resource(PersonGet, '/security/Person/list')
    #metodo para crear
    api.add_resource(PersonCreate, '/security/Person/create')
    #metodo para actualizar
    api.add_resource(PersonUpdate, '/security/Person/update')
    #metodo para Eliminar Logicamente
    api.add_resource(PersonLogicDelete, '/security/Person/delete')

    #===================================================================
    #Rol
    #===================================================================
    #metodo para listar
    api.add_resource(RolGet, '/security/Rol/list')
    #metodo para crear
    api.add_resource(RolCreate, '/security/Rol/create')
    #metodo para actualizar
    api.add_resource(RolUpdate, '/security/Rol/update')
    #metodo para Eliminar Logicamente
    api.add_resource(RolLogicDelete, '/security/Rol/delete')
    
    #===================================================================
    #User
    #===================================================================
    #metodo para listar
    api.add_resource(UserGet, '/security/User/list')
    #metodo para crear
    api.add_resource(UserCreate, '/security/User/create')
    #metodo para actualizar
    api.add_resource(UserUpdate, '/security/User/update')
    #metodo para Eliminar Logicamente
    api.add_resource(UserLogicDelete, '/security/User/delete')
    #metodo para recuperacion de contraseña
    api.add_resource(PasswordRecovery, '/security/recover-password')
    #metodo para actualizar la contraseña desde el correo
    api.add_resource(EmailPasswordUpdate, '/security/change-password')

    #===================================================================
    #User_Rol
    #===================================================================
    #metodo para listar
    api.add_resource(UserRolGet, '/security/UserRol/list')
    #metodo para crear
    api.add_resource(UserRolCreate, '/security/UserRol/create')
    #metodo para actualizar
    api.add_resource(UserRolUpdate, '/security/UserRol/update')
    #metodo para Eliminar Logicamente
    api.add_resource(UserRolLogicDelete, '/security/UserRol/delete')
    
    #===================================================================
    #Custom
    #===================================================================
    #metodo para listar
    # api.add_resource(UserRolGet, '/security/UserRol/list')
    #metodo para crear Persona, User, Rol y su tabla de (paciente, cliente, medico)
    api.add_resource(Custom1Create, '/security/custom1/create')

    #=====================================================================
    #Tabla tipo personal medico
    #=====================================================================
    #metodo para listar
    api.add_resource(TypeMedicGet, '/security/TypeMedic/list')
    #metodo para crear
    api.add_resource(TypeMedicCreate, '/security/TypeMedic/create')
    #metodo para actualizar
    api.add_resource(TypeMedicUpdate, '/security/TypeMedic/update')
    #metodo para Eliminar Logicamente
    api.add_resource(TypeMedicLogicDelete, '/security/TypeMedic/delete')
    
    #=====================================================================
    #Tabla personal medico
    #=====================================================================
    #metodo para listar
    api.add_resource(MedicGet, '/security/Medic/list')
    #metodo para crear
    # api.add_resource(MedicCreate, '/security/Medic/create')
    #metodo para actualizar
    api.add_resource(MedicUpdate, '/security/Medic/update')
    #metodo para Eliminar Logicamente
    api.add_resource(MedicLogicDelete, '/security/Medic/delete')

    #=====================================================================
    #Tabla paciente
    #=====================================================================
    #metodo para listar
    api.add_resource(PatientGet, '/security/Patient/list')
    #metodo para crear
    # api.add_resource(PatientCreate, '/security/Patient/create')
    #metodo para actualizar
    api.add_resource(PatientUpdate, '/security/Patient/update')
    #metodo para Eliminar Logicamente
    api.add_resource(PatientLogicDelete, '/security/Patient/delete')
    
    #=====================================================================
    #Tabla Historial Medico
    #=====================================================================
    #metodo para listar
    api.add_resource(MedHistoryGet, '/security/MedHistory/list')
    #metodo para crear
    api.add_resource(MedHistoryCreate, '/security/MedHistory/create')
    #metodo para actualizar
    api.add_resource(MedHistoryUpdate, '/security/MedHistory/update')
    #metodo para Eliminar Logicamente
    api.add_resource(MedHistoryDelete, '/security/MedHistory/delete')
    
    #=====================================================================
    #Tabla Producto
    #=====================================================================
    #metodo para listar
    api.add_resource(ProductGet, '/security/Product/list')
    #metodo para crear
    api.add_resource(ProductCreate, '/security/Product/create')
    #metodo para actualizar
    api.add_resource(ProductUpdate, '/security/Product/update')
    #metodo para Eliminar Logicamente
    api.add_resource(ProductDelete, '/security/Product/delete')

    #=====================================================================
    #Tabla Therapy Type
    #=====================================================================
    #metodo para listar
    api.add_resource(TherapyTypeGet, '/security/TherapyType/list')
    #metodo para crear
    api.add_resource(TherapyTypeCreate, '/security/TherapyType/create')
    #metodo para actualizar
    api.add_resource(TherapyTypeUpdate, '/security/TherapyType/update')
    #metodo para Eliminar Logicamente
    api.add_resource(TherapyTypeDelete, '/security/TherapyType/delete')

    #=====================================================================
    #Tabla Factura, Pagos y Abonos
    #=====================================================================
    #metodo para generar factura
    api.add_resource(InvoiceCreate, '/finance/invoice/create')
    #metodo para listar las facturas
    api.add_resource(InvoiceList, '/finance/invoices') 
    #metodo para listar por id
    api.add_resource(InvoiceGetById, '/finance/invoice')
    #metodo para anular factura
    api.add_resource(InvoiceUpdateState, '/finance/invoice/update-state')
    #metodo para listar formas de pago
    api.add_resource(PaymentMethodList, '/finance/payment-methods')
    #metodo para crear pago
    api.add_resource(PaymentCreate, '/finance/payment/create')
    #metodo para listar por factura
    api.add_resource(PaymentGetByInvoiceId, '/finance/invoice/payments')
    #metodo para actualizar
    api.add_resource(PaymentUpdate, '/finance/payment/update')
    #metodo para eliminar logicamente
    api.add_resource(PaymentDelete, '/finance/payment/delete')
    #metodo para enviar correo de la factura
    api.add_resource(InvoiceEmailService, '/finance/invoice/send-email')

    #=====================================================================
    # Dashboard
    #=====================================================================
    #metodo para obtener las ventas del dia
    api.add_resource(DashboardTodaySales, '/finance/dashboard/today-sales') 
    #metodo para obtener las ventas por semana
    api.add_resource(DashboardWeeklySalesByDay, '/finance/dashboard/weekly-sales-by-day')   

    #=====================================================================
    # AGENDAR TERAPIAS
    #=====================================================================
    #metodo para consultar las sesiones disponibles de un paciente
    api.add_resource(PatientAvailableSessions, '/scheduling/patient-sessions')
    #metodo para consultar las sesiones disponibles de un paciente
    api.add_resource(PatientAvailableSessionsWOState, '/scheduling/patient-sessions-wostate')
    #metodo para agendar una sesion de terapia
    api.add_resource(ScheduleSession, '/scheduling/schedule-session')
    #metodo para consultar las sesiones agendadas de un paciente
    api.add_resource(WeeklyScheduledSessions, '/scheduling/weekly-appointments')
    #metodo para actualizar una sesion agendada
    api.add_resource(UpdateScheduledSession, '/scheduling/update-appointment')
    #metodo para consumir una sesion agendada
    api.add_resource(ConsumeSession, '/scheduling/consume-session')
    #metodo para consultar todas las sesiones agendadas
    api.add_resource(AllScheduledSessions, '/scheduling/all-appointments')

    #=====================================================================
    # Generar PDF
    #=====================================================================
    #metodo para generar PDF de la factura
    api.add_resource(InvoicePDFService, '/finance/invoice/pdf')
