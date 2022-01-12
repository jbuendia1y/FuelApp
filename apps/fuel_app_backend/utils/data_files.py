import os


def list_data_files():
    files = []
    for file in os.listdir("data"):
        if file.startswith(".") == False:
            files.append(file)

    return files


def get_placa_from_file_name(filename: str):
    return filename.split(" ")[3].split(".")[0]
