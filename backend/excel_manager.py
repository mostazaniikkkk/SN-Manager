import pandas as pd
import json
import requests
from io import BytesIO

excel_url = 'https://docs.google.com/spreadsheets/d/1OzQQxuwDiw5SP2W-ixiQ7hOprbLCd696/export?format=xlsx'

def excel_to_json():
    # Descarga el archivo Excel en la memoria
    response = requests.get(excel_url)
    xls = pd.ExcelFile(BytesIO(response.content))
    all_sheets_data = {}

    # Itera sobre cada hoja y almacena los datos en un diccionario
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name)
        df = df.replace({pd.NA: None})  # Reemplaza NaN con None (null en JSON)
        df = df.replace({float('nan'): None})  # Reemplaza valores NaN con None
        all_sheets_data[sheet_name] = df.to_dict(orient='records')

    # Convierte el diccionario a JSON asegurando la codificación correcta
    json_data = json.dumps(all_sheets_data, indent=4, ensure_ascii=False)
    return json_data

# Ejecutar pruebas solo si este archivo se ejecuta directamente
if __name__ == "__main__":
    json_result = excel_to_json()
    print(json_result)
