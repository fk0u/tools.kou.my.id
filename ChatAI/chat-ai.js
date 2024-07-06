document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Loading...';

    const apiKey = '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';  // Ganti dengan API key Anda

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ question: userInput })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseDiv.innerHTML = data.answer;
    } catch (error) {
        responseDiv.innerHTML = 'Error: ' + error.message;
    }
});