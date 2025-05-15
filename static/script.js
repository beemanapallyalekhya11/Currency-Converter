const currencyList = {
  "USD": "us",
  "INR": "in",
  "EUR": "eu",
  "GBP": "gb",
  "JPY": "jp",
  "AUD": "au",
  "CAD": "ca",
  "CHF": "ch",
  "CNY": "cn",
  "NPR": "np",
  "SGD": "sg",
  "RUB": "ru",
  "ZAR": "za",
  "BRL": "br",
  "MXN": "mx",
  "SEK": "se"
};

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const resultDisplay = document.getElementById("result");

// Populate dropdowns and flags
function populateDropdowns() {
  for (const currency in currencyList) {
    const option1 = document.createElement("option");
    option1.value = option1.text = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = option2.text = currency;
    toCurrency.appendChild(option2);
  }

  fromCurrency.value = "USD";
  toCurrency.value = "NPR";

  updateFlags();
}

function updateFlags() {
  fromFlag.src = `https://flagcdn.com/48x36/${currencyList[fromCurrency.value]}.png`;
  toFlag.src = `https://flagcdn.com/48x36/${currencyList[toCurrency.value]}.png`;
}

function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateFlags();
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

async function convertCurrency() {
  const amount = document.getElementById("amount").value.trim();
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || isNaN(amount)) {
    resultDisplay.innerHTML = `<span class="text-danger">Please enter a valid amount.</span>`;
    return;
  }

  try {
    const res = await fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, amount })
    });

    const data = await res.json();

    if (data.result && data.rate) {
      resultDisplay.innerHTML = `
        <div>${amount} ${from} = ${data.result} ${to}</div>
        <small>Rate: 1 ${from} = ${data.rate} ${to}</small>
      `;
    } else {
      resultDisplay.innerHTML = `<span class="text-danger">Conversion failed.</span>`;
    }
  } catch (err) {
    resultDisplay.innerHTML = `<span class="text-danger">Error: ${err.message}</span>`;
  }
}

populateDropdowns();
