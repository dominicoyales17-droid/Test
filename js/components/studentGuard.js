import { auth } from "../firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

export function protectStudentPage(){

    onAuthStateChanged(auth,(user)=>{

        if(!user){

            location.href="login.html";

        }

    });

}