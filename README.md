# Submisssion: Bookshelf App

Aplikasi submission pada kelas `Belajar Membuat Aplikasi Back-End untuk Pemula dengan Cloudeka` di platform [Dicoding](dicoding.com).

Dibuat dalam bentuk API yang dapat mengelola operasi Create, Read, Update, dan Delete (CRUD) berdasarkan dari request yang dikirimkan.

Telah di deploy dan hanya tersedia dalam bentuk Back-End atau server, untuk pengujian dapat mengikuti langkah di `Pengujian Aplikasi Deploy`.

Link server: `link`.

**Teknologi**: Hapi, Node.js, Javascript.

## Kriteria Submission

- [x] API dapat menyimpan buku.
- [x] API dapat menampilkan seluruh buku.
- [x] API dapat menampilkan detail buku.
- [x] API dapat mengubah data buku.
- [x] API dapat menghapus buku.

## API Endpoint

- `GET`: `localhost:5000/books` dan `localhost:5000/books/:id`

Aplikasi dapat mengambil data seluruh buku, dan data berdasarkan id buku yang diberikan.

- `POST`: `localhost:5000/books`

Aplikasi dapat menambahkan buku baru berdasarkan data dari request yang dikirim.

- `PUT`: `localhost:5000/books/:id`

Aplikasi dapat mengubah data buku dengan data baru berdasarkan id buku yang diberikan.

- `DELETE`: `localhost:5000/books/:id`

Aplikasi dapat menghapus buku yang disimpan di server berdasarkan id buku yang diberikan.

## Pengujian Aplikasi Deploy

- Clone atau unduh repositori.
- Buka folder repositori.
- Buka folder `postman-remote`.
- Buka aplikasi atau website Postman.
- Buat workspace baru atau gunakan workspace yang sudah ada.
- Import file *collection* dengan nama `Bookshelf API Test.postman_collection +Custom Request.json`.
- Import file *environment* dengan nama `Bookshelf API Test.postman_environment.json`.
- Set *environment* dari `No Environment` menjadi `Bookshelf API Test`.
- Buka *collection* dengan nama `Bookshelf API Test`.
- Tekan menu pada *collection* `Bookshelf API Test`, dan pilih `Run collection` untuk menjalankan seluruh request.

## Pengujian Aplikasi Dijalankan Sendiri

**Instalasi**

- Clone atau unduh repositori.
- Buka terminal atau command prompt.
- jalankan `npm run install`.
- Jalankan `npm run start`.

**Konfigurasi Postman**

- Buka folder repositori.
- Buka folder `postman-local`.
- Buka aplikasi atau website Postman.
- Buat workspace baru atau gunakan workspace yang sudah ada.
- Import file *collection* dengan nama `Bookshelf API Test.postman_collection +Custom Request.json`.
- Import file *environment* dengan nama `Bookshelf API Test.postman_environment.json`.
- Set *environment* pada *collection* dari `No Environment` menjadi `Bookshelf API Test`.
- Buka *collection* dengan nama `Bookshelf API Test`.
- Tekan menu pada *collection* `Bookshelf API Test`, dan pilih `Run collection` untuk menjalankan seluruh request.
