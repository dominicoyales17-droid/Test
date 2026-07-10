import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Elements
const bell = document.getElementById("notificationBell");
const panel = document.getElementById("notificationPanel");
const list = document.getElementById("notificationList");
const badge = document.getElementById("notificationCount");

let firstLoad = true;

// Toggle notification panel
if (bell) {
    bell.addEventListener("click", () => {
        panel.classList.toggle("show");
    });
}

// Request browser notification permission
if ("Notification" in window) {
    Notification.requestPermission();
}

// Listen for announcements
const announcementQuery = query(
    collection(db, "announcements"),
    orderBy("createdAt", "desc")
);

onSnapshot(
    announcementQuery,

    (snapshot) => {

        console.log("Notifications updated:", snapshot.size);

        // Update badge
        badge.textContent = snapshot.size;

        // Clear notification list
        list.innerHTML = "";

        // No announcements yet
        if (snapshot.empty) {

            list.innerHTML = "<p>No notifications yet.</p>";

            badge.textContent = "0";

            return;

        }

        snapshot.forEach((doc) => {

            const announcement = doc.data();

            let date = "Unknown";

            if (announcement.createdAt) {
                date = announcement.createdAt
                    .toDate()
                    .toLocaleString();
            }

            let color = "#1f4e79";

            switch (announcement.priority) {

                case "Emergency":
                    color = "red";
                    break;

                case "Important":
                    color = "orange";
                    break;

                case "Normal":
                    color = "green";
                    break;

            }

            list.innerHTML += `

                <div class="notification-item">

                    <h4 style="color:${color}">

                        ${announcement.title}

                    </h4>

                    <p>

                        ${announcement.message}

                    </p>

                    <small>

                        ${announcement.priority} • ${date}

                    </small>

                </div>

            `;

        });

        // Don't show popup when page first loads
        if (firstLoad) {

            firstLoad = false;

            return;

        }

        // Show popup for newest announcement
        const latest = snapshot.docs[0].data();

        showToast(latest);

    },

    (error) => {

        console.error("Notification Error:", error);

    }

);

// Toast notification
function showToast(notification) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `

        <h3>🔔 New Announcement</h3>

        <strong>${notification.title}</strong>

        <p>${notification.message}</p>

    `;

    document.body.appendChild(toast);

    // Notification sound
    const audio = new Audio("./sounds/notification.wav");

    audio.currentTime = 0;

    audio.play().catch(error => {
        console.error("Audio Error:", error);
    });

    // Vibrate (supported devices)
    if ("vibrate" in navigator) {

        navigator.vibrate([200, 100, 200]);

    }

    // Browser notification
    if (
        "Notification" in window &&
        Notification.permission === "granted"
    ) {

        new Notification(notification.title, {

            body: notification.message

        });

    }

    setTimeout(() => {

        toast.remove();

    }, 5000);

}