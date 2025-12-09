/* -------------------------------------------------------
   LOAD DATA FROM JSON FILE
-------------------------------------------------------- */
function loadData() {

    // Temporary loading messages
    if (document.getElementById("greenActions"))
        document.getElementById("greenActions").innerHTML = "<p>Loading actions...</p>";

    if (document.getElementById("communalGoals"))
        document.getElementById("communalGoals").innerHTML = "<p>Loading goals...</p>";

    if (document.getElementById("trades"))
        document.getElementById("trades").innerHTML = "<p>Loading trades...</p>";

    // Fetch JSON file
    fetch('data/website_data.json')
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.log("Error loading JSON:", error));
}

/* -------------------------------------------------------
   DISPLAY ALL DATA IN THE DASHBOARD
-------------------------------------------------------- */
function displayData(data) {

    /* Update communal points */
    var poolSpan = document.getElementById('communalPool');
    if (poolSpan) poolSpan.textContent = data.communalPointsPool;

    /* ---- GREEN ACTIONS ---- */
    var actionsDiv = document.getElementById('greenActions');
    if (actionsDiv) {
        actionsDiv.innerHTML = "";
        data.greenActions.forEach(action => {
            var div = document.createElement('div');
            div.classList.add('card');

            div.innerHTML = `
                ${action.picture ? `<img src="${action.picture}" alt="${action.title}">` : ""}
                <h3>${action.title}</h3>
                <p>${action.description}</p>

                <div class="button-group">
                    <button class="action-btn">Allocate</button>
                    <button class="action-btn">Trade</button>
                    <button class="action-btn">Donate</button>
                </div>
            `;
            actionsDiv.appendChild(div);
        });
    }

    /* ---- COMMUNAL GOALS ---- */
    var goalsDiv = document.getElementById('communalGoals');
    if (goalsDiv) {
        goalsDiv.innerHTML = "";
        data.communalGoals.forEach(goal => {
            var divGoal = document.createElement('div');
            divGoal.classList.add('card');

            var progressPercent = goal.pointsNeeded
                ? Math.round((goal.currentPoints / goal.pointsNeeded) * 100)
                : 0;

            divGoal.innerHTML = `
                <h3>${goal.title}</h3>
                <p>${goal.description}</p>
                <p><strong>Progress:</strong> ${goal.currentPoints} / ${goal.pointsNeeded} (${progressPercent}%)</p>
                <progress value="${goal.currentPoints}" max="${goal.pointsNeeded}"></progress>
            `;

            goalsDiv.appendChild(divGoal);
        });
    }

    /* ---- TRADES ---- */
    var tradesDiv = document.getElementById('trades');
    if (tradesDiv) {
        tradesDiv.innerHTML = "";
        data.trades.forEach(trade => {
            var divTrade = document.createElement('div');
            divTrade.classList.add('card');

            divTrade.innerHTML = `
                ${trade.picture ? `<img src="${trade.picture}" alt="${trade.title}">` : ""}
                <h3>${trade.title}</h3>
                <p>${trade.description}</p>
                <p><strong>Cost:</strong> ${trade.pointsCost} points</p>
            `;

            tradesDiv.appendChild(divTrade);
        });
    }

    /* ---- TASKS ---- */
    var tasksDiv = document.getElementById('communalTasks');
    if (tasksDiv) {
        tasksDiv.innerHTML = "";
        data.communalTasks.forEach(task => {
            var divTask = document.createElement('div');
            divTask.classList.add('card');

            divTask.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Deadline:</strong> ${task.deadline}</p>
                <p><strong>Points:</strong> ${task.points}</p>
            `;

            tasksDiv.appendChild(divTask);
        });
    }
}

/* -------------------------------------------------------
   TAB SWITCHING
-------------------------------------------------------- */
function showTab(tabId, button) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";
    });

    var activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.style.display = "block";

    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) button.classList.add("active");

    // Close sidebar automatically after selecting a tab (mobile)
    document.querySelector(".sidebar").style.display = "none";
}

/* -------------------------------------------------------
   HAMBURGER MENU TOGGLE (UNIVERSAL)
-------------------------------------------------------- */
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        sidebar.style.display = (sidebar.style.display === "block") ? "none" : "block";
    });
}

/* Close sidebar if user clicks OUTSIDE */
document.addEventListener("click", function(e) {
    if (
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-toggle")
    ) {
        sidebar.style.display = "none";
    }
});

/* -------------------------------------------------------
   START PROGRAM WHEN PAGE OPENS
-------------------------------------------------------- */
loadData();
showTab('overview');
