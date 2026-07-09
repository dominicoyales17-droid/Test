import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    getDocs,
    serverTimestamp,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const logoutBtn=document.getElementById("logoutBtn");

const postBtn=document.getElementById("postBtn");

const announcementList=document.getElementById("announcementList");

let currentUsername="";



onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location="login.html";

return;

}

const q=query(
collection(db,"users"),
where("uid","==",user.uid)
);

const snap=await getDocs(q);

currentUsername=snap.docs[0].data().username;

});



postBtn.addEventListener("click",async()=>{

const title=document.getElementById("title").value.trim();

const message=document.getElementById("message").value.trim();

const priority=document.getElementById("priority").value;

if(title===""||message===""){

alert("Complete all fields.");

return;

}

await addDoc(collection(db,"announcements"),{

title,

message,

priority,

postedBy:currentUsername,

createdAt:serverTimestamp(),

updatedAt:serverTimestamp()

});

alert("Announcement Posted!");

document.getElementById("title").value="";

document.getElementById("message").value="";

});



const announcementQuery=query(

collection(db,"announcements"),

orderBy("createdAt","desc")

);

onSnapshot(announcementQuery,(snapshot)=>{

announcementList.innerHTML="";

snapshot.forEach((doc)=>{

const a=doc.data();

let date = "";

if (a.createdAt) {

    date = a.createdAt.toDate().toLocaleString();

}

announcementList.innerHTML += `

<div class="announcement">

<h3>${a.title}</h3>

<p>${a.message}</p>

<br>

<small>

${a.priority} • Posted by ${a.postedBy}

<br>

🕒 ${date}

</small>

</div>

`;

});

});

logoutBtn.addEventListener("click",async()=>{

await signOut(auth);

window.location="index.html";

});