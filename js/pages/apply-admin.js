import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ======================
// Elements
// ======================

const submitBtn = document.getElementById("submitApplication");

const fullName = document.getElementById("fullName");
const schoolEmail = document.getElementById("schoolEmail");
const employeeId = document.getElementById("employeeId");
const department = document.getElementById("department");
const position = document.getElementById("position");
const reason = document.getElementById("reason");

const applicationStatus =
    document.getElementById("applicationStatus");

// ======================
// Authentication
// ======================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    const applications = await getDocs(
        query(
            collection(db, "adminApplications"),
            where("userId", "==", user.uid)
        )
    );

    if (!applications.empty) {

        const application = applications.docs[0].data();

        applicationStatus.style.display = "block";

        applicationStatus.innerHTML = `

            <h2>Administrator Application</h2>

            <p><strong>Status:</strong> ${application.status}</p>

        `;

    }

});

// ======================
// Submit Application
// ======================

submitBtn.addEventListener("click", async () => {

// Check if user already has a pending application
const existingApplications = await getDocs(
    query(
        collection(db, "adminApplications"),
        where("userId", "==", auth.currentUser.uid),
        where("status", "==", "pending")
    )
);

if (!existingApplications.empty) {

    alert("You already have a pending administrator application.");

    return;

}

    if (
        !fullName.value.trim() ||
        !schoolEmail.value.trim() ||
        !employeeId.value.trim() ||
        !department.value.trim() ||
        !reason.value.trim()
    ) {

        alert("Please complete all fields.");

        return;

    }

    try {

        await addDoc(collection(db, "adminApplications"), {

            userId: auth.currentUser.uid,

            fullName: fullName.value.trim(),

            schoolEmail: schoolEmail.value.trim(),

            employeeId: employeeId.value.trim(),

            department: department.value.trim(),

            position: position.value,

            reason: reason.value.trim(),

            status: "pending",

            submittedAt: serverTimestamp()

        });

        alert("✅ Application submitted successfully!");

        window.location.href = "dashboard.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});