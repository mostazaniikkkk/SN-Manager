from abc import ABC
import json
import time
import platform
import functools
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import WebDriverException

class Core(ABC):
    def __init__(self):
        with open("config.json", "r") as file:
            self.config_data = json.load(file)

        self.entel_url = f"https://{'entelqa' if self.config_data['service-now']['debug'] == 1 else 'entel'}.service-now.com/"
        self._driver = self._load()

        self.load_url(self.entel_url)

    def load_url(self, url):
        self._driver.get(url)
        time.sleep(5)

        current_url = self._driver.current_url
        if current_url == self.entel_url:
            self._login()

    def _load(self):
        options = Options()
        
        if platform.system() == "Windows":
            gecko_path = "geckodriver.exe"
            driver = webdriver.Firefox(executable_path=gecko_path, options=options)
        else:
            service = Service('/usr/bin/geckodriver')
            driver = webdriver.Firefox(service=service, options=options)
        return driver

    def _login(self):
        username = self._driver.find_element("id", "user_name")
        password = self._driver.find_element("id", "user_password")

        username.send_keys(f'{self.config_data["service-now"]["username"]}@entelcc.cl')
        password.send_keys(self.config_data["service-now"]["password"])

        button = self._driver.find_element("id", "sysverb_login")
        button.click()

    def element(self, text):
        return self._driver.find_element("id", text)

# Código de prueba para ejecutar el script y validar el flujo
if __name__ == "__main__":
    core = Core()
    print("Script ejecutado correctamente.")

    # Validar la carga de la URL
    core.load_url(core.entel_url)
    print("URL cargada correctamente.")

    # Validar la función de login
    core._login()
    print("Login ejecutado correctamente.")

    # Validar el acceso a un elemento específico
    try:
        elemento = core.element("algún_elemento_id")
        print(f"Elemento encontrado: {elemento.tag_name}")
    except Exception as e:
        print(f"Error al encontrar el elemento: {e}")
