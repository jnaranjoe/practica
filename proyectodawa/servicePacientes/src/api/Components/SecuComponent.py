from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from decimal import Decimal
from datetime import datetime
from ...utils.pdf.generate_pdf import generate_invoice_pdf
from ...utils.smpt.smpt_officeUG import send_email_with_attachment

#====================================================================
#PERSON GENRE
#====================================================================
class PersonGenreComponent:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None
            sql = """
                SELECT apg.id, apg.genre_name, apg.state
                FROM ceragen.admin_person_genre apg
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
        
#====================================================================
#PERSON_MARITAL_STATUS
#====================================================================
class MaritalStatusComponent:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None
            sql = """
                SELECT ams.id, ams.status_name, ams.state
                FROM ceragen.admin_marital_status ams
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

#====================================================================
#PATIENT_BLOOD_TYPE
#====================================================================
class BloodTypeComponent:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None
            sql = """
                SELECT btp_id, btp_type
	            FROM ceragen.clinic_blood_type where btp_state = true;
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)
#====================================================================
#PERSON
#====================================================================
class PersonComponent:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None

            sql = """
                SELECT ap.per_id, ap.per_identification, concat(per_names, ' ', per_surnames) as nombre, per_genre_id,
                per_marital_status_id,
                per_country,
                per_city,
                per_address,
                per_phone,
                per_mail,
                per_birth_date
                FROM ceragen.admin_person ap
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                # Convierte per_birth_date a string si es datetime
                for row in resultado['data']:
                    if isinstance(row.get('per_birth_date'), datetime):
                        row['per_birth_date'] = row['per_birth_date'].strftime('%Y-%m-%d')
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            message = err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)
    
    @staticmethod
    def createPer(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                INSERT INTO ceragen.admin_person (per_identification,
                per_names,
                per_surnames,
                per_genre_id,
                per_marital_status_id,
                per_country,
                per_city,
                per_address,
                per_phone,
                per_mail,
                per_birth_date)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """
            # print("Datos a insertar: ", datos)
            record = (
                datos['per_identification'],
                datos['per_names'],
                datos['per_surnames'],
                datos['per_genre_id'],
                datos['per_marital_status_id'],
                datos['per_country'],
                datos['per_city'],
                datos['per_address'],
                datos['per_phone'],
                datos['per_mail'],
                datos['per_birth_date'],
            )

            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            if data is None:
                if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    result = True
                else:
                    message = "Error al crear" + data_NonQuery['message']
            else:
                message="error al ejecutar sql para crear"
                HandleLogs.write_error(message)
                
        except Exception as err:
            message = "Error al crear" + err.__str__()
            HandleLogs.write_error(message)

        finally:
            return internal_response(result, data, message)
    
    @staticmethod
    def updatePer(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.admin_person SET
                    per_identification = %s,
                    per_names = %s,
                    per_surnames = %s,
                    per_genre_id = %s,
                    per_marital_status_id = %s,
                    per_country = %s,
                    per_city = %s,
                    per_address = %s,
                    per_phone = %s,
                    per_mail = %s,
                    per_birth_date = %s
                WHERE per_id = %s
            """
            record = (
                datos['per_identification'],
                datos['per_names'],
                datos['per_surnames'],
                datos['per_genre_id'],
                datos['per_marital_status_id'],
                datos['per_country'],
                datos['per_city'],
                datos['per_address'],
                datos['per_phone'],
                datos['per_mail'],
                datos['per_birth_date'],
                datos['per_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al actualizar: " + data_NonQuery['message']

            sql = """
                UPDATE ceragen.segu_user SET
                    user_mail = %s
                WHERE user_person_id = %s
            """
            record = (
                datos['per_mail'],
                datos['per_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al actualizar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al actualizar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)
    
    @staticmethod
    def logicDeletePer(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.admin_person SET
                    per_state = %s
                WHERE per_id = %s
            """
            record = (
                datos['per_state'],
                datos['per_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al eliminar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al eliminar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)


#====================================================================
#ROL
#====================================================================

class RolComponent:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None

            sql = """
                SELECT sr.rol_id, sr.rol_name, sr.rol_description, sr.is_admin_rol
	            FROM ceragen.segu_rol sr;
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            message = err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def create(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                INSERT INTO ceragen.segu_rol (rol_name,
                rol_description,
                is_admin_rol)
                VALUES (%s,%s,%s)
            """
            # print("Datos a insertar: ", datos)
            record = (
                datos['rol_name'],
                datos['rol_description'],
                datos['is_admin_rol'],
            )

            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            if data is None:
                if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    result = True
                else:
                    message = "Error al crear" + data_NonQuery['message']
            else:
                message="error al ejecutar sql para crear"
                HandleLogs.write_error(message)
                
        except Exception as err:
            message = "Error al crear" + err.__str__()
            HandleLogs.write_error(message)

        finally:
            return internal_response(result, data, message)

    @staticmethod
    def update(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.segu_rol SET
                    rol_name = %s,
                    rol_description = %s,
                    is_admin_rol = %s
                WHERE rol_id = %s
            """
            record = (
                datos['rol_name'],
                datos['rol_description'],
                datos['is_admin_rol'],
                datos['rol_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al actualizar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al actualizar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.segu_rol SET
                    rol_state = %s
                WHERE rol_id = %s
            """
            record = (
                datos['rol_state'],
                datos['rol_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al eliminar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al eliminar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

#====================================================================
#User
#====================================================================

class UserComponent:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None

            sql = """
                SELECT su.user_id, su.user_person_id, concat(ap.per_names, ' ', ap.per_surnames) as nombre, su.user_mail, su.user_password, su.user_locked, su.user_state
                FROM ceragen.segu_user su
                left join ceragen.admin_person ap on su.user_person_id = ap.per_id;
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            message = err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)
    
    @staticmethod
    def create(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                INSERT INTO ceragen.segu_user (user_person_id,
                user_mail,
                user_password)
                VALUES (%s,%s,%s)
            """
            # print("Datos a insertar: ", datos)
            record = (
                datos['user_person_id'],
                datos['user_mail'],
                datos['user_password'],
            )

            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            if data is None:
                if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    result = True
                else:
                    message = "Error al crear" + data_NonQuery['message']
            else:
                message="error al ejecutar sql para crear"
                HandleLogs.write_error(message)
                
        except Exception as err:
            message = "Error al crear" + err.__str__()
            HandleLogs.write_error(message)

        finally:
            return internal_response(result, data, message)
        
    @staticmethod
    def update(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.segu_user SET
                    user_person_id = %s,
                    user_mail = %s,
                    user_password = %s,
                    user_locked = %s
                WHERE user_id = %s
            """
            record = (
                datos['user_id'],
                datos['user_person_id'],
                datos['user_mail'],
                datos['user_password'],
                datos['user_locked']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al actualizar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al actualizar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.segu_user SET
                    user_state = %s
                WHERE user_id = %s
            """
            record = (
                datos['user_state'],
                datos['user_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al eliminar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al eliminar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def login(email, password):
        result = False
        data = None
        message = None
        try:
            # --- CONSULTA MODIFICADA PARA INCLUIR EL ROL ---
            # Se hacen JOINS para conectar las tablas de usuario, usuario_rol y rol.
            sql = """
                SELECT 
                    su.user_id, 
                    su.user_person_id, 
                    su.user_mail, 
                    su.user_password, 
                    su.user_locked, 
                    su.user_state,
                    sr.rol_name, -- Se añade el nombre del rol a la selección
                    sr.is_admin_rol
                FROM ceragen.segu_user su
                LEFT JOIN ceragen.segu_user_rol sur ON su.user_id = sur.id_user
                LEFT JOIN ceragen.segu_rol sr ON sur.id_rol = sr.rol_id
                WHERE su.user_mail = %s;
            """
            record = (email,)
            user_data_result = DataBaseHandle.getRecords(sql, 1, record)

            if not user_data_result['result'] or not user_data_result['data']:
                message = "Usuario o contraseña incorrectos."
                return internal_response(result, data, message)

            user = user_data_result['data']

            if user['user_password'] == password:
                if not user['user_state']:
                    message = "La cuenta de usuario está inactiva."
                elif user['user_locked']:
                    message = "La cuenta de usuario está bloqueada."
                else:
                    # Si todo está bien, preparamos los datos del usuario, AHORA CON EL ROL
                    result = True
                    data = {
                        "user_id": user['user_id'],
                        "user_person_id": user['user_person_id'],
                        "user_mail": user['user_mail'],
                        "role": user['rol_name'], # Se añade el rol a los datos
                        "is_admin": user['is_admin_rol']
                    }
                    message = "Login exitoso."
            else:
                message = "Usuario o contraseña incorrectos."

        except Exception as err:
            message = "Error en el proceso de login: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def getUserByEmail(email):
        try:
            result = False
            data = None
            message = None
            sql = """
                SELECT su.user_id, su.user_mail, concat(ap.per_names, ' ', ap.per_surnames) as nombre
                FROM ceragen.segu_user su
                LEFT JOIN ceragen.admin_person ap ON su.user_person_id = ap.per_id
                WHERE su.user_mail = %s
            """
            record = (email,)
            
            # Usamos el método getRecords con tamaño 1 para obtener solo un registro
            resultado = DataBaseHandle.getRecords(sql, 1, record)
            
            if resultado['result']:
                result = True
                data = resultado['data']
            else:
                message = 'Error al obtener datos del usuario -> ' + resultado['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def UsePasswordUpdateMail(new_password, mail_user):
        result = False
        data = None
        message = None
        try:
            
            sql = """
                UPDATE ceragen.segu_user SET
                    user_password = %s
                WHERE user_mail = %s
            """
            record = (new_password, mail_user)
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            
            if data_NonQuery['result']:
                result = True
                data = {"updated_user_with_mail": mail_user}
                message = "Contraseña actualizada correctamente."
            else:
                # Esto podría ocurrir si el email no se encuentra, aunque el token sea válido.
                message = "Error al ejecutar la actualización en la base de datos: " + data_NonQuery['message']
                result = False

        except Exception as err:
            message = "Error en el proceso de actualización: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

#====================================================================
# User_Rol  
#====================================================================
class UserRolComponent:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None

            sql = """
                SELECT sur.id_user_rol,
                sur.id_user,
                su.user_person_id,
                ap.per_identification,
                ap.per_names,
                ap.per_surnames,
                ap.per_genre_id,
                apg.genre_name,
                ap.per_marital_status_id,
                ams.status_name,
                ap.per_country,
                ap.per_city,
                ap.per_address,
                ap.per_phone,
                ap.per_mail,
                ap.per_birth_date,
                sur.id_rol, sr.rol_name, sur.state
                FROM ceragen.segu_user_rol sur
                left join ceragen.segu_user su on sur.id_user = su.user_id
                left join ceragen.admin_person ap on su.user_person_id = ap.per_id
                left join ceragen.segu_rol sr on sur.id_rol = sr.rol_id
                left join ceragen.admin_person_genre apg on ap.per_genre_id = apg.id
                left join ceragen.admin_marital_status ams on ap.per_marital_status_id = ams.id;
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            # print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                # Convierte per_birth_date a string si es datetime
                for row in resultado['data']:
                    if isinstance(row.get('per_birth_date'), datetime):
                        row['per_birth_date'] = row['per_birth_date'].strftime('%Y-%m-%d')
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            message = err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)
        
    @staticmethod
    def create(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                INSERT INTO ceragen.segu_user_rol (id_user,
                id_rol)
                VALUES (%s,%s)
            """
            # print("Datos a insertar: ", datos)
            record = (
                datos['id_user'],
                datos['id_rol'],
            )

            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            if data is None:
                if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    result = True
                else:
                    message = "Error al crear" + data_NonQuery['message']
            else:
                message="error al ejecutar sql para crear"
                HandleLogs.write_error(message)
                
        except Exception as err:
            message = "Error al crear" + err.__str__()
            HandleLogs.write_error(message)

        finally:
            return internal_response(result, data, message)
    
    @staticmethod
    def update(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.segu_user_rol SET
                    id_rol = %s
                WHERE id_user_rol = %s
            """
            record = (
                datos['id_user_rol'],
                datos['id_rol'],
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al actualizar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al actualizar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result = False
        data = None
        message = None
        try:
            sql = """
                UPDATE ceragen.segu_user_rol SET
                    state = %s
                WHERE id_user_rol = %s
            """
            record = (
                datos['state'],
                datos['id_user_rol']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result = True
                data = data_NonQuery['data']
            else:
                message = "Error al eliminar: " + data_NonQuery['message']
        except Exception as err:
            message = "Error al eliminar: " + err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)
        
    
#=====================================================================
#Componente custom 1
#=====================================================================
class Custom1Component:
    @staticmethod
    def getAll():
        try:
            result = False
            data = None
            message = None

            sql = """
                SELECT sur.id_user_rol, su.user_person_id, concat(ap.per_names, ' ', ap.per_surnames) as nombre, sur.id_user, sur.id_rol, sr.rol_name, sur.state
                FROM ceragen.segu_user_rol sur
                left join ceragen.segu_user su on sur.id_user = su.user_id
                left join ceragen.admin_person ap on su.user_person_id = ap.per_id
                left join ceragen.segu_rol sr on sur.id_rol = sr.rol_id;
            """

            resultado = DataBaseHandle.getRecords(sql,0)
            print("Resultado de la consulta: ", resultado['data'])
            if resultado['result']:
                result = True
                data = resultado['data']
            else:
                message = 'Error al Obtener datos -> ' + resultado['message']
        except Exception as err:
            message = err.__str__()
            HandleLogs.write_error(message)
        finally:
            return internal_response(result, data, message)
    
    @staticmethod
    def create(datos):
        result = False
        data = None
        message = None
        perId = None
        try:
            sql = """
                INSERT INTO ceragen.admin_person (per_identification,
                per_names,
                per_surnames,
                per_genre_id,
                per_marital_status_id,
                per_country,
                per_city,
                per_address,
                per_phone,
                per_mail,
                per_birth_date)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """
            # print("Datos a insertar: ", datos)
            record = (
                datos['per_identification'],
                datos['per_names'],
                datos['per_surnames'],
                datos['per_genre_id'],
                datos['per_marital_status_id'],
                datos['per_country'],
                datos['per_city'],
                datos['per_address'],
                datos['per_phone'],
                datos['per_mail'],
                datos['per_birth_date'],
            )
            # Ejecutar la inserción en la tabla admin_person
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            if data is None:
                if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    perId = {
                        "id_user": data_NonQuery['data']
                    }
                    result = True
                else:
                    message = "Error al crear persona" + data_NonQuery['message']
            else:
                message="error al ejecutar sql para crear"
                HandleLogs.write_error(message)
            
            print("ID de la persona recién insertada: ", perId)
            #Validar el tipo de rol y ver si es necesario insertar en otra tabla
            if datos['id_rol'] == 1:
                print("Es admin")  # Supongamos que el rol con id 1 es el rol de administrador
            elif datos['id_rol'] == 2:
                print("Es Secretario")
            elif datos['id_rol'] == 3:
                print("Es Medico")
                
                sql = """
                INSERT INTO ceragen.admin_medical_staff (med_person_id)
                VALUES (%s)
                """
                # print("Datos a insertar: ", datos)
                record = (
                    perId['id_user'],  # Asumiendo que el ID de la persona recién insertada es per_id
                )
                data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            elif datos['id_rol'] == 4:
                print("Es cliente")

                sql = """
                INSERT INTO ceragen.admin_client (cli_person_id)
                VALUES (%s)
                """
                # print("Datos a insertar: ", datos)
                record = (
                    perId['id_user'],  # Asumiendo que el ID de la persona recién insertada es per_id
                )
                data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            elif datos['id_rol'] == 5:
                print("Es paciente")
                
                sql = """
                INSERT INTO ceragen.admin_patient (pat_person_id)
                VALUES (%s)
                """
                # print("Datos a insertar: ", datos)
                record = (
                    perId['id_user'],  # Asumiendo que el ID de la persona recién insertada es per_id
                )
                data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)

            if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    result = True
            else:
                message = "Error al asignar a otras tablas" + data_NonQuery['message']
            #Insertar en tabla user
            sql = """
                INSERT INTO ceragen.segu_user (user_person_id,
                user_mail,
                user_password)
                VALUES (%s,%s,%s)
            """
            record = (
                perId['id_user'],
                datos['per_mail'],
                datos['per_identification']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    userId = {
                        "id_user": data_NonQuery['data']
                    }
                    result = True
            else:
                message = "Error al asignar a otras tablas" + data_NonQuery['message']
            # Ahora, insertar en la tabla segu_user_rol

            sql = """
                INSERT INTO ceragen.segu_user_rol (id_user,
                id_rol)
                VALUES (%s,%s)
            """
            # print("Datos a insertar: ", datos)
            record = (
                userId['id_user'],
                datos['id_rol'],
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql,record)
            if data_NonQuery['result']:
                    data = data_NonQuery['data']
                    result = True
            else:
                message = "Error al asignar a otras tablas" + data_NonQuery['message']

        except Exception as err:
            message = "Error al crear" + err.__str__()
            HandleLogs.write_error(message)

        finally:
            return internal_response(result, data, message)

#=====================================================================
#Tabla tipo personal medico
#=====================================================================
class MedicPersonTypeComponent:
    @staticmethod
    def getAll():
        result, data, message = False, None, None
        try:
            sql = """
                SELECT mpt_id, mpt_name, mpt_description, mpt_state
                FROM ceragen.admin_medic_person_type
            """
            resultado = DataBaseHandle.getRecords(sql, 0)
            if resultado['result']:
                result, data = True, resultado['data']
            else:
                message = 'Error al obtener tipos de médicos -> ' + resultado['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def create(datos):
        result, data, message = False, None, None
        try:
            sql = """
                INSERT INTO ceragen.admin_medic_person_type
                (mpt_name, mpt_description)
                VALUES (%s, %s)
            """
            record = (datos['mpt_name'], datos['mpt_description'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al crear tipo médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def update(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_medic_person_type SET
                mpt_name = %s,
                mpt_description = %s,
                WHERE mpt_id = %s
            """
            record = (datos['mpt_name'], datos['mpt_description'], datos['mpt_id'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar tipo médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_medic_person_type SET mpt_state = %s WHERE mpt_id = %s
            """
            record = (datos['mpt_state'], datos['mpt_id'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al eliminar tipo médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message) 
#=====================================================================
#Tabla personal medico
#=====================================================================
class MedicalStaffComponent:
    @staticmethod
    def getAll():
        result, data, message = False, None, None
        try:
            sql = """
                SELECT med_id,
                med_person_id,
                ap.per_identification,
                ap.per_names,
                ap.per_surnames,
                med_type_id,
                ampt.mpt_name,
                med_specialty,
                med_state
                FROM ceragen.admin_medical_staff ams
				left join ceragen.admin_person ap on ams.med_person_id = ap.per_id
				left join ceragen.admin_medic_person_type ampt on ams.med_type_id = ampt.mpt_id
            """
            resultado = DataBaseHandle.getRecords(sql, 0)
            if resultado['result']:
                result, data = True, resultado['data']
            else:
                message = 'Error al obtener personal médico -> ' + resultado['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def create(datos):
        result, data, message = False, None, None
        try:
            sql = """
                INSERT INTO ceragen.admin_medical_staff
                (med_person_id, med_type_id, med_specialty)
                VALUES (%s, %s, %s)
            """
            record = (
                datos['med_person_id'],
                datos['med_type_id'],
                datos['med_specialty'],
                datos['med_state']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al crear personal médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def update(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_medical_staff SET
                med_type_id = %s,
                med_specialty = %s
                WHERE med_id = %s
            """
            record = (
                datos['med_type_id'],
                datos['med_specialty'],
                datos['med_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar personal médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_medical_staff SET med_state = %s WHERE med_id = %s
            """
            record = (datos['med_state'], datos['med_id'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al eliminar personal médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

#=====================================================================
#Tabla paciente
#=====================================================================
class PatientComponent:
    @staticmethod
    def getAll():
        result, data, message = False, None, None
        try:
            sql = """
                SELECT pat_id,
                       pat_person_id,
                       ap.per_identification,
                       ap.per_names,
                       ap.per_surnames,
                       pat_medical_conditions,
                       pat_code,
                       pat_allergies,
                       pat_blood_type,
                       cbt.btp_type,
                       pat_emergency_contact_name,
                       pat_emergency_contact_phone,
                       pat_state
                FROM ceragen.admin_patient
                left join ceragen.admin_person ap on admin_patient.pat_person_id = ap.per_id
                left join ceragen.clinic_blood_type cbt on admin_patient.pat_blood_type = cbt.btp_id
            """
            resultado = DataBaseHandle.getRecords(sql, 0)
            if resultado['result']:
                result, data = True, resultado['data']
            else:
                message = 'Error al obtener pacientes -> ' + resultado['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)
    
    @staticmethod
    def create(datos):
        result, data, message = False, None, None
        try: 
            sql = """
                INSERT INTO ceragen.admin_patient
                (pat_person_id, pat_medical_conditions, pat_allergies,
                 pat_blood_type, pat_emergency_contact_name,
                 pat_emergency_contact_phone, pat_state)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            record = (
                datos['pat_person_id'],
                datos['pat_medical_conditions'],
                datos['pat_allergies'],
                datos['pat_blood_type'],
                datos['pat_emergency_contact_name'],
                datos['pat_emergency_contact_phone'],
                datos['pat_state']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al crear paciente: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def update(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_patient SET
                pat_medical_conditions = %s,
                pat_code = %s,
                pat_allergies = %s,
                pat_blood_type = %s,
                pat_emergency_contact_name = %s,
                pat_emergency_contact_phone = %s
                WHERE pat_id = %s
            """
            record = (
                datos['pat_medical_conditions'],
                datos['pat_code'],
                datos['pat_allergies'],
                datos['pat_blood_type'],
                datos['pat_emergency_contact_name'],
                datos['pat_emergency_contact_phone'],
                datos['pat_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar paciente: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_patient SET pat_state = %s WHERE pat_id = %s
            """
            record = (datos['pat_state'], datos['pat_id'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al eliminar paciente: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

#=====================================================================
#Tabla Historial Medico
#=====================================================================
class MedicalHistoryComponent:
    @staticmethod
    def getAll():
        result, data, message = False, None, None
        try:
            sql = """
                SELECT hist_id, hist_patient_id, hist_primary_complaint,
                       hist_related_trauma, hist_current_treatment, hist_notes
                FROM ceragen.clinic_patient_medical_history
            """
            resultado = DataBaseHandle.getRecords(sql, 0)
            if resultado['result']:
                result, data = True, resultado['data']
            else:
                message = 'Error al obtener historiales médicos -> ' + resultado['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def create(datos):
        result, data, message = False, None, None
        try:
            sql = """
                INSERT INTO ceragen.clinic_patient_medical_history
                (hist_patient_id, hist_primary_complaint,
                 hist_related_trauma, hist_current_treatment, hist_notes)
                VALUES (%s, %s, %s, %s, %s)
            """
            record = (
                datos['hist_patient_id'],
                datos['hist_primary_complaint'],
                datos['hist_related_trauma'],
                datos['hist_current_treatment'],
                datos['hist_notes']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al crear historial médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def update(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.clinic_patient_medical_history SET
                hist_patient_id = %s,
                hist_primary_complaint = %s,
                hist_related_trauma = %s,
                hist_current_treatment = %s,
                hist_notes = %s
                WHERE hist_id = %s
            """
            record = (
                datos['hist_patient_id'],
                datos['hist_primary_complaint'],
                datos['hist_related_trauma'],
                datos['hist_current_treatment'],
                datos['hist_notes'],
                datos['hist_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar historial médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)
    
    @staticmethod
    def delete(datos):
        result, data, message = False, None, None
        try:
            sql = """
                Delete from ceragen.clinic_patient_medical_history
                WHERE hist_id = %s
            """
            record = (
                datos['hist_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar historial médico: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

#=====================================================================
#Tabla Producto
#=====================================================================

class ProductComponent:
    @staticmethod
    def getAll():
        result, data, message = False, None, None
        try:
            sql = """
                SELECT pro_id, pro_name, pro_description, pro_price,
                       pro_total_sessions,
                       pro_therapy_type_id, pro_state
                FROM ceragen.admin_product
            """
            resultado = DataBaseHandle.getRecords(sql, 0)
            
            if resultado['result']:
                # --- ¡ESTA ES LA SOLUCIÓN CORRECTA Y FINAL! ---

                # 1. Convertimos la lista de objetos especiales `RealDictRow`
                #    a una lista de diccionarios normales que Python y Flask entienden.
                plain_dictionaries = [dict(row) for row in resultado['data']]
                
                # 2. Ahora, trabajamos con la lista de diccionarios limpios.
                for prod in plain_dictionaries:
                    price = prod.get('pro_price')
                    # 3. Nos aseguramos de que el precio Decimal se convierta a float.
                    if isinstance(price, Decimal):
                        prod['pro_price'] = float(price)
                
                # 4. Asignamos la lista de diccionarios limpios para ser enviada.
                result, data = True, plain_dictionaries
            else:
                message = 'Error al obtener productos -> ' + resultado['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        
        return internal_response(result, data, message)

    @staticmethod
    def create(datos):
        result, data, message = False, None, None
        try:
            sql = """
                INSERT INTO ceragen.admin_product
                (pro_name, pro_description, pro_price,
                 pro_total_sessions,
                 pro_therapy_type_id)
                VALUES (%s, %s, %s, %s, %s)
            """
            record = (
                datos['pro_name'],
                datos['pro_description'],
                datos['pro_price'],
                datos['pro_total_sessions'],
                datos['pro_therapy_type_id'],
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al crear producto: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def update(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_product SET
                pro_name = %s,
                pro_description = %s,
                pro_price = %s,
                pro_total_sessions = %s,
                pro_therapy_type_id = %s
                WHERE pro_id = %s
            """
            record = (
                datos['pro_name'],
                datos['pro_description'],
                datos['pro_price'],
                datos['pro_total_sessions'],
                datos['pro_therapy_type_id'],
                datos['pro_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar producto: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_product SET pro_state = %s WHERE pro_id = %s
            """
            record = (datos['pro_state'], datos['pro_id'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al eliminar producto: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

#=====================================================================
#Tabla TherapyType
#=====================================================================
class TherapyTypeComponent:
    @staticmethod
    def getAll():
        result, data, message = False, None, None
        try:
            sql = """
                SELECT tht_id, tht_name, tht_description, tht_state
                FROM ceragen.admin_therapy_type
            """
            resultado = DataBaseHandle.getRecords(sql, 0)
            if resultado['result']:
                result, data = True, resultado['data']
            else:
                message = 'Error al obtener tipos de terapia -> ' + resultado['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def create(datos):
        result, data, message = False, None, None
        try:
            sql = """
                INSERT INTO ceragen.admin_therapy_type
                (tht_name, tht_description)
                VALUES (%s, %s)
            """
            record = (
                datos['tht_name'],
                datos['tht_description'],
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al crear tipo de terapia: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def update(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_therapy_type SET
                tht_name = %s,
                tht_description = %s,
                WHERE tht_id = %s
            """
            record = (
                datos['tht_name'],
                datos['tht_description'],
                datos['tht_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar tipo de terapia: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_therapy_type SET tht_state = %s WHERE tht_id = %s
            """
            record = (datos['tht_state'], datos['tht_id'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al eliminar tipo de terapia: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

#=====================================================================
# INVOICE COMPONENT
#=====================================================================
class InvoiceComponent:
    @staticmethod
    def create(datos, user):
        try:
            # --- LÓGICA PARA GENERAR NÚMERO DE FACTURA ---
            # 1. Obtenemos el último ID para crear un número de factura secuencial.
            sql_get_last_invoice_id = "SELECT inv_id FROM ceragen.admin_invoice ORDER BY inv_id DESC LIMIT 1;"
            last_id_result = DataBaseHandle.getRecords(sql_get_last_invoice_id, 1)
            
            new_id = 1 # Valor por defecto si es la primera factura
            if last_id_result['result'] and last_id_result['data']:
                new_id = last_id_result['data']['inv_id'] + 1
            
            # 2. Formateamos el nuevo número de factura (ej: FAC-0001)
            invoice_number = f"FAC-{str(new_id).zfill(4)}"

            # --- CÁLCULOS DE LA FACTURA ---
            subtotal = sum(Decimal(d['ind_quantity']) * Decimal(d['ind_unit_price']) for d in datos['details'])
            discount = Decimal(datos.get('inv_discount', 0))
            tax_rate = Decimal('0.15') # Asumes 15% de impuesto
            tax = (subtotal - discount) * tax_rate
            grand_total = subtotal - discount + tax

            # --- INSERCIÓN EN LA BASE DE DATOS ---
            # 3. Insertar la cabecera de la factura (incluyendo el nuevo inv_number)
            sql_invoice = """
                INSERT INTO ceragen.admin_invoice 
                (inv_number, inv_client_id, inv_patient_id, inv_subtotal, inv_discount, inv_tax, inv_grand_total, user_created, date_created)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW());
            """
            invoice_record = (
                invoice_number, # <-- Se añade el número de factura generado
                datos['inv_client_id'],
                datos.get('inv_patient_id'),
                subtotal,
                discount,
                tax,
                grand_total,
                user
            )
            
            header_result = DataBaseHandle.ExecuteNonQuery(sql_invoice, invoice_record)
            
            if not header_result['result']:
                raise Exception(f"Error al crear la cabecera de la factura: {header_result['message']}")

            new_invoice_id = header_result['data']

            # 4. Insertar los detalles de la factura
            sql_detail = """
                INSERT INTO ceragen.admin_invoice_detail
                (ind_invoice_id, ind_product_id, ind_quantity, ind_unit_price, ind_total, user_created, date_created)
                VALUES (%s, %s, %s, %s, %s, %s, NOW())
            """
            for detail in datos['details']:
                total_line = Decimal(detail['ind_quantity']) * Decimal(detail['ind_unit_price'])
                detail_record = (
                    new_invoice_id,
                    detail['ind_product_id'],
                    detail['ind_quantity'],
                    detail['ind_unit_price'],
                    total_line,
                    user
                )
                detail_result = DataBaseHandle.ExecuteNonQuery(sql_detail, detail_record)
                if not detail_result['result']:
                    raise Exception(f"Error al insertar el detalle para el producto ID {detail['ind_product_id']}: {detail_result['message']}")
            
            # 5. Crear las sesiones de terapia automáticamente
            sql_get_sessions = "SELECT pro_total_sessions FROM ceragen.admin_product WHERE pro_id = %s;"
            sql_create_session = """
                INSERT INTO ceragen.clinic_session_control
                (sec_inv_id, sec_pro_id, sec_ses_number, user_created, date_created)
                VALUES (%s, %s, %s, %s, NOW());
            """
            sessions_created_count = 0
            for detail in datos['details']:
                product_id = detail['ind_product_id']
                quantity = detail['ind_quantity']
                sessions_result = DataBaseHandle.getRecords(sql_get_sessions, 1, (product_id,))
                
                if sessions_result['result'] and sessions_result['data'] and sessions_result['data']['pro_total_sessions']:
                    total_sessions_per_product = sessions_result['data']['pro_total_sessions']
                    for _ in range(quantity * total_sessions_per_product):
                        sessions_created_count += 1
                        session_record = (new_invoice_id, product_id, sessions_created_count, user)
                        DataBaseHandle.ExecuteNonQuery(sql_create_session, session_record)

            # Se actualiza el mensaje de retorno para incluir el número de factura
            return internal_response(True, {"new_invoice_id": new_invoice_id, "invoice_number": invoice_number, "sessions_created": sessions_created_count}, "Factura y sesiones creadas exitosamente.")

        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def get_all():
        try:
            # --- ¡ESTA ES LA CONSULTA CORREGIDA Y FINAL! ---
            sql = """
                SELECT 
                    i.inv_id,
                    i.inv_number,
                    i.inv_date,
                    p.per_names || ' ' || p.per_surnames as client_name,
                    i.inv_grand_total,
                    i.inv_state,
                    -- 1. Sumamos los montos de los pagos de la tabla de pagos (admin_invoice_payment)
                    -- 2. Usamos COALESCE para que las facturas sin pagos devuelvan 0 en lugar de NULL.
                    COALESCE(SUM(pay.inp_amount), 0) as total_paid
                FROM 
                    ceragen.admin_invoice i
                JOIN 
                    ceragen.admin_person p ON i.inv_client_id = p.per_id
                -- 3. Usamos LEFT JOIN para no excluir facturas que aún no tienen pagos.
                LEFT JOIN 
                    ceragen.admin_invoice_payment pay ON i.inv_id = pay.inp_invoice_id AND pay.inp_state = TRUE
                -- 4. Agrupamos por factura para que la suma de pagos sea correcta para cada una.
                GROUP BY
                    i.inv_id, p.per_id
                ORDER BY 
                    i.inv_id DESC;
            """
            header_result = DataBaseHandle.getRecords(sql, 0)

            if not header_result['result']:
                raise Exception(f"Error al obtener las facturas: {header_result['message']}")

            # Convertir datos no serializables para que el frontend los reciba bien
            for row in header_result['data']:
                if isinstance(row.get('inv_date'), datetime):
                    row['inv_date'] = row['inv_date'].isoformat()
                if isinstance(row.get('inv_grand_total'), Decimal):
                    row['inv_grand_total'] = float(row['inv_grand_total'])
                # También convertimos el nuevo campo 'total_paid'
                if isinstance(row.get('total_paid'), Decimal):
                    row['total_paid'] = float(row['total_paid'])

            return internal_response(True, header_result['data'], "Facturas obtenidas exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def get_by_id(invoice_id):
        try:
            # 1. Obtener la cabecera de la factura
            sql_header = """
                SELECT 
                    i.*,
                    p_client.per_names || ' ' || p_client.per_surnames as client_name,
                    p_client.per_mail as client_email, -- EMAIL
                    p_patient.per_names || ' ' || p_patient.per_surnames as patient_name
                FROM ceragen.admin_invoice i
                JOIN ceragen.admin_person p_client ON i.inv_client_id = p_client.per_id
                LEFT JOIN ceragen.admin_patient pat ON i.inv_patient_id = pat.pat_id
                LEFT JOIN ceragen.admin_person p_patient ON pat.pat_person_id = p_patient.per_id
                WHERE i.inv_id = %s;
            """
            header_result = DataBaseHandle.getRecords(sql_header, 1, (invoice_id,))

            if not header_result['result'] or not header_result['data']:
                 raise Exception(f"No se encontró la factura con ID {invoice_id}.")
            
            invoice_data = header_result['data']

            # 2. Obtener los detalles de la factura
            sql_details = """
                SELECT
                    d.ind_quantity, d.ind_unit_price, d.ind_total,
                    p.pro_name, p.pro_description
                FROM ceragen.admin_invoice_detail d
                JOIN ceragen.admin_product p ON d.ind_product_id = p.pro_id
                WHERE d.ind_invoice_id = %s;
            """
            details_result = DataBaseHandle.getRecords(sql_details, 0, (invoice_id,))

            if not details_result['result']:
                raise Exception(f"Error al obtener los detalles de la factura: {details_result['message']}")

            # Convertir datos no serializables
            for key, value in invoice_data.items():
                if isinstance(value, datetime):
                    invoice_data[key] = value.isoformat()
                if isinstance(value, Decimal):
                    invoice_data[key] = float(value)

            for row in details_result['data']:
                for key, value in row.items():
                    if isinstance(value, Decimal):
                        row[key] = float(value)
            
            invoice_data['details'] = details_result['data']

            return internal_response(True, invoice_data, "Factura obtenida exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def update_state(datos, user):
        try:
            # Esta consulta actualiza el estado de la factura y registra quién y cuándo la anuló.
            sql = """
                UPDATE ceragen.admin_invoice
                SET 
                    inv_state = %s,
                    user_deleted = %s,
                    date_deleted = NOW()
                WHERE inv_id = %s;
            """
            record = (
                datos['inv_state'],
                user,
                datos['inv_id']
            )
            
            result = DataBaseHandle.ExecuteNonQuery(sql, record)
            
            if not result['result']:
                raise Exception(f"Error al actualizar el estado de la factura: {result['message']}")

            return internal_response(True, {"updated_invoice_id": datos['inv_id']}, "Estado de la factura actualizado exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def get_sales_for_today():
        try:
            # La consulta ahora usa CURRENT_DATE para obtener las ventas del día actual.
            sql = """
                SELECT 
                    SUM(i.inv_grand_total) as total_sales,
                    COUNT(i.inv_id) as total_invoices
                FROM ceragen.admin_invoice i
                WHERE CAST(i.inv_date AS DATE) = CURRENT_DATE;
            """
            # No se necesita 'record' porque no hay parámetros en la consulta
            result = DataBaseHandle.getRecords(sql, 1)

            if not result['result']:
                raise Exception(f"Error al obtener las ventas de hoy: {result['message']}")

            sales_data = result['data']

            # Si no hay ventas, SUM devuelve NULL. Lo convertimos a 0.
            if sales_data['total_sales'] is None:
                sales_data['total_sales'] = 0.0

            if isinstance(sales_data.get('total_sales'), Decimal):
                sales_data['total_sales'] = float(sales_data['total_sales'])

            return internal_response(True, sales_data, "Ventas del día actual obtenidas exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)   

    @staticmethod
    def get_weekly_sales_by_day():
        try:
            sql = """
                WITH week_days AS (
                    SELECT day::date
                    FROM generate_series(
                        date_trunc('week', CURRENT_DATE),
                        date_trunc('week', CURRENT_DATE) + interval '6 days',
                        '1 day'
                    ) as day
                )
                SELECT 
                    to_char(wd.day, 'YYYY-MM-DD') as sale_date,
                    COALESCE(SUM(i.inv_grand_total), 0.0) as total_sales
                FROM week_days wd
                LEFT JOIN ceragen.admin_invoice i ON CAST(i.inv_date AS DATE) = wd.day
                GROUP BY wd.day
                ORDER BY wd.day;
            """
            result = DataBaseHandle.getRecords(sql, 0)

            if not result['result']:
                raise Exception(f"Error al obtener el desglose de ventas semanales: {result['message']}")

            # Convertir los valores Decimal a float para la serialización JSON
            for row in result['data']:
                if isinstance(row.get('total_sales'), Decimal):
                    row['total_sales'] = float(row['total_sales'])

            return internal_response(True, result['data'], "Desglose de ventas semanales obtenido exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def send_invoice_by_email(invoice_id):
        try:
            # 1. Obtener los datos completos de la factura (que ahora incluyen el email)
            invoice_data_result = InvoiceComponent.get_by_id(invoice_id)
            if not invoice_data_result['result']:
                raise Exception(f"No se pudieron obtener los datos de la factura: {invoice_data_result['message']}")
            
            invoice_data = invoice_data_result['data']
            client_email = invoice_data.get('client_email')

            if not client_email:
                raise Exception("El cliente no tiene un correo electrónico registrado.")

            # 2. Generar el PDF en memoria
            pdf_buffer = generate_invoice_pdf(invoice_data)

            # 3. Preparar y enviar el correo
            asunto = f"Factura {invoice_data.get('inv_number', '')} de su Terapia"
            cuerpo = f"<h1>Estimado/a {invoice_data.get('client_name', '')},</h1><p>Adjunto encontrará la factura de su reciente servicio.</p><p>Gracias por su confianza.</p>"
            filename = f"Factura-{invoice_data.get('inv_number', 'N_A')}.pdf"

            success, message = send_email_with_attachment(client_email, asunto, cuerpo, pdf_buffer, filename)
            
            if not success:
                raise Exception(f"Error al enviar el correo: {message}")

            return internal_response(True, {"sent_to": client_email}, "Factura enviada por correo exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

#=====================================================================
# PAYMENT METHOD COMPONENT
#=====================================================================
class PaymentMethodComponent:
    @staticmethod
    def get_all():
        try:
            # Consulta todos los métodos de pago que estén activos
            sql = "SELECT pme_id, pme_name, pme_description FROM ceragen.admin_payment_method WHERE pme_state = true;"
            result = DataBaseHandle.getRecords(sql, 0)

            if not result['result']:
                raise Exception(f"Error al obtener las formas de pago: {result['message']}")

            return internal_response(True, result['data'], "Formas de pago obtenidas exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

#=====================================================================
#Tabla Pagos y Abonos
#=====================================================================
class PaymentComponent:
    @staticmethod
    def create(datos, user):
        result, data, message = False, None, None
        try:
            sql = """
                INSERT INTO ceragen.admin_invoice_payment
                (inp_invoice_id, inp_payment_method_id, inp_amount, inp_reference, inp_proof_image_path, user_created, date_created)
                VALUES (%s, %s, %s, %s, %s, %s, NOW())
            """
            record = (
                datos['inp_invoice_id'],
                datos['inp_payment_method_id'],
                datos['inp_amount'],
                datos.get('inp_reference'),
                datos.get('inp_proof_image_path'),
                user
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al crear el pago: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def get_by_invoice_id(invoice_id):
        result, data, message = False, None, None
        try:
            sql = """
                SELECT ip.inp_id, ip.inp_amount, ip.inp_reference, pm.pme_name as payment_method, ip.date_created
                FROM ceragen.admin_invoice_payment ip
                JOIN ceragen.admin_payment_method pm ON ip.inp_payment_method_id = pm.pme_id
                WHERE ip.inp_invoice_id = %s AND ip.inp_state = true
            """
            record = (invoice_id,)
            resultado = DataBaseHandle.getRecords(sql, 0, record)
            if resultado['result']:
                # Itera sobre cada fila para convertir tipos de datos no serializables
                for row in resultado['data']:
                    # Convierte Decimal a float
                    if isinstance(row.get('inp_amount'), Decimal):
                        row['inp_amount'] = float(row['inp_amount'])
                    if isinstance(row.get('date_created'), datetime):
                        row['date_created'] = row['date_created'].isoformat()
                
                result, data = True, resultado['data']
            else:
                message = 'Error al obtener los pagos -> ' + resultado['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def update(datos, user):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_invoice_payment SET
                inp_invoice_id = %s,
                inp_payment_method_id = %s,
                inp_amount = %s,
                inp_reference = %s,
                inp_proof_image_path = %s,
                user_modified = %s,
                date_modified = NOW()
                WHERE inp_id = %s
            """
            record = (
                datos['inp_invoice_id'],
                datos['inp_payment_method_id'],
                datos['inp_amount'],
                datos.get('inp_reference'),
                datos.get('inp_proof_image_path'),
                user,
                datos['inp_id']
            )
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al actualizar el pago: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)

    @staticmethod
    def logicDelete(datos, user):
        result, data, message = False, None, None
        try:
            sql = """
                UPDATE ceragen.admin_invoice_payment SET inp_state = %s, user_deleted = %s, date_deleted = NOW() WHERE inp_id = %s
            """
            record = (datos['inp_state'], user, datos['inp_id'])
            data_NonQuery = DataBaseHandle.ExecuteNonQuery(sql, record)
            if data_NonQuery['result']:
                result, data = True, data_NonQuery['data']
            else:
                message = "Error al eliminar el pago: " + data_NonQuery['message']
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
        return internal_response(result, data, message)
    
#=====================================================================
# SCHEDULING COMPONENT
#=====================================================================
class SchedulingComponent:
    @staticmethod
    def get_available_sessions_for_patient(patient_id):
        try:
            # --- CONSULTA CORREGIDA ---
            # Ahora devuelve sesiones individuales que no están consumidas ni agendadas.
            sql = """
                SELECT
                    sc.sec_id,
                    inv.inv_number,
                    prod.pro_name,
                    sc.sec_ses_number
                FROM ceragen.admin_invoice inv
                JOIN ceragen.clinic_session_control sc ON inv.inv_id = sc.sec_inv_id
                JOIN ceragen.admin_product prod ON sc.sec_pro_id = prod.pro_id
                WHERE inv.inv_patient_id = %s
                  AND inv.inv_state = true
                  AND sc.ses_consumed = false
                  AND sc.sec_ses_agend_date IS NULL
                ORDER BY sc.sec_id;
            """
            record = (patient_id,)
            result = DataBaseHandle.getRecords(sql, 0, record)

            if not result['result']:
                raise Exception(f"Error al obtener las sesiones del paciente: {result['message']}")

            return internal_response(True, result['data'], "Sesiones disponibles del paciente obtenidas exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)
    
    @staticmethod
    def get_available_sessions_for_patient_WOState(patient_id):
        try:
            sql = """
                SELECT
                    sc.sec_id,
                    inv.inv_number,
                    prod.pro_name,
                    sc.sec_ses_number,
                    sc.date_modified -- Este es el campo que causa el error
                FROM ceragen.admin_invoice inv
                JOIN ceragen.clinic_session_control sc ON inv.inv_id = sc.sec_inv_id
                JOIN ceragen.admin_product prod ON sc.sec_pro_id = prod.pro_id
                WHERE inv.inv_patient_id = %s -- Se usa el parámetro en lugar de un valor fijo
                  AND sc.ses_consumed = true
                  AND sc.sec_ses_agend_date IS NOT NULL
                ORDER BY sc.sec_id;
            """
            # Se corrige para usar el patient_id que llega como parámetro
            record = (patient_id,)
            result = DataBaseHandle.getRecords(sql, 0, record)

            if not result['result']:
                raise Exception(f"Error al obtener las sesiones del paciente: {result['message']}")

            # --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
            # Se itera sobre los resultados para convertir la fecha a texto
            for row in result['data']:
                if isinstance(row.get('date_modified'), datetime):
                    row['date_modified'] = row['date_modified'].isoformat()
            # ------------------------------------

            return internal_response(True, result['data'], "Sesiones disponibles del paciente obtenidas exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def schedule_session(datos, user):
        try:
            session_id = datos['session_id']
            therapist_id = datos['therapist_id']
            
            # Convertimos el string de la fecha a un objeto datetime
            scheduled_datetime_str = datos['scheduled_datetime']
            scheduled_datetime_obj = datetime.fromisoformat(scheduled_datetime_str)

            # 1. Validar el horario de la cita
            if scheduled_datetime_obj.weekday() > 4:
                raise Exception("No se puede agendar en fines de semana.")
            
            if not (8 <= scheduled_datetime_obj.hour < 17):
                raise Exception("El horario debe ser entre las 8:00 AM y las 4:59 PM.")

            # 2. Consultar si ya existe una cita para ese terapeuta a esa misma hora
            sql_check_conflict = """
                SELECT sec_id FROM ceragen.clinic_session_control
                WHERE sec_med_staff_id = %s AND sec_ses_agend_date = %s;
            """
            conflict_result = DataBaseHandle.getRecords(sql_check_conflict, 1, (therapist_id, scheduled_datetime_obj))
            
            if conflict_result['result'] and conflict_result['data']:
                raise Exception(f"El terapeuta ya tiene una cita agendada a las {scheduled_datetime_obj.strftime('%Y-%m-%d %H:%M')}.")
            
            # 3. Agendar la sesión
            sql_schedule = """
                UPDATE ceragen.clinic_session_control
                SET 
                    sec_ses_agend_date = %s,
                    sec_med_staff_id = %s,
                    user_modified = %s,
                    date_modified = NOW()
                WHERE sec_id = %s AND sec_ses_agend_date IS NULL;
            """
            schedule_record = (
                scheduled_datetime_obj,
                therapist_id,
                user,
                session_id
            )
            
            # Se invierte el orden para que sea (query, record)
            update_result = DataBaseHandle.ExecuteNonQuery(sql_schedule, schedule_record)
            
            if not update_result['result']:
                 raise Exception(f"No se pudo agendar la sesión: {update_result['message']}")

            return internal_response(True, {"scheduled_session_id": session_id}, "Sesión agendada exitosamente.")

        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def get_scheduled_sessions_for_week():
        try:
            # Esta consulta busca sesiones que tienen una fecha de agendamiento
            # y que pertenecen a la semana actual.
            sql = """
                SELECT 
                    sc.sec_id,
                    sc.sec_ses_agend_date as appointment_datetime,
                    p_patient.per_names || ' ' || p_patient.per_surnames as patient_name,
                    p_medic.per_names || ' ' || p_medic.per_surnames as therapist_name,
                    prod.pro_name as therapy_name
                FROM ceragen.clinic_session_control sc
                JOIN ceragen.admin_invoice inv ON sc.sec_inv_id = inv.inv_id
                JOIN ceragen.admin_patient pat ON inv.inv_patient_id = pat.pat_id
                JOIN ceragen.admin_person p_patient ON pat.pat_person_id = p_patient.per_id
                LEFT JOIN ceragen.admin_medical_staff med ON sc.sec_med_staff_id = med.med_id
                LEFT JOIN ceragen.admin_person p_medic ON med.med_person_id = p_medic.per_id
                LEFT JOIN ceragen.admin_product prod ON sc.sec_pro_id = prod.pro_id
                WHERE sc.sec_ses_agend_date >= DATE_TRUNC('week', CURRENT_DATE)
                  AND sc.sec_ses_agend_date < DATE_TRUNC('week', CURRENT_DATE) + interval '7 days'
                ORDER BY sc.sec_ses_agend_date;
            """
            result = DataBaseHandle.getRecords(sql, 0)

            if not result['result']:
                raise Exception(f"Error al obtener las sesiones agendadas: {result['message']}")

            # Convertir los objetos datetime a string para ser compatibles con JSON
            for row in result['data']:
                if isinstance(row.get('appointment_datetime'), datetime):
                    row['appointment_datetime'] = row['appointment_datetime'].isoformat()

            return internal_response(True, result['data'], "Sesiones de la semana obtenidas exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def get_all_scheduled_sessions():
        try:
            # Busca todas las sesiones que tengan una fecha de agendamiento.
            sql = """
                SELECT 
                    sc.sec_id,
                    sc.sec_ses_agend_date as appointment_datetime,
                    p_patient.per_names || ' ' || p_patient.per_surnames as patient_name,
                    p_medic.per_names || ' ' || p_medic.per_surnames as therapist_name,
                    prod.pro_name as therapy_name,
                    sc.ses_consumed
                FROM ceragen.clinic_session_control sc
                JOIN ceragen.admin_invoice inv ON sc.sec_inv_id = inv.inv_id
                JOIN ceragen.admin_patient pat ON inv.inv_patient_id = pat.pat_id
                JOIN ceragen.admin_person p_patient ON pat.pat_person_id = p_patient.per_id
                LEFT JOIN ceragen.admin_medical_staff med ON sc.sec_med_staff_id = med.med_id
                LEFT JOIN ceragen.admin_person p_medic ON med.med_person_id = p_medic.per_id
                LEFT JOIN ceragen.admin_product prod ON sc.sec_pro_id = prod.pro_id
                WHERE sc.sec_ses_agend_date IS NOT NULL
                ORDER BY sc.sec_ses_agend_date DESC;
            """
            result = DataBaseHandle.getRecords(sql, 0)

            if not result['result']:
                raise Exception(f"Error al obtener todas las sesiones agendadas: {result['message']}")

            # Convertir los objetos datetime a string
            for row in result['data']:
                if isinstance(row.get('appointment_datetime'), datetime):
                    row['appointment_datetime'] = row['appointment_datetime'].isoformat()

            return internal_response(True, result['data'], "Todas las sesiones agendadas obtenidas exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def update_scheduled_session(datos, user):
        try:
            session_id = datos['session_id']
            therapist_id = datos['therapist_id']

            # Convertir manualmente el string a un objeto datetime ---
            scheduled_datetime_str = datos['scheduled_datetime']
            scheduled_datetime_obj = datetime.fromisoformat(scheduled_datetime_str)

            # 1. Validar el nuevo horario de la cita
            if scheduled_datetime_obj.weekday() > 4:
                raise Exception("No se puede reagendar en fines de semana.")

            if not (8 <= scheduled_datetime_obj.hour < 17):
                raise Exception("El nuevo horario debe ser entre las 8:00 AM y las 4:59 PM.")

            # 2. Verificar conflictos para el nuevo horario, excluyendo la cita actual
            sql_check_conflict = """
                SELECT sec_id FROM ceragen.clinic_session_control
                WHERE sec_med_staff_id = %s 
                  AND sec_ses_agend_date = %s
                  AND sec_id != %s;
            """
            conflict_result = DataBaseHandle.getRecords(sql_check_conflict, 1, (therapist_id, scheduled_datetime_obj, session_id))

            if conflict_result['result'] and conflict_result['data']:
                raise Exception(f"El terapeuta ya tiene otra cita agendada a las {scheduled_datetime_obj.strftime('%Y-%m-%d %H:%M')}.")

            # 3. Si todo es válido, actualizar la sesión
            sql_update = """
                UPDATE ceragen.clinic_session_control
                SET 
                    sec_ses_agend_date = %s,
                    sec_med_staff_id = %s,
                    user_modified = %s,
                    date_modified = NOW()
                WHERE sec_id = %s;
            """
            update_record = (
                scheduled_datetime_obj,
                therapist_id,
                user,
                session_id
            )

            update_result = DataBaseHandle.ExecuteNonQuery(sql_update, update_record)

            if not update_result['result']:
                 raise Exception(f"No se pudo actualizar la cita: {update_result['message']}")

            return internal_response(True, {"updated_session_id": session_id}, "Cita actualizada exitosamente.")

        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)

    @staticmethod
    def consume_session(session_id, user):
        try:
            # Esta consulta actualiza el estado de la sesión a 'consumida' (true)
            sql = """
                UPDATE ceragen.clinic_session_control
                SET 
                    ses_consumed = true,
                    user_modified = %s,
                    date_modified = NOW()
                WHERE sec_id = %s AND ses_consumed = false; -- Solo consume sesiones que no estén consumidas
            """
            record = (user, session_id)
            
            result = DataBaseHandle.ExecuteNonQuery(sql, record)
            
            if not result['result']:
                raise Exception(f"Error al marcar la sesión como consumida: {result['message']}")

            # verificar si eran las últimas sesiones
            # de un paquete para inactivarlo

            return internal_response(True, {"consumed_session_id": session_id}, "Sesión marcada como consumida exitosamente.")
        except Exception as err:
            message = str(err)
            HandleLogs.write_error(message)
            return internal_response(False, None, message)
