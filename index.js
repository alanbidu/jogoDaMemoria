const botao1 = document.querySelector('#botao1');
const botao2 = document.querySelector('#botao2');
const botao3 = document.querySelector('#botao3');
const botao4 = document.querySelector('#botao4');
const botao5 = document.querySelector('#botao5');
const botao6 = document.querySelector('#botao6');

let cartaVirada = "";   //Qual carta foi virada
let manter = false;   //Manter carta virada
let botaoAnterior = ""; //Botão clicado anteriormente

function showHideImg(botao, arquivo) {
    // console.log(botao.querySelector("img").src.split("/")[9]);
    let arrayEnderecoImg = botao.querySelector("img").src.split("/");
    
    if (arrayEnderecoImg[arrayEnderecoImg.length -1] === "comum.png") {

        botao.innerHTML = `<img src="${arquivo}" alt="${arquivo.slice(4,-4)}">`;
        
        manterCarta(botao, arquivo.slice(4,-4));
    }
    
    setTimeout(tempoVisualizacao, 2000, botao);

    botaoAnterior = botao;
}

function manterCarta(botao, imagem)  {

    if(cartaVirada) {
        manter = (cartaVirada === imagem) ? true : false;
        cartaVirada = "";
        setTimeout(tempoVisualizacao, 2000, botao);
    }else {
        cartaVirada = imagem;
    }
}

function tempoVisualizacao(botao) {

    if(!manter) {
        botao.innerHTML = `<img src="img/comum.png" alt="comum">`;
        botaoAnterior.innerHTML = `<img src="img/comum.png" alt="comum">`;
    }
}


botao1.addEventListener('click', function(event) {
    // console.log(event);
    showHideImg(botao1, "img/java.png");
    // botao1.virar = 
});
botao2.addEventListener('click', function(event) {
    showHideImg(botao2, "img/javascript.png");
});
botao3.addEventListener('click', function(event) {
    showHideImg(botao3, "img/python.png");
});
botao4.addEventListener('click', function(event) {
    showHideImg(botao4, "img/java.png");
});
botao5.addEventListener('click', function(event) {
    showHideImg(botao5, "img/javascript.png");
});
botao6.addEventListener('click', function(event) {
    showHideImg(botao6, "img/python.png");
});