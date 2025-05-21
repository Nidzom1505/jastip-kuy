<template>
    <Header />

    <div class="flex h-[calc(100vh-64px)]">
        <!-- Sidebar Kiri: Filter -->
        <aside class="w-60 bg-gray-100 border-r border-gray-200 flex-shrink-0 p-6">
            <h2 class="font-bold mb-4">Filter</h2>
            <ul class="space-y-2">
                <li>
                    <button @click="filterKategori = 'makanan'"
                        :class="filterKategori === 'makanan' ? 'bg-gray-300' : ''"
                        class="w-full text-left py-2 px-3 rounded hover:bg-gray-200 font-medium">Makanan</button>
                </li>
                <li>
                    <button @click="filterKategori = 'minuman'"
                        :class="filterKategori === 'minuman' ? 'bg-gray-300' : ''"
                        class="w-full text-left py-2 px-3 rounded hover:bg-gray-200 font-medium">Minuman</button>
                </li>
                <li>
                    <button @click="filterKategori = ''"
                        class="w-full text-left py-2 px-3 rounded hover:bg-gray-200 font-medium">Semua</button>
                </li>
            </ul>
        </aside>

        <!-- Konten Tengah (scrollable) -->
        <main class="flex-1 overflow-y-auto bg-white p-8">
            <h1 class="text-2xl font-bold mb-4">Daftar Produk</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="produk in produkTersaring" :key="produk.id"
                    class="bg-gray-50 rounded shadow p-4 flex flex-col items-center">
                    <div class="w-32 h-32 bg-gray-200 rounded mb-4 flex items-center justify-center">
                        <span class="text-gray-400">Gambar</span>
                    </div>
                    <div class="font-semibold text-lg mb-2">{{ produk.nama }}</div>
                    <div class="mb-2 text-indigo-700 font-bold">Rp {{ produk.harga.toLocaleString() }}</div>
                    <button @click="masukkanKeranjang(produk)"
                        class="mt-auto bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold">
                        Masukkan Keranjang
                    </button>
                </div>
            </div>
        </main>

        <!-- Sidebar Kanan: Sorting & Keranjang -->
        <aside class="w-60 bg-gray-100 border-l border-gray-200 flex-shrink-0 p-6 flex flex-col">
            <h2 class="font-bold mb-4">Sorting</h2>
            <ul class="space-y-2 mb-8">
                <li>
                    <button @click="sortBy = 'termurah'" :class="sortBy === 'termurah' ? 'bg-gray-300' : ''"
                        class="w-full text-left py-2 px-3 rounded hover:bg-gray-200 font-medium">Harga Termurah</button>
                </li>
                <li>
                    <button @click="sortBy = 'termahal'" :class="sortBy === 'termahal' ? 'bg-gray-300' : ''"
                        class="w-full text-left py-2 px-3 rounded hover:bg-gray-200 font-medium">Harga Termahal</button>
                </li>
            </ul>
            <div>
                <h2 class="font-bold mb-2">Keranjang</h2>
                <ul class="space-y-2">
                    <li v-for="item in keranjang" :key="item.id" class="flex justify-between items-center">
                        <span>{{ item.nama }}</span>
                        <span class="text-sm text-gray-500">Rp {{ item.harga.toLocaleString() }}</span>
                    </li>
                </ul>
                <div v-if="keranjang.length" class="mt-2 font-bold text-indigo-700">
                    Total: Rp {{ totalKeranjang.toLocaleString() }}
                </div>
            </div>
        </aside>
    </div>

    <Footer />
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import ProdukService from '../../Service/Produk';

export default {
    components: { Header, Footer },
    data() {
        return {
            produk2: [],
            filterKategori: '',
            sortBy: '',
            keranjang: []
        }
    },
    computed: {
        produkTersaring() {
            let hasil = this.produk2;
            if (this.filterKategori) {
                hasil = hasil.filter(p => p.kategori === this.filterKategori);
            }
            if (this.sortBy === 'termurah') {
                hasil = [...hasil].sort((a, b) => a.harga - b.harga);
            } else if (this.sortBy === 'termahal') {
                hasil = [...hasil].sort((a, b) => b.harga - a.harga);
            }
            return hasil;
        },
        totalKeranjang() {
            return this.keranjang.reduce((sum, item) => sum + item.harga, 0);
        }
    },
    methods: {
        async fetchProduk2() {
            // Misal ProdukService.getAllNgemil() jika ingin khusus ngemil, atau filter di sini
            this.produk2 = await ProdukService.getAllProduk2();
        },
        async masukkanKeranjang(produk) {
            await ProdukService.addToKeranjang(produk);
            await this.fetchKeranjang();
        },
        async fetchKeranjang() {
            this.keranjang = await ProdukService.getKeranjang();
        }
    },
    mounted() {
        this.fetchProduk2();
        this.fetchKeranjang();
    }
}
</script>