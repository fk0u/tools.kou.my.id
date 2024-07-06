function compressImage() {
    const input = document.getElementById('imageInput');
    const canvas = document.getElementById('canvas');
    const output = document.getElementById('output');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const img = new Image();
        const reader = new FileReader();

        reader.onload = function(e) {
            img.src = e.target.result;
        };

        img.onload = function() {
            const ctx = canvas.getContext('2d');
            const width = img.width;
            const height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const quality = 0.7; // Ubah kualitas kompresi di sini (0.0 - 1.0)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            
            const compressedImage = new Image();
            compressedImage.src = compressedDataUrl;
            output.innerHTML = '';
            output.appendChild(compressedImage);
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
}

function goBack() {
    window.history.back();
}
