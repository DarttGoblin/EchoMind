const fileInput = document.querySelector('.file-input');
const promptInput = document.querySelector('.prompt-input');
const submit = document.querySelector('.submit');
const uploadSpan = document.querySelector('.upload-span');

// File input change handler
fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files);
    if (files.length === 0) {
        uploadSpan.textContent = "UPLOAD AUDIO";
    } else if (files.length === 1) {
        uploadSpan.textContent = files[0].name;
    } else {
        uploadSpan.textContent = `${files.length} files selected`;
    }
});

// Submit button click handler
submit.onclick = function() {
    const file = fileInput.files[0];
    const prompt = promptInput.value.trim();

    // Validation
    if (!file) {
        alert("Please select an audio file.");
        return;
    }

    if (!prompt) {
        alert("Please enter a prompt describing the effect.");
        return;
    }

    // Validate file type
    const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/flac', 'audio/ogg', 'audio/x-m4a'];
    const allowedExtensions = ['.wav', '.mp3', '.flac', '.ogg', '.m4a'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        alert("Please upload a valid audio file (WAV, MP3, FLAC, OGG, M4A).");
        return;
    }

    // Show loading state
    submit.disabled = true;
    const originalText = submit.textContent;
    submit.textContent = "Processing...";
    submit.style.opacity = "0.6";

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('prompt', prompt);

    // FIXED: Changed endpoint from 'process_audio' to 'process'
    fetch('http://127.0.0.1:5000/process', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error || "Network response was not ok");
            }).catch(() => {
                // If response is not JSON, throw generic error
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            });
        }
        return response.blob();
    })
    .then(blob => {
        // Create audio player element
        const audioURL = URL.createObjectURL(blob);
        
        // Remove any existing audio player and download button
        const existingPlayer = document.querySelector('.audio-player');
        const existingDownload = document.querySelector('.download-btn');
        if (existingPlayer) existingPlayer.remove();
        if (existingDownload) existingDownload.remove();
        
        // Create new audio player
        const audioPlayer = document.createElement('audio');
        audioPlayer.src = audioURL;
        audioPlayer.controls = true;
        audioPlayer.className = "audio-player";
        audioPlayer.style.cssText = "width: 100%; margin: 20px 0;";
        
        // Insert audio player after the submit button
        submit.parentElement.insertBefore(audioPlayer, submit.nextSibling);
        
        // Auto-play the result
        audioPlayer.play().catch(err => {
            console.log("Auto-play blocked by browser:", err);
            alert("Audio processed! Click play to listen.");
        });
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = audioURL;
        downloadBtn.download = `processed_${file.name}`;
        downloadBtn.textContent = "Download Processed Audio";
        downloadBtn.className = "download-btn";
        downloadBtn.style.cssText = `
            display: inline-block;
            margin: 10px 0;
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        
        // Insert download button after audio player
        audioPlayer.parentElement.insertBefore(downloadBtn, audioPlayer.nextSibling);
        
        // Reset button
        submit.disabled = false;
        submit.textContent = originalText;
        submit.style.opacity = "1";
        
        alert("✅ Audio processed successfully!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ Error: " + error.message);
        
        // Reset button
        submit.disabled = false;
        submit.textContent = originalText;
        submit.style.opacity = "1";
    });
};

// Optional: Add keyboard shortcut (Enter to submit)
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !submit.disabled) {
        submit.click();
    }
});