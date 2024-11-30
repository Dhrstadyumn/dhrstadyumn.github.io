// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('themeButton');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize theme based on user's system preference
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Theme toggle handler
    themeButton.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        
        // Smooth icon rotation
        const sunIcon = themeButton.querySelector('.sun-icon');
        sunIcon.style.transform = newTheme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)';
    });
    
    // Handle system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
    });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('authModal');
    const authButton = document.querySelector('[data-modal="auth"]');
    const closeButton = document.querySelector('.close-modal');

    if (authButton && modal && closeButton) {
        authButton.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.querySelectorAll('.card, .project-card, .social-icon').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);