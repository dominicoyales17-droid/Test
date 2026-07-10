import { auth, db } from "../firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
    orderBy,
    limit,
    getCountFromServer
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const welcomeUser = document.getElementById("welcomeUser");
const usernameDisplay = document.getElementById("usernameDisplay");
const greeting = document.getElementById("greeting");
const currentDate = document.getElementById("currentDate");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Search for the logged-in user's document
    const q = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {

        const data = snapshot.docs[0].data();

        welcomeUser.textContent = `Welcome, ${data.username}!`;

const hour = new Date().getHours();

let message = "Good Evening";

if(hour < 12){

    message = "Good Morning";

}
else if(hour < 18){

    message = "Good Afternoon";

}

greeting.textContent = `${message}, ${data.username}!`;

currentDate.textContent =
new Date().toLocaleString(undefined,{
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"2-digit"
});

usernameDisplay.innerHTML = `
Welcome back to the Safety Information and Preparedness Management System.
`;

    } else {

        usernameDisplay.textContent = "User data not found.";

    }

});

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});

// =======================
// Latest Announcement
// =======================

const announcementBox =
document.getElementById("announcement");

const announcementQuery = query(

    collection(db, "announcements"),

    orderBy("createdAt", "desc"),

    limit(1)

);

onSnapshot(announcementQuery, (snapshot) => {

    if (snapshot.empty) {

        announcementBox.innerHTML = "No announcements yet.";

        return;

    }

    const announcement = snapshot.docs[0].data();

    let priorityColor = "#1f4e79";

    if (announcement.priority === "Emergency") {

        priorityColor = "red";

    }

    else if (announcement.priority === "Important") {

        priorityColor = "orange";

    }

    let date = "";

if (announcement.createdAt) {
    date = announcement.createdAt.toDate().toLocaleString();
}

announcementBox.innerHTML = `

<h3 style="color:${priorityColor}">

${announcement.priority} • ${announcement.title}

</h3>

<p>

${announcement.message}

</p>

<br>

<small>

Posted by ${announcement.postedBy}

<br>

🕒 ${date}

</small>

`;

});

// =======================
// Dashboard Statistics
// =======================

const announcementCounter =
document.getElementById("announcementCount");

const notificationCounter =
document.getElementById("notificationCountCard");

async function loadDashboardStats(){

    const announcements =
    await getCountFromServer(collection(db,"announcements"));

    announcementCounter.textContent =
    announcements.data().count;

    notificationCounter.textContent =
    announcements.data().count;

}

loadDashboardStats();

// =======================
// Recent Activity
// =======================

const recentActivity =
document.getElementById("recentActivity");

const recentQuery = query(

    collection(db,"announcements"),

    orderBy("createdAt","desc"),

    limit(5)

);

onSnapshot(recentQuery,(snapshot)=>{

    if(snapshot.empty){

        recentActivity.innerHTML = "No recent activity.";

        return;

    }

    recentActivity.innerHTML = "";

    snapshot.forEach(doc=>{

        const data = doc.data();

        let date = "";

        if(data.createdAt){

            date = data.createdAt.toDate().toLocaleString();

        }

        recentActivity.innerHTML += `

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