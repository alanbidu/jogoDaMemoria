const botao1 = document.querySelector('#botao1');
const botao2 = document.querySelector('#botao2');
const botao3 = document.querySelector('#botao3');
const botao4 = document.querySelector('#botao4');
const botao5 = document.querySelector('#botao5');
const botao6 = document.querySelector('#botao6');

let imagens = ["img/java.png", "img/javascript.png", "img/python.png"];
imagens = imagens.concat(imagens);
imagens.sort(() => Math.random() - 0.5);

let cartaVirada = "";   //Qual carta foi virada
let manter = false;   //Manter carta virada
let botaoAnterior = ""; //Botão clicado anteriormente
let qtdCartasViradas = 0;

function showHideImg(botao, arquivo) {
    // console.log(botao.querySelector("img").src.split("/")[9]);
    let arrayEnderecoImg = botao.querySelector("img").src.split("/");
    
    if (arrayEnderecoImg[arrayEnderecoImg.length -1] === "comum.png") {

        botao.innerHTML = `<img src="${arquivo}" alt="${arquivo.slice(4,-4)}">`;
        
        manterCarta(botao, arquivo.slice(4,-4));
    }
    
    qtdCartasViradas++;
    setTimeout(tempoVisualizacao, 2000, botao);

    if(botaoAnterior !== botao){
        botaoAnterior = botao;
    }
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

    console.log(botaoAnterior);
    if(!manter && (qtdCartasViradas >1)) {
        botao.innerHTML = `<img src="img/comum.png" alt="comum">`;
        botaoAnterior.innerHTML = `<img src="img/comum.png" alt="comum">`;
        qtdCartasViradas = 0;
    }
}


botao1.addEventListener('click', function(event) {
    // console.log(event);
    console.log("botao1");
    showHideImg(botao1, imagens[0]);
    // botao1.virar = 
});
botao2.addEventListener('click', function(event) {
    console.log("botao2");
    showHideImg(botao2, imagens[1]);
});
botao3.addEventListener('click', function(event) {
    showHideImg(botao3, imagens[2]);
});
botao4.addEventListener('click', function(event) {
    showHideImg(botao4, imagens[3]);
});
botao5.addEventListener('click', function(event) {
    showHideImg(botao5, imagens[4]);
});
botao6.addEventListener('click', function(event) {
    showHideImg(botao6, imagens[5]);
});