// Image error handler
function handleImageError(img) {
    img.src = 'images/placeholder.jpg';
    img.alt = 'Image not available';
}

// Projects Data
const projects = [
    {
        title: 'فيلا فاخرة',
        description: 'تصميم داخلي عصري لفيلا سكنية',
        images: [
            'images/projects/project1.jpg',    // Main living room
            'images/projects/project1-2.jpg',  // Master bedroom
            'images/projects/project1-3.jpg',  // Kitchen
            'images/projects/project1-4.jpg',  // Bathroom
            'images/projects/project1-5.jpg',  // Dining room
            'images/projects/project1-6.jpg'   // Garden view
        ]
    },
    {
        title: 'إستراحة فاخرة',
        description: 'تصميم داخلي عصري لإستراحة فاخرة',
        images: [
            'images/projects/project2-3.jpeg',  // Cover image
            'images/projects/project2-1.jpeg',  // Main area
            'images/projects/project2-2.jpeg',  // Living room
            'images/projects/project2-4.jpeg',  // Kitchen
            'images/projects/project2-5.jpeg'   // Bathroom
        ]
    },
    {
        title: 'مطعم راقي',
        description: 'تصميم داخلي لمطعم عصري',
        images: [
            'images/projects/project3-1.jpg',
            'images/projects/project3-2.jpg',
            'images/projects/project3-3.jpg',
            'images/projects/project3-4.jpg',
            'images/projects/project3-5.jpg',
            'images/projects/project3-6.jpg'
        ]
    }
];

// Load Projects
function loadProjects() {
    const projectsContainer = document.getElementById('projectsGallery');
    if (!projectsContainer) {
        console.error('Projects container not found!');
        return;
    }

    projects.forEach((project, projectIndex) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'col-md-4 mb-4';
        
        const thumbnailsHTML = project.images.map((img, index) => `
            <img src="${img}" 
                 alt="${project.title} - صورة ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}"
                 onclick="changeMainImage(${projectIndex}, ${index})"
                 onerror="handleImageError(this)"
            >
        `).join('');

        projectElement.innerHTML = `
            <div class="project-card">
                <a href="project${projectIndex + 1}.html" class="project-link">
                    <div class="project-gallery">
                        <img src="${project.images[0]}" 
                             alt="${project.title}" 
                             class="main-image" 
                             onerror="handleImageError(this)"
                        >
                        ${project.images.length > 1 ? `
                            <div class="thumbnail-container">
                                ${thumbnailsHTML}
                            </div>
                        ` : ''}
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                </a>
            </div>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

// Change main image when thumbnail is clicked
function changeMainImage(projectIndex, imageIndex) {
    const project = projects[projectIndex];
    const projectCard = document.querySelectorAll('.project-card')[projectIndex];
    const mainImage = projectCard.querySelector('.main-image');
    const thumbnails = projectCard.querySelectorAll('.thumbnail');

    mainImage.src = project.images[imageIndex];
    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === imageIndex);
    });
}

// Modal functionality
let currentProjectIndex = 0;
let currentImageIndex = 0;

function openModal(projectIndex, imageIndex) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (!modal || !modalImg) return;
    
    currentProjectIndex = projectIndex;
    currentImageIndex = imageIndex;
    
    modalImg.src = projects[projectIndex].images[imageIndex];
    modalImg.alt = `${projects[projectIndex].title} - صورة ${imageIndex + 1}`;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyPress);
}

function navigateImage(direction) {
    const project = projects[currentProjectIndex];
    currentImageIndex = (currentImageIndex + direction + project.images.length) % project.images.length;
    
    const modalImg = document.getElementById('modalImage');
    modalImg.src = project.images[currentImageIndex];
}

function handleKeyPress(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'ArrowRight') navigateImage(1);
}

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Mobile-specific adjustments
if (isMobile) {
    // Adjust hero height
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.height = isIOS ? '-webkit-fill-available' : '70vh';
    }

    // Improve touch interactions
    document.querySelectorAll('a, button').forEach(element => {
        element.style.cursor = 'pointer';
    });

    // Prevent double-tap zoom
    document.addEventListener('dblclick', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Improve form input handling
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Initialize slider
    if (slides.length > 0) {
        showSlide(0);
        slideInterval = setInterval(nextSlide, 5000);

        // Touch events for mobile
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
        }

        // Navigation controls
        document.querySelector('.hero-next')?.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });

        document.querySelector('.hero-prev')?.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
            document.body.style.overflow = navbarCollapse.classList.contains('show') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    }
}

// Form Handling
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.textContent = 'Message Sent!';
                    submitButton.classList.add('btn-success');
                    
                    setTimeout(() => {
                        form.reset();
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                        submitButton.classList.remove('btn-success');
                    }, 2000);
                }, 1500);
            }
        });
    });
}

// Image Loading
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Smooth Scrolling
function initSmoothScrolling() {
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
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initMobileMenu();
    initForms();
    initImageLoading();
    initSmoothScrolling();

    // Add schema markup for SEO
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Kebly Interior Design",
        "url": "https://kebly.co",
        "logo": "https://kebly.co/images/logo/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+218930810080",
            "contactType": "customer service",
            "areaServed": "LY",
            "availableLanguage": ["en", "ar"]
        },
        "sameAs": [
            "https://www.facebook.com/keblycompany",
            "https://www.instagram.com/keblyco"
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
});

// Close modal when clicking outside the image
document.getElementById('imageModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Navbar Active State
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // First remove all active classes
    navLinks.forEach(link => link.classList.remove('active'));
    
    // If we're on a specific page (not index)
    if (currentPath !== '/' && currentPath !== '/index.html') {
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentPath)) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // For index page with hash
    if (currentHash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // Default to home if no hash and on index page
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
}

// Update active state on scroll for hash-based navigation
window.addEventListener('scroll', function() {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});

// Initialize active state and update on hash change
document.addEventListener('DOMContentLoaded', updateActiveNavLink);
window.addEventListener('hashchange', updateActiveNavLink);