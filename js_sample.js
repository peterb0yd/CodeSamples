/*
* This is the javascript file that runs on the home page of AmplifiVentures.com
* It controls the initial typing animation that appears just below the banner image
* I've commented the file for explanation, however I don't usually comment like this.
*/

window.elemsText = ["Strategy.", "Crowdfunding.", "Mentorship."]; // These are the words we'll type to the screen
window.elemTyped = [false, false, false];   // These are set when the word is showing in full to the screen
window.elemsHidden = []; // These are our hidden elements
window.elemsVisible = []; // These are our visible elements
window.elemVisible = [];  // These are boolean values indiciating if our element has been seen by the user or not
window.parentPos = 0;

// Call once all DOM is loaded
function homeLoaded() {
  window.elemsHidden = Array.from(document.querySelectorAll('.type-action span.hidden'));   // These elements are fully typed with 'visibility: hidden'
  window.elemsVisible = Array.from(document.querySelectorAll('.type-action span.visible'));   // These elements are not typed yet
  window.parentPos = document.getElementById('approach').offsetTop;   // Set as window variable to avoid resetting on every scroll event
  homeScrolling(true);
}

// Triggered on scroll event
function homeScrolling(isFirstCalled = false) {
  if (!window.elemTyped.includes(false)) return;    // Don't run if element is already shown
  let scrollPos = window.scrollY+window.innerHeight;
  let time = 0;
  let heightAdjust = isMobile() ? 100 : 200;
  window.elemsHidden.forEach((el, i) => {   // Iterate over each hidden word
    let elemPos = window.parentPos + el.parentElement.parentElement.offsetTop;    // Top level element top position
    let inView = scrollPos-heightAdjust > elemPos;    // Scrolled past element
    let notVisible = !window.elemVisible[i];          // Has it been seen by the user?
    let canShow = i == 0 ? true : window.elemTyped[i-1];    // Has the previous element been shown to screen?
    if (inView && notVisible && canShow) {
      window.elemVisible[i] = true;       // Mark as seen by the user
      setTimeout(() => {
        type(i);
      }, time);
      time += isFirstCalled ? 800 : 0;    // Delay on initial load
    }
    else if (inView & notVisible) {
      setTimeout(() => {
        homeScrolling();
      }, 200);
    }
  })
}

// Type each character in the word
function type(i) {
  var chars = window.elemsText[i].split('');
  var time = 0;
  chars.forEach((char, j) => {
    time += (100 - (Math.random()*40));   // Randomize the typing speed
    setTimeout(() => {
      window.elemsVisible[i].innerHTML += char;   // This makes the character visible
      if (j === chars.length-1) window.elemTyped[i] = true;   // Set the element as shown when finished
    }, time);
  });
}
