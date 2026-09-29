// Módulo de Accesibilidad (RNF-01, RNF-11)
let ttsActive = false;
let currentFontSize = 16;

function initAccesibilidad() {
  document.getElementById('btnContrast')?.addEventListener('click', toggleHighContrast);
  document.getElementById('btnFontIncrease')?.addEventListener('click', () => changeFontSize(1));
  document.getElementById('btnFontDecrease')?.addEventListener('click', () => changeFontSize(-1));
  document.getElementById('btnHighlightLinks')?.addEventListener('click', toggleLinksHighlight);
  document.getElementById('btnTTS')?.addEventListener('click', toggleTextToSpeech);
}

function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
}

function changeFontSize(delta) {
  currentFontSize = Math.max(12, Math.min(24, currentFontSize + delta));
  document.documentElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
}

function toggleLinksHighlight() {
  document.body.classList.toggle('links-highlight');
}

function toggleTextToSpeech() {
  ttsActive = !ttsActive;
  const statusSpan = document.getElementById('ttsStatus');
  if (statusSpan) {
    statusSpan.textContent = ttsActive ? 'ACTIVADO' : 'DESACTIVADO';
  }

  if (ttsActive) {
    speakText("Lector de voz integrado activado.");
    document.addEventListener('selectionchange', handleTextSelectionSpeech);
  } else {
    window.speechSynthesis.cancel();
    document.removeEventListener('selectionchange', handleTextSelectionSpeech);
  }
}

function handleTextSelectionSpeech() {
  if (!ttsActive) return;
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    speakText(selectedText);
  }
}

function speakText(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-MX';
  window.speechSynthesis.speak(utterance);
}