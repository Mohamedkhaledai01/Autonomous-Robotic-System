    /* =====================================================
    LeakBot Contact Form Logic
    ===================================================== */

    const contactForm = document.getElementById("contactForm");
    const contactFormMessage = document.getElementById("contactFormMessage");

    function getContactMessages() {
    return JSON.parse(localStorage.getItem("leakbot_contact_messages")) || [];
    }

    function saveContactMessages(messages) {
    localStorage.setItem("leakbot_contact_messages", JSON.stringify(messages));
    }

    function showContactMessage(message, type) {
    if (!contactFormMessage) return;

    contactFormMessage.textContent = message;
    contactFormMessage.classList.remove("success", "error");
    contactFormMessage.classList.add(type);
    }

    function validateContactEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim().toLowerCase();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {
        showContactMessage("من فضلك أكمل كل البيانات.", "error");
        return;
        }

        if (!validateContactEmail(email)) {
        showContactMessage("من فضلك اكتب بريد إلكتروني صحيح.", "error");
        return;
        }

        const messages = getContactMessages();

        const newMessage = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date().toLocaleString(),
        };

        messages.unshift(newMessage);
        saveContactMessages(messages);

        contactForm.reset();

        showContactMessage("تم إرسال الرسالة بنجاح ✅ ستظهر داخل لوحة التحكم.", "success");

        setTimeout(() => {
        showContactMessage("", "success");
        }, 3500);
    });
    }