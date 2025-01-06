import Swiper from 'swiper';
import { Navigation, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

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
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});
new Swiper('#swiper-main', {
    loop: true,
    spaceBetween: 10,
    autoplay: {
        delay: 5000,
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
