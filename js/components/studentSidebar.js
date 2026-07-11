export function loadStudentSidebar(activePage) {

    const sidebar = document.querySelector(".sidebar");

    sidebar.innerHTML = `
        <h2>MENU</h2>

        <ul>

            <li class="${activePage === "dashboard" ? "active" : ""}"
                onclick="window.location.href='dashboard.html'">

                <i class="fa-solid fa-house"></i>

                Dashboard

            </li>

            <li class="${activePage === "announcements" ? "active" : ""}"
                onclick="window.location.href='announcements.html'">

                <i class="fa-solid fa-bullhorn"></i>

                Announcements

            </li>

            <li class="${activePage === "guides" ? "active" : ""}"
                onclick="window.location.href='guides.html'">

                <i class="fa-solid fa-book"></i>

                Safety Guides

            </li>

            <li class="${activePage === "contacts" ? "active" : ""}"
                onclick="window.location.href='contacts.html'">

                <i class="fa-solid fa-phone"></i>

                Emergency Contacts

            </li>

            <li class="${activePage === "profile" ? "active" : ""}"
                onclick="window.location.href='profile.html'">

                <i class="fa-solid fa-user"></i>

                Profile

            </li>

        </ul>
    `;

}