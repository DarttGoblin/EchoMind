const sound_effect_icons = document.querySelectorAll('.sound-effect-icon');
const prompt_input = document.querySelector('.prompt-input');

const sound_effects = [
    new Audio("EchoMind.Media/EchoMind.Media/cat.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/dog.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/bird.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/rain.wav"),
    new Audio("EchoMind.Media/EchoMind.Media/thunder.wav")
];

const prompts = [
    "Add dog sound",
    "Add cat sound",
    "Add bird sound",
    "Add rain sound",
    "Add thunder sound",
];

GeneratePlaceHolders(prompts, prompt_input);

sound_effect_icons.forEach((icon, index) => {
    icon.onclick = function() {
        sound_effects.forEach(s => {
            s.pause();
            s.currentTime = 0;
        });

        const sound = sound_effects[index];
        sound.currentTime = 0;
        sound.play();
    };
});

function GeneratePlaceHolders(samples, location) {
    let samples_index = 0;

    function startTyping() {
        location.placeholder = "";
        SlowTyping(samples[samples_index].split(""), location);
        samples_index = (samples_index + 1) % samples.length;
    }

    startTyping();
    setInterval(() => {startTyping();}, 3500);
}

function SlowTyping(samples_letters, location) {
    samples_letters.forEach((letter, index) => {
        setTimeout(() => {location.placeholder += letter;}, 50 * index);
    });
}