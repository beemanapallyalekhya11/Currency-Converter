from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    from_currency = data['from']
    to_currency = data['to']
    amount = float(data['amount'])

    # Use an exchange rate API (you can use your own key and service here)
    url = f"https://api.exchangerate-api.com/v4/latest/{from_currency}"
    response = requests.get(url)
    rates = response.json().get('rates', {})

    rate = rates.get(to_currency)
    if rate:
        result = round(rate * amount, 2)
        return jsonify({"result": result, "rate": rate})
    else:
        return jsonify({"result": None, "rate": None})

if __name__ == '__main__':
    app.run(debug=True)
