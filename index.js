const musica = document.querySelector("#musica");
const audio = document.querySelector(".virarCarta");
const comecar = document.querySelector("#comecar");
const tagPai = document.querySelector(".container");


const arrayDeEventos = [];

let imagens = ["img/imagem4.png", "img/imagem5.png", "img/imagem6.png"];

let cartaVirada = "";   //Qual carta foi virada
let manter = false;   //Manter carta virada
let botaoAnterior = ""; //Botão clicado anteriormente
let qtdCartasViradas = 0;
let pontos = 0;
let cartasDistribuidas = 0;


comecar.addEventListener("click", function(event) {
    musica.load();
    musica.play();
    musica.volume = 0.2;

    embaralharCartas();

    if(distribuirCartas(6) === 1) {

        console.log("Adicionndo EventListener");
        for (let i = 0; i < 6; i++) {
            arrayDeEventos[i] = document.querySelector("#botao" + (i + 1));
            arrayDeEventos[i].addEventListener("click", function(event) {
                // console.log(event);
                audio.load();
                audio.play();
                showHideImg(arrayDeEventos[i], imagens[i]);
                if(ganhou()) {
                    animacaoVitoria();
                }
            });
        }
    }
});


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
        pontos++;
    }
}

function embaralharCartas() {
    
    imagens = imagens.concat(imagens);
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

        tagPai.appendChild(botaoCriado);

        }

        cartasDistribuidas++;

    }else{
        for(let i = 1; i <= qtdCartas; i++){
            tagPai.children[i].children[0].src = "img/comum.png";
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
    return false; //true ou false
}

function animacaoVitoria(){

}