// register.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('firstname_input').value;
            const email = document.getElementById('email_input').value;
            const password = document.getElementById('password_input').value;
            const confirmPassword = document.getElementById('repeat-password_input').value;

            if (!name || !email || !password || !confirmPassword) {
                errorMessage.textContent = 'Por favor, completa todos los campos.';
                return;
            }

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Las contraseñas no coinciden.';
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Guardar token en localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    // Redirigir a la página principal o catálogo
                    window.location.href = '/src/pages/view_catalog.html';
                } else {
                    errorMessage.textContent = data.message || 'Error en el registro.';
                }
            } catch (error) {
                console.error('Error:', error);
                errorMessage.textContent = 'Error de conexión. Inténtalo de nuevo.';
            }
        });
    }
});
