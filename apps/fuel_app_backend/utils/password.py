import bcrypt


def hash_password(password: str):
    b_password = str.encode(password)
    salt = bcrypt.gensalt(10)
    h_password = bcrypt.hashpw(b_password, salt).decode()

    return h_password


def compare_password(password: str, db_password: str):
    is_equal = bcrypt.checkpw(str.encode(password), str.encode(db_password))
    return is_equal
