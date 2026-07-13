// ======================================
// Safety Guide Details V2
// ======================================

// Get building from URL
const params = new URLSearchParams(window.location.search);
const building = params.get("building") || "main";

// Page header
document.getElementById("guideTitle").textContent =
    building === "main"
        ? "Main Building Evacuation Guide"
        : "Annex Building Evacuation Guide";

document.getElementById("guideDescription").textContent =
    "Select a floor to view its official evacuation map.";

// ======================================
// Elements
// ======================================

const floorButtons =
document.querySelectorAll(".floor-btn");

let currentFloor = "1";

const evacuationMap = document.getElementById("evacuationMap");

const mapLocation = document.getElementById("mapLocation");

const mapStatus = document.getElementById("mapStatus");

// ======================================
// Floor Names
// ======================================

const floorNames = {
    "1": "Ground Floor",
    "2": "2nd Floor",
    "3": "3rd Floor",
    "4": "4th Floor",
    "5": "5th Floor",
    "6": "6th Floor",
    "7": "7th Floor"
};

// ======================================
// Load Map
// ======================================

function loadFloor(floor){

    const buildingName =
        building === "main"
            ? "Main Building"
            : "Annex Building";

    mapLocation.textContent =
        `${buildingName} • ${floorNames[floor]}`;

    const imagePath =
        `images/maps/${building}/${floor}.png`;

    evacuationMap.src = imagePath;

    evacuationMap.onload = function(){

        mapStatus.textContent =
            "Official evacuation map.";

    };

    evacuationMap.onerror = function(){

        this.onerror = null;

        this.src = "images/maps/placeholder.png";

        mapStatus.textContent =
            "Evacuation map will appear here after upload.";

    };

}

// ======================================
// Floor Dropdown
// ======================================

floorSelect.addEventListener("change", function(){

    loadFloor(this.value);

});

// Load default floor
loadFloor(floorSelect.value);

// ======================================
// Safety Tips
// ======================================

const before = [

    "Know the nearest emergency exit.",

    "Locate the nearest fire extinguisher.",

    "Familiarize yourself with the evacuation route.",

    "Participate in evacuation drills."

];

const during = [

    "Remain calm.",

    "Follow evacuation signs.",

    "Do not push or run.",

    "Use the nearest staircase.",

    "Proceed to the assembly area."

];

const after = [

    "Stay at the assembly area.",

    "Wait for official instructions.",

    "Never re-enter the building until cleared."

];

// ======================================
// Populate Lists
// ======================================

function populateList(id, items){

    const list = document.getElementById(id);

    list.innerHTML = "";

    items.forEach(item=>{

        list.innerHTML += `

            <li>

                <i class="fa-solid fa-circle-check"></i>

                ${item}

            </li>

        `;

    });

}

populateList("beforeList", before);

populateList("duringList", during);

populateList("afterList", after);