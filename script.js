// Hamburger menu and sidebar slide logic

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.querySelector('.sidebar');

    // Hide sidebar initially
    sidebar.classList.remove('visible');

    // Show sidebar on hamburger hover
    hamburger.addEventListener('mouseenter', function () {
        sidebar.classList.add('visible');
    });
    // Hide sidebar when mouse leaves sidebar
    sidebar.addEventListener('mouseleave', function () {
        sidebar.classList.remove('visible');
    });
});
