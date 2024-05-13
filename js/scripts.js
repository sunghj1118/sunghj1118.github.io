document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const postFilename = 'welcome.md'; // For now, we'll just load the welcome.md file

    fetch(`/posts/${postFilename}`)
        .then(response => response.text())
        .then(markdown => {
            contentDiv.innerHTML = marked(markdown);
        })
        .catch(error => {
            console.error('Error fetching the markdown file:', error);
            contentDiv.innerHTML = '<p>Sorry, the content could not be loaded.</p>';
        });
});
