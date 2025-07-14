import os
import uuid
from flask import current_app

def save_payment_proof(file):
    """
    Guarda el archivo de comprobante de pago en el servidor y devuelve la ruta.
    """
    if not file or file.filename == '':
        return None

    # Crea un nombre de archivo único para evitar que se sobrescriban
    filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
    
    # current_app.root_path apunta a la carpeta raíz de la app (serviceAdmin)
    # y desde ahí construimos la ruta a la carpeta 'static'.
    upload_folder = os.path.join(current_app.root_path, 'static', 'uploads', 'payments')
    
    # Asegura que la carpeta de subida exista
    os.makedirs(upload_folder, exist_ok=True)
    
    file_path = os.path.join(upload_folder, filename)
    file.save(file_path)
    
    # Devuelve la ruta relativa que se guardará en la base de datos
    return os.path.join('uploads', 'payments', filename).replace("\\", "/")