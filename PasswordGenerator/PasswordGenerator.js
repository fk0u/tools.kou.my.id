function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const output = document.getElementById('output');

    if (isNaN(length) || length < 8 || length > 128) {
        document.getElementById('length-error').innerText = 'Please enter a length between 8 and 128';
        return;
    } else {
        document.getElementById('length-error').innerText = '';
    }

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterPool = '';
    if (includeUppercase) characterPool += uppercase;
    if (includeLowercase) characterPool += lowercase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    if (characterPool === '') {
        output.innerHTML = 'Please select at least one character type';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }

    output.innerHTML = `Generated Password: <strong>${password}</strong>`;
}

function goBack() {
    window.history.back();
}
