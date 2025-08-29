/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SMOOTH SCROLL ====================*/
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== ANTES & DEPOIS SLIDER ====================*/
class AntesDespoisSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.dotsContainer = document.getElementById('slider-dots');
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlider();
    }
    
    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-play
        setInterval(() => this.nextSlide(), 5000);
    }
    
    updateSlider() {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        this.slides[this.currentSlide].classList.add('active');
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
}

/*==================== GALLERY LIGHTBOX ====================*/
class GalleryLightbox {
    constructor() {
        this.galleryImages = document.querySelectorAll('.gallery__img, .estrutura__img');
        this.init();
    }
    
    init() {
        this.createLightbox();
        this.bindEvents();
    }
    
    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox__content">
                <span class="lightbox__close">&times;</span>
                <img class="lightbox__img" src="" alt="">
                <div class="lightbox__nav">
                    <button class="lightbox__prev">&#10094;</button>
                    <button class="lightbox__next">&#10095;</button>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        this.lightbox = lightbox;
        this.lightboxImg = lightbox.querySelector('.lightbox__img');
        this.lightboxClose = lightbox.querySelector('.lightbox__close');
        this.lightboxPrev = lightbox.querySelector('.lightbox__prev');
        this.lightboxNext = lightbox.querySelector('.lightbox__next');
        this.currentImageIndex = 0;
    }
    
    bindEvents() {
        this.galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => this.openLightbox(index));
        });
        
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
        
        this.lightboxPrev.addEventListener('click', () => this.prevImage());
        this.lightboxNext.addEventListener('click', () => this.nextImage());
        
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'flex') {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }
    
    openLightbox(index) {
        this.currentImageIndex = index;
        this.lightboxImg.src = this.galleryImages[index].src;
        this.lightboxImg.alt = this.galleryImages[index].alt;
        this.lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        this.lightboxImg.src = this.galleryImages[this.currentImageIndex].src;
        this.lightboxImg.alt = this.galleryImages[this.currentImageIndex].alt;
    }
    
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
        this.lightboxImg.src = this.galleryImages[this.currentImageIndex].src;
        this.lightboxImg.alt = this.galleryImages[this.currentImageIndex].alt;
    }
}

/*==================== CONTACT FORM ====================*/
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        // O FormSubmit lida com o envio diretamente, não é necessário simular aqui.
        // Para mais informações sobre o FormSubmit, visite: https://formsubmit.co/documentation
    }
    
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message--${type}`;
        messageDiv.textContent = message;
        
        this.form.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

/*==================== SCROLL ANIMATIONS ====================*/
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.servico__card, .depoimento__card, .estrutura__item');
        this.init();
    }
    
    init() {
        this.createObserver();
    }
    
    createObserver() {
        const options = {
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
        }, options);
        
        this.animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

/*==================== TYPING EFFECT ====================*/
class TypingEffect {
    constructor() {
        this.element = document.querySelector('.hero__title .highlight');
        this.words = ['seu sorriso', 'sua autoestima', 'seu rosto', 'sua confiança'];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 150;
        this.deleteSpeed = 100;
        this.pauseTime = 2000;
        
        if (this.element) {
            this.init();
        }
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

/*==================== COUNTER ANIMATION ====================*/
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.init();
    }
    
    init() {
        if (this.counters.length > 0) {
            this.createObserver();
        }
    }
    
    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

/*==================== LAZY LOADING ====================*/
class LazyLoading {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if (this.images.length > 0) {
            this.createObserver();
        }
    }
    
    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => {
            img.classList.add('lazy');
            observer.observe(img);
        });
    }
}

/*==================== PRELOADER ====================*/
class Preloader {
    constructor() {
        this.preloader = document.createElement('div');
        this.init();
    }
    
    init() {
        this.createPreloader();
        this.showPreloader();
        window.addEventListener('load', () => this.hidePreloader());
    }
    
    createPreloader() {
        this.preloader.className = 'preloader';
        this.preloader.innerHTML = `
            <div class="preloader__content">
                <div class="preloader__logo">
                    <h2>Zago Odontologia</h2>
                </div>
                <div class="preloader__spinner"></div>
            </div>
        `;
        document.body.appendChild(this.preloader);
    }
    
    showPreloader() {
        document.body.style.overflow = 'hidden';
    }
    
    hidePreloader() {
        setTimeout(() => {
            this.preloader.style.opacity = '0';
            setTimeout(() => {
                this.preloader.remove();
                document.body.style.overflow = 'auto';
            }, 500);
        }, 1000);
    }
}

/*==================== INITIALIZE ALL COMPONENTS ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new AntesDespoisSlider();
    new GalleryLightbox();
    new ContactForm();
    new ScrollAnimations();
    new TypingEffect();
    new CounterAnimation();
    new LazyLoading();
    new Preloader();
    
    // Add additional CSS for dynamic components
    const additionalCSS = `
        .lightbox {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            align-items: center;
            justify-content: center;
        }
        
        .lightbox__content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox__img {
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
        }
        
        .lightbox__close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10001;
        }
        
        .lightbox__nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            display: flex;
            justify-content: space-between;
            pointer-events: none;
        }
        
        .lightbox__prev,
        .lightbox__next {
            background: rgba(212, 175, 55, 0.8);
            color: var(--dark-color);
            border: none;
            padding: 1rem;
            cursor: pointer;
            font-size: 1.5rem;
            border-radius: 50%;
            pointer-events: all;
            transition: var(--transition);
        }
        
        .lightbox__prev:hover,
        .lightbox__next:hover {
            background: var(--primary-color);
        }
        
        .form-message {
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            text-align: center;
        }
        
        .form-message--success {
            background-color: rgba(40, 167, 69, 0.2);
            color: #28a745;
            border: 1px solid #28a745;
        }
        
        .form-message--error {
            background-color: rgba(220, 53, 69, 0.2);
            color: #dc3545;
            border: 1px solid #dc3545;
        }
        
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--dark-color);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .preloader__content {
            text-align: center;
        }
        
        .preloader__logo h2 {
            color: var(--primary-color);
            font-family: var(--title-font);
            font-size: 2rem;
            margin-bottom: 2rem;
        }
        
        .preloader__spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
        
        .scroll-header {
            background-color: rgba(26, 26, 26, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);
});

/*==================== PERFORMANCE OPTIMIZATION ====================*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(scrollHeader, 10));
window.addEventListener('scroll', debounce(scrollUp, 10));
window.addEventListener('scroll', debounce(scrollActive, 10));

