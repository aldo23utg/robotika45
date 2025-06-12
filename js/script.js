document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');

    // ===== PENGATURAN LOADING SCREEN =====
    window.addEventListener('load', () => {
        // Tunggu sebentar setelah load untuk transisi yang lebih mulus
        setTimeout(() => {
            loader.classList.add('hidden');
            mainContent.classList.remove('invisible');
        }, 500); // Waktu tunda 0.5 detik
    });
    
    // ===== PENGATURAN MENU MOBILE =====
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const navLinksMobile = document.querySelectorAll('.nav-link-mobile');

    const toggleMenu = () => {
        menuBtn.classList.toggle('open');
        menu.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    menuBtn.addEventListener('click', toggleMenu);
    navLinksMobile.forEach(link => link.addEventListener('click', toggleMenu));

    // ===== EFEK HEADER SAAT SCROLL =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('bg-brand-blue/80', window.scrollY > 50);
        header.classList.toggle('backdrop-blur-sm', window.scrollY > 50);
        header.classList.toggle('shadow-lg', window.scrollY > 50);
    });

    // ===== ANIMASI 'REVEAL' & STAGGER SAAT SCROLL =====
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ambil semua elemen reveal di dalam parent yang terdeteksi
                const parent = entry.target;
                const itemsToStagger = parent.querySelectorAll('.reveal, .reveal-left, .reveal-right');
                
                // Cek apakah parent ini punya atribut data-stagger
                if (parent.dataset.stagger) {
                    itemsToStagger.forEach((item, index) => {
                        item.style.transitionDelay = `${index * 100}ms`;
                        item.classList.add('visible');
                    });
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Terapkan observer ke parent yang punya data-stagger
    document.querySelectorAll('[data-stagger]').forEach(section => {
        revealObserver.observe(section);
    });
    
    // Terapkan observer ke elemen individual (yang tidak di-stagger)
    document.querySelectorAll('.reveal:not([data-stagger] .reveal), .reveal-left:not([data-stagger] .reveal-left), .reveal-right:not([data-stagger] .reveal-right)').forEach(el => {
        revealObserver.observe(el);
    });


    // ===== NAVIGASI AKTIF SAAT SCROLL =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header .nav-link');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // ===== UPDATE TAHUN DI FOOTER =====
    document.getElementById('year').textContent = new Date().getFullYear();

    // ===== INISIALISASI EFEK PARTIKEL (tsParticles) =====
    if (document.getElementById('particles-js')) {
        tsParticles.load("particles-js", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                collisions: {
                    enable: true,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: "out",
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        });
    }
});