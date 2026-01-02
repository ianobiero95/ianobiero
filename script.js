document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
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

    // --- Dark/Light Theme ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') icon.classList.replace('fa-moon', 'fa-sun');
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

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // --- Form Validation ---
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        const inputs = [
            document.getElementById('name'),
            document.getElementById('email'),
            document.getElementById('message')
        ];

        inputs.forEach(input => {
            input.classList.remove('input-error');
            input.nextElementSibling.classList.remove('show-error');
            if(input.value.trim() === '') {
                input.classList.add('input-error');
                input.nextElementSibling.classList.add('show-error');
                isValid = false;
            }
        });

        if (isValid) {
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            setTimeout(() => {
                btn.innerText = originalText;
                document.getElementById('formStatus').innerHTML = '<p style="color: green; margin-top: 10px;">Message sent!</p>';
                form.reset();
            }, 1500);
        }
    });
});
