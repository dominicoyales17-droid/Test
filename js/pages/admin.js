import { auth } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    addAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
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

const recentAnnouncements = document.getElementById("recentAnnouncements");

let editingAnnouncementId = null;

// ======================
// Authentication
// ======================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    adminName.textContent = user.email;

    loadAnnouncements();

});

// ======================
// Logout
// ======================

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});

// ======================
// Post / Update
// ======================

postBtn.addEventListener("click", async () => {

    const title = titleInput.value.trim();
    const message = messageInput.value.trim();
    const priority = priorityInput.value;

    if (!title || !message) {

        alert("Please complete all fields.");

        return;

    }

    try {

        if (editingAnnouncementId) {

            await updateAnnouncement(editingAnnouncementId, {

                title,
                message,
                priority

            });

            alert("✅ Announcement updated!");

            editingAnnouncementId = null;

            postBtn.innerHTML = "📢 Post Announcement";

        }

        else {

            await addAnnouncement({

                title,
                message,
                priority,
                postedBy: auth.currentUser.email

            });

            alert("✅ Announcement posted!");

        }

        titleInput.value = "";
        messageInput.value = "";
        priorityInput.value = "General";

        loadAnnouncements();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});

// ======================
// Load Announcements
// ======================

async function loadAnnouncements() {

    const announcements = await getAnnouncements();

    if (announcements.length === 0) {

        recentAnnouncements.innerHTML = "No announcements yet.";

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

                    Posted by ${item.postedBy}

                    <br>

                    ${date}

                </small>

                <br><br>

                <button class="editBtn" data-id="${item.id}">

                    ✏ Edit

                </button>

                <button class="deleteBtn" data-id="${item.id}">

                    🗑 Delete

                </button>

            </div>

        `;

    });

    // ======================
    // Edit Buttons
    // ======================

    document.querySelectorAll(".editBtn").forEach(button => {

        button.addEventListener("click", () => {

            const announcement = announcements.find(

                item => item.id === button.dataset.id

            );

            if (!announcement) return;

            editingAnnouncementId = announcement.id;

            titleInput.value = announcement.title;
            messageInput.value = announcement.message;
            priorityInput.value = announcement.priority;

            postBtn.innerHTML = "💾 Update Announcement";

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    });

    // ======================
    // Delete Buttons
    // ======================

    document.querySelectorAll(".deleteBtn").forEach(button => {

        button.addEventListener("click", async () => {

            const confirmed = confirm("Delete this announcement?");

            if (!confirmed) return;

            try {

                await deleteAnnouncement(button.dataset.id);

                alert("✅ Announcement deleted!");

                loadAnnouncements();

            }

            catch (error) {

                console.error(error);

                alert(error.message);

            }

        });

    });

}