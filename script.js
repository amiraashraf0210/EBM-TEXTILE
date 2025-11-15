// Developed by Amira Ashraf

// Navigation scroll effect
const navbar = document.querySelector('.navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate numbers on scroll
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
};

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
};

// Initialize number animation
animateNumbers();


// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and feature items
document.querySelectorAll('.service-card, .feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Function to create branding element
function createBranding(sectionNumber) {
    return `
        <div class="section-branding">
            <div class="brand-logos">
                <div class="ebm-logo">
                    <svg viewBox="0 0 100 100" class="logo-circle">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="2"/>
                        <circle cx="50" cy="50" r="38" fill="none" stroke="white" stroke-width="1"/>
                        <text x="50" y="55" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial, sans-serif">EBM</text>
                        <line x1="20" y1="70" x2="80" y2="70" stroke="white" stroke-width="1"/>
                        <line x1="25" y1="75" x2="75" y2="75" stroke="white" stroke-width="1"/>
                        <line x1="30" y1="80" x2="70" y2="80" stroke="white" stroke-width="1"/>
                    </svg>
                </div>
                <div class="knc-text">KNCTEKSTIL</div>
            </div>
            <div class="section-number-badge">${sectionNumber}</div>
        </div>
    `;
}

// Carousel Initialization Function
const initCarousel = (carouselContainer) => {
    if (!carouselContainer) return;
    
    const carousel = carouselContainer.querySelector('.prime-minister-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    const showSlide = (index) => {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    };

    const goToSlide = (index) => {
        currentSlide = index;
        showSlide(currentSlide);
    };

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carousel.closest('section').getBoundingClientRect().top < window.innerHeight &&
            carousel.closest('section').getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 2500);

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 2500);
    });
};

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Prime Minister Visit carousel
    const primeMinisterCarousel = document.querySelector('#prime-minister-visit .prime-minister-carousel-container');
    if (primeMinisterCarousel) {
        initCarousel(primeMinisterCarousel);
    }
    
    // Initialize Production Facilities carousel
    const productionFacilitiesCarousel = document.querySelector('#facilities .prime-minister-carousel-container');
    if (productionFacilitiesCarousel) {
        initCarousel(productionFacilitiesCarousel);
    }
});

console.log("Website developed by Amira Ashraf ❤️");
