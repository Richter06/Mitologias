const secoes = document.querySelectorAll(".caps");
const somFlip = new Audio("templates_grega/carta-flip.mp3");
const somBack = new Audio("templates_grega/carta-unflip.mp3");

/* BOTÕES */
secoes.forEach(secao => {
    const botoes = [...secao.querySelectorAll(".continuar")];

    // libera só o primeiro botão
    botoes.forEach((btn, i) => {
        if (i !== 0) btn.disabled = true;
    });

    botoes.forEach((botao, indice) => {
        botao.addEventListener("click", () => {
            const conteudo = botao.nextElementSibling;
            if (!conteudo) return;

            const visivel = window.getComputedStyle(conteudo).display !== "none";

            if (!visivel) {
                conteudo.style.display = "flex";
                botao.textContent = "Ocultar";

                requestAnimationFrame(() => {
                    ativarCartas(conteudo);
                });

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

/* CARTAS */
function ativarCartas(area) {
    const imagens = area.querySelectorAll(".imagem img");

    imagens.forEach(img => {
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

            const largura = img.offsetWidth || 300;
            const altura = img.offsetHeight || 300;

            inner.style.width = largura + "px";
            inner.style.height = altura + "px";

            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(inner);
            inner.appendChild(verso);
            inner.appendChild(frente);
            frente.appendChild(img);

            wrapper.addEventListener("click", () => {
                const virou = wrapper.classList.toggle("virada");
                const som = virou ? somFlip : somBack;

                som.currentTime = 0;
                som.play().catch(() => {});
            });
        };

        if (img.complete) {
            requestAnimationFrame(criarCarta);
        } else {
            img.onload = () => requestAnimationFrame(criarCarta);
        }
    });
}

/* Mostra primeira img */
secoes.forEach(secao => {
    const primeira = secao.querySelector(".tabuletas");

    if (primeira) {
        primeira.style.display = "flex";
        ativarCartas(primeira);
    }
});