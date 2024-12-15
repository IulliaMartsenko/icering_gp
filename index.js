const nav = document.querySelector(".navbar");
const burger = document.querySelector(".burger");
const navLinks = document.querySelectorAll(".navbar-link .link");
const questions = document.querySelectorAll(".faq__block-question");

burger.addEventListener("click", () => toggleVisibilityMenu());
navLinks.forEach((link) => {
  link.addEventListener("click", () => toggleVisibilityMenu(false));
});

function toggleVisibilityMenu(force) {
  burger.classList.toggle("active", force);
  nav.classList.toggle("open", force);
  document.body.classList.toggle("unscroll", force);
}

questions.forEach((question) => {
  const button = question.querySelector(".faq__block-question-header");
  button.addEventListener("click", () => {
    question.classList.toggle("faq__block-question--open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var main = new Splide("#main-carousel", {
    type: "fade",
    rewind: true,
    pagination: false,
    arrows: false,
  });

  var thumbnails = new Splide("#thumbnail-carousel", {
    fixedWidth: 100,
    fixedHeight: 60,
    gap: 10,
    rewind: true,
    pagination: false,
    isNavigation: true,
    breakpoints: {
      600: {
        fixedWidth: 60,
        fixedHeight: 44,
      },
    },
  });
  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
});
