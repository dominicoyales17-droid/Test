// ===============================
// SIGN UP
// ===============================

function signUp() {

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Get all users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    const usernameExists = users.some(user => user.username === username);

    if (usernameExists) {
        alert("That username is already taken.");
        return;
    }

    // Save new user
    users.push({
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";
}

// ===============================
// LOG IN
// ===============================

function login() {

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user =>
        user.username === username &&
        user.password === password
    );

    if (user) {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);

        window.location.href = "dashboard.html";

    } else {

        alert("Incorrect username or password.");

    }

}

// ===============================
// SIGN OUT
// ===============================

function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

}