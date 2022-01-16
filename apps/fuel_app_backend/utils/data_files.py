import os
import environment


def list_forms_data_files():
    files = [file for file in os.listdir(
        f"data/{environment.FORMS_FOLDER_NAME}")]
    return files


def list_main_data_files():
    files = []
    for file in os.listdir("data"):
        if file.startswith(".") == False:
            files.append(file)

    return files


def get_placa_from_file_name(filename: str):
    return filename.split(" ")[3].split(".")[0]
