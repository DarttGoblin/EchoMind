const edit = document.querySelector('.edit');
const github = document.querySelector('.github');
const demo = document.querySelector('.demo');

edit.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/EchoMind_server', '_blank');
}

demo.onclick = function() {
    alert('Demo will be available soon...');
    // window.open('', '_blank');
}