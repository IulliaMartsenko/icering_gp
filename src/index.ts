import Swiper from 'swiper';
import { Navigation, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/thumbs';
import './style.css';

modalLogic();
const nav = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelectorAll('.navbar-link .link');
const questions = document.querySelectorAll('.faq__block-question');

burger.addEventListener('click', () => toggleVisibilityMenu());
navLinks.forEach((link) => {
    link.addEventListener('click', () => toggleVisibilityMenu(false));
});

function toggleVisibilityMenu(force?: boolean) {
    burger.classList.toggle('active', force);
    nav.classList.toggle('open', force);
    document.body.classList.toggle('unscroll', force);
}

questions.forEach((question) => {
    const button = question.querySelector('.faq__block-question-header');
    button.addEventListener('click', () => {
        question.classList.toggle('faq__block-question--open');
    });
});

const swiperThumbs = new Swiper('#swiper-thumbs', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        480: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 5,
        },
    },
});
new Swiper('#swiper-main', {
    loop: true,
    spaceBetween: 10,
    autoplay: {
        delay: 10000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: swiperThumbs,
    },
    modules: [Navigation, Autoplay, Thumbs],
});

const modal = document.querySelector('.modal'),
    overlay = document.querySelector('#overlay-modal'),
    closeButton = document.querySelector('.js-modal-close');

function modalLogic() {
    document.addEventListener('DOMContentLoaded', function () {
       modalOpen();

        closeButton.addEventListener('click', function (e) {
            modalClose();
        });

        overlay.addEventListener('click', function () {
            modalClose();
        });
    });
}

function modalOpen() {
    modal.classList.add('modal--opened');
    overlay.classList.add('overlay--opened');
    document.body.classList.add('unscroll');
}

function modalClose() {
    modal.classList.remove('modal--opened');
    overlay.classList.remove('overlay--opened');
    document.body.classList.remove('unscroll');
}
