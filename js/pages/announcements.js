import { getAnnouncements } from "../services/announcementService.js";

const announcementList = document.getElementById("announcementList");
const searchInput = document.getElementById("searchAnnouncement");

let announcements = [];

// =======================
// Load Announcements
// =======================

async function loadAnnouncements() {

    announcementList.innerHTML = "Loading announcements...";

    announcements = await getAnnouncements();

    displayAnnouncements(announcements);

}

// =======================
// Display Announcements
// =======================

function displayAnnouncements(list) {

    if (list.length === 0) {

        announcementList.innerHTML = `
        <div class="empty-state">

            <i class="fa-solid fa-bullhorn"></i>

            <h2>No Announcements Yet</h2>

            <p>
                New campus announcements will appear here once the administrator publishes one.
            </p>

        </div>
        `;

        return;

    }

    announcementList.innerHTML = "";

    list.forEach(item => {

        let color = "#2563EB";

        if (item.priority === "Emergency") {

            color = "#DC2626";

        }

        else if (item.priority === "Important") {

            color = "#F59E0B";

        }

        const date = item.createdAt
            ? item.createdAt.toDate().toLocaleString()
            : "";

        announcementList.innerHTML += `

        <div class="announcement-card ${item.priority.toLowerCase()}">

            <div class="announcement-top">

                <span
                    class="priority-badge"
                    style="background:${color};">

                    ${item.priority}

                </span>

                <span class="announcement-date">

                    <i class="fa-solid fa-calendar-days"></i>

                    ${date}

                </span>

            </div>

            <h2>${item.title}</h2>

            <p>${item.message}</p>

            <div class="announcement-footer">

                <div>

                    <i class="fa-solid fa-user"></i>

                    Posted by <strong>${item.postedBy}</strong>

                </div>

                <div>

                    <i class="fa-solid fa-circle-info"></i>

                    Safety Update

                </div>

            </div>

        </div>

        `;
    });

}

// =======================
// Search
// =======================

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    const filtered = announcements.filter(item =>

        item.title.toLowerCase().includes(keyword)

        ||

        item.message.toLowerCase().includes(keyword)

    );

    displayAnnouncements(filtered);

});

loadAnnouncements();