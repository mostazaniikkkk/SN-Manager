from abc import abstractmethod
from _selenium_core import Core

class Ticket(Core):
    def __init__(self, body, category, model, action, client, contact, type, branch, group, resume, description):
        super().__init__()

        self.body = body
        self.category = category
        self.model = model
        self.action = action
        self.client = client
        self.contact = contact
        self.type = type
        self.branch = branch
        self.group = group
        self.resume = resume
        self.description = description

        self.ticket_number = self.upload_ticket()
    
    @abstractmethod
    def upload_ticket(self): pass

    def _get_generic_containers(self, type):
        self.official_container = self.element(f"sys_display.{type}.caller_id")  # Nombre de funcionario
        self.branch_container = self.element(f"sys_display.{type}.location")  # Sucursal
        self.group_container = self.element(f"sys_display.{type}.assignment_group")  # Mesa encargada
        self.user_container = self.element(f"sys_display.{type}.assigned_to")  # Nombre de usuario
        self.state_container = self.element(f"label.{type}.state")  # Estado del ticket
        self.substate_container = self.element(f"label.{type}.u_std_substate")  # Motivo del estado
        self.resume_container = self.element(f"{type}.short_description")  # Resumen
        self.description_container = self.element(f"{type}.description")  # Descripción

        self.save_button = self.element("wa_dfct_insert")  # Botón de guardar