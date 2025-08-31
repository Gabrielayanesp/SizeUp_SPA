// Seleccionar elementos del DOM
let total = 0;
const totalElement = document.getElementById("total");
const pedidoBtn = document.getElementById("pedidoBtn");
const modalPago = document.getElementById("modalPago");
const mensajePago = document.getElementById("mensajePago");
const cerrarModal = document.getElementById("cerrarModal");
const cart = document.querySelector(".cart");

// Función para recalcular el total
function recalcularTotal() {
    let sum = 0;
    const checkboxes = document.querySelectorAll(".item");
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            sum += parseInt(checkbox.dataset.price);
        }
    });
    total = sum;
    totalElement.textContent = `$${total.toLocaleString('es-CO')}`;
}

// Inicializar
window.addEventListener("load", () => {
    mensajePago.textContent = "";
    modalPago.style.display = "none";
    recalcularTotal();
});

// Actualizar total al marcar/desmarcar productos
cart.addEventListener("change", (e) => {
    if (e.target.classList.contains("item")) {
        recalcularTotal();
    }
});

// Eliminar producto
cart.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const product = e.target.closest(".product");
        // Si el producto tenía checkbox marcado, restar su precio
        const checkbox = product.querySelector(".item");
        if (checkbox.checked) {
            total -= parseInt(checkbox.dataset.price);
        }
        product.remove();
        recalcularTotal();
    }
});

// Mostrar modal al hacer click en "Place Order"
pedidoBtn.addEventListener("click", () => {
    if (total === 0) {
        alert("Please select at least one product before ordering.");
        return;
    }
    modalPago.style.display = "flex";
    mensajePago.textContent = "";
});

// Función para simular el pago
function pagar(metodo) {
    mensajePago.textContent = `✅ Your payment with ${metodo} was successful. Your order will arrive within 15 days. Thank you for shopping with us!`;
    mensajePago.style.color = "green";
}

// Cerrar modal
cerrarModal.addEventListener("click", () => {
    modalPago.style.display = "none";
});

// Cerrar modal al hacer click fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modalPago) {
        modalPago.style.display = "none";
    }
});
