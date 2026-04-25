const secoes = document.querySelectorAll(".caps");
const somFlip = new Audio("templates_nordica/carta-flip.mp3");
const somBack = new Audio("templates_nordica/carta-unflip.mp3");

/*  BOTÕES  */
secoes.forEach(secao => {
    const botoes = [...secao.querySelectorAll(".continuar")];

    // libera primeiro botao
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

                // espera renderizar
                requestAnimationFrame(() => {
                    ativarCartas(conteudo);
                });

                if (botoes[indice + 1]) {
                    botoes[indice + 1].disabled = false;
                }

            } else {

                conteudo.style.display = "none";
                botao.textContent = "Continuar Saga";

                // trava próximos botões
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


/*  CARTAS  */
function ativarCartas(area) {

    const imagens = area.querySelectorAll(".imagem img");

    imagens.forEach(img => {

        // evita duplicar carta
        if (img.dataset.processada) return;

        const criarCarta = () => {

            if (img.dataset.processada) return;
            img.dataset.processada = "sim";

            const wrapper = document.createElement("div");
            wrapper.className = "carta";

            const inner = document.createElement("div");
            inner.className = "carta-inner";

            const verso = document.createElement("div");
            verso.className = "carta-verso";

            const frente = document.createElement("div");
            frente.className = "carta-frente";

            // pega tamanho real renderizado
            const largura = img.offsetWidth;
            const altura = img.offsetHeight;

            inner.style.width = largura + "px";
            inner.style.height = altura + "px";

            img.parentNode.insertBefore(wrapper, img);

            wrapper.appendChild(inner);
            inner.appendChild(verso);
            inner.appendChild(frente);
            frente.appendChild(img);

           document.querySelectorAll(".carta").forEach(wrapper => {

    wrapper.addEventListener("click", () => {

        const virou = wrapper.classList.toggle("virada");

        // garante reinício do áudio
        const som = virou ? somFlip : somBack;

        som.currentTime = 0;
        som.play().catch(() => {});
    });

});
        };

        // garante que imagem já foi renderizada
        if (img.complete) {
            requestAnimationFrame(criarCarta);
        } else {
            img.onload = () => requestAnimationFrame(criarCarta);
        }
    });
}