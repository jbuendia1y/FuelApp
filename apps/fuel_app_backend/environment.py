import os

SQLALCHEMY_DATABASE_URL = os.environ.get(
    "SQLALCHEMY_DATABASE_URL", "sqlite:///./sql_app.db")

JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM", "HS256")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
JWT_MINUTES_EXPIRES = int(os.environ.get("JWT_MINUTES_EXPIRES", "15"))

DROPBOX_API_KEY = os.environ.get("DROPBOX_API_KEY", None)
DROPBOX_API_FOLDER = os.environ.get(
    "DROPBOX_API_FOLDER", "Fuel App Data Folder")

ENTERPRISE_NAME = os.environ.get("ENTERPRISE_NAME")
DEFAULT_PASSWORD = os.environ.get("DEFAULT_PASSWORD")

FORMS_FOLDER_NAME = os.environ.get("FORMS_FOLDER_NAME", "formularios")

FRONTEND_APP_URL = os.environ.get("FRONTEND_APP_URL", "http://localhost:3000")

ITEMS_PER_PAGE = os.environ.get("ITEMS_PER_PAGE",15)
