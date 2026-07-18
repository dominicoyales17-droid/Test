import { db } from "../firebase.js";

import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ==========================
// Submit Report
// ==========================

export async function submitIncidentReport(report){

    await addDoc(

        collection(db,"incidentReports"),

        {

            ...report,

            status:"Pending",

            createdAt:serverTimestamp()

        }

    );

}

// ==========================
// Student Reports
// ==========================

export async function getStudentReports(uid){

    const q=query(

        collection(db,"incidentReports"),

        where("uid","==",uid),

        orderBy("createdAt","desc")

    );

    const snapshot=await getDocs(q);

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}