import platform
import os
import subprocess
import requests

# Detectar el sistema operativo
operating_system = platform.system()
print(f"El sistema operativo es: {operating_system}")

# Función para instalar paquetes con pip
def install_package(pip, package):
    subprocess.check_call([pip, "install", package])

# Descargar geckodriver y guardarlo en la carpeta backend/selenium
def download_geckodriver():
    geckodriver_url = "https://github.com/mozilla/geckodriver/releases/latest/download/geckodriver-v0.35.0-win32.zip"
    response = requests.get(geckodriver_url)
    os.makedirs("backend/selenium", exist_ok=True)
    with open("backend/selenium/geckodriver.zip", "wb") as file:
        file.write(response.content)
    print("Download complete. Saved in backend/selenium.")

# Instalar paquetes necesarios
try:
    if operating_system == "Windows":
        install_package("pip", "selenium")
        install_package("pip", "flask")
        install_package("pip", "pandas")
        download_geckodriver()
    else:
        # Instalar geckodriver con el gestor de paquetes adecuado
        if os.path.exists('/etc/debian_version'):
            subprocess.check_call(['sudo', 'apt', 'install', '-y', 'python3-selenium', 'python3-flask', 'python3-pandas', 'geckodriver'])
        elif os.path.exists('/etc/fedora-release'):
            subprocess.check_call(['sudo', 'dnf', 'install', '-y', 'python3-selenium', 'python3-flask', 'python3-pandas', 'geckodriver'])
        elif os.path.exists('/etc/arch-release'):
            subprocess.check_call(['sudo', 'pacman', '-S', '--noconfirm', 'python-selenium', 'python-flask', 'python-pandas', 'geckodriver'])
        else:
            print("Linux distribution not supported for automatic installation of geckodriver.")
except Exception as e:
    print(f"Error installing packages: {e}")
