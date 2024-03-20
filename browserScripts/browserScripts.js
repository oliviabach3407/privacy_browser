//It’s particularly important for any DOM manipulations or
// event listeners that depend on elements being available in the page.
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');
    const webview = document.getElementById('myWebview');
    const historyContainer = document.getElementById('historyContainer');
    const historyList = document.getElementById('historyList');
    const historyButton = document.getElementById('viewHistoryButton');
    let historyStack = [];
// a comment
    // View history
    historyButton.addEventListener('click', function () {
        // Toggle the visibility of the history container
        if (historyContainer.style.display === 'none') {
            historyContainer.style.display = 'block';
        } else {
            historyContainer.style.display = 'none';
        }
        // Clear the existing history list
        historyList.innerHTML = '';
        // Populate the history list with clickable links
        historyStack.forEach(function (url, index) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `<a href="#" onclick="loadURL('${url}');">${url}</a>`;
            historyList.appendChild(listItem);
        });
    });

    // Listen for 'did-navigate' event to capture navigations
    webview.addEventListener('did-navigate', function (event) {
        console.log('Navigated to:', event.url);
        historyStack.push(event.url); // Add URL to history
    });

    // Load a URL and push it to the history stack
    function loadURL(url) {
        webview.loadURL(url);
        historyStack.push(url); // Add URL to history
        // Hide the history container when a link is clicked
        historyContainer.style.display = 'none';
    }

    // Load a URL and push it to the history stack
    function loadURL(url) {
        webview.loadURL(url);
        historyStack.push(url); // Add URL to history
    }

    // Auto-focus on the search bar --> clicks search bar for you
    var urlInput = document.querySelector('.url');
    urlInput.focus();

    // Event listener for 'Enter' key press in the search bar
    urlInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            event.preventDefault();
            loadURL(urlInput.value);
        }
    });

    // Context menu for right-clicking (add more options as needed)
    // Haven't tested this so might not work
    document.getElementById("myWebview").addEventListener('contextmenu', function (event) {
        var linkURL = event.target.href;
        if (linkURL) {
            // Opens context menu with options for the link
            // Add more context menu logic here
            event.preventDefault();
        }
    });

});
