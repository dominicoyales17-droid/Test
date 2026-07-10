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
            <p>No announcements available.</p>
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

            <div class="announcement-card">

                <span
                    class="priority-badge"
                    style="background:${color};"
                >
                    ${item.priority}
                </span>

                <h2>${item.title}</h2>

                <p>${item.message}</p>

                <small>

                    Posted by <strong>${item.postedBy}</strong>

                    <br>

                    ${date}

                </small>

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