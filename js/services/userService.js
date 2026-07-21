import { db } from "../firebase.js";

import {

    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy

}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ======================================
// Collection
// ======================================

const usersRef =
collection(db,"users");

// ======================================
// Get All Users
// ======================================

export async function getUsers(){

    const q=query(

        usersRef,

        orderBy("username")

    );

    const snapshot=
    await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

// ======================================
// Update User
// ======================================

export async function updateUser(id,data){

    await updateDoc(

        doc(db,"users",id),

        data

    );

}

// ======================================
// Delete User
// ======================================

export async function deleteUser(id){

    await deleteDoc(

        doc(db,"users",id)

    );

}