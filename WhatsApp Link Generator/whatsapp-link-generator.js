function generateLink() {
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    const phoneError = document.getElementById('phone-error');
    const messageError = document.getElementById('message-error');

    let isValid = true;

    // Reset error messages
    phoneError.textContent = '';
    messageError.textContent = '';
    phoneInput.classList.remove('error');
    messageInput.classList.remove('error');

    // Validate phone
    if (!validatePhone(phone)) {
        phoneError.textContent = 'Please enter a valid phone number.';
        phoneInput.classList.add('error');
        isValid = false;
    }

    // Validate message
    if (message === "") {
        messageError.textContent = 'Message cannot be empty.';
        messageInput.classList.add('error');
        isValid = false;
    }

    if (isValid) {
        const encodedMessage = encodeURIComponent(message).replace(/%0A/g, '%0D%0A');
        const link = `https://wa.me/${phone}?text=${encodedMessage}`;
        document.getElementById('output').innerHTML = `
            <a href="${link}" target="_blank"><i class="fas fa-external-link-alt"></i> Click here to open WhatsApp chat</a>
            <button class="open-link" onclick="openLink('${link}')"><i class="fas fa-external-link-alt"></i> Open Link</button>
        `;
    } else {
        document.getElementById('output').innerHTML = '';
    }
}

function validatePhone(phone) {
    const phonePattern = /^\d{10,15}$/;
    return phonePattern.test(phone);
}

function openLink(link) {
    window.open(link, '_blank');
}

function goBack() {
    window.history.back();
}
