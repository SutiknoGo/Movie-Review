var deferredPrompt;
  var btnAdd = document.querySelector('#download-pwa');

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('deferredPrompt!');
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('sw.js')
    .then(function() {
      console.log('Service worker registered!');
    });
  }


    // Installation must be done by a user gesture! Here, the button click
    btnAdd.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      btnAdd.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });