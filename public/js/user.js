// HEADER
let menu = document.querySelector('.conta');
menu.style.display = "none";
function show() {
    menu.style.display = menu.style.display == "none" ? "block" : "none";
}
function voltar() {
    window.location.href = ('/')
}