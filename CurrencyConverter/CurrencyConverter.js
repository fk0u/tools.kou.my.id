async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const output = document.getElementById('output');

    if (amount === '' || fromCurrency === '' || toCurrency === '') {
        output.innerHTML = 'Please fill out all fields.';
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        
        if (rate) {
            const result = (amount * rate).toFixed(2);
            output.innerHTML = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        } else {
            output.innerHTML = 'Currency not found.';
        }
    } catch (error) {
        output.innerHTML = 'Error fetching exchange rates. Please try again later.';
    }
}

function goBack() {
    window.history.back();
}
