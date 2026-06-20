    /* =====================================================
    LeakBot Demo Auth System
    ملاحظة: ده Demo باستخدام localStorage فقط
    ===================================================== */

    /* =========================
    Default Admin Account
    ========================= */
    const defaultAdmin = {
    name: "Mohamed Khaled",
    email: "admin@leakbot.com",
    password: "admin123",
    role: "admin",
    };

    /* =========================
    Initialize Users
    ========================= */
    function initializeUsers() {
    const users = JSON.parse(localStorage.getItem("leakbot_users")) || [];

    const adminExists = users.some((user) => user.email === defaultAdmin.email);

    if (!adminExists) {
        users.push(defaultAdmin);
        localStorage.setItem("leakbot_users", JSON.stringify(users));
    }
    }

    initializeUsers();

    /* =========================
    Auth Tabs
    ========================= */
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginTab && signupTab && loginForm && signupForm) {
    loginTab.addEventListener("click", () => {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");

        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    });

    signupTab.addEventListener("click", () => {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");

        signupForm.classList.add("active");
        loginForm.classList.remove("active");
    });
    }

    /* =========================
    Helpers
    ========================= */
    function getUsers() {
    return JSON.parse(localStorage.getItem("leakbot_users")) || [];
    }

    function saveUsers(users) {
    localStorage.setItem("leakbot_users", JSON.stringify(users));
    }

    function setCurrentUser(user) {
    const safeUser = {
        name: user.name,
        email: user.email,
        role: user.role || "user",
        loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem("leakbot_current_user", JSON.stringify(safeUser));
    }

    function showMessage(element, message, type) {
    if (!element) return;

    element.textContent = message;
    element.classList.remove("success", "error");
    element.classList.add(type);
    }

    function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* =========================
    Login
    ========================= */
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
        showMessage(loginMessage, "من فضلك اكتب البريد الإلكتروني وكلمة المرور.", "error");
        return;
        }

        const users = getUsers();

        const user = users.find(
        (item) => item.email.toLowerCase() === email && item.password === password
        );

        if (!user) {
        showMessage(loginMessage, "البريد الإلكتروني أو كلمة المرور غير صحيحة.", "error");
        return;
        }

        setCurrentUser(user);

        showMessage(loginMessage, "تم تسجيل الدخول بنجاح. جاري التحويل...", "success");

        setTimeout(() => {
        window.location.href = "dashboard.html";
        }, 900);
    });
    }

    /* =========================
    Signup
    ========================= */
    const signupMessage = document.getElementById("signupMessage");

    if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value.trim();

        if (!name || !email || !password) {
        showMessage(signupMessage, "من فضلك أكمل كل البيانات.", "error");
        return;
        }

        if (!isValidEmail(email)) {
        showMessage(signupMessage, "من فضلك اكتب بريد إلكتروني صحيح.", "error");
        return;
        }

        if (password.length < 6) {
        showMessage(signupMessage, "كلمة المرور لازم تكون 6 أحرف على الأقل.", "error");
        return;
        }

        const users = getUsers();

        const userExists = users.some((user) => user.email.toLowerCase() === email);

        if (userExists) {
        showMessage(signupMessage, "هذا البريد الإلكتروني مسجل بالفعل.", "error");
        return;
        }

        const newUser = {
        name,
        email,
        password,
        role: "user",
        createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        saveUsers(users);
        setCurrentUser(newUser);

        showMessage(signupMessage, "تم إنشاء الحساب بنجاح. جاري التحويل...", "success");

        setTimeout(() => {
        window.location.href = "dashboard.html";
        }, 900);
    });
    }

    /* =========================
    Protect Dashboard
    ========================= */
    function protectDashboardPage() {
    const isDashboard = window.location.pathname.includes("dashboard.html");

    if (!isDashboard) return;

    const currentUser = JSON.parse(localStorage.getItem("leakbot_current_user"));

    if (!currentUser) {
        window.location.href = "login.html";
    }
    }

    protectDashboardPage();

    /* =========================
    Logout Function
    ========================= */
    function logoutUser() {
    localStorage.removeItem("leakbot_current_user");
    window.location.href = "login.html";
    }

    /* نخليها متاحة لأي زر في dashboard */
    window.logoutUser = logoutUser;