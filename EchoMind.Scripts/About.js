const benefit_container = document.querySelectorAll('.benefit-container'); 

benefit_container.forEach(container => {
    container.onclick = function() {
        window.open('https://www.kaggle.com/datasets/yassinebazgour/speech-audios-with-sound-effects-for-audio-editing', '_blank');
    }
});