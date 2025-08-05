// VARIÁVEIS
var input = document.querySelectorAll('.sinput input');
var img = document.querySelectorAll('.sinput i');

// CÓDIGO
for (let x = 0; x < input.length; x++) {
    img[x].addEventListener('click', function () {
        input[x].type = input[x].type == 'text' ? 'password' : 'text';
        img[x].className = img[x].className == "fi fi-rr-eye" ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye";
    });
}