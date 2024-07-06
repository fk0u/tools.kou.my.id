function populateUnits() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    let options = '';

    switch (unitType) {
        case 'length':
            options = '<option value="meter">Meter</option><option value="kilometer">Kilometer</option><option value="centimeter">Centimeter</option><option value="millimeter">Millimeter</option><option value="mile">Mile</option><option value="yard">Yard</option><option value="foot">Foot</option><option value="inch">Inch</option>';
            break;
        case 'weight':
            options = '<option value="kilogram">Kilogram</option><option value="gram">Gram</option><option value="milligram">Milligram</option><option value="pound">Pound</option><option value="ounce">Ounce</option>';
            break;
        case 'volume':
            options = '<option value="liter">Liter</option><option value="milliliter">Milliliter</option><option value="gallon">Gallon</option><option value="quart">Quart</option><option value="pint">Pint</option><option value="cup">Cup</option><option value="fluid ounce">Fluid Ounce</option>';
            break;
        case 'temperature':
            options = '<option value="celsius">Celsius</option><option value="fahrenheit">Fahrenheit</option><option value="kelvin">Kelvin</option>';
            break;
        default:
            options = '';
    }

    fromUnit.innerHTML = options;
    toUnit.innerHTML = options;
}

function convertUnit() {
    const value = parseFloat(document.getElementById('value').value);
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const output = document.getElementById('output');

    if (isNaN(value) || !unitType || !fromUnit || !toUnit) {
        output.innerHTML = 'Please fill out all fields.';
        return;
    }

    let result;
    if (unitType === 'length') {
        result = convertLength(value, fromUnit, toUnit);
    } else if (unitType === 'weight') {
        result = convertWeight(value, fromUnit, toUnit);
    } else if (unitType === 'volume') {
        result = convertVolume(value, fromUnit, toUnit);
    } else if (unitType === 'temperature') {
        result = convertTemperature(value, fromUnit, toUnit);
    }

    output.innerHTML = `Converted value: ${result} ${toUnit}`;
}

function convertLength(value, fromUnit, toUnit) {
    const conversionRates = {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    };
    return (value * conversionRates[fromUnit]) / conversionRates[toUnit];
}

function convertWeight(value, fromUnit, toUnit) {
    const conversionRates = {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274
    };
    return (value * conversionRates[fromUnit]) / conversionRates[toUnit];
}

function convertVolume(value, fromUnit, toUnit) {
    const conversionRates = {
        liter: 1,
        milliliter: 1000,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338,
        cup: 4.22675,
        'fluid ounce': 33.814
    };
    return (value * conversionRates[fromUnit]) / conversionRates[toUnit];
}

function convertTemperature(value, fromUnit, toUnit) {
    let result;
    if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') {
            result = (value * 9/5) + 32;
        } else if (toUnit === 'kelvin') {
            result = value + 273.15;
        } else {
            result = value;
        }
    } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') {
            result = (value - 32) * 5/9;
        } else if (toUnit === 'kelvin') {
            result = ((value - 32) * 5/9) + 273.15;
        } else {
            result = value;
        }
    } else if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') {
            result = value - 273.15;
        } else if (toUnit === 'fahrenheit') {
            result = ((value - 273.15) * 9/5) + 32;
        } else {
            result = value;
        }
    }
    return result;
}

function goBack() {
    window.history.back();
}
