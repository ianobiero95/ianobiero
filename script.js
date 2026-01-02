document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navigation & Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- 2. Dark/Light Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 4. Form Validation ---
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('input-error');
            input.nextElementSibling.classList.remove('show-error');
        });

        // Name Validation
        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isValid = false;
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput);
            isValid = false;
        }

        // Message Validation
        if (messageInput.value.trim() === '') {
            showError(messageInput);
            isValid = false;
        }

        if (isValid) {
            // Simulate sending
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                formStatus.innerHTML = '<p style="color: green; margin-top: 10px;">Message sent successfully!</p>';
                form.reset();
                setTimeout(() => formStatus.innerHTML = '', 3000);
            }, 1500);
        }
    });

    function showError(input) {
        input.classList.add('input-error');
        input.nextElementSibling.classList.add('show-error');
    }

    // --- 5. Mock Admin Login ---
    const adminLink = document.getElementById('admin-login-link');
    const adminPanel = document.getElementById('admin-panel');
    const logoutBtn = document.getElementById('logout-btn');

    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        const password = prompt("Enter Admin Password (hint: admin):");
        if (password === 'admin') {
            adminPanel.style.display = 'block';
            window.scrollTo({
                top: adminPanel.offsetTop,
                behavior: 'smooth'
            });
        } else if (password !== null) {
            alert('Incorrect Password');
        }
    });

    logoutBtn.addEventListener('click', () => {
        adminPanel.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
