document.addEventListener('DOMContentLoaded', function() {

    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const navbar = document.querySelector('#navbarUtama');
    const lightSections = document.querySelectorAll('.section-light');

    /**
     * Fungsi untuk mengecek apakah navbar berada di atas section terang
     * dan menerapkan style yang sesuai. HANYA berjalan di light mode.
     */
    const checkNavbarVisibility = () => {
        if (htmlElement.getAttribute('data-bs-theme') === 'light') {
            let isIntersectingLight = false;
            lightSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 85 && rect.bottom >= 85) {
                    isIntersectingLight = true;
                }
            });

            if (isIntersectingLight) {
                navbar.classList.add('navbar-on-light');
            } else {
                navbar.classList.remove('navbar-on-light');
            }
        } else {
            navbar.classList.remove('navbar-on-light');
        }
    };

    /**
     * Fungsi untuk menerapkan tema
     * @param {string} theme - Nama tema ('light' atau 'dark')
     */
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        checkNavbarVisibility();
    };

    /**
     * Event listener untuk tombol ganti tema
     */
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    /**
     * Muat tema dari localStorage atau default ke 'light' saat halaman dibuka
     */
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);


    /**
     * Observer untuk mengubah warna navbar saat scroll
     */
    if (navbar && lightSections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-85px 0px -90% 0px',
            threshold: 0
        };
        const observer = new IntersectionObserver(checkNavbarVisibility, observerOptions);
        lightSections.forEach(section => observer.observe(section));
    }
    
    /**
     * Munculkan popup pengembangan saat pertama kali membuka website (per sesi)
     */
    if (!sessionStorage.getItem('devPopupShown')) {
        const devPopupModal = new bootstrap.Modal(document.getElementById('devPopup'));
        devPopupModal.show();
        sessionStorage.setItem('devPopupShown', 'true');
    }

    /**
     * Observer untuk animasi elemen saat scroll
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => scrollObserver.observe(el));
    }
    
    /**
     * BARU: Logika untuk Filter Struktur Organisasi
     */
    const filterContainer = document.querySelector('.filter-nav');
    if (filterContainer) {
        const filterLinks = filterContainer.querySelectorAll('.nav-link');
        const orgGroups = document.querySelectorAll('#divisi .org-group');

        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Hapus kelas active dari semua link dan tambahkan ke yang diklik
                filterLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                // Lakukan filter pada grup
                orgGroups.forEach(group => {
                    if (filter === 'all' || group.getAttribute('data-category') === filter) {
                        group.classList.remove('hidden');
                    } else {
                        group.classList.add('hidden');
                    }
                });
            });
        });
    }


    /**
     * Fungsi untuk menutup navbar-collapse setelah link di-klik (mobile view)
     */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navLinks.length > 0 && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }
            });
        });
    }

});