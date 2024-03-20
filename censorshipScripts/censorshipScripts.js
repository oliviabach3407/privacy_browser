document.addEventListener('DOMContentLoaded', function () {
    const webview = document.getElementById('myWebview');

    // Function to censor the word 'kory' with '*****'
    function censorContent() {
        const script = `
            document.body.innerHTML = document.body.innerHTML.replace(/\\bkory\\b/gi, '*****');
            document.body.innerHTML = document.body.innerHTML.replace(/\\btravis\\b/gi, '*****');
            document.body.innerHTML = document.body.innerHTML.replace(/\\bashley\\b/gi, '*****');
            document.body.innerHTML = document.body.innerHTML.replace(/\\bolivia\\b/gi, '*****');
        `;
        webview.executeJavaScript(script);
    }

    // Listen for the 'did-finish-load' event to ensure the webview content is fully loaded
    webview.addEventListener('did-finish-load', censorContent);

    // Optional: Re-censor when navigating to a new page within the webview
    webview.addEventListener('did-navigate', censorContent);
    webview.addEventListener('did-navigate-in-page', censorContent);
});


