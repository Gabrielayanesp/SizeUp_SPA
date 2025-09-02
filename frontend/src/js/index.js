// index.js
document.addEventListener('DOMContentLoaded', () => {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const createAccountBtn = document.querySelector('.secondary-button:last-child'); // Assuming "Create Account" is the last secondary button

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = '/src/pages/login.html';
        });
    }

    if (createAccountBtn && createAccountBtn.textContent.trim() === 'Create Account') {
        createAccountBtn.addEventListener('click', () => {
            window.location.href = '/src/pages/register.html';
        });
    }
});
