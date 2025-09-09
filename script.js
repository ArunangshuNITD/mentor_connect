// Hamburger menu and sidebar slide logic

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.querySelector('.sidebar');

    // Hide sidebar initially
    sidebar.classList.remove('visible');
    hamburger.classList.remove('hide');

    // Show sidebar and hide hamburger on hamburger hover
    hamburger.addEventListener('mouseenter', function () {
        sidebar.classList.add('visible');
        hamburger.classList.add('hide');
    });
    // Hide sidebar and show hamburger when mouse leaves sidebar
    sidebar.addEventListener('mouseleave', function () {
        sidebar.classList.remove('visible');
        hamburger.classList.remove('hide');
    });
});
