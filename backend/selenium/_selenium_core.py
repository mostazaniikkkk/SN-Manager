from abc import ABC
import json, time
from selenium import webdriver

class Core(ABC):
    def __init__(self):
        with open("config.json", "r") as file:
            self.config_data = json.load(file)

        self.entel_url = f"https://{'entelqa' if self.config_data['service-now']['debug'] == 1 else 'entel'}.service-now.com/"
        self._driver = self._load()

        self.loadUrl(self, self.entel_url)

    def loadUrl(self, url):
        self._driver.get(url)
        time.sleep(5)

        current_url = self._driver.current_url
        if current_url == self.entel_url: self._login()

    def _load(self):
        gecko_path = "geckodriver.exe"
        options = webdriver.FirefoxOptions()

        driver = webdriver.Firefox(executable_path=gecko_path, options=options)

        return driver
    
    def _login(self):
        username = self._driver.find_element_by_id("user_name")
        password = self._driver.find_element_by_id("user_password")

        username.send_keys(f'{self.config_data["service-now"]["username"]}@entelcc.cl')
        password.send_keys(self.config_data["service-now"]["password"])

        button = self._driver.find_element_by_name("sysverb_login")
        button.click()

    def element(self, text): return self._driver.find_element_by_id(text)