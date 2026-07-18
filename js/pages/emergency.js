// ======================================
// ELEMENTS
// ======================================

const banner = document.getElementById("emergencyBanner");

const title = document.getElementById("emergencyTitle");

const message = document.getElementById("emergencyMessage");

const badge = document.getElementById("emergencyBadge");

// ======================================
// CHANGE THIS VALUE TO TEST
// normal
// warning
// danger
// ======================================

const emergencyStatus = "safe";

// ======================================
// UPDATE PAGE
// ======================================

if (
    banner &&
    title &&
    message &&
    badge
) {

    switch (emergencyStatus) {

        case "danger":

            banner.className = "emergency-banner danger";

            title.textContent =
                "🔴 FIRE EMERGENCY";

            message.textContent =
                "Evacuate immediately using the nearest safe exit and proceed to the designated assembly area.";

            badge.textContent =
                "ALERT";

            break;

        case "warning":

            banner.className = "emergency-banner warning";

            title.textContent =
                "🟠 EARTHQUAKE DRILL";

            message.textContent =
                "An earthquake drill is currently in progress. Follow your teacher's instructions calmly.";

            badge.textContent =
                "DRILL";

            break;

        default:

            banner.className = "emergency-banner normal";

            title.textContent =
                "🟢 NORMAL OPERATIONS";

            message.textContent =
                "There are currently no emergencies on campus. Classes and activities continue as scheduled.";

            badge.textContent =
                "SAFE";

    }

}