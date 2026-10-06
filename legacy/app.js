/**
 * IEMC INDIA PVT. LTD. - Main Application Architecture
 * Design Pattern: Revealing Module Pattern / Component Architecture
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA REPOSITORY (Easily scalable via API or CMS)
  // ==========================================================================
  const productRepository = [
    {
      id: 'Neeri-Sense',
      category: 'Domestic Automated Water Management',
      title: 'With App Monitoring & leak detection',
      desc: 'Wireless installation with real-time water usage monitoring. Full protection with an unconditional 1-year Replacement Warranty backed by an Industry leading 5-Year Service Assurance.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Power Input', value: 'Direct/Battery' },
        { label: 'Max. wireless coverage', value: '500 m' },
        { label: 'Device Dimensions', value: '800 × 750 × 500 mm' }
        // { label: 'Control System', value: 'Siemens Sinumerik ONE' }
      ],
      details: 'Seamlessly track and manage multiple overhead tanks and sumps simultaneously from a single smartphone dashboard'
    },
  ];

  const teamRepository = [
    {
      name: 'Manikandan Govindarajan',
      role: 'Managing Director & CEO',
      bio: 'Over 35 years of leadership directing manufacturing facilities, enterprise operations, and international engineering partnerships.',
      //image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      image: '',
      linkedin: '#'
    },
    {
      name: 'Mathivanan',
      role: 'CTO & Head of Engineering',
      bio: 'Certified Six Sigma Black Belt overseeing stringent ISO 9001/14001, ASME, and CE standard compliance across all manufactured units.',
      //image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      image: '',
      linkedin: '#'
    }
  ];

  // ==========================================================================
  // 2. PRODUCT CAROUSEL COMPONENT (Module Pattern)
  // ==========================================================================
  const CarouselComponent = (function () {
    let currentIndex = 0;
    let trackEl, indicatorsEl, prevBtn, nextBtn;
    let autoPlayTimer = null;
    const intervalTime = 6000;

    function renderSlides() {
      trackEl.innerHTML = productRepository
        .map(
          (product, index) => `
        <div class="product-slide" data-index="${index}">
          <div class="slide-img-box">
            <img src="${product.image}" alt="${product.title}" loading="lazy" />
          </div>
          <div class="slide-content">
            <span class="product-category-tag">${product.category}</span>
            <h3>${product.title}</h3>
            <p>${product.desc}</p>
            <div class="product-specs">
              ${product.specs
                .map(
                  (spec) => `
                <div class="spec-item">
                  <span class="spec-title">${spec.label}</span>
                  <span class="spec-value">${spec.value}</span>
                </div>
              `
                )
                .join('')}
            </div>
            <button class="btn btn-primary view-details-btn" data-id="${product.id}">
              <span>View Product</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        </div>
      `
        )
        .join('');
    }

    function renderIndicators() {
      indicatorsEl.innerHTML = productRepository
        .map(
          (_, idx) =>
            `<button class="carousel-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" aria-label="Go to slide ${idx + 1}"></button>`
        )
        .join('');
    }

    function updateCarousel() {
      trackEl.style.transform = `translateX(-${currentIndex * 100}%)`;
      const dots = indicatorsEl.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + productRepository.length) % productRepository.length;
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function init() {
      trackEl = document.getElementById('carouselTrack');
      indicatorsEl = document.getElementById('carouselIndicators');
      prevBtn = document.getElementById('prevSlide');
      nextBtn = document.getElementById('nextSlide');

      if (!trackEl) return;

      renderSlides();
      renderIndicators();

      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
      });

      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
      });

      indicatorsEl.addEventListener('click', (e) => {
        const dot = e.target.closest('.carousel-dot');
        if (dot) {
          const index = parseInt(dot.dataset.slide, 10);
          goToSlide(index);
          startAutoPlay();
        }
      });

      // Pause on hover
      const container = document.getElementById('productCarousel');
      container.addEventListener('mouseenter', stopAutoPlay);
      container.addEventListener('mouseleave', startAutoPlay);

      startAutoPlay();
    }

    return { init };
  })();

  // ==========================================================================
  // 3. TEAM RENDERER MODULE
  // ==========================================================================
  const TeamRenderer = (function () {
    function init() {
      const container = document.getElementById('teamGrid');
      if (!container) return;

      container.innerHTML = teamRepository
        .map(
          (member) => `
        <article class="team-card">
          <div class="team-img-wrap">
            <img src="${member.image}" alt="${member.name}" loading="lazy" />
          </div>
          <div class="team-details">
            <h4>${member.name}</h4>
            <span class="team-role">${member.role}</span>
            <p class="team-bio">${member.bio}</p>
            <div class="team-socials">
              <a href="${member.linkedin}" aria-label="LinkedIn Profile"><i class="fa-brands fa-linkedin-in"></i></a>
              <a href="mailto:contact@iemcindia.com" aria-label="Send Email"><i class="fa-solid fa-envelope"></i></a>
            </div>
          </div>
        </article>
      `
        )
        .join('');
    }
    return { init };
  })();

  // ==========================================================================
  // 4. MODAL DIALOG MODULE (Observer/Event Delegator)
  // ==========================================================================
  const ModalComponent = (function () {
    let modalEl, modalBodyEl, closeBtn;

    function open(product) {
      modalBodyEl.innerHTML = `
        <div class="modal-product-view">
          <span class="section-tag">${product.category}</span>
          <h2 style="font-size: 1.75rem; margin: 0.5rem 0 1rem; color: var(--color-primary);">${product.title}</h2>
          <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 8px; margin-bottom: 1.5rem; max-height: 280px; object-fit: cover;" />
          <p style="color: var(--color-slate-700); margin-bottom: 1.5rem;">${product.details}</p>
          
          <h4 style="margin-bottom: 0.75rem; color: var(--color-primary);">Technical Specifications</h4>
          <div style="background: var(--color-slate-50); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--color-slate-200); margin-bottom: 1.5rem;">
            ${product.specs
              .map(
                (s) => `
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-slate-200); padding: 0.5rem 0; font-size: 0.9rem;">
                <span style="color: var(--color-slate-500); font-weight: 500;">${s.label}</span>
                <strong style="color: var(--color-slate-900);">${s.value}</strong>
              </div>
            `
              )
              .join('')}
          </div>

          <a href="#contact" class="btn btn-primary btn-block modal-inquiry-btn">
            Inquire About This Product
          </a>
        </div>
      `;

      modalEl.classList.add('is-open');
      modalEl.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const inquiryBtn = modalBodyEl.querySelector('.modal-inquiry-btn');
      if (inquiryBtn) {
        inquiryBtn.addEventListener('click', () => {
          close();
          const selectBox = document.getElementById('inquiryType');
          if (selectBox) selectBox.value = product.category;
        });
      }
    }

    function close() {
      modalEl.classList.remove('is-open');
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function init() {
      modalEl = document.getElementById('productModal');
      modalBodyEl = document.getElementById('modalBody');
      closeBtn = document.getElementById('modalClose');

      if (!modalEl) return;

      closeBtn.addEventListener('click', close);
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl.classList.contains('is-open')) close();
      });

      // Delegated click listener for dynamic product buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-details-btn');
        if (btn) {
          const productId = btn.dataset.id;
          const product = productRepository.find((p) => p.id === productId);
          if (product) open(product);
        }
      });
    }

    return { init };
  })();

  // ==========================================================================
  // 5. COUNTERS & INTERSECTION OBSERVER
  // ==========================================================================
  const MetricsAnimator = (function () {
    function animateCount(el) {
      const target = +el.getAttribute('data-target');
      const duration = 1800;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.innerText = target;
          clearInterval(timer);
        } else {
          el.innerText = Math.floor(current);
        }
      }, stepTime);
    }

    function init() {
      const counters = document.querySelectorAll('.stat-num');
      if (!counters.length) return;

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach((c) => observer.observe(c));
    }

    return { init };
  })();

  // ==========================================================================
  // 6. FORM VALIDATION & INTERACTIVITY
  // ==========================================================================
  const FormValidator = (function () {
    function init() {
      const form = document.getElementById('contactForm');
      const feedback = document.getElementById('formFeedback');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('companyEmail');
        const messageInput = document.getElementById('message');

        [nameInput, emailInput, messageInput].forEach((input) => {
          const group = input.closest('.form-group');
          if (!input.value.trim()) {
            group.classList.add('has-error');
            isValid = false;
          } else {
            group.classList.remove('has-error');
          }
        });

        // Email regex test
        if (emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
          emailInput.closest('.form-group').classList.add('has-error');
          isValid = false;
        }

        if (isValid) {
          feedback.className = 'form-feedback success';
          feedback.innerText = 'Thank you! Your quotation request has been routed to our Hosur office.';
          form.reset();
          setTimeout(() => {
            feedback.innerText = '';
          }, 6000);
        }
      });
    }

    return { init };
  })();

  // ==========================================================================
  // 7. RESPONSIVE NAVIGATION & SCROLL
  // ==========================================================================
  const Navigation = (function () {
    function init() {
      const header = document.getElementById('header');
      const toggle = document.getElementById('navToggle');
      const toggleIcon = document.getElementById('toggleIcon');
      const navMenu = document.getElementById('navMenu');
      const currentYearEl = document.getElementById('currentYear');

      if (currentYearEl) currentYearEl.innerText = new Date().getFullYear();

      // Mobile drawer toggle & icon transition
      if (toggle && navMenu) {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = navMenu.classList.toggle('is-active');

          if (toggleIcon) {
            toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
          }
        });

        // Close when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach((link) => {
          link.addEventListener('click', () => {
            navMenu.classList.remove('is-active');
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
          });
        });

        // Close if tapping outside the dropdown
        document.addEventListener('click', (e) => {
          if (!header.contains(e.target) && navMenu.classList.contains('is-active')) {
            navMenu.classList.remove('is-active');
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
          }
        });
      }

      // Sticky shadow
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    return { init };
  })();

  // ==========================================================================
  // APPLICATION BOOTSTRAPPER
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    CarouselComponent.init();
    TeamRenderer.init();
    ModalComponent.init();
    MetricsAnimator.init();
    FormValidator.init();
  });
})();