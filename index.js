const musica = document.querySelector("#musica");
const audio = document.querySelector(".virarCarta");
const comecar = document.querySelector("#comecar");

const arrayDeEventos = [];

let imagens = ["img/imagem4.png", "img/imagem5.png", "img/imagem6.png"];

let cartaVirada = "";   //Qual carta foi virada
let manter = false;   //Manter carta virada
let botaoAnterior = ""; //Botão clicado anteriormente
let qtdCartasViradas = 0;


embaralharCartas();

distribuirCartas(6);


comecar.addEventListener("click", function(event) {
    musica.play();
    musica.volume = 0.2;
    distribuirCartas(6);
});


for (let i = 0; i < 6; i++) {
    arrayDeEventos[i] = document.querySelector("#botao" + (i + 1));
    arrayDeEventos[i].addEventListener("click", function(event) {
        // console.log(event);
        audio.load();
        audio.play();
        showHideImg(arrayDeEventos[i], imagens[i]);
    });
}

function showHideImg(botao, arquivo) {
    // console.log(botao.querySelector("img").src.split("/")[9]);
    let arrayEnderecoImg = botao.querySelector("img").src.split("/");
    
    if (arrayEnderecoImg[arrayEnderecoImg.length -1] === "comum.png") {

        botao.innerHTML = `<img src="${arquivo}" alt="${arquivo.slice(4,-4)}">`;
        
        

        manterCarta(botao, arquivo.slice(4,-4));
    }
    
    qtdCartasViradas++;
}

function manterCarta(botao, imagem)  {

    if(cartaVirada) {
        manter = (cartaVirada === imagem) ? true : false;
        setTimeout(tempoVisualizacao, 1200, botao);
        cartaVirada = "";
    }else {
        cartaVirada = imagem;
        botaoAnterior = botao;
    }
}

function tempoVisualizacao(botao) {

    if(!manter && (qtdCartasViradas >1)) {

        botao.innerHTML = `<img src="img/comum.png" alt="comum">`;
        botaoAnterior.innerHTML = `<img src="img/comum.png" alt="comum">`;
        qtdCartasViradas = 0;
        botaoAnterior = "";
    }
}

function embaralharCartas() {
    imagens = imagens.concat(imagens);
    imagens.sort(() => Math.random() - 0.5);
}

function distribuirCartas(qtdCartas) {
    
}