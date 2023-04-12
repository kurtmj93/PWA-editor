const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler for `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    // store triggered events
    window.deferredPrompt = event;
    // remove hidden class from button
    butInstall.classList.toggle('hidden', false);
});

// click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // show prompt
    promptEvent.prompt();

    window.deferredPrompt = null; // reset deferred prompt variable
    // prevents prompt from installing more than once

    butInstall.classList.toggle('hidden', true);
    // hide install button after install
});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null; 
    // prevents prompt from installing more than once
});
