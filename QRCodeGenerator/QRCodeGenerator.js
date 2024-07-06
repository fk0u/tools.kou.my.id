function generateQRCode() {
    const qrText = document.getElementById('qrText').value;
    const qrOutput = document.getElementById('qrOutput');
    const downloadButton = document.getElementById('downloadButton');
    
    if (qrText.trim() === '') {
        document.getElementById('qrText-error').innerText = 'Please enter text or URL';
        return;
    } else {
        document.getElementById('qrText-error').innerText = '';
    }

    qrOutput.innerHTML = '';
    const qrcode = new QRCode(qrOutput, {
        text: qrText,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    downloadButton.style.display = 'block';
}

function downloadQRCode() {
    const qrOutput = document.getElementById('qrOutput').querySelector('canvas');
    const downloadButton = document.getElementById('downloadButton');

    if (!qrOutput) {
        return;
    }

    const link = document.createElement('a');
    link.href = qrOutput.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
}

function goBack() {
    window.history.back();
}
