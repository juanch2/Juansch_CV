document.addEventListener("DOMContentLoaded", () => {
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {
        // Oculta elementos de impresión
        hidePrintElements();

        // Lógica para la generación del PDF
        generatePDF();
    });
});

function hidePrintElements() {
    document.querySelectorAll('.no-print').forEach(element => {
        element.style.display = 'none';
    });
}

function showPrintElements() {
    document.querySelectorAll('.no-print').forEach(element => {
        element.style.display = 'flex'; // o el estilo apropiado
    });
}

function resetFooterStyle() {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.textAlign = 'center';
        // Puedes agregar más estilos según sea necesario
    }
}

function showAdditionalInfoContainer() {
    const additionalInfoContainer = document.querySelector('.additional-info-container');
    if (additionalInfoContainer) {
        additionalInfoContainer.style.display = 'block';
    }
}

function hideAdditionalInfoContainer() {
    const additionalInfoContainer = document.querySelector('.additional-info-container');
    if (additionalInfoContainer) {
        additionalInfoContainer.style.display = 'none';
    }
}

function generatePDF() {
    const $elementoParaConvertir = document.body;

    // Llamamos a showAdditionalInfoContainer antes de generar el PDF
    showAdditionalInfoContainer();

    // Almacena el estilo actual del footer antes de la generación del PDF
    const footer = document.querySelector('footer');
    const originalFooterStyle = footer ? footer.style.cssText : '';

    html2pdf()
        .set({
            margin: 1,
            filename: 'documento.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3,
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: 'portrait'
            }
        })
        .from($elementoParaConvertir)
        .outputPdf('blob')
        .then((pdfBlob) => {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            // Restaura el estilo original del footer después de generar el PDF
            if (footer) {
                footer.style.cssText = originalFooterStyle;
            }

            hideAdditionalInfoContainer();

            resetFooterStyle();

            // Asegúrate de mostrar los elementos de impresión después de cancelar
            showPrintElements();
        });
}