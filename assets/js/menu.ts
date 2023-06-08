const sunMenu = document.getElementById('sun-menu'),
    mobileMenu = document.getElementById('mobile-menu');
sunMenu.addEventListener('click', () => {
    sunMenu.classList.toggle('clicked');
    mobileMenu.classList.toggle('show');
});