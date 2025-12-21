const sound_effect_icons = document.querySelectorAll('.sound-effect-icon');

const sound_effects = [
    new Audio("EchoMind.Media/EchoMind.Media/cat.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/dog.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/bird.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/rain.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/thunder.wav")
];

sound_effect_icons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        sound_effects.forEach(s => {
            s.pause();
            s.currentTime = 0;
        });

        const sound = sound_effects[index];
        sound.currentTime = 0;
        sound.play();
    });
});
