document.addEventListener('DOMContentLoaded', function () {
    const shadow = document.querySelector('.Shadow');
    const morro = document.querySelector('.Morro');
    const quadradox = document.querySelector('.quadradox');

    let left = 0;
    let posY = 60; // posição inicial (em cima do chão)
    let pulando = false;
    let noMorro = false;
    let velocidade = 0;
    const gravidade = 0.7;
    const alturaMaxima = 180; // altura máxima do pulo
    const alturaChao = 60;
    const alturaMorro = 120; // altura do morro + chão

    shadow.style.left = left + 'px';
    shadow.style.bottom = posY + 'px';

    document.addEventListener('keydown', function (event) {
        const maxLeft = quadradox.offsetWidth - shadow.offsetWidth;

        // Movimento para direita
        if (event.key === 'ArrowRight') {
            left += 10;
            if (left > maxLeft) left = maxLeft;
            shadow.style.left = left + 'px';
        }

        // Movimento para esquerda
        if (event.key === 'ArrowLeft') {
            left -= 10;
            if (left < 0) left = 0;
            shadow.style.left = left + 'px';
        }

        // Pular
        if (event.key === 'ArrowUp' && !pulando && !noMorro) {
            pulando = true;
            velocidade = 12;
            pular();
        }

        // Descer do morro
        if (event.key === 'ArrowDown' && noMorro) {
            posY = alturaChao;
            shadow.style.bottom = posY + 'px';
            noMorro = false;
        }
    });

    function pular() {
        let puloInterval = setInterval(() => {
            posY += velocidade;
            velocidade -= gravidade;

            // Limite superior do pulo
            if (posY >= alturaMaxima) {
                velocidade = -velocidade;
            }

            // Verifica colisão com o morro
            const shadowRect = shadow.getBoundingClientRect();
            const morroRect = morro.getBoundingClientRect();

            if (
                velocidade < 0 &&
                shadowRect.right > morroRect.left &&
                shadowRect.left < morroRect.right &&
                shadowRect.bottom >= morroRect.top
            ) {
                posY = alturaMorro;
                shadow.style.bottom = posY + 'px';
                noMorro = true;
                pulando = false;
                clearInterval(puloInterval);
                return;
            }

            // Se cair no chão
            if (posY <= alturaChao) {
                posY = alturaChao;
                shadow.style.bottom = posY + 'px';
                pulando = false;
                clearInterval(puloInterval);
                return;
            }

            shadow.style.bottom = posY + 'px';
        }, 20);
    }
}
);