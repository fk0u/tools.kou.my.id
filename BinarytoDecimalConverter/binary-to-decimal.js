function convert() {
    const inputType = document.getElementById('inputType').value;
    const outputType = document.getElementById('outputType').value;
    const inputValue = document.getElementById('inputValue').value.trim();
    const output = document.getElementById('output');

    if (inputType === outputType) {
        output.textContent = `Input and output types are the same.`;
        return;
    }

    if (inputType === 'binary' && outputType === 'decimal') {
        if (/^[01]+$/.test(inputValue)) {
            const decimalValue = parseInt(inputValue, 2);
            output.textContent = `Decimal Value: ${decimalValue}`;
        } else {
            output.textContent = 'Invalid binary number. Please enter only 0 or 1.';
        }
    } else if (inputType === 'decimal' && outputType === 'binary') {
        if (/^\d+$/.test(inputValue)) {
            const binaryValue = parseInt(inputValue, 10).toString(2);
            output.textContent = `Binary Value: ${binaryValue}`;
        } else {
            output.textContent = 'Invalid decimal number. Please enter a valid number.';
        }
    }
}

function goBack() {
    window.history.back();
}
