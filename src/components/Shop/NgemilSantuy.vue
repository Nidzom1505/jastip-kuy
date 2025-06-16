<template>
    <Header />

    <div class="flex h-[calc(100vh-64px)]">
        <!-- Sidebar Kiri: Filter -->
        <!-- <aside class="w-60 bg-gray-100 border-r border-gray-200 flex-shrink-0 p-6">
            <h2 class="font-bold mb-4">Filter</h2>
            <ul class="space-y-2">
                <li>
                    <button @click="filterKategori = 'cemilan'"
                        :class="filterKategori === 'cemilan' ? 'bg-gray-300' : ''"
                        class="w-full text-left py-2 px-3 rounded hover:bg-gray-200 font-medium">Cemilan</button>
                </li>
                <li>
                    <button @click="filterKategori = ''"
                        class="w-full text-left py-2 px-3 rounded hover:bg-gray-200 font-medium">Semua</button>
                </li>
            </ul>
        </aside> -->

        <main class="flex-1 overflow-y-auto bg-white p-8">
            <h1 class="text-2xl font-bold mb-4">Daftar Produk</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="produk in produkTersaring" :key="produk.id"
                    class="bg-gray-50 rounded shadow p-4 flex flex-col items-center">
                    <div class="w-32 h-32 bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
                        <img v-if="produk.gambar" :src="produk.gambar" :alt="produk.nama"
                            class="object-cover w-full h-full" />
                    </div>
                    <div class="font-semibold text-lg mb-2">{{ produk.nama }}</div>
                    <div class="mb-2 font-bold">Rp {{ produk.harga.toLocaleString() }}</div>
                    <button @click="masukkanKeranjang(produk)"
                        class="mt-auto bg-green hover:bg-green/90 text-white px-4 py-2 rounded font-semibold">
                        Masukkan Keranjang
                    </button>
                </div>
            </div>
            <div v-if="totalPages > 1" class="flex justify-center mt-6 space-x-2">
                <button v-for="page in pageWindow" :key="page" @click="currentPage = page" :class="[
                    'px-3 py-1 rounded font-semibold',
                    currentPage === page ? 'bg-green text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                    {{ page }}
                </button>
            </div>
        </main>

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
                        <span>{{ item.product.name }}</span>
                        <div class="flex items-center">
                            <button @click="ubahQty(item, (item.quantity || 1) - 1)" class="px-2">-</button>
                            <span class="mx-2">{{ item.quantity || 1 }}</span>
                            <button @click="ubahQty(item, (item.quantity || 1) + 1)" class="px-2">+</button>
                        </div>
                        <span class="text-sm text-gray-500">Rp {{ (item.product.price * (item.quantity ||
                            1)).toLocaleString()
                            }}</span>
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
import { filterCemilan } from '@/Service/ProdukFilter';
import { sortProduk } from '@/Service/ProdukSorting';
import Auth from '@/Service/auth';
import ProdukService from '@/Service/Produk';
import Keranjang from '@/Service/Keranjang';
// import ProdukService from '@/Service/IndexDB/ProdukIDB';

export default {
    components: { Header, Footer },
    data() {
        return {
            produk: [],
            filterKategori: 'cemilan',
            sortBy: '',
            keranjang: [],
            pageSize: 9,
            currentPage: 1
        }
    },
    computed: {
        produkTersaring() {
            let hasil = filterCemilan(this.produk);
            hasil = sortProduk(hasil, this.sortBy);
            const start = (this.currentPage - 1) * this.pageSize;
            return hasil.slice(start, start + this.pageSize);
        },
        produkCount() {
            return filterCemilan(this.produk).length;
        },
        totalPages() {
            return Math.ceil(this.produkCount / this.pageSize);
        },
        pageWindow() {
            const total = this.totalPages;
            const current = this.currentPage;
            const windowSize = 10;
            let start = Math.max(1, current - Math.floor(windowSize / 2));
            let end = start + windowSize - 1;
            if (end > total) {
                end = total;
                start = Math.max(1, end - windowSize + 1);
            }
            const pages = [];
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
        totalKeranjang() {
            return this.keranjang.reduce((sum, item) => sum + (item.product.price * (item.quantity || 1)), 0);
        }
    },
    watch: {
        sortBy() {
            this.currentPage = 1;
        }
    },
    methods: {
        async fetchProduk() {
            this.produk = await ProdukService.getAll();
        },
        async masukkanKeranjang(produk) {
            await Keranjang.addToKeranjang(produk);
            await this.fetchKeranjang();
        },
        async fetchKeranjang() {
            this.keranjang = await Keranjang.getKeranjang();
        },
        async ubahQty(item, qty) {
            await Keranjang.updateQtyKeranjang(item.id, qty);
            await this.fetchKeranjang();
        }
    },
    mounted() {
        Auth.checkLogin(this);
        this.fetchProduk();
        this.fetchKeranjang();
    }
}
</script>