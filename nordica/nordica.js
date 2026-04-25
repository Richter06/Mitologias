const secoes = document.querySelectorAll(".caps");

secoes.forEach(secao => {
    const botoes = [...secao.querySelectorAll(".continuar")];

    // só o primeiro botão da seção começa liberado
    botoes.forEach((btn, i) => {
        if (i !== 0) btn.disabled = true;
    });

    botoes.forEach((botao, indice) => {
        botao.addEventListener("click", () => {
            const conteudo = botao.nextElementSibling;

            const visivel =
                window.getComputedStyle(conteudo).display !== "none";

            if (!visivel) {
                conteudo.style.display = "flex";
                botao.textContent = "Ocultar";

                if (botoes[indice + 1]) {
                    botoes[indice + 1].disabled = false;
                }

            } else {
                conteudo.style.display = "none";
                botao.textContent = "Continuar Saga";

                for (let i = indice + 1; i < botoes.length; i++) {
                    botoes[i].disabled = true;

                    const prox = botoes[i].nextElementSibling;
                    if (prox) prox.style.display = "none";

                    botoes[i].textContent = "Continuar Saga";
                }
            }
        });
    });
});