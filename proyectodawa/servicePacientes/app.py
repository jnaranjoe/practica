import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_swagger_ui import get_swaggerui_blueprint
from src.utils.general.logs import HandleLogs
from src.api.Routes.api_routes import load_routes

app = Flask(__name__)
allowed_origins = [
    "*", # El comodín es útil si la IP cambia
    "http://localhost:5173", # Para tu desarrollo local
    "http://100.83.120.45" # La IP de Tailscale de tu máquina frontend
]

# Configuración de CORS con una lista de orígenes permitidos
CORS(app, resources={r"/*": {"origins": allowed_origins, "supports_credentials": True}})

api = Api(app)
load_routes(api)

#definiciones del swagger
SWAGGER_URL = '/ws/secoed/'
API_URL = '/static/swagger.json'

SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(SWAGGER_URL, API_URL,
                                              config={
                                                  'app_name': 'secoed-ws-restfulapi'
                                              })

app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

if __name__ == '__main__':
    try:
        HandleLogs.write_log("Servicio Iniciado")
        port = int(os.environ.get('PORT', 5003))
        app.run(debug=True, host='0.0.0.0', port=port, threaded=True)

    except Exception as err:
        HandleLogs.write_error(err)
    finally:
        HandleLogs.write_log("Servicio Finalizado")
