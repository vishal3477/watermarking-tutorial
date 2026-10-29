/* ACM MM 2026 Watermarking Tutorial — site interactions */

(function () {
    'use strict';

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function closeMenu() {
        if (!navToggle || !navLinks) return;
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    // Scroll-spy: highlight the nav link of the section crossing 40% of the viewport height.
    const sections = Array.from(document.querySelectorAll('main .section[id]'));
    const linkMap = new Map();
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
        linkMap.set(a.getAttribute('href').slice(1), a);
    });

    function updateActiveLink() {
        const line = window.innerHeight * 0.4;
        let current = null;
        sections.forEach(function (s) {
            if (s.getBoundingClientRect().top <= line) current = s;
        });
        linkMap.forEach(function (a) { a.classList.remove('active'); });
        if (current && linkMap.has(current.id)) linkMap.get(current.id).classList.add('active');
    }

    if (sections.length && linkMap.size) {
        window.addEventListener('scroll', updateActiveLink, { passive: true });
        window.addEventListener('resize', updateActiveLink);
        window.addEventListener('load', updateActiveLink);
        updateActiveLink();
    }

    // Show the session time in the visitor's time zone when it differs from Rio (UTC−3).
    const localEl = document.getElementById('localTime');
    const start = new Date('2026-11-14T17:00:00Z');
    const end = new Date('2026-11-14T21:00:00Z');
    const VENUE_OFFSET_MIN = -180;

    if (localEl && window.Intl && typeof Intl.DateTimeFormat === 'function') {
        const visitorOffsetMin = -start.getTimezoneOffset();
        if (visitorOffsetMin !== VENUE_OFFSET_MIN) {
            const fmt = new Intl.DateTimeFormat(undefined, {
                weekday: 'short', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
            });
            const text = typeof fmt.formatRange === 'function'
                ? fmt.formatRange(start, end)
                : fmt.format(start) + ' \u2013 ' + fmt.format(end);
            localEl.textContent = 'In your time zone: ' + text;
            localEl.hidden = false;
        }
    }
})();
