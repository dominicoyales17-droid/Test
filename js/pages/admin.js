import { auth } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    addAnnouncement,
    getAnnouncements
} from "../services/announcementService.js";

// ======================
// Elements
// ======================

const adminName = document.getElementById("adminName");
const logoutBtn = document.getElementById("logoutBtn");

const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const priorityInput = document.getElementById("priority");

const postBtn = document.getElementById("postBtn");

const recentAnnouncements =
document.getElementById("recentAnnouncements");

// ======================
// Auth
// ======================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    adminName.textContent = user.email;

});

// ======================
// Logout
// ======================

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});

// ======================
// Post Announcement
// ======================

postBtn.addEventListener("click", async () => {

    const title = titleInput.value.trim();

    const message = messageInput.value.trim();

    const priority = priorityInput.value;

    if (!title || !message) {

        alert("Please complete all fields.");

        return;

    }

    await addAnnouncement({

        title,

        message,

        priority,

        postedBy: auth.currentUser.email

    });

    titleInput.value = "";

    messageInput.value = "";

    priorityInput.value = "General";

    loadAnnouncements();

});

// ======================
// Recent Announcements
// ======================

async function loadAnnouncements() {

    const announcements = await getAnnouncements();

    if (announcements.length === 0) {

        recentAnnouncements.innerHTML =
        "No announcements yet.";

        return;

    }

    recentAnnouncements.innerHTML = "";

    announcements.forEach(item => {

        let color = "#2563EB";

        if (item.priority === "Emergency") {

            color = "#DC2626";

        }

        else if (item.priority === "Important") {

            color = "#F59E0B";

        }

        const date = item.createdAt
            ? item.createdAt.toDate().toLocaleString()
            : "";

        recentAnnouncements.innerHTML += `

            <div class="announcement-item">

                <span
                    class="priority"
                    style="background:${color};"
                >
                    ${item.priority}
                </span>

                <h3>${item.title}</h3>

                <p>${item.message}</p>

                <small>

                    ${item.postedBy}

                    <br>

                    ${date}

                </small>

            </div>

        `;

    });

}

loadAnnouncements();