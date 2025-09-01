document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginPage = '/src/pages/login.html';
    const catalogPage = '/src/pages/view_catalog.html';
    const currentPath = window.location.pathname;

    // Public pages: index, login, register
    const publicPages = [
        '/',
        '/index.html',
        '/src/pages/login.html',
        '/src/pages/register.html'
    ];

    // Protected pages: catalog, cart, account, about us, contact
    const protectedPages = [
        '/src/pages/view_catalog.html',
        '/src/pages/view_cart.html',
        '/src/pages/view_account.html',
        '/src/pages/view_about_us.html',
        '/src/pages/view_contact.html'
    ];

    // If user is logged in and tries to access public pages, redirect to catalog
    if (isLoggedIn && publicPages.includes(currentPath)) {
        window.location.href = catalogPage;
        return; // Prevent further execution
    }

    // If user is not logged in and tries to access protected pages, redirect to login
    if (!isLoggedIn && protectedPages.includes(currentPath)) {
        window.location.href = loginPage;
        return; // Prevent further execution
    }

    // Change login link to logout if user is logged in
    const loginLink = document.querySelector('a.log_in');
    if (isLoggedIn && loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('user');
            window.location.href = loginPage;
        });
    }
});
