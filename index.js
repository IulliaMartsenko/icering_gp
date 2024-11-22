

const burger = document.querySelector('.burger');
burger.addEventListener('click', openBurger);


function openBurger() {
    burger.classList.toggle('active');
}

