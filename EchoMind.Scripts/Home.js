const upload = document.querySelector('.upload');
const github = document.querySelector('.github');
const report = document.querySelector('.report');
const demo = document.querySelector('.demo');

upload.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/EchoMind_server', '_blank');
}

report.onclick = function() {
    window.open('https://drive.google.com/drive/folders/1WPyOK3dbeotJuEKLYy-1yqrXLM8CKBFO?usp=sharing', '_blank');
}

demo.onclick = function() {
    window.open('https://drive.google.com/file/d/1kDZCo__0L_6xj5P3gQOHTxh_YQLtGeCD/view?usp=sharing', '_blank');
}