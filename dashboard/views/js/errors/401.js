var self = this;
self.window = window;

var errorCodeEl = document.querySelector( "#errorCodeDigits" );
var errorMessage = document.querySelector( "#errorText" );
var homeButton = document.querySelector( "#info");

homeButton.addEventListener("click", function( event ) {
  self.window.location.reload(true);
    event.preventDefault();
  }, false);

function handleCode(code) {
  self.message = "ERROR: " + codesArray[code];
  showErrorCodeDigits(code);
  showMessage(self.message, function() { flicker(); });
}

function showErrorCodeDigits(errorCode) {
  var digits = (""+errorCode).split("");
  var rows = ['','','','','','',''];

  errorCodeEl.innerHTML = "";

  for(var i = 0; i < digits.length; i++) {
    var digitToAdd = +digits[i];
    var initialPosition = digitToAdd > 4 ? (7 * 5) + (digitToAdd - 5) : digitToAdd;
    for (var l = 0; l < 7; l++) {
      var replacement = dString[initialPosition + (5 * l)];
      rows[l] += replacement.replace(/[$]/g, '\\');
    }
  errorCodeEl.textContent = rows.join('\n');
  window.setTimeout(function(){
     errorCodeEl.classList.remove('spacedLetters');
     errorCodeEl.classList.remove('zeroLineHeight');
     errorCodeEl.classList.remove('zeroOpacity');
  }, 1000);
}
}

function showMessage(message, onCompletion) {
  var messageString = message;
  for (var i = 0; i < messageString.length; i++) {
    self.window.setTimeout(() => {
      var index = errorMessage.innerText.length+1;
      errorMessage.innerHTML = `${messageString.substr(0,index)}<span class="cursor animateFlicker"></span>`;
      if(index == messageString.length) {
        onCompletion();
      }

   }, 1300+ 50 *i );
}
}

function toggle(toggleOn) {
  errorMessage.style.opacity =
  errorCode.style.opacity = toggleOn ? "1" : "0";
}

function flicker() {
  if(self.flickerCount < 50){
    toggle(Math.random() > 0.8),
    setTimeout(flicker, 100 * Math.random() * 0.2);
    self.flickerCount++;
    return;
  }
  else{
   self.flickerCount = 0;
   toggle(1);
   setTimeout(flicker, 3000 + Math.random() * 3000);    
  }

}

const dString =[
' ________     ','   _____     ','  _______     ',' ________     ',' ___  ___     ',
'|$   __  $    ','  / __  $    ',' /  ___  $    ','|$_____  $    ','|$  $|$  $    ',
'$ $  $|$  $   ',' |$/ |$  $   ','/__/|_/  /|   ','$|____|$ /_   ','$ $  $_$  $   ',
' $ $  $$$  $  ','  $|/$ $  $  ','|__|//  / /   ','      $|$  $  ',' $ $_____  $  ',
'  $ $  $$$  $ ','      $ $  $ ','    /  /_/__  ','     __$_$  $ ','  $|____|$  $ ',
'   $ $_______$','       $ $__$','   |$________$','    |$_______$','        $ $__$',
'    $|_______|','        $|__|','    $|_______|','    $|_______|','         $|__|',
' ________     ',' ________     ','  ________    ',' ________     ',' ________     ',
'|$   ____$    ','|$   ____$    ',' |$_____  $   ','|$   __  $    ','|$  ___  $    ',
'$ $  $___|_   ','$ $  $___|    ','  $|___/  /|  ','$ $  $|$  $   ','$ $____   $   ',
' $ $_____  $  ',' $ $  $_____  ','      /  / /  ',' $ $   __  $  ',' $|____|$  $  ',
'  $|____|$  $ ','  $ $  ___  $ ','     /  / /   ','  $ $  $|$  $ ','     __$_$  $ ',
'   |$________$','   $ $_______$','    /__/ /    ','   $ $_______$','    |$_______$',
'   $|________|','    $|_______|','    |__|/     ','    $|_______|','    $|_______|'];

var codesArray = {
  401:'Unauthorized'
};

handleCode(Object.keys(codesArray)[0]);
