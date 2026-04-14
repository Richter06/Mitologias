const botoes = [...document.querySelectorAll(".continuar")];

// abre só primeiro botão
botoes.forEach((btn, i) => {
    if (i !== 0) btn.disabled = true;
});

botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
        const texto = botao.nextElementSibling;

        const visivel = window.getComputedStyle(texto).display !== "none";

        if (!visivel) {
            // mostra
            if (texto.classList.contains("tabuletas")) {
                texto.style.display = "flex";
            } else {
                texto.style.display = "block";
            }

            botao.textContent = "Ocultar";

            // libera próximo
            if (botoes[indice + 1]) {
                botoes[indice + 1].disabled = false;
            }

        } else {
            // esconde
            texto.style.display = "none";
            botao.textContent = "Continuar Saga";

            // trava próximos
            for (let i = indice + 1; i < botoes.length; i++) {
                botoes[i].disabled = true;

                const prox = botoes[i].nextElementSibling;
                if (prox) prox.style.display = "none";

                botoes[i].textContent = "Continuar Saga";
            }
        }
    });
});