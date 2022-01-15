from dataclasses import dataclass
import environment
import dropbox
from utils.data_files import list_data_files

dbx = dropbox.Dropbox(environment.DROPBOX_API_KEY)

FOLDER_DATA_PATH = f"/{environment.DROPBOX_API_FOLDER}/{environment.ENTERPRISE_NAME}"


@dataclass
class DropboxFile:
    path: str
    filename: str


def get_excel_files():
    files = [DropboxFile(file.path_display, file.name) for file in dbx.files_list_folder(
        FOLDER_DATA_PATH).entries]
    return files


def download_excel_files():
    files = get_excel_files()
    for file in files:
        metadata, res = dbx.files_download(file.path)
        with open(f"data/{file.filename}", "wb") as f:
            f.write(res.content)


def init_download():
    if len(list_data_files()) == 0:
        download_excel_files()
    else:
        print("FILES ALREDY EXIST")
