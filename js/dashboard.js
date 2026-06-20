    /* =====================================================
    LeakBot Dashboard Logic
    ===================================================== */

    /* =========================
    Current User Data
    ========================= */
    const currentUser = JSON.parse(localStorage.getItem("leakbot_current_user"));

    const currentUserName = document.getElementById("currentUserName");
    const currentUserEmail = document.getElementById("currentUserEmail");

    if (currentUser) {
    if (currentUserName) {
        currentUserName.textContent = currentUser.name || "User";
    }

    if (currentUserEmail) {
        currentUserEmail.textContent = currentUser.email || "user@email.com";
    }
    }

    /* =========================
    Demo Sensor Values
    ========================= */
    const pressureValue = document.getElementById("pressureValue");
    const imuValue = document.getElementById("imuValue");
    const gpsValue = document.getElementById("gpsValue");
    const sdValue = document.getElementById("sdValue");

    function updateDemoSensors() {
    if (!pressureValue || !imuValue || !gpsValue || !sdValue) return;

    const pressure = (100 + Math.random() * 3).toFixed(1);
    const distance = (10 + Math.random() * 8).toFixed(1);

    pressureValue.textContent = `${pressure} kPa`;
    imuValue.textContent = `${distance} m`;
    gpsValue.textContent = "30.0444, 31.2357";
    sdValue.textContent = "Active";
    }

    updateDemoSensors();

    setInterval(updateDemoSensors, 3500);

    /* =========================
    Leak Simulation
    ========================= */
    const simulateLeakBtn = document.getElementById("simulateLeakBtn");
    const leakStatusBox = document.getElementById("leakStatusBox");
    const leakStatusText = document.getElementById("leakStatusText");
    const leakStatusDescription = document.getElementById("leakStatusDescription");

    let leakDetected = false;

    if (simulateLeakBtn) {
    simulateLeakBtn.addEventListener("click", () => {
        leakDetected = !leakDetected;

        if (leakDetected) {
        if (leakStatusBox) {
            leakStatusBox.classList.add("leak-detected");
        }

        if (leakStatusText) {
            leakStatusText.textContent = "Leak Detected";
        }

        if (leakStatusDescription) {
            leakStatusDescription.textContent =
            "Pressure drop detected near estimated distance 14.8 m from entry point.";
        }

        if (pressureValue) {
            pressureValue.textContent = "87.6 kPa";
        }

        if (imuValue) {
            imuValue.textContent = "14.8 m";
        }

        simulateLeakBtn.innerHTML = `
            <i class="ri-refresh-line"></i>
            Reset Simulation
        `;
        } else {
        if (leakStatusBox) {
            leakStatusBox.classList.remove("leak-detected");
        }

        if (leakStatusText) {
            leakStatusText.textContent = "No Leak Detected";
        }

        if (leakStatusDescription) {
            leakStatusDescription.textContent =
            "Current pressure values are stable.";
        }

        updateDemoSensors();

        simulateLeakBtn.innerHTML = `
            <i class="ri-test-tube-line"></i>
            Simulate Leak
        `;
        }
    });
    }

    /* =========================
    Admin Notes
    ========================= */
    const adminNotes = document.getElementById("adminNotes");
    const saveNotesBtn = document.getElementById("saveNotesBtn");
    const notesMessage = document.getElementById("notesMessage");

    function loadAdminNotes() {
    if (!adminNotes) return;

    const savedNotes = localStorage.getItem("leakbot_admin_notes") || "";
    adminNotes.value = savedNotes;
    }

    function saveAdminNotes() {
    if (!adminNotes) return;

    localStorage.setItem("leakbot_admin_notes", adminNotes.value.trim());

    if (notesMessage) {
        notesMessage.textContent = "تم حفظ الملاحظات بنجاح ✅";

        setTimeout(() => {
        notesMessage.textContent = "";
        }, 2500);
    }
    }

    loadAdminNotes();

    if (saveNotesBtn) {
    saveNotesBtn.addEventListener("click", saveAdminNotes);
    }

    /* =========================
    Contact Messages
    ========================= */
    const messagesBox = document.getElementById("messagesBox");

    function getMessages() {
    return JSON.parse(localStorage.getItem("leakbot_contact_messages")) || [];
    }

    function renderMessages() {
    if (!messagesBox) return;

    const messages = getMessages();

    if (!messages.length) {
        messagesBox.innerHTML = `
        <div class="empty-messages">
            <i class="ri-inbox-line"></i>
            <h3>No messages yet</h3>
            <p>Contact form messages will appear here.</p>
        </div>
        `;

        return;
    }

    messagesBox.innerHTML = messages
        .map((message) => {
        return `
            <article class="message-item">
            <h3>${escapeHTML(message.name)}</h3>
            <small>${escapeHTML(message.email)} | ${escapeHTML(message.date)}</small>
            <p>${escapeHTML(message.message)}</p>
            </article>
        `;
        })
        .join("");
    }

    function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    renderMessages();

    /* =========================
    Add Demo Messages Once
    ========================= */
    function addDemoMessagesOnce() {
    const demoAlreadyAdded = localStorage.getItem("leakbot_demo_messages_added");

    if (demoAlreadyAdded) return;

    const demoMessages = [
        {
        name: "Mohamed Khaled",
        email: "mohamed@example.com",
        message:
            "I want to know more about the pressure-drop leak detection system and dashboard demo.",
        date: new Date().toLocaleString(),
        },
        {
        name: "Water Utility Team",
        email: "utility@example.com",
        message:
            "Can the robot work inside old water distribution networks with different pipe diameters?",
        date: new Date().toLocaleString(),
        },
    ];

    localStorage.setItem(
        "leakbot_contact_messages",
        JSON.stringify(demoMessages)
    );

    localStorage.setItem("leakbot_demo_messages_added", "true");
    }

    addDemoMessagesOnce();
    renderMessages();