const speak = (text: string) => {
  const msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
};

export default speak;
