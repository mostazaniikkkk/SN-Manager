from flask import Flask, render_template, send_from_directory
import backend.excel_manager as excel
import os

app = Flask(__name__)

@app.route('/ticket')
def home():
    return render_template('Loader/index.html')

@app.route('/mail')
def mail():
    return render_template('Mail activation/index.html')

@app.route('/excel_data')
def excel_data():
    return excel.excel_to_json()

@app.route('/src/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(app.root_path, 'templates/Loader/src'), filename)

if __name__ == '__main__':
    app.run(debug=True)
