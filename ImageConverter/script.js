document.getElementById('convertButton').addEventListener('click', async function () {
    const fileInput = document.getElementById('fileInput');
    const outputFormat = document.getElementById('outputFormat').value;
    const outputMessage = document.getElementById('outputMessage');

    if (!fileInput.files.length) {
        outputMessage.textContent = 'Please select a file!';
        outputMessage.classList.add('error-message');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = async function () {
            if (outputFormat === 'pdf') {
                const pdfDoc = await PDFLib.PDFDocument.create();
                const page = pdfDoc.addPage([image.width, image.height]);
                
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                
                canvas.toBlob(async function(blob) {
                    const arrayBuffer = await blob.arrayBuffer();
                    const img = await pdfDoc.embedJpg(arrayBuffer);
                    
                    page.drawImage(img, {
                        x: 0,
                        y: 0,
                        width: image.width,
                        height: image.height
                    });
                    
                    const pdfBytes = await pdfDoc.save();
                    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = pdfUrl;
                    downloadLink.download = `${file.name.split('.')[0]}.pdf`;
                    downloadLink.textContent = `Download ${file.name.split('.')[0]}.pdf`;
                    outputMessage.appendChild(downloadLink);
                }, 'image/jpeg'); // konversi ke blob JPEG untuk pdf-lib
            } else {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.download = `${file.name.split('.')[0]}.${outputFormat}`;
                    downloadLink.textContent = `Download ${file.name.split('.')[0]}.${outputFormat}`;
                    outputMessage.appendChild(downloadLink);
                }, `image/${outputFormat}`);
            }
        }
    }
    reader.readAsDataURL(file);
});
