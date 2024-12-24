import time
from _ticket import Ticket, entel_url, config_data

class INC(Ticket):
    def upload_ticket(self):
        super().upload_ticket()

        self._driver.get(f'{entel_url}/now/nav/ui/classic/params/target/incident.do%3Fsys_id%3D-1%26sysparm_query%3Dsysparm_view_forced%253dtrue%26sysparm_stack%3Dincident_list.do%26sysparm_view%3DDefault%2Bview%26sysparm_view_forced%3Dtrue')
        time.sleep(10)