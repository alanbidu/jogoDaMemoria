let botao1 = document.querySelector('#botao1');
let botao2 = document.querySelector('#botao2');
let botao3 = document.querySelector('#botao3');
let botao4 = document.querySelector('#botao4');
let botao5 = document.querySelector('#botao5');
let botao6 = document.querySelector('#botao6');

function showImg(botao, imagem) {
    console.log(botao.querySelector("img").src.split("/")[9]);
    if (botao.querySelector("img").src.split("/")[9] === "comum.png"){
        botao.innerHTML = `<img src="${imagem}" alt="${imagem.slice(4,-4)}">`;
    }else {
        botao.innerHTML = `<img src="img/comum.png" alt="comum">`;
    }
}



botao1.addEventListener('click', function(event) {
    // console.log(event);
    showImg(botao1, "img/java.png");
});
botao2.addEventListener('click', function(event) {
    showImg(botao2, "img/javascript.png");
});
botao3.addEventListener('click', function(event) {
    showImg(botao3, "img/python.png");
});
botao4.addEventListener('click', function(event) {
    showImg(botao4, "img/java.png");
});
botao5.addEventListener('click', function(event) {
    showImg(botao5, "img/javascript.png");
});
botao6.addEventListener('click', function(event) {
    showImg(botao6, "img/python.png");
});