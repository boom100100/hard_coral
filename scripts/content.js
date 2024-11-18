console.log("Extension has run.");
// figure out why it doesn't always work
//  https://github.com/mdn/dom-examples/blob/main/web-speech-api/speak-easy-synthesis/script.js
// then, create tool for generating music
// figure out syncing voice to music like a proper song

const setSpeechSynthesis = () => {
  const tags = document.querySelectorAll("*");
  const allContent = tags[0].innerText;
  
  const cleanContent = (content) => {
    return content;
  }
  
  const cleanedContent = cleanContent(allContent);
  
  var msg = new SpeechSynthesisUtterance();
  msg.text = cleanedContent;
  window.speechSynthesis.speak(msg);
}

if ('speechSynthesis' in window) {
  console.log('is supported');
  setSpeechSynthesis();
 }else{
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }
