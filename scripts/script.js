/* ===== MENU TOGGLE (MOBILE) ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav_link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* ===== SKILLS ACCORDION ===== */
const skillsContent = document.querySelectorAll('.skills_content');
const skillsHeaders = document.querySelectorAll('.skills_header');

function toggleSkills() {
    const itemClass = this.closest('.skills_content');
    
    // Close all other skill sections
    skillsContent.forEach(item => {
        if (item !== itemClass) {
            item.classList.remove('skill_open');
            item.classList.add('skill_close');
        }
    });

    // Toggle the clicked one
    if (itemClass) {
        if (itemClass.classList.contains('skill_open')) {
            itemClass.classList.remove('skill_open');
            itemClass.classList.add('skill_close');
        } else {
            itemClass.classList.remove('skill_close');
            itemClass.classList.add('skill_open');
        }
    }
}

skillsHeaders.forEach(header => {
    header.addEventListener('click', toggleSkills);
});

/* ===== SERVICES MODAL ===== */
const modalViews = document.querySelectorAll('.services_modal');
const modalBtns = document.querySelectorAll('.services_btn');

function openModal(index) {
    modalViews[index].classList.add('active-modal');
}

modalBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        openModal(i);
    });
});

// Close modal when clicking outside or close button
modalViews.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active-modal');
        }
    });
});

const modalCloseButtons = document.querySelectorAll('.services_modal-close');
modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.services_modal').classList.remove('active-modal');
    });
});

/* ===== PORTFOLIO SLIDER ===== */
const portfolioItems = document.querySelectorAll('.portfolio_content .swiper-wrapper');
let currentSlide = 0;

function showSlide(index) {
    portfolioItems.forEach((item, i) => {
        item.style.display = i === index ? 'flex' : 'none';
    });
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % portfolioItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + portfolioItems.length) % portfolioItems.length;
    showSlide(currentSlide);
}

// Create pagination dots
function createDots() {
    const paginationContainer = document.querySelector('.portfolio_container > div:nth-child(4)');
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
        portfolioItems.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('swiper-pagination-bullet');
            if (i === 0) dot.classList.add('swiper-pagination-bullet-active');
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
            paginationContainer.appendChild(dot);
        });
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.swiper-pagination-bullet');
    dots.forEach((dot, i) => {
        dot.classList.toggle('swiper-pagination-bullet-active', i === currentSlide);
    });
}

// Attach prev/next buttons
const prevBtn = document.querySelector('.portfolio_container > div:nth-child(2) button');
const nextBtn = document.querySelector('.portfolio_container > div:nth-child(3) button');
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Initialize slider
if (portfolioItems.length > 0) {
    createDots();
    showSlide(0);
}

/* ===== SCROLL SECTIONS ACTIVE LINK ===== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector('.nav_link[href*="' + sectionId + '"]');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ===== SCROLL HEADER SHADOW ===== */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/* ===== SHOW SCROLL UP ===== */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/* ===== DARK/LIGHT THEME ===== */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Check saved theme preference
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/* ===== TYPING EFFECT ===== */
const typingText = document.querySelector('.typing-text');
const roles = ['Software Engineer', 'Backend Developer', 'Web Developer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
}

if (typingText) {
    typeEffect();
}
