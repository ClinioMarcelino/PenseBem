let currentPage = 1;
let pdfDoc = null;
let n_game = 0;
let game_page_start = [5,11,17,23,29,3];
let end_game_questions = [30,60,90,120,150];
let gabarito = ["A","B","C","D"];
let pergunta = 0;

const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
const answerButtons = document.querySelectorAll('.button');
const gameChoose = document.querySelectorAll('.game')

// Carregar o PDF do servidor
pdfjsLib.getDocument('/formula1.pdf').promise.then(function (pdf) {
    pdfDoc = pdf;
    renderPage(currentPage);
}).catch(function (error) {
    console.error("Erro ao carregar o PDF: ", error);
});

// Função para renderizar a página
function renderPage(num) {
    pdfDoc.getPage(num).then(function (page) {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderContext);
    }).catch(function (error) {
        console.error("Erro ao renderizar a página: ", error);
    });
}

// Adiciona a funcionalidade de clicar no quadrado vermelho para avançar as páginas
function troca_pagina() {
    switch (pergunta){
        case 7:
        case 14:
        case 20:
        case 26:
        case 30:
        case 36:
        case 42:
        case 50:
        case 55:
        case 60:
        case 66:
        case 78:
        case 80:
        case 86:
        case 90:
        case 97:
        case 103:
        case 110:
        case 116:
        case 120:
        case 127:
        case 133:
        case 140:
        case 146:
        case 150:
            currentPage++;
            renderPage(currentPage);
        break;
        default:
        break;
    }
};

answerButtons.forEach(button => {
    button.addEventListener('click', function() {
      const userAnswer = this.getAttribute('data-'); // Obter a resposta selecionada
      const Element = document.querySelector('.screen-text'); // Elemento onde exibiremos o resultado
    
      // Verificar se a resposta está correta
        if (userAnswer === gabarito[pergunta]) {
            // const Element = document.querySelector('.screen-text');
            Element.textContent = 'Certo';
            Element.style.color = 'green';
            pergunta++;
            troca_pagina();
            
        }
        else{
            Element.textContent = 'Errado';
            Element.style.color = 'red'; 
        }
    })
});

gameChoose.forEach(span => {
    span.addEventListener('click', function() {
        if (currentPage === 1){
        n_game = parseInt(this.getAttribute('data-')); // Obter a resposta selecionada
        currentPage = game_page_start[n_game];
        renderPage(currentPage);
        }
    })
});



// function altera_janela(resposta){
//     document.getElementsByClassName("screen-text").textContent = resposta;
// }

function escrever_tela(str) {
    const Element = document.querySelector('.screen-text');
    if (str === 1) {
      Element.textContent = 'Certo';
      Element.style.color = 'green';  
    }
    else{
        Element.textContent = 'Errado';
      Element.style.color = 'red'; 
    }
  }