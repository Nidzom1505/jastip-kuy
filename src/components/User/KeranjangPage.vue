<template>
    <div class="display-flex">
        <Header />
        <div class="max-w-2xl mx-auto my-8 p-6 mb-40 bg-white rounded shadow">
            <h1 class="text-2xl font-bold mb-4">Keranjang</h1>
            <div v-if="keranjang.length">
                <ul>
                    <li v-for="item in keranjang" :key="item.id"
                        class="grid grid-cols-[40px_1fr_110px_120px_40px] items-center py-2 bg-grey rounded-xl mb-2 gap-2">
                        <input type="checkbox" v-model="checkedItems" :value="item.id" class="ml-6 mr-2 w-4 h-4" />
                        <span class="truncate">{{ item.nama }}</span>
                        <div class="flex items-center justify-center w-28">
                            <button @click="ubahQty(item, item.quantity - 1)" class="px-2">-</button>
                            <span class="mx-2 w-6 text-center">{{ item.quantity || 1 }}</span>
                            <button @click="ubahQty(item, item.quantity + 1)" class="px-2">+</button>
                        </div>
                        <span class="text-green font-semibold w-28 text-right block">
                            Rp {{ (item.harga * (item.quantity || 1)).toLocaleString() }}
                        </span>
                        <button @click="hapusDariKeranjang(item.id)" class="ml-2 mr-5 flex justify-center">
                            <img src="/src/assets/trash.svg" alt="Hapus" class="w-7 h-7" />
                        </button>
                    </li>
                </ul>
                <div class="mt-4 text-right font-bold text-lg">
                    Total: Rp {{ totalTerpilih.toLocaleString() }}
                </div>
                <!-- Pilih Semua & Pesan -->
                <div class="mt-4 flex items-center justify-between">
                    <div>
                        <input type="checkbox" :checked="isAllChecked" @change="toggleCheckAll" id="checkAll"
                            class="mr-2 ml-6 w-4 h-4" />
                        <label for="checkAll" class="select-none cursor-pointer">Pilih Semua</label>
                    </div>
                    <button :disabled="checkedItems.length === 0"
                        class="bg-green hover:bg-green-700 text-white px-6 py-2 rounded font-semibold disabled:opacity-50"
                        @click="pesanBarang">
                        Pesan
                    </button>
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
import Auth from '@/Service/auth';
import ProdukService from '@/Service/Produk';
// import ProdukService from '@/Service/IndexDB/ProdukIDB';

export default {
    components: { Header, Footer },
    data() {
        return {
            keranjang: [],
            checkedItems: []
        }
    },
    computed: {
        totalKeranjang() {
            return this.keranjang.reduce((sum, item) => sum + (item.harga * (item.quantity || 1)), 0);
        },
        totalTerpilih() {
            return this.keranjang
                .filter(item => this.checkedItems.includes(item.id))
                .reduce((sum, item) => sum + (item.harga * (item.quantity || 1)), 0);
        },
        isAllChecked() {
            return this.keranjang.length > 0 &&
                this.checkedItems.length === this.keranjang.length;
        }
    },
    methods: {
        async fetchKeranjang() {
            this.keranjang = await ProdukService.getKeranjang();
        },
        async hapusDariKeranjang(id) {
            await ProdukService.removeFromKeranjang(id);
            await this.fetchKeranjang();
        },
        async ubahQty(item, qty) {
            if (qty < 1) {
                await this.hapusDariKeranjang(item.id);
            } else {
                await ProdukService.updateQtyKeranjang(item.id, qty);
                await this.fetchKeranjang();
            }
        },
        toggleCheckAll(e) {
            if (e.target.checked) {
                this.checkedItems = this.keranjang.map(item => item.id);
            } else {
                this.checkedItems = [];
            }
        },
        pesanBarang() {
            localStorage.setItem('checkout-items', JSON.stringify(this.checkedItems));
            this.$router.push('/bayar');
        }
    },
    async mounted() {
        Auth.checkLogin(this);
        await this.fetchKeranjang();
    }
}
</script>