async function shortenURL() {
    const url = document.getElementById('urlInput').value;
    const shortenedURLOutput = document.getElementById('shortenedURL');

    if (url.trim() === '') {
        shortenedURLOutput.innerHTML = 'Please enter a URL';
        return;
    }

    try {
        const response = await fetch(`https://api.tinyurl.com/create?url=${encodeURIComponent(url)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TINYURL_API_KEY' // Replace with your TinyURL API key
            },
        });

        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }

        const data = await response.json();
        shortenedURLOutput.innerHTML = `Shortened URL: <a href="${data.data.tiny_url}" target="_blank">${data.data.tiny_url}</a>`;
    } catch (error) {
        shortenedURLOutput.innerHTML = `Error: ${error.message}`;
    }
}

function goBack() {
    window.history.back();
}
