import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


// =======================
// SIGN UP
// =======================

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.addEventListener("click", async () => {

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Check if username already exists
        const q = query(
            collection(db, "users"),
            where("username", "==", username)
        );

        const existingUser = await getDocs(q);

        if (!existingUser.empty) {
            alert("Username already exists.");
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await addDoc(collection(db, "users"), {
                uid: userCredential.user.uid,
                username: username,
                email: email,
                role: "student"
            });

            alert("Account created successfully!");

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

        }

    });

}



// =======================
// LOGIN
// =======================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.href = "dashboard.html";

        }

        catch (error) {

            alert("Incorrect email or password.");

        }

    });

}