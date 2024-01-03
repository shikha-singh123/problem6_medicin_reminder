const medicalHistoryEl = document.querySelector("#medicalHistory");
const allHistoryEl = document.querySelector("#all");

const medicalHistoryList = document.querySelector("#medicalHistory .list");
const allHistoryList = document.querySelector("#all .list");

const medicalHistoryBtn = document.querySelector(".tab1");
const allBtn = document.querySelector(".tab2");

const addMedicalHistory = document.querySelector(".add-medicalHistory");

// localStorage

let ENTRY_LIST;
// LOOK IF THERE IS SAVED DATA IN LOCALSTORAGE
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();
// eventListener
medicalHistoryBtn.addEventListener("click", function () {
    show(medicalHistoryEl);
    hide([allHistoryEl]);
    active(medicalHistoryBtn);
    inactive([allBtn]);
    // Display history entries when clicking the "Medical History" button
    displayHistoryEntries();
});
allBtn.addEventListener("click", function () {
    show(allHistoryEl);
    hide([medicalHistoryEl]);
    active(allBtn);
    inactive([medicalHistoryBtn]);
});

addMedicalHistory.addEventListener("click", function () {
    // Assuming you have a form for adding medical history entries
    const historyInput = prompt("Enter medical history:");

    if (historyInput) {
        let medicalHistory = {
            type: "medicalHistory",
            entry: historyInput,
        };
        ENTRY_LIST.push(medicalHistory);
        updateUI();
    }
});
function addMedicalHistory() {
    const historyInput = document.getElementById('history-input');
    const historyList = document.getElementById('medicalHistoryList');

    if (historyInput.value.trim() !== '') {
        // Create a new list item for the history entry
        const listItem = document.createElement('li');
        listItem.textContent = historyInput.value;
        historyList.appendChild(listItem);

        // Clear the input field after adding an entry
        historyInput.value = '';
    }
}


function updateUI() {
    clearElement([medicalHistoryList, allHistoryList]);

    ENTRY_LIST.forEach((entry, index) => {
        if (entry.type == "medicalHistory") {
            showEntry(medicalHistoryList, entry.entry, index);
        } else {
            showEntry(allHistoryList, entry.entry, index);
        }
    });
    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function showEntry(list, entry, id) {
    const listItem = document.createElement("li");
    listItem.id = id;
    listItem.className = "history-entry";
    listItem.textContent = entry;

    const position = "afterbegin";
    list.appendChild(listItem);
}

function clearElement(elements) {
    elements.forEach((element) => {
        element.innerHTML = "";
    });
}

function show(element) {
    element.classList.remove("hide");
}

function hide(elements) {
    elements.forEach((element) => {
        element.classList.add("hide");
    });
}

function active(element) {
    element.classList.add("active");
}

function inactive(elements) {
    elements.forEach((element) => {
        element.classList.remove("active");
    });
}

function displayHistoryEntries() {
    const historyEntries = document.querySelectorAll(".history-entry");
    if (historyEntries.length > 0) {
        console.log("Displaying history entries:");
        historyEntries.forEach((entry) => {
            console.log(entry.textContent);
        });
    } else {
        console.log("No history entries to display.");
    }
}
