import { auth, db } from "../firebase.js";
import { protectAdminPage } from "../components/adminGuard.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

protectAdminPage();

const applicationsContainer =
    document.getElementById("applicationsContainer");

loadApplications();

async function loadApplications() {

    const snapshot = await getDocs(
        collection(db, "adminApplications")
    );

    let html = "";

    snapshot.forEach(document => {

        const app = document.data();

        html += `

            <div class="card">

                <h3>${app.fullName}</h3>

                <p><strong>Email:</strong> ${app.schoolEmail}</p>

                <p><strong>Employee ID:</strong> ${app.employeeId}</p>

                <p><strong>Department:</strong> ${app.department}</p>

                <p><strong>Position:</strong> ${app.position}</p>

                <p><strong>Reason:</strong> ${app.reason}</p>

                <p><strong>Status:</strong> ${app.status}</p>

                ${
                    app.status === "pending"

                    ?

                    `

                    <button
                        class="approveBtn"
                        data-id="${document.id}"
                        data-user="${app.userId}">
                        ✅ Approve
                    </button>

                    <button
                        class="rejectBtn"
                        data-id="${document.id}">
                        ❌ Reject
                    </button>

                    `

                    :

                    `<strong>Completed</strong>`

                }

            </div>

            <br>

        `;

    });

    applicationsContainer.innerHTML = html;

    attachButtons();

}

function attachButtons() {

    document.querySelectorAll(".approveBtn").forEach(button => {

        button.addEventListener("click", approveApplication);

    });

    document.querySelectorAll(".rejectBtn").forEach(button => {

        button.addEventListener("click", rejectApplication);

    });

}

async function approveApplication(event) {

    const applicationId =
        event.target.dataset.id;

    const userId =
        event.target.dataset.user;

    // Update application status
    await updateDoc(

        doc(db, "adminApplications", applicationId),

        {

            status: "approved"

        }

    );

    // Promote user
    await updateDoc(

        doc(db, "users", userId),

        {

            role: "admin"

        }

    );

    alert("✅ User has been promoted to Administrator.");

    loadApplications();

}

async function rejectApplication(event) {

    const applicationId =
        event.target.dataset.id;

    await updateDoc(

        doc(db, "adminApplications", applicationId),

        {

            status: "rejected"

        }

    );

    alert("Application rejected.");

    loadApplications();

}