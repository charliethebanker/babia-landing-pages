/**
 * BABIA Landing Pages - Common JavaScript
 * Arquivo JS comum para todas as páginas
 * Otimizado para performance e conversão
 */

// Namespace para evitar conflitos
window.BABIA = window.BABIA || {};

(function() {
    'use strict';

    // Configurações globais
    const CONFIG = {
        countdownDate: null, // Será definido dinamicamente
        analyticsEnabled: true,
        debugMode: false,
        animations: {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
    };

    // Utility Functions
    const Utils = {
        // Debounce function para otimização de performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function para scroll events
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport: function(element, threshold = 0.1) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            const vertInView = (rect.top <= windowHeight * (1 - threshold)) && ((rect.top + rect.height) >= windowHeight * threshold);
            const horInView = (rect.left <= windowWidth * (1 - threshold)) && ((rect.left + rect.width) >= windowWidth * threshold);
            
            return vertInView && horInView;
        },

        // Smooth scroll to element
        scrollTo: function(target, duration = 800) {
            const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
            if (!targetElement) return;

            const targetPosition = targetElement.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        },

        // Format number with commas
        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        // Check if user prefers reduced motion
        prefersReducedMotion: function() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        },

        // Generate unique ID
        generateId: function() {
            return 'babia_' + Math.random().toString(36).substr(2, 9);
        },

        // Validate email
        validateEmail: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // Get device type
        getDeviceType: function() {
            const width = window.innerWidth;
            if (width < 768) return 'mobile';
            if (width < 1024) return 'tablet';
            return 'desktop';
        }
    };

    // Analytics & Tracking
    const Analytics = {
        // Track events
        track: function(action, category = 'engagement', label = '', value = 0) {
            if (!CONFIG.analyticsEnabled) return;
            
            // Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    event_category: category,
                    event_label: label,
                    value: value
                });
            }

            // Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', action, {
                    category: category,
                    label: label,
                    value: value
                });
            }

            // Console log para debug
            if (CONFIG.debugMode) {
                console.log('Analytics Event:', { action, category, label, value });
            }
        },

        // Track page view
        pageView: function(page) {
            this.track('page_view', 'navigation', page);
        },

        // Track CTA clicks
        ctaClick: function(ctaText, position) {
            this.track('cta_click', 'conversion', `${ctaText} - ${position}`);
        },

        // Track scroll depth
        scrollDepth: function(percent) {
            this.track('scroll_depth', 'engagement', `${percent}%`);
        },

        // Track video events
        videoEvent: function(action, videoId) {
            this.track(`video_${action}`, 'video', videoId);
        },

        // Track form events
        formEvent: function(action, formId) {
            this.track(`form_${action}`, 'form', formId);
        }
    };

    // Countdown Timer
    const Countdown = {
        timers: new Map(),

        init: function(element, endDate) {
            const timerId = Utils.generateId();
            const timer = {
                element: element,
                endDate: new Date(endDate),
                interval: null,
                onComplete: null
            };

            this.timers.set(timerId, timer);
            this.start(timerId);
            return timerId;
        },

        start: function(timerId) {
            const timer = this.timers.get(timerId);
            if (!timer) return;

            timer.interval = setInterval(() => {
                this.update(timerId);
            }, 1000);

            this.update(timerId);
        },

        update: function(timerId) {
            const timer = this.timers.get(timerId);
            if (!timer) return;

            const now = new Date().getTime();
            const distance = timer.endDate.getTime() - now;

            if (distance < 0) {
                this.complete(timerId);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.render(timer.element, { days, hours, minutes, seconds });
        },

        render: function(element, time) {
            const hoursElement = element.querySelector('[data-countdown="hours"]') || element.querySelector('#hours');
            const minutesElement = element.querySelector('[data-countdown="minutes"]') || element.querySelector('#minutes');
            const secondsElement = element.querySelector('[data-countdown="seconds"]') || element.querySelector('#seconds');
            const daysElement = element.querySelector('[data-countdown="days"]') || element.querySelector('#days');

            if (hoursElement) hoursElement.textContent = time.hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = time.minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = time.seconds.toString().padStart(2, '0');
            if (daysElement) daysElement.textContent = time.days;
        },

        complete: function(timerId) {
            const timer = this.timers.get(timerId);
            if (!timer) return;

            clearInterval(timer.interval);
            
            if (timer.onComplete) {
                timer.onComplete();
            }

            Analytics.track('countdown_complete', 'conversion', timerId);
        },

        stop: function(timerId) {
            const timer = this.timers.get(timerId);
            if (timer && timer.interval) {
                clearInterval(timer.interval);
            }
            this.timers.delete(timerId);
        }
    };

    // Scroll Animations
    const ScrollAnimations = {
        elements: [],
        observer: null,

        init: function() {
            if (Utils.prefersReducedMotion()) return;

            this.elements = document.querySelectorAll('[data-animate], .fade-in, .slide-left, .slide-right, .scale-in');
            
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                this.elements.forEach(element => {
                    this.observer.observe(element);
                });
            } else {
                // Fallback para browsers antigos
                this.elements.forEach(element => {
                    element.classList.add('visible');
                });
            }
        },

        handleIntersection: function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger analytics event
                    const elementType = entry.target.getAttribute('data-track') || 'element';
                    Analytics.track('element_view', 'engagement', elementType);
                    
                    // Stop observing once animated
                    this.observer.unobserve(entry.target);
                }
            });
        },

        destroy: function() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    };

    // Scroll Depth Tracking
    const ScrollDepth = {
        maxScroll: 0,
        milestones: [25, 50, 75, 90],
        triggered: [],

        init: function() {
            window.addEventListener('scroll', Utils.throttle(this.track.bind(this), 100));
        },

        track: function() {
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

            if (scrollPercent > this.maxScroll) {
                this.maxScroll = scrollPercent;

                this.milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !this.triggered.includes(milestone)) {
                        this.triggered.push(milestone);
                        Analytics.scrollDepth(milestone);
                    }
                });
            }
        }
    };

    // Modal Manager
    const Modal = {
        modals: new Map(),

        init: function() {
            // Close modal on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeAll();
                }
            });

            // Close modal on backdrop click
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    this.close(e.target);
                }
            });
        },

        open: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add to active modals
            this.modals.set(modalId, modal);
            
            Analytics.track('modal_open', 'engagement', modalId);
        },

        close: function(modal) {
            const modalElement = typeof modal === 'string' ? document.getElementById(modal) : modal;
            if (!modalElement) return;

            modalElement.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Remove from active modals
            const modalId = modalElement.id;
            this.modals.delete(modalId);
            
            Analytics.track('modal_close', 'engagement', modalId);
        },

        closeAll: function() {
            this.modals.forEach((modal, id) => {
                this.close(modal);
            });
        }
    };

    // Form Handler
    const FormHandler = {
        init: function() {
            document.addEventListener('submit', this.handleSubmit.bind(this));
            document.addEventListener('input', this.handleInput.bind(this));
        },

        handleSubmit: function(e) {
            const form = e.target;
            if (!form.matches('form[data-babia-form]')) return;

            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            Analytics.formEvent('submit', form.id || 'unknown');
            
            this.submitForm(form, data);
        },

        handleInput: function(e) {
            const input = e.target;
            if (!input.matches('input, textarea')) return;

            this.validateField(input);
        },

        validateField: function(field) {
            const value = field.value.trim();
            const type = field.type;
            let isValid = true;
            let message = '';

            if (field.required && !value) {
                isValid = false;
                message = 'Este campo é obrigatório';
            } else if (type === 'email' && value && !Utils.validateEmail(value)) {
                isValid = false;
                message = 'Por favor insira um email válido';
            }

            this.showFieldValidation(field, isValid, message);
            return isValid;
        },

        showFieldValidation: function(field, isValid, message) {
            const container = field.closest('.form-group');
            if (!container) return;

            let errorElement = container.querySelector('.field-error');
            
            if (!isValid) {
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'field-error';
                    container.appendChild(errorElement);
                }
                errorElement.textContent = message;
                field.classList.add('error');
            } else {
                if (errorElement) {
                    errorElement.remove();
                }
                field.classList.remove('error');
            }
        },

        submitForm: function(form, data) {
            const submitButton = form.querySelector('button[type="submit"]');
            
            // Show loading state
            if (submitButton) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
            }

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                if (submitButton) {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }
                
                this.showSuccess(form);
                Analytics.formEvent('success', form.id || 'unknown');
            }, 2000);
        },

        showSuccess: function(form) {
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<p>✅ Obrigada! Receberás o acesso em breve.</p>';
            
            form.parentNode.insertBefore(successMessage, form.nextSibling);
            form.style.display = 'none';
        }
    };

    // Performance Monitor
    const Performance = {
        metrics: {},

        init: function() {
            if ('performance' in window) {
                this.trackPageLoad();
                this.trackResourceTiming();
            }
        },

        trackPageLoad: function() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                        this.metrics.loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
                        this.metrics.domReady = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart);
                        
                        Analytics.track('page_load_time', 'performance', '', this.metrics.loadTime);
                    }
                }, 0);
            });
        },

        trackResourceTiming: function() {
            const resources = performance.getEntriesByType('resource');
            const slowResources = resources.filter(resource => resource.duration > 1000);
            
            if (slowResources.length > 0) {
                Analytics.track('slow_resources', 'performance', '', slowResources.length);
            }
        }
    };

    // Main initialization
    const App = {
        init: function() {
            // Check if DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.start.bind(this));
            } else {
                this.start();
            }
        },

        start: function() {
            // Initialize all modules
            ScrollAnimations.init();
            ScrollDepth.init();
            Modal.init();
            FormHandler.init();
            Performance.init();
            
            // Setup global event listeners
            this.setupEventListeners();
            
            // Auto-initialize countdowns
            this.initCountdowns();
            
            // Track page view
            Analytics.pageView(window.location.pathname);
            
            console.log('BABIA Landing Pages initialized');
        },

        setupEventListeners: function() {
            // CTA click tracking
            document.addEventListener('click', (e) => {
                const cta = e.target.closest('[data-cta], .cta-button, .btn-primary');
                if (cta) {
                    const text = cta.textContent.trim();
                    const position = cta.getAttribute('data-position') || 'unknown';
                    Analytics.ctaClick(text, position);
                }
            });

            // Video event tracking
            document.addEventListener('play', (e) => {
                if (e.target.tagName === 'VIDEO') {
                    Analytics.videoEvent('play', e.target.id || 'unknown');
                }
            }, true);

            document.addEventListener('pause', (e) => {
                if (e.target.tagName === 'VIDEO') {
                    Analytics.videoEvent('pause', e.target.id || 'unknown');
                }
            }, true);

            // Smooth scroll for anchor links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (link && link.getAttribute('href') !== '#') {
                    e.preventDefault();
                    Utils.scrollTo(link.getAttribute('href'));
                }
            });
        },

        initCountdowns: function() {
            const countdownElements = document.querySelectorAll('[data-countdown-date]');
            countdownElements.forEach(element => {
                const endDate = element.getAttribute('data-countdown-date');
                if (endDate) {
                    Countdown.init(element, endDate);
                } else {
                    // Default to end of day
                    const tomorrow = new Date();
                    tomorrow.setHours(23, 59, 59, 999);
                    Countdown.init(element, tomorrow);
                }
            });
        }
    };

    // Expose public API
    window.BABIA = {
        Utils,
        Analytics,
        Countdown,
        Modal,
        ScrollAnimations,
        init: App.init.bind(App)
    };

    // Auto-initialize
    App.init();

})();