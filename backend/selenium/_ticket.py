from abc import ABC, abstractmethod
import json, os, time
from selenium import webdriver

print(os.getcwd())
with open("config.json", "r") as file:
    config_data = json.load(file)

entel_url = f"https://{'entelqa' if config_data["service-now"]["debug"] == 1 else 'entel'}.service-now.com/"

class Ticket(ABC):
    def __init__(self, body, category, model, action, client, contact, type):
        self._driver = self._load()

        self.body = body
        self.category = category
        self.model = model
        self.action = action
        self.client = client
        self.contact = contact
        self.type = type
        self.ticket_number = self.upload_ticket()
    
    @abstractmethod
    def upload_ticket(self):
        self._load()

        time.sleep(5)

        current_url = self._driver.current_url
        if current_url == entel_url:
            self._login()

    def _load(self):
        gecko_path = "geckodriver.exe"
        options = webdriver.FirefoxOptions()

        driver = webdriver.Firefox(executable_path=gecko_path, options=options)
        driver.get(entel_url)

        return driver
    
    def _login(self):
        username = self._driver.find_element_by_id("user_name")
        password = self._driver.find_element_by_id("user_password")

        username.send_keys(f'{config_data["service-now"]["username"]}@entelcc.cl')
        password.send_keys(config_data["service-now"]["password"])

        button = self._driver.find_element_by_name("sysverb_login")
        button.click()

if __name__ == "__main__":
    print(entel_url)