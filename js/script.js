/* -------------------------------------------------------
   LOAD DATA FROM JSON FILE
-------------------------------------------------------- */
function loadData() {

    // Temporary loading messages
    document.getElementById("greenActions").innerHTML = "<p>Loading actions...</p>";
    document.getElementById("communalGoals").innerHTML = "<p>Loading goals...</p>";
    document.getElementById("trades").innerHTML = "<p>Loading trades...</p>";

    // Fetch JSON file
    fetch('data/website_data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayData(data);
        })
        .catch(function (error) {
            console.log("Error loading JSON:", error);
        });
}

/* -------------------------------------------------------
   DISPLAY ALL DATA IN THE DASHBOARD
-------------------------------------------------------- */
function displayData(data) {

    /* Update communal points (only if element exists) */
    var poolSpan = document.getElementById('communalPool');
    if (poolSpan) {
        poolSpan.textContent = data.communalPointsPool;
    }

    /* -------------------------------
       GREEN ACTIONS
    --------------------------------*/
    var actionsDiv = document.getElementById('greenActions');
    actionsDiv.innerHTML = "";

    for (var i = 0; i < data.greenActions.length; i++) {
        var action = data.greenActions[i];

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
    }


    /* -------------------------------
       COMMUNAL GOALS
    --------------------------------*/
    var goalsDiv = document.getElementById('communalGoals');
    goalsDiv.innerHTML = "";

    for (var j = 0; j < data.communalGoals.length; j++) {
        var goal = data.communalGoals[j];

        var divGoal = document.createElement('div');
        divGoal.classList.add('card');

        var progressPercent = goal.pointsNeeded
            ? Math.round((goal.currentPoints / goal.pointsNeeded) * 100)
            : 0;

        var html = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <p><strong>Progress:</strong> ${goal.currentPoints} / ${goal.pointsNeeded} (${progressPercent}%)</p>
            <progress value="${goal.currentPoints}" max="${goal.pointsNeeded}"></progress>
        `;

        divGoal.innerHTML = html;
        goalsDiv.appendChild(divGoal);
    }


    /* -------------------------------
       TRADES
    --------------------------------*/
    var tradesDiv = document.getElementById('trades');
    tradesDiv.innerHTML = "";

    for (var t = 0; t < data.trades.length; t++) {
        var trade = data.trades[t];

        var divTrade = document.createElement('div');
        divTrade.classList.add('card');

        divTrade.innerHTML = `
            ${trade.picture ? `<img src="${trade.picture}" alt="${trade.title}">` : ""}
            <h3>${trade.title}</h3>
            <p>${trade.description}</p>
            <p><strong>Cost:</strong> ${trade.pointsCost} points</p>
        `;

        tradesDiv.appendChild(divTrade);
    }


    /* -------------------------------
       COMMUNAL TASKS
    --------------------------------*/
    var tasksDiv = document.getElementById('communalTasks');
    tasksDiv.innerHTML = "";

    for (var x = 0; x < data.communalTasks.length; x++) {
        var task = data.communalTasks[x];

        var divTask = document.createElement('div');
        divTask.classList.add('card');

        divTask.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            <p><strong>Points:</strong> ${task.points}</p>
        `;

        tasksDiv.appendChild(divTask);
    }
}

/* -------------------------------------------------------
   TAB SWITCHING
-------------------------------------------------------- */
function showTab(tabId, button) {
    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";
    });

    // Show selected tab
    var activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = "block";
    }

    // Update button styles
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}

/* -------------------------------------------------------
   START PROGRAM WHEN PAGE OPENS
-------------------------------------------------------- */
loadData();
showTab('overview');
/* -------------------------------------------------------
   HAMBURGER MENU TOGGLE
-------------------------------------------------------- */
document.querySelector(".menu-toggle").addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        sidebar.style.display = "block";
    }
});
