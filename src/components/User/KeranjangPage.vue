<template>
    <div class="display-flex">
        <Header />

        <div class="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow">
            <h1 class="text-2xl font-bold mb-4">Keranjang</h1>
            <div v-if="keranjang.length">
                <ul>
                    <li v-for="item in keranjang" :key="item.id"
                        class="flex justify-between items-center border-b py-2">
                        <span>{{ item.nama }}</span>
                        <span class="text-indigo-700 font-semibold">Rp {{ item.harga.toLocaleString() }}</span>
                        <button @click="hapusDariKeranjang(item.id)" class="ml-2 text-red-500 text-xs">Hapus</button>
                    </li>
                </ul>
                <div class="mt-4 text-right font-bold text-lg">
                    Total: Rp {{ totalKeranjang.toLocaleString() }}
                </div>
            </div>
            <div v-else class="text-gray-500">Keranjang masih kosong.</div>
        </div>

        <Footer />
    </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import ProdukService from '../../Service/Produk';

export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            keranjang: []
        }
    },
    computed: {
        totalKeranjang() {
            return this.keranjang.reduce((sum, item) => sum + item.harga, 0);
        }
    },
    methods: {
        async fetchKeranjang() {
            this.keranjang = await ProdukService.getKeranjang();
        },
        async hapusDariKeranjang(id) {
            await ProdukService.removeFromKeranjang(id);
            await this.fetchKeranjang();
        }
    },
    async mounted() {
        await this.fetchKeranjang();
    }
}
</script>