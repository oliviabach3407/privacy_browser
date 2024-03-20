const electron = require('electron');

document.addEventListener('DOMContentLoaded', function () {

    const cookiesContainer = document.getElementById('cookiesContainer');
    const cookiesList = document.getElementById('cookiesList');
    const viewCookiesButton = document.getElementById('viewCookiesButton');

    // View cookies
   viewCookiesButton.addEventListener('click', function() {
        // Request cookies from the main process
        electron.ipcRenderer.send('get-cookies');

        // Toggle the visibility of the cookies container
        if (cookiesContainer.style.display === 'none') {
            cookiesContainer.style.display = 'block';
        } else {
            cookiesContainer.style.display = 'none';
        }
    });

    // Listen for the 'cookies' event from the main process
    electron.ipcRenderer.on('cookies', (event, cookies) => {
        // Clear the existing cookies list
        cookiesList.innerHTML = '';

        // Populate the cookies list
        cookies.forEach((cookie) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `Name: ${cookie.name}, Value: ${cookie.value}`;
            cookiesList.appendChild(listItem);
        });
    });

});
