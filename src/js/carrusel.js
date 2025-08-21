const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
let index = 0;

function showSlide(i) {
    if (i < 0) {
        index = items.length - 1;
    } else if (i >= items.length) {
        index = 0;
    } else {
        index = i;
    }
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

// Hace que el carrusel avance automáticamente cada 4 segundos
setInterval(() => {
    nextSlide();
}, 4000);
