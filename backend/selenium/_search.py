from _selenium_core import Core
from selenium.webdriver.support.ui import Select

class Search(Core):
    def __init__(self, url, filters):
        self.url = url
        self.values = self._searchByValue(filters)

    def _searchByValue(self, filters):
        self.loadUrl(self.url)

        searchbar = self._driver.find_element_by_class_name("search")
        filter_type = Select(self._driver.find_element_by_class_name("form-control default-focus-outline"))

        #Implementar filtros (son array y deberia hacerse con un Foreach)

        #Debe retornar la busqueda realizada
        return []