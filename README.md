# FizLab - Virtual Lab

FizLab adalah sebuah laboratorium virtual yang memungkinkan pengguna untuk melakukan simulasi fisika secara interaktif. Saat ini, FizLab memiliki beberapa simulator yang fokus pada konsep fisika dasar seperti bidang miring dan jungkat jungkit. Aplikasi ini dirancang untuk membantu pengguna memahami konsep-konsep fisika melalui visualisasi yang mudah dipahami dan simulasi yang interaktif.

## Fitur
1. Simulasi Bidang Miring: Pengguna dapat mengatur massa, sudut kemiringan, koefisien gesekan, dan panjang dasar bidang miring untuk melihat bagaimana gaya bekerja pada suatu objek di bidang miring.
2. Simulasi Jungkat Jungkit: Pengguna dapat menempatkan beban dengan berat berbeda di masing-masing sisi jungkat jungkit untuk memahami konsep momen dan keseimbangan.
3. Autentikasi Pengguna: Hanya pengguna yang terdaftar yang dapat menyimpan hasil simulasi dan mengakses kembali di masa depan.
4. Simpan Hasil Simulasi: Pengguna dapat menyimpan pengaturan dan hasil simulasi untuk dilihat (pengembangan lebih lanjut) atau diakses kembali nanti.
5. Halaman Profil: Setiap pengguna memiliki halaman profil untuk melihat data dan kemajuan simulasi yang telah disimpan.

## Teknologi yang Digunakan
- Frontend: React.js, TypeScript, HTML, CSS
- Backend: Supabase (untuk autentikasi dan penyimpanan data)
- Hosting: Vercel (Frontend dan Serverless Functions)

## Cara Menjalankan Proyek secara Lokal
1. Clone Repository
```
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

2. Instalasi Dependensi Pastikan kamu berada di direktori proyek, lalu jalankan:
```
npm install
```

3. Konfigurasi Supabase Buat file .env di root proyek dan tambahkan variabel berikut sesuai dengan konfigurasi Supabase kamu:
```
REACT_APP_SUPABASE_URL=<Your Supabase URL>
REACT_APP_SUPABASE_ANON_KEY=<Your Supabase Anon Key>
```

4. Jalankan Proyek Setelah semua dependensi terinstall dan konfigurasi environment selesai, jalankan proyek dengan perintah:
```
npm start
```

Proyek akan berjalan di http://localhost:3000.