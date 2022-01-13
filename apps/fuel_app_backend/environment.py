import os

JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM", "HS256")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
JWT_MINUTES_EXPIRES = int(os.environ.get("JWT_MINUTES_EXPIRES", "15"))
