<template>
    <div class="display-flex">
        <div class="max-w-xl mx-auto my-10 p-6 bg-white rounded shadow">
            <h1 class="text-2xl font-bold mb-4">Pembayaran</h1>
            <div v-if="items.length">
                <ul class="mb-4">
                    <li v-for="item in items" :key="item.id" class="flex justify-between items-center border-b py-2">
                        <span>{{ item.product.name }} <span class="text-gray-500">x{{ item.quantity || 1 }}</span></span>
                        <span class="font-semibold text-green-700">
                            Rp {{ (item.product.price * (item.quantity || 1)).toLocaleString() }}
                        </span>
                    </li>
                </ul>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Catatan untuk pesanan:</label>
                    <textarea v-model="note" rows="2" class="w-full border rounded p-2"
                        placeholder="Contoh: tanpa sambal, dsb"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Tempat pengantaran (Area Kampus GA):</label>
                    <input v-model="alamat" type="text" class="w-full border rounded p-2"
                        placeholder="Contoh: gedung saintek lt.6, dsb" />
                </div>
                <div class="flex justify-between items-center mt-6">
                    <span class="font-bold text-lg">Total: Rp {{ total.toLocaleString() }}</span>
                    <button @click="bayar"
                        class="bg-green hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">
                        Bayar
                    </button>
                </div>
            </div>
            <div v-else class="text-gray-500">Tidak ada pesanan.</div>
        </div>
    </div>
</template>

<script>
import Auth from '@/Service/auth';
import Keranjang from '@/Service/Keranjang';
import { prosesPembayaran } from '@/Service/Pesan';
// import ProdukService from '@/Service/IndexDB/ProdukIDB';
// import { prosesPembayaran } from '@/Service/IndexDB/pesanIDB';

export default {
    data() {
        return {
            items: [],
            note: '',
            alamat: ''
        }
    },
    computed: {
        total() {
            return this.items.reduce((sum, item) => sum + (item.product.price * (item.quantity || 1)), 0);
        }
    },
    methods: {
        async bayar() {
            try {
                await prosesPembayaran({
                    items: this.items,
                    note: this.note,
                    alamat: this.alamat,
                    total: this.total,
                    router: this.$router
                });
            } catch (e) {
                alert('Gagal menyimpan pesanan: ' + e);
                console.error(e);
            }
        }
    },
    async mounted() {
        Auth.checkLogin(this);
        const checkedIds = JSON.parse(localStorage.getItem('checkout-items') || '[]');
        const keranjang = await Keranjang.getKeranjang();
        this.items = keranjang.filter(item => checkedIds.includes(item.id));
    }
}
</script>