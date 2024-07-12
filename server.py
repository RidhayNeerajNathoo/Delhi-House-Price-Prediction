from flask import Flask, request, jsonify
import util

app = Flask(__name__)

# Load saved artifacts when the Flask app starts
util.load_saved_artifacts()

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    try:
        total_sqft = float(request.form['Area'])
        location = request.form['Location']
        bhk = int(request.form['BHK'])
        bath = int(request.form['Bathroom'])
        furnished = int(request.form['Furnishing'])
        parking = int(request.form['Parking'])
        status = int(request.form['Status'])
        transaction = int(request.form['Transaction'])
        type = int(request.form['Type'])

        estimated_price = util.get_estimated_price(total_sqft, bhk, bath, furnished, parking, status, transaction, type, location)

        response = jsonify({
            'estimated_price': estimated_price
        })
    except Exception as e:
        response = jsonify({
            'error': str(e)
        })

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/')
def index():
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append(str(rule))
    return jsonify(routes)

import logging
logging.basicConfig(level=logging.DEBUG)

@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())

if __name__ == "__main__":
    print("Starting python flask server for Home Price Prediction")
    app.run(debug=True, port=5003)
