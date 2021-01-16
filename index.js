const musica = document.querySelector("#musica");
const audio = document.querySelector(".virarCarta");
const musicaVitoria = document.querySelector("#musica-vitoria");
const comecar = document.querySelector("#comecar");
const tagPaiContainer = document.querySelector(".container");
const tagPaiBody = document.querySelector("#body-imagem");
const divGanhou = document.createElement("div");

tagPaiBody.appendChild(divGanhou);

const arrayDeEventos = [];

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
            arrayDeEventos[i] = document.querySelector("#botao" + (i + 1));
            arrayDeEventos[i].addEventListener("click", function(event) {
                // console.log(event);
                audio.load();
                audio.play();
                showHideImg(arrayDeEventos[i], imagens[i]);
            });

            // botaoNaoClicavel(arrayDeEventos[i], i);
            botaoNaoClicavel(i);
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
        setTimeout(tempoVisualizacao, 1200, botao);
        // console.log("Antes de tempoVisualizacao");
        // tempoVisualizacao(botao);
        cartaVirada = "";
    }else {
        cartaVirada = imagem;
        botaoAnterior = botao;
    }
}

function tempoVisualizacao(botao) {

    // console.log(qtdCartasViradas + " e " + manter);

    if(!manter && (qtdCartasViradas > 1)) {

        // console.log("Antes do timeout de tempoVisualizacao");
        // await timeout(2000);
        botao.innerHTML = `<img class="imagem" src="img/comum.png" alt="comum">`;
        botaoAnterior.innerHTML = `<img class="imagem" src="img/comum.png" alt="comum">`;
        qtdCartasViradas = 0;
        botaoAnterior = "";
        pontos++;
    }else {
        acertos++;
        // console.log("Dentro do else de tempoVisualizacao");
        if (acertos === imagens.length/2) {
            ganhou(acertos);
        }
    }
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

function ganhou(acertos){

    musica.pause();
    musicaVitoria.load();
    musicaVitoria.play();
    musicaVitoria.volume = 0.8;
    animacaoVitoria();
    return (acertos === 3) ? true : false; 
}

function animacaoVitoria(){
    
    divGanhou.id = "ganhou";

    let animation = divGanhou.animate([
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

    animation.addEventListener("finish", function() {
        // divGanhou.style.transform = "translate(150px, 200px)";       
    });
}

// function timeout(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

function botaoNaoClicavel(i) {
    let botaoTransparente = document.createElement("button");
    botaoTransparente.classList.add("botao-transparente");
    botaoTransparente.id = `botao-transparente${i+1}`;
    // botao.appendChild(botaoTransparente);
    tagPaiContainer.appendChild(botaoTransparente);
}