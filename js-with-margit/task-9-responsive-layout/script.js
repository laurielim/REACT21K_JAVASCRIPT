let header = document.querySelector("header");
let buttonTop = document.getElementById("back-to-top");
let buttonMobileMenu = document.getElementById("mobile-menu-button");
let nav = document.querySelector("nav");
let links = document.querySelectorAll("nav ul li a");

/* function headerFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.style.backgroundColor = "#2424248c";
    header.style.color = "#fff";
    header.style.padding = "1rem";
  } else {
    header.style.backgroundColor = "transparent";
    header.style.color = "#000";
    header.style.padding = "2rem";
  }
} */

window.onscroll = function () {
  scrollFunction();
};

const scrollFunction = () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.classList.add("bg");
    buttonTop.style.display = "block";
  } else {
    header.classList.remove("bg");
    buttonTop.style.display = "none";
  }
};

const backToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const moMenu = () => {
  nav.classList.toggle("responsive");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.classList.toggle("bg");
  }
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", moMenu);
  }
};

buttonMobileMenu.addEventListener("click", moMenu);

buttonTop.addEventListener("click", backToTop);
