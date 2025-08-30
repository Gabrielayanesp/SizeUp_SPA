let users = JSON.parse(localStorage.getItem("users")) || [];
users.push({ 
  name: "Super Admin", 
  email: "admin@onheels.com", 
  password: "123456", 
  role: "admin" 
});
localStorage.setItem("users", JSON.stringify(users));
