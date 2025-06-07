document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        // Wrap around if at beginning or end
        if (index >= testimonials.length) {
            index = 0;
        } else if (index < 0) {
            index = testimonials.length - 1;
        }

        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Show the selected testimonial
        testimonials[index].classList.add('active');
        currentTestimonial = index;

        // Reset auto-slide timer
        resetAutoSlide();
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function prevTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);

    // Start auto-sliding
    startAutoSlide();

    // Pause auto-slide when hovering over testimonials
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    testimonialSlider.addEventListener('mouseleave', startAutoSlide);

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }

            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's just a # link
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
// Sponsors Carousel Animation
function setupSponsorCarousel() {
    const sponsorsGrid = document.querySelector('.sponsors-grid');
    if (!sponsorsGrid) return;

    // Clone the first few sponsors for infinite loop
    const sponsorItems = sponsorsGrid.querySelectorAll('.sponsor-item');
    sponsorItems.forEach(item => {
        sponsorsGrid.appendChild(item.cloneNode(true));
    });

    // Animate the grid
    let scrollPos = 0;
    const scrollSpeed = 1;
    
    function animateSponsors() {
        scrollPos += scrollSpeed;
        if (scrollPos >= sponsorsGrid.scrollWidth / 2) {
            scrollPos = 0;
        }
        sponsorsGrid.style.transform = `translateX(-${scrollPos}px)`;
        requestAnimationFrame(animateSponsors);
    }

    // Start animation only if grid overflows
    if (sponsorsGrid.scrollWidth > sponsorsGrid.clientWidth) {
        animateSponsors();
    }
}

// Call this after DOM loads
document.addEventListener('DOMContentLoaded', setupSponsorCarousel);
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            console.log('Newsletter subscription:', email);
            alert('Thanks for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    // Event registration buttons
    document.querySelectorAll('.event-card .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventTitle = this.closest('.event-content').querySelector('h3').textContent;
            alert(`You're registering for: ${eventTitle}\nThis would connect to a real registration system in production.`);
        });
    });

    // Gallery image click effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });

    // Scroll reveal animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .event-card, .gallery-item, .about-container > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});