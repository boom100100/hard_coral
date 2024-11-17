console.log("Extension has run.");

const tags = document.querySelectorAll("*");
const allContent = tags[0].innerText;

const cleanContent = (content) => {
  return content;
}

const cleanedContent = cleanContent(allContent);

var msg = new SpeechSynthesisUtterance();
msg.text = cleanedContent;
window.speechSynthesis.speak(msg);
