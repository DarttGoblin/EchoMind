const file_input = document.querySelector('.file-input');
const prompt_input = document.querySelector('.prompt-input');
const submit = document.querySelector('.submit');


submit.onclick = async function() {
    const file_input_value = file_input.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('audio', file_input_value);
        formData.append('prompt-input', prompt_input);

        const response = await fetch('http://127.0.0.1:5000/edit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(data);
}