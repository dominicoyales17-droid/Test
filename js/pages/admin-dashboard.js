import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// =========================
// Elements
// =========================

const adminName = document.getElementById("adminName");
const logoutBtn = document.getElementById("logoutBtn");

const totalUsers = document.getElementById("totalUsers");
const totalStudents = document.getElementById("totalStudents");
const totalAdmins = document.getElementById("totalAdmins");
const totalAnnouncements = document.getElementById("totalAnnouncements");

protectAdminPage();

// =========================
// Authentication
// =========================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    adminName.textContent = user.email;

    loadDashboard();

});

// =========================
// Logout
// =========================

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});

// =========================
// Dashboard Statistics
// =========================

async function loadDashboard() {

    // Total Users
    const usersSnapshot =
        await getDocs(collection(db, "users"));

    totalUsers.textContent =
        usersSnapshot.size;

    // Students
    const studentQuery = query(
        collection(db, "users"),
        where("role", "==", "student")
    );

    const students =
        await getDocs(studentQuery);

    totalStudents.textContent =
        students.size;

    // Admins
    const adminQuery = query(
        collection(db, "users"),
        where("role", "==", "admin")
    );

    const admins =
        await getDocs(adminQuery);

    totalAdmins.textContent =
        admins.size;

    // Announcements
    const announcements =
        await getDocs(collection(db, "announcements"));

    totalAnnouncements.textContent =
        announcements.size;

}

import { auth, db } from "../firebase.js";

import { protectAdminPage } from "../components/adminGuard.js";