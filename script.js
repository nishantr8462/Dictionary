const input = document.querySelector('input');
const btn = document.querySelector('button');
const card = document.querySelector('.card');

async function dictionaryFn(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        if (data.title) {
            // API returns an error message
            card.innerHTML = `<div class="property"><span>Error:</span><span>${data.message}</span></div>`;
        } else {
            // Display word details
            card.innerHTML = `
                <div class="property"><span>Word:</span><span>${data[0].word}</span></div>
                <div class="property"><span>Phonetic:</span><span>${data[0].phonetics[0]?.text || "N/A"}</span></div>
                <div class="property"><span>Audio:</span>
                    <audio controls>
                        <source src="${data[0].phonetics[0]?.audio || ''}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div class="property"><span>Definition:</span><span>${data[0].meanings[0]?.definitions[0]?.definition || "N/A"}</span></div>
                <div class="property"><span>Example:</span><span>${data[0].meanings[0]?.definitions[0]?.example || "N/A"}</span></div>
                <div class="property"><span>Parts of Speech:</span><span>${data[0].meanings[0]?.partOfSpeech || "N/A"}</span></div>
            `;
        }
    } catch (error) {
        // Handle errors (e.g., network issues)
        card.innerHTML = `<div class="property"><span>Error:</span><span>Failed to fetch data. Please try again.</span></div>`;
    }
}

btn.addEventListener('click', () => {
    const word = input.value.trim();
    if (word) {
        dictionaryFn(word);
    } else {
        card.innerHTML = `<div class="property"><span>Error:</span><span>Please enter a word.</span></div>`;
    }
});
