document.addEventListener('DOMContentLoaded', function () {
    const webview = document.getElementById('myWebview');
    const homeButton = document.getElementById('homeButton');
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');
    const urlInput = document.getElementById('urlInput');
    const refreshButton = document.getElementById('refreshButton');
    //function to navigate to the home page
    function goHome() {
        webview.loadURL("https://coveryourtracks.eff.org/");
    } //a commentks
    homeButton.addEventListener('click', goHome);

    //function to navigate back
    function goBack() {
        webview.goBack();
    }
    backButton.addEventListener('click', goBack);


    //function to navigate forward
    function goForward() {
        webview.goForward();
    }
    forwardButton.addEventListener('click', goForward);

    function handleURL() {
        let url = "";
        const inputURL = urlInput.value;
        if (inputURL.startsWith('http://') || inputURL.startsWith('https://')) {
            url = inputURL.trim();
            alert(url);
        }
        else {
            url = 'https://' + inputURL;
        }
        webview.loadURL(url);
    }

    urlInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleURL();
        }
    });

    //function to refresh the page
    function refreshPage() {
        webview.reload();
    }

    //keyboard shortcut for Ctrl+R for refresh
    window.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            refreshPage();
        }
    });
    refreshButton.addEventListener('click', refreshPage);
});