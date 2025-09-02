document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.item');
    const totalSpan = document.getElementById('total');

    function updateTotal() {
        let total = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += parseFloat(cb.getAttribute('data-price'));
            }
        });
        totalSpan.textContent = '$' + total.toFixed(2);
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateTotal);
    });

    // Initial calculation
    updateTotal();

    // Modal
    const pedidoBtn = document.getElementById('pedidoBtn');
    const modal = document.getElementById('modalPago');
    const cerrarModal = document.getElementById('cerrarModal');

    pedidoBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Payment function
    window.pagar = function(type) {
        const mensaje = document.getElementById('mensajePago');
        mensaje.textContent = `Pago realizado con ${type}`;
        setTimeout(() => {
            modal.style.display = 'none';
            mensaje.textContent = '';
        }, 2000);
    };
});
