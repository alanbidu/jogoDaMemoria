const musica = document.querySelector("#musica");
const audio = document.querySelector(".virarCarta");
const musicaVitoria = document.querySelector("#musica-vitoria");
const comecar = document.querySelector("#comecar");
const tagPaiContainer = document.querySelector(".container");
const tagPaiBody = document.querySelector("#body-imagem");
const divGanhou = document.createElement("div");


tagPaiBody.appendChild(divGanhou);

const arrayDeBotoes = [];

let imagens = ["img/imagem4.png", "img/imagem5.png", "img/imagem6.png",
    "img/imagem1.png", "img/imagem2.png", "img/imagem3.png"];
imagens = imagens.concat(imagens);


let cartaVirada = "";   //Qual carta foi virada
let manter = false;   //Manter carta virada
let botaoAnterior = ""; //Botão clicado anteriormente
let qtdCartasViradas = 0;
let pontos = 0;
let cartasDistribuidas = 0;
let acertos;

comecar.addEventListener("click", function(event) {
    
    musicaVitoria.pause();
    
    musica.load();
    musica.play();
    musica.volume = 0.2;
    
    acertos = 0;

    divGanhou.id = "";

    embaralharCartas();

    if(distribuirCartas(imagens.length) === 1) {

        for (let i = 0; i < imagens.length; i++) {
            arrayDeBotoes[i] = document.querySelector(`#botao${(i + 1)}`);
            arrayDeBotoes[i].addEventListener("click", function(event) {
                // console.log(event);
                audio.load();
                audio.play();
                showHideImg(arrayDeBotoes[i], imagens[i]);
            });

        }
    }

});


function showHideImg(botao, arquivo) {
    // console.log(botao.querySelector("img").src.split("/")[9]);
    qtdCartasViradas++;

    let arrayEnderecoImg = botao.querySelector("img").src.split("/");
    
    if (arrayEnderecoImg[arrayEnderecoImg.length -1] === "comum.png") {

        botao.innerHTML = `<img class="imagem" src="${arquivo}" alt="${arquivo.slice(4,-4)}">`;
        
        

        manterCarta(botao, arquivo.slice(4,-4));
    }
    
}

function manterCarta(botao, imagem)  {

    if(cartaVirada) {
        manter = (cartaVirada === imagem) ? true : false;
        desabilitarBotoes();
        setTimeout(tempoVisualizacao, 2000, botao);
        
        cartaVirada = "";
    }else {
        cartaVirada = imagem;
        botaoAnterior = botao;
    }
}

function tempoVisualizacao(botao) {


    if(!manter && (qtdCartasViradas > 1)) {

        botao.innerHTML = `<img class="imagem" src="img/comum.png" alt="comum">`;
        botaoAnterior.innerHTML = `<img class="imagem" src="img/comum.png" alt="comum">`;
        qtdCartasViradas = 0;
        botaoAnterior = "";
        pontos++;
    }else {
        acertos++;

        if (acertos === imagens.length/2) {
            ganhou();
        }
    }
    
    habilitarBotoes();
}

function embaralharCartas() {
    
    imagens.sort(() => Math.random() - 0.5);
}

function distribuirCartas(qtdCartas) {

    if(!cartasDistribuidas) {
        for(let i = 1; i <= qtdCartas; i++){

            let botaoCriado = document.createElement("button");

            botaoCriado.classList.add("botao");
            botaoCriado.id = "botao" + i;

            let imagemFilha = anexarImagem(i);

            botaoCriado.appendChild(imagemFilha);

            tagPaiContainer.appendChild(botaoCriado);

        }

        cartasDistribuidas++;

    }else{
        for(let i = 1; i <= qtdCartas; i++){
            tagPaiContainer.children[i].children[0].src = "img/comum.png";
            cartasDistribuidas++;
        }
        console.log("Resetando");
    }

    return cartasDistribuidas;
}

function anexarImagem(indice){

    let imagemCriada = document.createElement("img");

    imagemCriada.classList.add("imagem");
    imagemCriada.src = "img/comum.png";
    imagemCriada.alt = "Carta " + indice;

    return imagemCriada;
}

function ganhou(){

    musica.pause();
    musicaVitoria.load();
    musicaVitoria.play();
    musicaVitoria.volume = 0.8;
    animacaoVitoria();
}

function animacaoVitoria(){
    
    divGanhou.id = "ganhou";

    divGanhou.animate([
        {transform: "scale(0.1)"},
        {transform: "scale(1)"},
        {transform: "scale(0.5)"},
        {transform: "scale(1)"},
        {transform: "scale(0.6)"},
        {transform: "scale(1)"},
        {transform: "scale(0.7)"},
        {transform: "scale(1)"},
        {transform: "scale(0.8)"},
        {transform: "scale(1)"},
        {transform: "scale(0.9)"},
        {transform: "scale(1)"}
    ], 5000);

}


function desabilitarBotoes() {
    arrayDeBotoes.forEach(b => b.disabled = true);
}

function habilitarBotoes() {
    arrayDeBotoes.forEach(b => b.disabled = false);
}