import { auth, db } from "../firebase.js";

import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {

    getDoc,
    doc

} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {

    submitIncidentReport,
    getStudentReports

}
from "../services/incidentReportService.js";

// =====================================

const form=document.getElementById("incidentForm");

const reportList=document.getElementById("reportList");

// =====================================

let currentUser=null;

let userData=null;

// =====================================

onAuthStateChanged(auth,async(user)=>{

    if(!user){

        location.href="login.html";

        return;

    }

    currentUser=user;

    const snap=

    await getDoc(doc(db,"users",user.uid));

    userData=snap.data();

    loadReports();

});

// =====================================

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    await submitIncidentReport({

        uid:currentUser.uid,

        username:userData.username,

        email:currentUser.email,

        incidentType:

        document.getElementById("incidentType").value,

        location:

        document.getElementById("location").value,

        description:

        document.getElementById("description").value

    });

    alert("Incident report submitted.");

    form.reset();

    loadReports();

});

// =====================================

async function loadReports(){

    const reports=

    await getStudentReports(currentUser.uid);

    if(reports.length===0){

        reportList.innerHTML=`

        <div class="empty-state">

            <i class="fa-solid fa-file-circle-exclamation"></i>

            <h2>

                No Reports Yet

            </h2>

            <p>

                Your submitted incident reports will appear here.

            </p>

        </div>

        `;

        return;

    }

    reportList.innerHTML="";

    reports.forEach(report=>{

        let statusClass="pending";

        if(report.status==="Investigating"){

            statusClass="investigating";

        }

        else if(report.status==="Resolved"){

            statusClass="resolved";

        }

        const date=

        report.createdAt

        ?

        report.createdAt.toDate().toLocaleString()

        :

        "";

        reportList.innerHTML+=`

        <div class="report-item">

            <div class="report-top">

                <div class="report-title">

                    ${report.incidentType}

                </div>

                <div class="report-date">

                    ${date}

                </div>

            </div>

            <div class="report-location">

                📍 ${report.location}

            </div>

            <div class="report-description">

                ${report.description}

            </div>

            <span class="status ${statusClass}">

                ${report.status}

            </span>

        </div>

        `;

    });

}