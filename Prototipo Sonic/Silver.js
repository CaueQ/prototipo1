const Shadow = document.querySelector('.Shadow');


const jump = () => {
    Shadow.classList.add('jump');

    setTimeout(() => {

    Shadow.classList.remove('jump');

    }, 500)
}


document.addEventListener('keydown', jump);