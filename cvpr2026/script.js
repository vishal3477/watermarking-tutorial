/* CVPR 2026 Watermarking Tutorial — minimal site interactions */

(function () {
    'use strict';

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const sections = Array.from(document.querySelectorAll('main .section[id]'));
    const linkMap = new Map();
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
        linkMap.set(a.getAttribute('href').slice(1), a);
    });

    if ('IntersectionObserver' in window && sections.length && linkMap.size) {
        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    linkMap.forEach(function (a) { a.classList.remove('active'); });
                    const link = linkMap.get(entry.target.id);
                    if (link) link.classList.add('active');
                }
            });
        }, {
            rootMargin: '-40% 0px -55% 0px',
            threshold: 0
        });
        sections.forEach(function (s) { obs.observe(s); });
    }

    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.querySelectorAll('.material-card[aria-disabled="true"]').forEach(function (el) {
        el.addEventListener('click', function (e) { e.preventDefault(); });
    });
})();
