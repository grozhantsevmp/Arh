document.addEventListener('DOMContentLoaded', function() {
    
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');

    if (burger) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('burger--active');
            nav.classList.toggle('header__nav--active');
            document.body.style.overflow = burger.classList.contains('burger--active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('burger--active');
                nav.classList.remove('header__nav--active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideMenu = nav.contains(event.target);
            const isClickOnBurger = burger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnBurger && nav.classList.contains('header__nav--active')) {
                burger.classList.remove('burger--active');
                nav.classList.remove('header__nav--active');
                document.body.style.overflow = '';
            }
        });
    }

    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.advantage-card, .service, .stat, .value-card, .team-member, .process-step, .contact-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formSuccess = document.getElementById('formSuccess');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formFields = contactForm.querySelectorAll('.form-field');
            formFields.forEach(field => {
                field.classList.remove('form-field--error');
            });

            let isValid = true;

            const nameInput = document.getElementById('name');
            if (nameInput && nameInput.value.trim().length < 2) {
                nameInput.closest('.form-field').classList.add('form-field--error');
                isValid = false;
            }

            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailPattern.test(emailInput.value)) {
                emailInput.closest('.form-field').classList.add('form-field--error');
                isValid = false;
            }

            const subjectSelect = document.getElementById('subject');
            if (subjectSelect && !subjectSelect.value) {
                subjectSelect.closest('.form-field').classList.add('form-field--error');
                isValid = false;
            }

            const messageTextarea = document.getElementById('message');
            if (messageTextarea && messageTextarea.value.trim().length < 10) {
                messageTextarea.closest('.form-field').classList.add('form-field--error');
                isValid = false;
            }

            const agreementCheckbox = contactForm.querySelector('input[name="agreement"]');
            if (agreementCheckbox && !agreementCheckbox.checked) {
                agreementCheckbox.closest('.form-field').classList.add('form-field--error');
                isValid = false;
            }

            if (isValid) {
                const submitButton = contactForm.querySelector('.contact-form__submit');
                const originalButtonText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Отправка...';

                setTimeout(function() {
                    formSuccess.classList.add('contact-form__success--visible');
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;

                    setTimeout(function() {
                        formSuccess.classList.remove('contact-form__success--visible');
                    }, 5000);

                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 1500);
            } else {
                const firstError = contactForm.querySelector('.form-field--error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const formField = this.closest('.form-field');
                if (formField) {
                    formField.classList.remove('form-field--error');
                }
            });

            input.addEventListener('change', function() {
                const formField = this.closest('.form-field');
                if (formField) {
                    formField.classList.remove('form-field--error');
                }
            });
        });
    }

    const stats = document.querySelectorAll('.stat__value');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        stats.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace(/\D/g, ''));

            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                    }
                }, 30);
            }
        });

        statsAnimated = true;
    }

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    const ctaButtons = document.querySelectorAll('.button--primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';

            if (value.length > 0) {
                formattedValue = '+7';
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }
                if (value.length >= 4) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                if (value.length >= 7) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                if (value.length >= 9) {
                    formattedValue += '-' + value.substring(9, 11);
                }
            }

            this.value = formattedValue;
        });

        phoneInput.addEventListener('keydown', function(e) {
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }

    if (contactForm) {
        const textInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
        textInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        });
    }

    console.log('%c👋 Привет! Добро пожаловать в WebStudio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%cСайт разработан с использованием методологии БЭМ', 'color: #8b5cf6; font-size: 12px;');
});
