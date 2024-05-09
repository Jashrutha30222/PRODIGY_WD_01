window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#fff'; // Change background color when scrolled
    } else {
        navbar.style.backgroundColor = 'transparent'; // Reset background color when not scrolled
    }
});
