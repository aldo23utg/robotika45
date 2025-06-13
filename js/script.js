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
            // Kita perlu memeriksa posisi scroll secara manual karena observer tidak selalu aktif
            lightSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // Cek apakah bagian atas section berada di area atas viewport
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
            // Selalu hapus class jika dalam mode gelap
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
        // Panggil pengecekan visibilitas setelah tema diubah
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
        lightSections.forEach(section => {
            observer.observe(section);
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
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }

});