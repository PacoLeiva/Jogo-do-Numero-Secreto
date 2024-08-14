let listaNumerosSorteados = [];
let tamanhoJogo = 0;

let dificuldade = prompt('Digite a dificuldade: Easy / Medium / Hard');

if (dificuldade == 'hard' || dificuldade == 'Hard' || dificuldade == 'HARD') {
    tamanhoJogo = 1000;
} else { 
    if (dificuldade == 'medium' || dificuldade == 'Medium' || dificuldade == 'MEDIUM') {
    tamanhoJogo = 100;
    } else {
        tamanhoJogo = 10;
    }
}


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * tamanhoJogo + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;
    if (quantidadeElementosLista == tamanhoJogo) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
                let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'O número escolhido é menor que o número secreto!');
        } else {
            exibirTextoNaTela('p', 'O número escolhido é maior que o número secreto!');
        }
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", 'Jogo do Número Secreto!');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${tamanhoJogo}`);
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let chute = 0;
exibirMensagemInicial();



