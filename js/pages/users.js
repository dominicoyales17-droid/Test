import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// =====================
// Elements
// =====================

const adminName = document.getElementById("adminName");
const logoutBtn = document.getElementById("logoutBtn");
const usersTable = document.getElementById("usersTable");

// =====================
// Check Login
// =====================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    adminName.textContent = user.email;

    loadUsers();

});

// =====================
// Logout
// =====================

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});

// =====================
// Load Users
// =====================

async function loadUsers() {

    const snapshot = await getDocs(collection(db, "users"));

    let html = `

        <table>

            <tr>

                <th>Username</th>

                <th>Email</th>

                <th>Role</th>

                <th>Action</th>

            </tr>

    `;

    snapshot.forEach(document => {

        const user = document.data();

        html += `

            <tr>

                <td>${user.username}</td>

                <td>${user.email}</td>

                <td>

                    <select id="role-${document.id}">

                        <option value="Student"

                        ${user.role === "Student" ? "selected" : ""}>

                        Student

                        </option>

                        <option value="Admin"

                        ${user.role === "Admin" ? "selected" : ""}>

                        Admin

                        </option>

                    </select>

                </td>

                <td>

                    <button
                        class="saveRole"
                        data-id="${document.id}"
                    >

                        Save

                    </button>

                </td>

            </tr>

        `;

    });

    html += "</table>";

    usersTable.innerHTML = html;

    // =====================
    // Save Role
    // =====================

    document.querySelectorAll(".saveRole").forEach(button => {

        button.addEventListener("click", async () => {

            const id = button.dataset.id;

            const newRole =
            document.getElementById(`role-${id}`).value;

            await updateDoc(

                doc(db, "users", id),

                {

                    role: newRole

                }

            );

            alert("✅ Role updated!");

        });

    });

}