export function loadStudentSidebar(activePage){

    const sidebar=document.querySelector(".sidebar");

    sidebar.innerHTML=`

        <div class="sidebar-header">

            <h2>MENU</h2>
            <span>Student Portal</span>

        </div>

        <ul class="sidebar-menu">

            <li class="${activePage==="dashboard"?"active":""}" onclick="closeSidebar();location.href='dashboard.html'">
                <i class="fa-solid fa-house"></i>
                <span>Dashboard</span>
            </li>

            <li class="${activePage==="announcements"?"active":""}" onclick="closeSidebar();location.href='announcements.html'">
                <i class="fa-solid fa-bullhorn"></i>
                <span>Announcements</span>
            </li>

            <li class="${activePage==="guides"?"active":""}" onclick="closeSidebar();location.href='guides.html'">
                <i class="fa-solid fa-book-open"></i>
                <span>Safety Guides</span>
            </li>

            <li class="${activePage==="contacts"?"active":""}" onclick="closeSidebar();location.href='contacts.html'">
                <i class="fa-solid fa-phone"></i>
                <span>Emergency Contacts</span>
            </li>

            <li class="${activePage==="profile"?"active":""}" onclick="closeSidebar();location.href='profile.html'">
                <i class="fa-solid fa-user"></i>
                <span>Profile</span>
            </li>

        </ul>

        <div class="sidebar-footer">

            Version 2.0

        </div>

    `;

    if(window.innerWidth<=768){

        const menuBtn=document.createElement("button");

        menuBtn.innerHTML='<i class="fa-solid fa-bars"></i>';

        menuBtn.className="mobile-menu-btn";

        document.querySelector(".topbar-v2").prepend(menuBtn);

        menuBtn.onclick=()=>{

            sidebar.classList.toggle("open");

        };

        document.addEventListener("click",e=>{

            if(
                !sidebar.contains(e.target) &&
                !menuBtn.contains(e.target)
            ){

                sidebar.classList.remove("open");

            }

        });

    }

}

window.closeSidebar=function(){

    document.querySelector(".sidebar").classList.remove("open");

}