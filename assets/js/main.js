// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && !navLink.classList.contains('nav-cta')) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Validation
        const errors = [];
        
        if (!name) {
            errors.push('Name is required');
        }
        
        if (!email) {
            errors.push('Email is required');
        } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push('Invalid email format');
        }
        
        if (!message) {
            errors.push('Message is required');
        }
        
        formMessage.className = 'form-message';
        
        if (errors.length > 0) {
            formMessage.classList.add('error');
            formMessage.textContent = errors.join(', ');
            formMessage.style.display = 'block';
            return;
        }
        
        // Disable button while sending
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action || 'https://formspree.io/f/xyeykajd', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formMessage.className = 'form-message success';
                formMessage.textContent = "Thank you for your message! I'll get back to you soon.";
                formMessage.style.display = 'block';
                contactForm.reset();
            } else {
                const data = await response.json();
                formMessage.className = 'form-message error';
                if (data && data.errors) {
                    formMessage.textContent = data.errors.map(err => err.message).join(', ');
                } else {
                    formMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
                }
                formMessage.style.display = 'block';
            }
        } catch (err) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Network error. Please check your connection and try again.';
            formMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 6000);
        }
    });
}

// ===== Project Modal =====
let modalSlideshowInterval = null;

// Sample projects data (static)
const projectsData = [
    {
        id: 'project-1',
        title: 'E-Commerce Platform',
        description: 'A modern fashion e-commerce website designed for a premium techwear and streetwear brand, featuring product browsing, collections, shopping cart functionality, and a responsive user interface.',
        technologies: 'React, PHP, JavaScript',
        image_url: 'assets/images/placeholder-project.svg',
        images: ['uploads/E-Commerce wordpress/pic1.png', 'uploads/E-Commerce wordpress/pic2.png', 'uploads/E-Commerce wordpress/pic3.png','uploads/E-Commerce wordpress/pic4.png'],
        demo_link: 'https://mohomadafri.github.io/ZIA-Fashion/index.html',
        //github_link: 'https://github.com/YousufMahdoom/E-Commerce-Platform'
    },
    {
        id: 'project-2',
        title: 'Ceylon Spices',
        description: 'A premium Sri Lankan spice website showcasing authentic Ceylon spices, traditional flavors, and the rich culinary heritage of Sri Lanka.',
        technologies: 'HTML, CSS, JavaScript, Responsive Design',
        image_url: 'uploads/item-registry-pos/pic1.png',
        images: ['uploads/item-registry-pos/pic1.png', 'uploads/item-registry-pos/pic2.png', 'uploads/item-registry-pos/pic3.png', 'uploads/item-registry-pos/pic4.png'],
        demo_link: 'https://ceylonspices.netlify.app',
        //github_link: ' https://github.com/YousufMahdoom/item_registry_app'
    },
    {
        id: 'project-3',
        title: 'FoodHub ',
        description: 'This project is built using .NET framework and C# programming language. It utilizes SQL Server as the database management system to store and retrieve data efficiently.',
        technologies: '.NET, C#, SQL Server',
    image_url: 'assets/images/placeholder-project.svg',
    images: ['uploads/FoodHub/pic1.png', 'uploads/FoodHub/pic2.png', 'uploads/FoodHub/pic3.png', 'uploads/FoodHub/pic4.png', 'uploads/FoodHub/pic5.png'],
        //demo_link: 'http://yousufmahdoom.infinityfreeapp.com/',
        //github_link: ' https://github.com/YousufMahdoom/FoodHub.git'
    },
    {
        id: 'project-4',
        title: 'Paris Lumière',
        description: 'A premium Paris travel experience website featuring curated destinations, experiences, tour packages, and journey bookings.',
        technologies: 'HTML, CSS, JavaScript',
        image_url: 'assets/images/placeholder-project.svg',
        images: ['uploads/UrbanThreads/pic1.png', 'uploads/UrbanThreads/pic2.png', 'uploads/UrbanThreads/pic3.png', 'uploads/UrbanThreads/pic4.png'],
        demo_link: 'https://parislumiere.netlify.app',
        //github_link: ' https://github.com/YousufMahdoom/FoodHub.git'
    },
    {
        id: 'project-5',
        title: 'NizMah POS System',
        description: 'I developed a modern Point of Sale application using React and JavaScript under NizMah Software Solutions. The system features an intuitive interface for managing sales, products, and customers, with real-time transaction handling and receipt generation. Designed to be responsive and scalable, it highlights my ability to build efficient, user-friendly web solutions tailored for business needs.',
        technologies: 'React, JavaScript',
    image_url: 'assets/images/placeholder-project.svg',
    images: ['uploads/NizMahss (POS)/Pic1.png', 'uploads/NizMahss (POS)/Pic2.png', 'uploads/NizMahss (POS)/Pic3.png', 'uploads/NizMahss (POS)/Pic4.png', 'uploads/NizMahss (POS)/Pic5.png'],
        //demo_link: 'http://yousufmahdoom.infinityfreeapp.com/',
        //github_link: ' https://github.com/YousufMahdoom/FoodHub.git'
    }
];

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    // Find project data
    const project = projectsData.find(p => p.id == projectId);
    
    if (project) {
        const techArray = project.technologies.split(',').map(t => t.trim());
        const techTags = techArray.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        // Get all images for this project
        const images = project.images && project.images.length > 0 ? project.images : [project.image_url];
        
        // Create image slideshow HTML
        let imagesHTML = '';
        if (images.length > 1) {
            imagesHTML = `
                <div class="modal-slideshow">
                    <span class="modal-close" onclick="closeProjectModal()" aria-label="Close modal">&times;</span>
                    ${images.map((img, index) => `
                        <img src="${img}" alt="${project.title}" 
                             class="modal-slideshow-image ${index === 0 ? 'active' : ''}"
                             onerror="this.src='assets/images/placeholder-project.svg'">
                    `).join('')}
                    <div class="modal-slideshow-indicators">
                        ${images.map((_, index) => `
                            <span class="modal-indicator ${index === 0 ? 'active' : ''}" onclick="goToModalSlide(${index})"></span>
                        `).join('')}
                    </div>
                    <button class="modal-nav-btn modal-prev" onclick="changeModalSlide(-1)" aria-label="Previous slide">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="modal-nav-btn modal-next" onclick="changeModalSlide(1)" aria-label="Next slide">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;
        } else {
            imagesHTML = `
                <div class="modal-slideshow">
                    <span class="modal-close" onclick="closeProjectModal()" aria-label="Close modal">&times;</span>
                    <img src="${images[0]}" alt="${project.title}" 
                         class="modal-slideshow-image active"
                         onerror="this.src='assets/images/placeholder-project.svg'">
                </div>
            `;
        }
        
        modalBody.innerHTML = `
            <div class="modal-project">
                ${imagesHTML}
                <h2 style="font-size: 2rem; margin-bottom: 1rem; margin-top: 1.5rem; color: var(--text-dark);">${project.title}</h2>
                <div style="margin-bottom: 1.5rem;">
                    ${techTags}
                </div>
                <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 1.5rem;">${project.description}</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    ${project.demo_link ? `<a href="${project.demo_link}" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> View Demo
                    </a>` : ''}
                    ${project.github_link ? `<a href="${project.github_link}" class="btn btn-secondary" target="_blank" style="color: var(--primary-color); border-color: var(--primary-color);">
                        <i class="fab fa-github"></i> View Code
                    </a>` : ''}
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Start auto-slideshow if multiple images
        if (images.length > 1) {
            startModalSlideshow();
        }
    }
}

let currentModalSlide = 0;

function changeModalSlide(direction) {
    const images = document.querySelectorAll('.modal-slideshow-image');
    const indicators = document.querySelectorAll('.modal-indicator');
    
    if (images.length === 0) return;
    
    // Remove active class
    images[currentModalSlide].classList.remove('active');
    indicators[currentModalSlide].classList.remove('active');
    
    // Calculate new slide
    currentModalSlide = (currentModalSlide + direction + images.length) % images.length;
    
    // Add active class
    images[currentModalSlide].classList.add('active');
    indicators[currentModalSlide].classList.add('active');
    
    // Reset auto-slideshow timer
    if (modalSlideshowInterval) {
        clearInterval(modalSlideshowInterval);
        startModalSlideshow();
    }
}

function goToModalSlide(index) {
    const images = document.querySelectorAll('.modal-slideshow-image');
    const indicators = document.querySelectorAll('.modal-indicator');
    
    if (images.length === 0) return;
    
    // Remove active class
    images[currentModalSlide].classList.remove('active');
    indicators[currentModalSlide].classList.remove('active');
    
    // Set new slide
    currentModalSlide = index;
    
    // Add active class
    images[currentModalSlide].classList.add('active');
    indicators[currentModalSlide].classList.add('active');
    
    // Reset auto-slideshow timer
    if (modalSlideshowInterval) {
        clearInterval(modalSlideshowInterval);
        startModalSlideshow();
    }
}

function startModalSlideshow() {
    // Clear any existing interval
    if (modalSlideshowInterval) {
        clearInterval(modalSlideshowInterval);
    }
    
    // Start new interval (5 seconds)
    modalSlideshowInterval = setInterval(() => {
        changeModalSlide(1);
    }, 5000);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Stop slideshow
    if (modalSlideshowInterval) {
        clearInterval(modalSlideshowInterval);
        modalSlideshowInterval = null;
    }
    currentModalSlide = 0;
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// ===== Intersection Observer for Fade-in Animations & Skill Progress =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger skill bar animation if inside a skill item
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar && !progressBar.classList.contains('animated')) {
                const targetWidth = progressBar.dataset.targetWidth || progressBar.style.width || '100%';
                progressBar.dataset.targetWidth = targetWidth;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = progressBar.dataset.targetWidth;
                    progressBar.classList.add('animated');
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Store original target widths for all skill progress bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const initialWidth = bar.style.width || bar.getAttribute('style')?.match(/width:\s*([^;]+)/)?.[1];
        if (initialWidth) {
            bar.dataset.targetWidth = initialWidth.trim();
        }
    });

    const animateElements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== Scroll to Top Button (Optional) =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #800020, #A52A46);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    box-shadow: 0 4px 18px rgba(128, 0, 32, 0.40);
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
});

// ===== Project Image Slideshow (5 second rotation) =====
function initProjectSlideshows() {
    const slideshows = document.querySelectorAll('.project-slideshow');
    
    slideshows.forEach(slideshow => {
        const images = slideshow.querySelectorAll('.slideshow-image');
        const indicators = slideshow.querySelectorAll('.indicator');
        
        if (images.length <= 1) return; // Skip if only one image
        
        let currentIndex = 0;
        
        function showNextImage() {
            // Remove active class from current image and indicator
            images[currentIndex].classList.remove('active');
            if (indicators[currentIndex]) {
                indicators[currentIndex].classList.remove('active');
            }
            
            // Move to next image
            currentIndex = (currentIndex + 1) % images.length;
            
            // Add active class to new image and indicator
            images[currentIndex].classList.add('active');
            if (indicators[currentIndex]) {
                indicators[currentIndex].classList.add('active');
            }
        }
        
        // Start slideshow with 5 second interval
        setInterval(showNextImage, 5000);
    });
}

// Initialize slideshows when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectSlideshows);

console.log('Portfolio website loaded successfully! 🚀');
