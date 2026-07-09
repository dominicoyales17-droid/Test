import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const welcomeUser = document.getElementById("welcomeUser");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Search for the logged-in user's document
    const q = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {

        const data = snapshot.docs[0].data();

        welcomeUser.textContent = `Welcome, ${data.username}!`;

        usernameDisplay.innerHTML = `
            <strong>Username:</strong> ${data.username}<br>
            <strong>Email:</strong> ${data.email}<br>
            <strong>Role:</strong> ${data.role}
        `;

    } else {

        usernameDisplay.textContent = "User data not found.";

    }

});

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});

// =======================
// Latest Announcement
// =======================

const announcementBox =
document.getElementById("announcement");

const announcementQuery = query(

    collection(db, "announcements"),

    orderBy("createdAt", "desc"),

    limit(1)

);

onSnapshot(announcementQuery, (snapshot) => {

    if (snapshot.empty) {

        announcementBox.innerHTML = "No announcements yet.";

        return;

    }

    const announcement = snapshot.docs[0].data();

    let priorityColor = "#1f4e79";

    if (announcement.priority === "Emergency") {

        priorityColor = "red";

    }

    else if (announcement.priority === "Important") {

        priorityColor = "orange";

    }

    announcementBox.innerHTML = `

        <h3 style="color:${priorityColor}">

            ${announcement.priority} • ${announcement.title}

        </h3>

        <p>

            ${announcement.message}

        </p>

        <br>

        <small>

            Posted by ${announcement.postedBy}

        </small>

    `;

});