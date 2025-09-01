// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email_input').value;
            const password = document.getElementById('password_input').value;

            if (!email || !password) {
                errorMessage.textContent = 'Por favor, completa todos los campos.';
                return;
            }

            try {
                console.log('Attempting login with email:', email);
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                console.log('Response status:', response.status);
                const data = await response.json();
                console.log('Response data:', data);

                if (response.ok) {
                    // Guardar estado de login en localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify(data.user));

                    // Redirigir a la página principal o catálogo
                    window.location.href = '/src/pages/view_catalog.html';
                } else {
                    errorMessage.textContent = data.message || 'Error en el inicio de sesión.';
                }
            } catch (error) {
                console.error('Error:', error);
                errorMessage.textContent = 'Error de conexión. Inténtalo de nuevo.';
            }
        });
    }

    // Botón para crear cuenta
    const createAccountButton = document.querySelector('.create-account-button');
    if (createAccountButton) {
        createAccountButton.addEventListener('click', () => {
            window.location.href = '/src/pages/register.html';
        });
    }
});
