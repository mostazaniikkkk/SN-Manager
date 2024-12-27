import requests
import zipfile
import os

# URL del archivo ZIP del repositorio
repo_url = "https://github.com/mostazaniikkkk/SN-Manager/archive/refs/heads/main.zip"

# Nombre del archivo ZIP en el directorio actual
zip_path = "repositorio.zip"

# Descargar el archivo ZIP del repositorio
response = requests.get(repo_url)
with open(zip_path, "wb") as file:
    file.write(response.content)

# Extraer el contenido del archivo ZIP en el directorio actual
with zipfile.ZipFile(zip_path, "r") as zip_ref:
    zip_ref.extractall(".")

# Eliminar el archivo ZIP descargado
os.remove(zip_path)

print("El proyecto ha sido actualizado con éxito.")