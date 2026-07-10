import { db } from "../firebase.js";

import {
    collection,
    query,
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ==============================
// Get all announcements
// ==============================

export async function getAnnouncements() {

    const q = query(

        collection(db, "announcements"),

        orderBy("createdAt", "desc")

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

    }));

}

// ==============================
// Add announcement
// ==============================

export async function addAnnouncement(data) {

    await addDoc(

        collection(db, "announcements"),

        {

            ...data,

            createdAt: serverTimestamp()

        }

    );

}

// ==============================
// Update announcement
// ==============================

export async function updateAnnouncement(id, data) {

    await updateDoc(

        doc(db, "announcements", id),

        data

    );

}

// ==============================
// Delete announcement
// ==============================

export async function deleteAnnouncement(id) {

    await deleteDoc(

        doc(db, "announcements", id)

    );

}