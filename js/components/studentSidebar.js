export function loadStudentSidebar(activePage) {

    const sidebar = document.querySelector(".sidebar");

    sidebar.innerHTML = `

        <div class="sidebar-header">
            <h2>MENU</h2>
            <span>Student Portal</span>
        </div>

        <ul class="sidebar-menu">

            <li class="${activePage==="dashboard"?"active":""}"
                onclick="location.href='dashboard.html'">
                <i class="fa-solid fa-house"></i>
                <span>Dashboard</span>
            </li>

            <li class="${activePage==="announcements"?"active":""}"
                onclick="location.href='announcements.html'">
                <i class="fa-solid fa-bullhorn"></i>
                <span>Announcements</span>
            </li>

            <li class="${activePage==="guides"?"active":""}"
                onclick="location.href='guides.html'">
                <i class="fa-solid fa-book-open"></i>
                <span>Safety Guides</span>
            </li>

            <li class="${activePage==="contacts"?"active":""}"
                onclick="location.href='contacts.html'">
                <i class="fa-solid fa-phone"></i>
                <span>Emergency Contacts</span>
            </li>

            <li class="${activePage==="profile"?"active":""}"
                onclick="location.href='profile.html'">
                <i class="fa-solid fa-user"></i>
                <span>Profile</span>
            </li>

        </ul>

        <div class="sidebar-footer">
            Version 2.0
        </div>

    `;

    const menuBtn = document.getElementById("menuBtn");

    if (menuBtn) {

        menuBtn.onclick = () => {

            sidebar.classList.toggle("open");

        };

    }

    document.addEventListener("click", (e) => {

        if (window.innerWidth <= 768) {

            if (
                !sidebar.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {

                sidebar.classList.remove("open");

            }

        }

    });

}

window.closeSidebar = function () {

    document.querySelector(".sidebar").classList.remove("open");

};