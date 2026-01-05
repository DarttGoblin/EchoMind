const file_input = document.querySelector('.file-input');
const submit = document.querySelector('.submit');
const upload_span = document.querySelector('.upload-span');
const preview_audio = document.querySelector('.preview');

file_input.onchange = function() {
    const files = Array.from(file_input.files);

    if (files.length === 0) {
        upload_span.textContent = "UPLOAD AUDIO";
        preview_audio.src = "";
        preview_audio.style.display = "none";
        return;
    }

    upload_span.textContent = files.length === 1
        ? files[0].name
        : `${files.length} files selected`;

    preview_audio.src = URL.createObjectURL(files[0]);
    preview_audio.style.display = "block";
};

submit.onclick = function() {
    const file = file_input.files[0];
    const prompt = prompt_input.value.trim();

    if (!file) {alert("Please select an audio file."); return;}
    if (!prompt) {alert("Please enter a prompt describing the effect."); return;}

    const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/flac', 'audio/ogg', 'audio/x-m4a'];
    const allowedExtensions = ['.wav', '.mp3', '.flac', '.ogg', '.m4a'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        alert("Please upload a valid audio file (WAV, MP3, FLAC, OGG, M4A).");
        return;
    }

    submit.disabled = true;
    const originalText = submit.textContent;
    submit.textContent = "Processing...";
    submit.style.opacity = "0.6";

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('prompt', prompt);

    fetch('http://127.0.0.1:5000/process', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error || "Network response was not ok");
            }).catch(() => {throw new Error(`Server error: ${response.status} ${response.statusText}`);});
        }
        return response.blob();
    })
    .then(blob => {
        const audioURL = URL.createObjectURL(blob);
        const existingPlayer = document.querySelector('.audio-player');
        const existingDownload = document.querySelector('.download-btn');
        if (existingPlayer) existingPlayer.remove();
        if (existingDownload) existingDownload.remove();
        
        const audioPlayer = document.createElement('audio');
        audioPlayer.src = audioURL;
        audioPlayer.controls = true;
        audioPlayer.className = "audio-player";
        audioPlayer.style.cssText = "width: 400px; margin: 20px 0;";
        
        submit.parentElement.insertBefore(audioPlayer, submit.nextSibling);
        audioPlayer.play().catch(err => {
            console.log("Auto-play blocked by browser:", err);
            alert("Audio processed! Click play to listen.");
        });

        const downloadBtn = document.createElement('a');
        downloadBtn.href = audioURL;
        downloadBtn.download = `processed_${file.name}`;
        downloadBtn.textContent = "Download Processed Audio";
        downloadBtn.className = "download-btn";
        downloadBtn.style.cssText = `
            display: inline-block;
            padding: 15px 30px;
            background: #4CAF50;
            color: white;
            font-size: 20px;
            text-decoration: none;
            border-radius: 15px;
            cursor: pointer;
        `;
        
        audioPlayer.parentElement.insertBefore(downloadBtn, audioPlayer.nextSibling);        
        submit.disabled = false;
        submit.textContent = originalText;
        submit.style.opacity = "1";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("The server is not hosted yet, you may want to follow instructions mentionned in the github repositroy or watch the demo instead.");
        
        submit.disabled = false;
        submit.textContent = originalText;
        submit.style.opacity = "1";
    });
};

prompt_input.onkeypress = function(e) {
    if (e.key === 'Enter' && !submit.disabled) {
        submit.click();
    }
};