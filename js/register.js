document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const role = document.getElementById("role").value;

        // Validations
        if (!name || !email || !password || !confirmPassword || !role) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Enter a valid email.");
            return;
        }

        // Check if account already exists
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.email === email)) {
            alert("This account already exists. Please log in.");
            return;
        }

        // Save new user
        users.push({ name, email, password, role });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html";
    });
});
