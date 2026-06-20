  /* =========================
    Mobile Menu Toggle
  ========================= */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const icon = menuToggle.querySelector("i");

      if (navLinks.classList.contains("open")) {
        icon.className = "ri-close-line";
        menuToggle.setAttribute("aria-label", "إغلاق القائمة");
      } else {
        icon.className = "ri-menu-line";
        menuToggle.setAttribute("aria-label", "فتح القائمة");
      }
    });
  }

  /* =========================
    Close Mobile Menu On Link Click
  ========================= */
  const navItems = document.querySelectorAll(".nav-links a");

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.remove("open");
      }

      if (menuToggle) {
        const icon = menuToggle.querySelector("i");
        icon.className = "ri-menu-line";
        menuToggle.setAttribute("aria-label", "فتح القائمة");
      }
    });
  });

  /* =========================
    Active Navbar Link On Scroll
  ========================= */
  const pageSections = document.querySelectorAll("header[id], section[id]");

  function updateActiveNavLink() {
    let currentSection = "home";

    pageSections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  window.addEventListener("load", updateActiveNavLink);

  /* =========================
    Reveal Animation On Scroll
  ========================= */
  const revealElements = document.querySelectorAll(
    ".section, .mini-card, .feature-card, .step-card, .impact-card, .about-card, .cta-section"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  /* =========================
    Small Counter Animation
  ========================= */
  const impactNumbers = document.querySelectorAll(".impact-card strong");

  function animateValue(element, start, end, duration, suffix = "") {
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);

      element.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const number = entry.target;
        const text = number.textContent.trim();

        if (text === "30%") {
          animateValue(number, 0, 30, 900, "%");
        }

        if (text === "6B") {
          animateValue(number, 0, 6, 900, "B");
        }

        if (text === "12B") {
          animateValue(number, 0, 12, 900, "B");
        }

        if (text === "<$100") {
          number.textContent = "<$100";
        }

        counterObserver.unobserve(number);
      });
    },
    {
      threshold: 0.6,
    }
  );

  impactNumbers.forEach((number) => {
    counterObserver.observe(number);
  });

  /* =========================
    Contact Button
  ========================= */
  const contactButtons = document.querySelectorAll('a[href^="mailto:"]');

  contactButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Contact request started");
    });
  });