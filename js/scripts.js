document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const postFilename = 'welcome.md'; // For now, we'll just load the welcome.md file

    fetch(`posts/${postFilename}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(markdown => {
            console.log(marked); // Check if marked is correctly loaded
            if (typeof marked === 'function') {
                contentDiv.innerHTML = marked(markdown);
            } else {
                console.error('marked.js is not loaded or not a function');
                contentDiv.innerHTML = '<p>Sorry, the content could not be processed.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the markdown file:', error);
            contentDiv.innerHTML = '<p>Sorry, the content could not be loaded.</p>';
        });
});
