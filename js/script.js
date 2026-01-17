// Menunggu dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll untuk Navigasi (Walau CSS sudah handle, ini untuk kompatibilitas lebih baik)
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // -70px offset untuk navbar
                behavior: 'smooth'
            });
        });
    });

    // 2. Active Menu Highlighter (Scroll Spy)
    // Fitur ini membuat menu nav berubah warna otomatis saat kita scroll ke section tertentu
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Jika posisi scroll ada di area section ini
            if(scrollY >= (sectionTop - 200)) { 
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if(a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 3. Simple Reveal Animation on Scroll
    // Elemen akan muncul pelan-pelan saat di scroll
    const observerOptions = {
        threshold: 0.2 // Muncul saat 20% elemen terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Terapkan animasi ke kartu skill dan item timeline
    const animatedElements = document.querySelectorAll('.skill-card, .timeline-item, .about-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

});