import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged,
    updatePassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Elements
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const bioInput = document.getElementById("bio");

const saveBtn = document.getElementById("saveProfile");
const passwordBtn = document.getElementById("changePassword");

let userDocRef = null;

// Load user
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const q = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    userDocRef = snapshot.docs[0].ref;

    const data = snapshot.docs[0].data();

    usernameInput.value = data.username || "";
    emailInput.value = data.email || "";
    roleInput.value = data.role || "";
    bioInput.value = data.bio || "";

    if (data.photoURL) {
        profileImage.src = data.photoURL;
    }

});

// Save profile
saveBtn.addEventListener("click", async () => {

    if (!userDocRef) return;

    await updateDoc(userDocRef, {

        username: usernameInput.value.trim(),
        bio: bioInput.value.trim()

    });

    alert("✅ Profile updated successfully!");

});

// Change password
passwordBtn.addEventListener("click", async () => {

    const newPassword = prompt("Enter your new password:");

    if (!newPassword) return;

    try {

        await updatePassword(auth.currentUser, newPassword);

        alert("✅ Password updated successfully!");

    }

    catch (error) {

        alert(error.message);

    }

});

// Temporary profile picture preview
// (Disabled until we rebuild profile picture upload)

/*
profileUpload.addEventListener("change", () => {

    const file = profileUpload.files[0];

    if (!file) return;

    profileImage.src = URL.createObjectURL(file);

});
*/