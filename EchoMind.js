const fileInput = document.querySelector('.file-input');
const promptInput = document.querySelector('.prompt-input');
const submit = document.querySelector('.submit');

const uploadSpan = document.querySelector('.upload-span');

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

submit.onclick = function() {
    const file = fileInput.files[0];
    const prompt = promptInput.value;

    if (!file || !prompt) {
        alert("Please select an audio file and enter a prompt.");
        return;
    }

    // Show loading state
    submit.disabled = true;
    submit.textContent = "Processing...";

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('prompt', prompt);

    fetch('http://127.0.0.1:5000/process_audio', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error || "Network response was not ok");
            });
        }
        return response.blob();
    })
    .then(blob => {
        // Create audio player
        const audioURL = URL.createObjectURL(blob);
        const audio = new Audio(audioURL);
        audio.play();
        
        // Optional: Add download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = audioURL;
        downloadBtn.download = `processed_${file.name}`;
        downloadBtn.textContent = "Download Result";
        downloadBtn.className = "download-btn";
        document.body.appendChild(downloadBtn);
        
        // Reset button
        submit.disabled = false;
        submit.textContent = "Process Audio";
        alert("Audio processed successfully!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error: " + error.message);
        
        // Reset button
        submit.disabled = false;
        submit.textContent = "Process Audio";
    });
};