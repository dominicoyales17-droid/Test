import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export function protectAdminPage() {

    onAuthStateChanged(auth, async (user) => {

        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const userDoc = await getDoc(
            doc(db, "users", user.uid)
        );

        if (!userDoc.exists()) {
            window.location.href = "login.html";
            return;
        }

        if (userDoc.data().role !== "admin") {

            alert("You are not authorized to access this page.");

            window.location.href = "dashboard.html";
        }

    });

}