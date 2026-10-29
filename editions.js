/* Edition switcher: close on outside click or Escape, and keep it from overlapping the mobile menu. */

(function () {
    'use strict';

    const switchers = Array.from(document.querySelectorAll('details.edition-switcher'));
    if (!switchers.length) return;

    document.addEventListener('click', function (e) {
        switchers.forEach(function (d) {
            if (d.open && !d.contains(e.target)) d.open = false;
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        switchers.forEach(function (d) {
            if (!d.open) return;
            d.open = false;
            d.querySelector('summary').focus();
        });
    });

    switchers.forEach(function (d) {
        d.addEventListener('toggle', function () {
            if (!d.open) return;
            const navLinks = document.getElementById('navLinks');
            const navToggle = document.getElementById('navToggle');
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();
