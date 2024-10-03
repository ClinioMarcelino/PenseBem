let currentPage = 1;
let pdfDoc = null;
let n_game = 0;
let game_page_start = [5,11,17,23,29,3];
let end_game_questions = [30,60,90,120,150];
let gabarito = ["D","C","B","B","C","D","D","B","A","A","D","C","B","D","A","D","A","C","A","C","C","B","D","A","B","A","B","D","A","C","A","C","C","B","D","D","D","B","D","A","B","C","B","D","A","A","A","B","C","A","A","B","A","D","B","B","B","C","D","C","D","D","D","A","C","A","A","B","C","A","A","B","A","D","B","D","C","C","B","A","D","B","A","D","B","B","D","C","C","C","B","A","D","B","A","D","B","B","D","C","A","A","D","A","D","D","B","C","C","D","D","C","C","D","D","A","A","C","D","B","B","D","D","B","B","D","A","B","D","A","B","C","C","A","B","D","D","C","D","C","B","B","B","A","C","A","D","D","D","C"];
let pergunta = 0;
let score = 0;
let n_try = 3;

// ajuda = 3
// jogo1 = 5 -> perguntas(0)[7,14,21,25,30]
// jogo2 = 11 -> perguntas(31)[36,43,50,56,60]
// jogo3 = 17 -> perguntas(61)[66,67a79duas paginas,86,90]
// jogo4 = 23 -> perguntas(91)[97,102,110,116,120]
// jogo5 = 29 -> perguntas(121)[126,127a129 duas paginas,145,150]
// jogo6 = {6 perguntas, aleatoriamente do livro} pensar se sim ou n a lgogica

const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
const answerButtons = document.querySelectorAll('.button');
const gameChoose = document.querySelectorAll('.game')

// Carregar o PDF do servidor
pdfjsLib.getDocument('/zeca.pdf').promise.then(function (pdf) {
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
        case 21:
        case 25:
        case 36:
        case 43:
        case 50:
        case 56:
        case 66:
        case 78:
        case 80:
        case 86:
        case 97:
        case 102:
        case 110:
        case 116:
        case 127:
        case 129:
        case 145:
            currentPage++;
            renderPage(currentPage);
        break;
        case 30:
        case 60:
        case 90:
        case 120:
        case 150:
            currentPage=1;
            renderPage(currentPage);
        break;
        default:
        break;
    }
};

answerButtons.forEach(button => {
    button.addEventListener('click', function() {
        const userAnswer = this.getAttribute('data-'); // Obter a resposta selecionada
        anwser_question(userAnswer);
    })
});

gameChoose.forEach(span => {
    span.addEventListener('click', function() {
        if (currentPage === 1){
        n_game = parseInt(this.getAttribute('data-')); // Obter a resposta selecionada
        currentPage = game_page_start[n_game];
        renderPage(currentPage);
        switch(n_game){
            case 1:
                pergunta=30;
            break;
            case 2:
                pergunta=60;
            break;
            case 3:
                pergunta=90;
            break;
            case 4:
                pergunta=120;
            break;
        }
        
        escreve_pergunta();
        }
        else{
            alert("Error: por favor, finalise o jogo em andamento")
        }
    })
});

function anwser_question(awnsr){
    const Element = document.querySelector('.screen-text');
    if(awnsr === gabarito[pergunta]){
        pergunta++;
        troca_pagina();
        Element.textContent = "Certo";
        Element.style.color = "green";
        score+=n_try;
        n_try=3;
        limpa_tela(500);
        // escreve_pergunta();
    }else if(n_try!=1){
        Element.textContent = `Errado tentativa ${3-n_try+1}/3`;
        Element.style.color = "red";
        n_try--;
        limpa_tela(500);
        // escreve_pergunta();
    }else{
        Element.textContent = `Errado tentativa 3/3`;
        Element.style.color = "red";
        pergunta++;
        troca_pagina();
        escreve_pergunta();
        n_try=3;
    }
}


  function limpa_tela(tempo){
    const Element = document.querySelector('.screen-text');
    function sleep() {
        return new Promise(resolve => setTimeout(resolve, 1000));
      }
    sleep().then(escreve_pergunta());
    
  }

  function escreve_pergunta(){
    const Element = document.querySelector('.screen-text');

    Element.textContent = `Pergunta ${pergunta+1}`;
    Element.style.color = 'yellow';
  }