from dataclasses import dataclass
import os
import environment
import dropbox
from utils.data_files import list_main_data_files

dbx = dropbox.Dropbox(environment.DROPBOX_API_KEY)

FOLDER_DATA_PATH = f"/{environment.DROPBOX_API_FOLDER}/{environment.ENTERPRISE_NAME}"


@dataclass
class DropboxFile:
    path: str
    filename: str


def get_excel_files(path: str = None):
    current_path = FOLDER_DATA_PATH

    if path:
        current_path += path

    files = [DropboxFile(file.path_display, file.name) for file in dbx.files_list_folder(
        current_path).entries]
    return files


def download_excel_files():
    os.mkdir(f"data/{environment.FORMS_FOLDER_NAME}")
    forms_files = get_excel_files(f"/{environment.FORMS_FOLDER_NAME}")
    for file in forms_files:
        metadata, res = dbx.files_download(file.path)
        with open(f"data/{environment.FORMS_FOLDER_NAME}/{file.filename}", "wb") as f:
            f.write(res.content)

    main_files = get_excel_files()
    for file in main_files:
        if file.filename.endswith(".xlsx") == False:
            continue
        metadata, res = dbx.files_download(file.path)
        with open(f"data/{file.filename}", "wb") as f:
            f.write(res.content)


def init_download():
    if len(list_main_data_files()) == 0:
        download_excel_files()
    else:
        print("FILES ALREDY EXIST")
