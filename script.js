document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnText = document.getElementById('btn-text');
            const btnLoader = document.getElementById('btn-loader');
            const formMessage = document.getElementById('form-message');
            
            // Show loading state
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            formMessage.classList.add('hidden');
            formMessage.className = 'form-message hidden';
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            try {
                // IMPORTANT: When you deploy your backend (e.g., to Render/Railway), 
                // change this URL from 'http://localhost:5000' to your real deployed URL.
                // Example: const API_BASE_URL = 'https://vaastu-backend.onrender.com';
                const API_BASE_URL = 'http://localhost:5000';
                
                const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    formMessage.textContent = 'Thank you! Your estimate request has been sent.';
                    formMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Something went wrong');
                }
            } catch (error) {
                formMessage.textContent = 'Oops! Failed to send request. ' + error.message;
                formMessage.classList.add('error');
            } finally {
                // Restore button state
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
                formMessage.classList.remove('hidden');
            }
        });
    }
});
