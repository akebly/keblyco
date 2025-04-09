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

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const heroDotsContainer = document.querySelector('.hero-dots');

// Create dots
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        heroDotsContainer.appendChild(dot);
    });
}

// Update dots
function updateDots() {
    document.querySelectorAll('.hero-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Go to specific slide
function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots();
}

// Change slide
function changeHeroSlide(direction) {
    goToSlide(currentSlide + direction);
}

// Auto advance slides
function autoAdvanceSlides() {
    changeHeroSlide(1);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    createDots();
    
    const autoAdvanceInterval = setInterval(autoAdvanceSlides, 5000);
    
    // Set up modal event listeners
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (modal && closeBtn) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
        
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
            this.reset();
        });
    }
    
    // Cleanup on page unload
    window.addEventListener('unload', function() {
        clearInterval(autoAdvanceInterval);
        document.removeEventListener('keydown', handleKeyPress);
    });
});

// Close modal when clicking outside the image
document.getElementById('imageModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
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