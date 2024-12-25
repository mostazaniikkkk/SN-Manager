import time
from _ticket import Ticket, entel_url, config_data
from selenium.webdriver.support.ui import Select

#Objetivamente es mucho mas facil hacer INC que RITM XD
class INC(Ticket):
    def upload_ticket(self):
        super().upload_ticket()

        self.loadUrl(f'{entel_url}/now/nav/ui/classic/params/target/incident.do%3Fsys_id%3D-1%26sysparm_query%3Dsysparm_view_forced%253dtrue%26sysparm_stack%3Dincident_list.do%26sysparm_view%3DDefault%2Bview%26sysparm_view_forced%3Dtrue')
        time.sleep(10)

        self._get_generic_containers(self, "incident")

        def save():
            self.save_button.click()
            time.sleep(5)

        #Asignacion basica de elementos
        self.official_container.send_keys(self.client)
        self.branch_container.send_keys(self.branch)
        self.resume_container.send_keys(self.resume)
        self.description_container.send_keys(self.description)
        self.group_container.send_keys("N1 - Mesa Idemia")
        self.user_container.send_keys(config_data["full_name"])
        #Agregar notas de trabajo y categorizacion

        save()
        #Se valida el tipo de mesa para determinar que accion realizar
        if self.group == "N1 - Mesa Idemia":
            #Se coloca el punto en notas de trabajo
            save()

            #Se coloca el ID de la opcion "Resuelto/Sin intervencion tecnica" y se colocan los argumentos necesarios
        else:
            #Se asigna a la mesa derivada y se guarda
            self.group_container.send_keys(self.group)
            Select(self.state_container).select_by_value("1") #Estado 1 es nuevo

        save()