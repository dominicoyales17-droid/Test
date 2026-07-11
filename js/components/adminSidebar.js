export function loadAdminSidebar(activePage) {

    const sidebar = document.querySelector(".sidebar");

    sidebar.innerHTML = `

        <h2>ADMIN MENU</h2>

        <ul>

            <li
                class="${activePage === "dashboard" ? "active" : ""}"
                onclick="location.href='admin-dashboard.html'">

                <i class="fa-solid fa-house"></i>

                Dashboard

            </li>

            <li
                class="${activePage === "announcements" ? "active" : ""}"
                onclick="location.href='admin-announcement.html'">

                <i class="fa-solid fa-bullhorn"></i>

                Announcements

            </li>

            <li
                class="${activePage === "users" ? "active" : ""}"
                onclick="location.href='users.html'">

                <i class="fa-solid fa-users"></i>

                User Management

            </li>

            <li
                class="${activePage === "applications" ? "active" : ""}"
                onclick="location.href='admin-applications.html'">

                <i class="fa-solid fa-user-shield"></i>

                Admin Applications

            </li>

        </ul>

    `;

}