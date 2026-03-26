const botoes = [...document.querySelectorAll(".continuar")];

// Desabilita todos menos o primeiro botão
botoes.forEach((btn, i) => {
    if (i !== 0) btn.disabled = true;
});

botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
        const texto = botao.nextElementSibling;

        // mostra texto escondido
        if (texto.style.display !== "block") {
            texto.style.display = "block";
            botao.textContent = "Ocultar";

            // libera proximo
            if (botoes[indice + 1]) botoes[indice + 1].disabled = false;

        } else { // esconder
            texto.style.display = "none";
            botao.textContent = "Continuar Saga";

            // trava botoes proximos
            for (let i = indice + 1; i < botoes.length; i++) {
                botoes[i].disabled = true;
                botoes[i].nextElementSibling.style.display = "none";
                botoes[i].textContent = "Continuar Saga";
            }
        }
    });
});