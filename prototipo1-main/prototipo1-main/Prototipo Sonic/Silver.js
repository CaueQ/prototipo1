

document.addEventListener('DOMContentLoaded', function () {
    const shadow = document.querySelector('.Shadow');
    let left = 0;

    shadow.style.left = left + 'px';

    document.addEventListener('keydown', function (event) {
        const quadradox = document.querySelector('.quadradox');
        const maxLeft = quadradox.offsetWidth - shadow.offsetWidth;

        // Movimento para esquerda/direita
        if (event.key === 'ArrowRight') {
            left += 10;
            if (left > maxLeft) left = maxLeft;
            shadow.style.left = left + 'px';
        }
        if (event.key === 'ArrowLeft') {
            left -= 10;
            if (left < 0) left = 0;
            shadow.style.left = left + 'px';
        }

        // Pular só com seta para cima
        if (event.key === 'ArrowUp') {
            if (!shadow.classList.contains('jump')) {
                shadow.classList.add('jump');
                setTimeout(() => {
                    shadow.classList.remove('jump');
                }, 500); // tempo igual ao da animação
            }
        }
    });
});