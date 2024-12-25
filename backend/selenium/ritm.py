import time
from _ticket import Ticket, entel_url, config_data

class RITM(Ticket):
    def __init__(self, body, category, model, action, client, contact, type):
        super().__init__(body, category, model, action, client, contact, type)

        self.catalogue = {
            "negocio_software": "sys_id=0be4c2cd1b8a7810a835524f034bcbbe&sysparm_category=d556b8151b1734509a3154ee034bcb02",
            "documentacion": "sys_id=3884614e1b197010a835524f034bcb4f&sysparm_category=null&catalog_id=-1",
            "gestion": "sys_id=55782ef71beaec101df3bb7f034bcbd2&sysparm_category=null&catalog_id=-1",
            "negocio_cliente": "sys_id=07d9052c1b997410a835524f034bcbd2&sysparm_category=null&catalog_id=-1"
        }

    def upload_ticket(self):
        super().upload_ticket()

        self._driver.get(f'{entel_url}/sp?id=sc_category&')
        time.sleep(10)

        #Media paja hacer el procedimiento altiro xD