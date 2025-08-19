document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("All fields are required!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Search user
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Invalid credentials. Please try again.");
            return;
        }

        // Store current session
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Redirect by role
        switch (user.role) {
            case "customer":
                window.location.href = "customer-dashboard.html";
                break;
            case "seller":
                window.location.href = "seller-dashboard.html";
                break;
            case "admin":
                window.location.href = "admin-dashboard.html";
                break;
            default:
                alert("Unknown role. Contact support.");
        }
    });
});
