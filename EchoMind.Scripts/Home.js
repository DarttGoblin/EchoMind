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
    window.open('https://drive.google.com/drive/folders/1xP9N_HszvNrkYNUsPNgyLJiuo6wpWm25?usp=sharing', '_blank');
}

demo.onclick = function() {
    alert('Demo will be available soon...');
    // window.open('', '_blank');
}