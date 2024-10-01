let currentPage = 1;
let pdfDoc = null;
let gabarito = "A";
let pergunta = 0;

const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
const answerButtons = document.querySelectorAll('.button');

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
    // document.getElementsByClassName()
    if (currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
};

answerButtons.forEach(button => {
    button.addEventListener('click', function() {
      const userAnswer = this.getAttribute('data-'); // Obter a resposta selecionada
      const Element = document.querySelector('.screen-text'); // Elemento onde exibiremos o resultado
    
      // Verificar se a resposta está correta
        if (userAnswer === gabarito) {
            // const Element = document.querySelector('.screen-text');
            Element.textContent = 'Certo';
            Element.style.color = 'green';

            // TODO!
            if(true){
                troca_pagina();
            }
        }
        else{
            Element.textContent = 'Errado';
            Element.style.color = 'red'; 
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