import os

JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM", "HS256")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
JWT_MINUTES_EXPIRES = int(os.environ.get("JWT_MINUTES_EXPIRES", "15"))

DROPBOX_API_KEY = os.environ.get("DROPBOX_API_KEY")
DROPBOX_API_FOLDER = os.environ.get(
    "DROPBOX_API_FOLDER", "Fuel App Data Folder")
ENTERPRISE_NAME = os.environ.get("ENTERPRISE_NAME")
