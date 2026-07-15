import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    doc,
    getDoc,
    query,
    onSnapshot,
    orderBy,
    limit,
    getCountFromServer
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ======================================
// ELEMENTS
// ======================================

const greeting = document.getElementById("greeting");
const currentDate = document.getElementById("currentDate");
const usernameDisplay = document.getElementById("usernameDisplay");

const announcementBox = document.getElementById("announcement");

const announcementCounter =
document.getElementById("announcementCount");

const notificationCounter =
document.getElementById("notificationCountCard");

const recentActivity =
document.getElementById("recentActivity");

const banner =
document.getElementById("alertBanner");

const title =
document.getElementById("alertTitle");

const alertMessage =
document.getElementById("alertMessage");

const instruction =
document.getElementById("alertInstruction");

const badge =
document.getElementById("alertBadge");

// ======================================
// AUTH
// ======================================

onAuthStateChanged(auth, async (user)=>{

    if(!user){

        window.location.href="login.html";

        return;

    }

    const userDoc =
    await getDoc(doc(db,"users",user.uid));

    if(userDoc.exists()){

        const data=userDoc.data();

        const hour=new Date().getHours();

        let greet="Good Evening";

        if(hour<12){

            greet="Good Morning";

        }

        else if(hour<18){

            greet="Good Afternoon";

        }

        if(greeting){

            greeting.textContent=
            `${greet}, ${data.username}!`;

        }

        if(currentDate){

            currentDate.textContent=
            new Date().toLocaleString(undefined,{
                weekday:"long",
                year:"numeric",
                month:"long",
                day:"numeric",
                hour:"numeric",
                minute:"2-digit"
            });

        }

        if(usernameDisplay){

            usernameDisplay.textContent=
            "Welcome back to the Safety Information and Preparedness Management System.";

        }

    }

    else{

        if(usernameDisplay){

            usernameDisplay.textContent=
            "User data not found.";

        }

    }

});

// ======================================
// DASHBOARD STATS
// ======================================

async function loadDashboardStats(){

    const total=
    await getCountFromServer(
        collection(db,"announcements")
    );

    if(announcementCounter){

        announcementCounter.textContent=
        total.data().count;

    }

    if(notificationCounter){

        notificationCounter.textContent=
        total.data().count;

    }

}

loadDashboardStats();

// ======================================
// FEATURED ANNOUNCEMENT
// ======================================

const latestQuery=query(

    collection(db,"announcements"),

    orderBy("createdAt","desc"),

    limit(1)

);

onSnapshot(latestQuery,(snapshot)=>{

    if(!announcementBox) return;

    if(snapshot.empty){

        announcementBox.innerHTML=
        "No announcements yet.";

        return;

    }

    const item=
    snapshot.docs[0].data();

    let color="#2563EB";

    if(item.priority==="Emergency"){

        color="#DC2626";

    }

    else if(item.priority==="Important"){

        color="#F59E0B";

    }

    const date=item.createdAt
    ? item.createdAt.toDate().toLocaleString()
    : "";

    announcementBox.innerHTML=`

    <div class="announcement-card">

        <span
        class="priority-badge"
        style="background:${color};">

            ${item.priority}

        </span>

        <h2>${item.title}</h2>

        <p>${item.message}</p>

        <hr>

        <small>

            👤 ${item.postedBy}

            <br>

            🕒 ${date}

        </small>

    </div>

    `;

});

// ======================================
// RECENT ACTIVITY
// ======================================

const recentQuery=query(

    collection(db,"announcements"),

    orderBy("createdAt","desc"),

    limit(5)

);

onSnapshot(recentQuery,(snapshot)=>{

    if(!recentActivity) return;

    if(snapshot.empty){

        recentActivity.innerHTML=
        "No recent activity.";

        return;

    }

    recentActivity.innerHTML="";

    snapshot.forEach(doc=>{

        const data=doc.data();

        const date=data.createdAt
        ? data.createdAt.toDate().toLocaleString()
        : "";

        recentActivity.innerHTML+=`

        <div class="activity-item">

            <div class="activity-icon">

                <i class="fa-solid fa-bullhorn"></i>

            </div>

            <div class="activity-content">

                <h4>${data.title}</h4>

                <p>${data.message}</p>

                <small>${date}</small>

            </div>

        </div>

        `;

    });

});

// ======================================
// EMERGENCY STATUS
// ======================================

const emergencyStatus="normal";

// normal
// warning
// danger

if(
    banner &&
    title &&
    alertMessage &&
    instruction &&
    badge
){

    if(emergencyStatus==="warning"){

        banner.className="status-card warning";

        title.textContent=
        "🟠 Earthquake Drill";

        alertMessage.innerHTML=
        "<strong>Earthquake Drill in Progress</strong>";

        instruction.textContent=
        "Proceed calmly to your designated evacuation area.";

        badge.textContent="DRILL";

    }

    else if(emergencyStatus==="danger"){

        banner.className="status-card danger";

        title.textContent=
        "🔴 Fire Emergency";

        alertMessage.innerHTML=
        "<strong>Fire Emergency</strong>";

        instruction.textContent=
        "Evacuate immediately using the nearest safe exit.";

        badge.textContent="ALERT";

    }

    else{

        banner.className="status-card normal";

        title.textContent=
        "🟢 Campus Safety Status";

        alertMessage.innerHTML=
        "<strong>Normal Operations</strong>";

        instruction.textContent=
        "No active emergency alerts.";

        badge.textContent="SAFE";

    }

}