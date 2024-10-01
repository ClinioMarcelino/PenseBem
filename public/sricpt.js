let currentPage = 1;
let pdfDoc = null;
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

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
document.querySelector('.red-square').addEventListener('click', function () {
    if (currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
});
