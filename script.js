// Menggunakan Intersection Observer API untuk memicu animasi saat di-scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Jika elemen terlihat di layar
        if (entry.isIntersecting) {
            // Tambahkan kelas 'show' untuk memicu CSS animasi
            entry.target.classList.add('show');
        } else {
            // Opsi: Hilangkan class jika ingin animasinya berulang saat di-scroll ke atas
            // entry.target.classList.remove('show');
        }
    });
});

// Mengambil semua elemen yang memiliki kelas 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');

// Menerapkan observer ke setiap elemen tersebut
hiddenElements.forEach((el) => observer.observe(el));

// --- FITUR BARU 1: Telemetry Scroll Progress Bar ---
// Membuat elemen garis progress secara otomatis
var progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '5px';
progressBar.style.backgroundColor = '#cc1e4a'; // Warna Merah Red Bull
progressBar.style.width = '0%';
progressBar.style.zIndex = '9999';
progressBar.style.boxShadow = '0 0 10px #cc1e4a'; // Efek cahaya (glow)
document.body.appendChild(progressBar);

// Logika untuk mengisi garis saat di-scroll
window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});


// --- FITUR BARU 2: Efek Mengetik (Typewriter) pada Judul Utama ---
var heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    var textToType = "GIVES YOU WINGS";
    heroTitle.innerHTML = ""; // Kosongkan teks awal bawaan HTML
    var index = 0;

    function typeWriter() {
        // Menggunakan operator tidak sama dengan agar aman disalin ke dokumen
        if (index !== textToType.length) {
            heroTitle.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 120); // Kecepatan mengetik dalam milidetik
        }
    }
    
    // Mulai efek mengetik setelah halaman selesai dimuat
    window.addEventListener('load', typeWriter);
}

// --- FITUR BARU 3: Jendela Popup Profil Pembalap ---
var modal = document.getElementById("driver-modal");
var modalImg = document.getElementById("modal-img");
var modalName = document.getElementById("modal-name");
var modalDesc = document.getElementById("modal-desc");
var closeBtn = document.querySelector(".close-btn");

// Ambil semua kotak kartu pembalap
var driverCardsList = document.querySelectorAll(".driver-card");

// Berikan perintah klik pada setiap kartu
driverCardsList.forEach(function(card) {
    card.style.cursor = "pointer"; // Ubah kursor menjadi ikon tangan
    
    card.addEventListener("click", function() {
        // Ambil data gambar, judul, dan teks dari kartu yang sedang diklik
        var imgSrc = this.querySelector("img").src;
        var nameText = this.querySelector("h3").innerText;
        var descText = this.querySelector("p").innerText;

        // Masukkan data tersebut ke dalam jendela popup
        modalImg.src = imgSrc;
        modalName.innerText = nameText;
        modalDesc.innerText = descText;

        // Tampilkan jendela popup ke layar
        modal.style.display = "block";
    });
});

// Perintah untuk menutup jendela popup saat tombol 'Tutup' diklik
if (closeBtn) {
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

// Perintah ekstra: Tutup jendela popup jika pengguna mengklik area luar (latar belakang buram)
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// --- FITUR BARU 4: Grafik Statistik Interaktif (Chart.js) ---
window.addEventListener('load', function() {
    // Mencari elemen tempat grafik akan digambar
    var ctx = document.getElementById('pointsChart');
    
    if (ctx) {
        var pointsChart = new Chart(ctx, {
            type: 'line', // Jenis grafik garis
            data: {
                // Tahun-tahun penting Red Bull
                labels: ['2005', '2009', '2010', '2013', '2015', '2019', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Total Poin Konstruktor',
                    data: [34, 153.5, 498, 596, 187, 417, 585.5, 759, 860], // Data poin historis
                    borderColor: '#cc1e4a', // Warna garis merah Red Bull
                    backgroundColor: 'rgba(225, 6, 0, 0.2)', // Warna isian transparan di bawah garis
                    borderWidth: 4,
                    pointBackgroundColor: '#ffc906', // Warna titik kuning
                    pointBorderColor: '#001A30',
                    pointRadius: 6,
                    pointHoverRadius: 10,
                    fill: true, // Mengaktifkan warna isian
                    tension: 0.4 // Membuat garis melengkung dengan mulus
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#001A30',
                            font: {
                                family: "'Montserrat', sans-serif",
                                weight: 'bold',
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#001A30',
                        titleFont: { size: 16 },
                        bodyFont: { size: 14, weight: 'bold' },
                        padding: 15,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false // Menghilangkan garis vertikal agar lebih bersih
                        }
                    }
                }
            }
        });
    }
});

// --- FITUR BARU 5: Hamburger Menu Mobile ---
var mobileMenu = document.getElementById('mobile-menu');
var navLinksMenu = document.querySelector('.nav-links');
var navItems = document.querySelectorAll('.nav-links a');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        // Menambah/menghapus kelas active untuk memunculkan menu
        navLinksMenu.classList.toggle('active');
        // Mengubah ikon garis menjadi tanda X
        mobileMenu.classList.toggle('is-active');
    });

    // Menutup menu secara otomatis jika salah satu tautan diklik
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinksMenu.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            }
        });
    });
}