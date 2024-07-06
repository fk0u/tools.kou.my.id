async function getRandomQuote() {
    const randomQuoteOutput = document.getElementById('randomQuoteOutput');

    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();

        randomQuoteOutput.innerHTML = `
            <p>${data.content}</p>
            <p><em>— ${data.author}</em></p>
        `;
    } catch (error) {
        randomQuoteOutput.innerHTML = `Error: ${error.message}`;
    }
}

async function searchQuotes() {
    const searchKeyword = document.getElementById('searchKeyword').value;
    const searchQuoteOutput = document.getElementById('searchQuoteOutput');

    if (searchKeyword.trim() === '') {
        searchQuoteOutput.innerHTML = 'Please enter a keyword';
        return;
    }

    try {
        const response = await fetch(`https://api.quotable.io/search/quotes?query=${encodeURIComponent(searchKeyword)}`);
        const data = await response.json();

        if (data.results.length === 0) {
            searchQuoteOutput.innerHTML = 'No quotes found';
            return;
        }

        searchQuoteOutput.innerHTML = data.results.map(quote => `
            <p>${quote.content}</p>
            <p><em>— ${quote.author}</em></p>
        `).join('');
    } catch (error) {
        searchQuoteOutput.innerHTML = `Error: ${error.message}`;
    }
}

function goBack() {
    window.history.back();
}
