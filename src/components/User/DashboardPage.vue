<template>
    <div class="display-flex">
        <Header />

        <div class="flex flex-col items-center justify-center mt-6">
            <img class="h-auto max-w-full sm:h-40 md:h-60 lg:h-70" src="/src/assets/Frame 1.png" alt="Logo" />
            <div class="text-black font-bold text-3xl my-12">
                <h2>Ngampus Tenang, Jajan Aman!</h2>
            </div>
            <div class="hidden md:block flex-row mb-20">
                <ul class="flex items-center gap-14">
                    <li
                        class="bg-orange1 w-60 h-60 rounded-3xl border-b-8 border-solid border-b-neutral-300 flex justify-center items-center">
                        <a href="/daily">
                            <img class="w-40 h-40" src="/src/assets/daily.svg" alt="gambar1">
                            <h2 class="text-white font-bold flex justify-center items-center mt-5">Daily Essentials</h2>
                        </a>
                    </li>

                    <li
                        class="bg-orange w-60 h-60 rounded-3xl border-b-8 border-solid border-b-neutral-300 flex justify-center items-center">
                        <a href="/ngemil">
                            <img class="w-40 h-40" src="/src/assets/cemil.svg" alt="gambar2">
                            <h2 class="text-white font-bold flex justify-center items-center mt-5">Ngemil Santuy</h2>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="text-black font-bold text-3xl mb-10">
                <h2>Kenapa Jastip Kuy Lebih Worth It?</h2>
            </div>
            <div class="hidden md:block flex-row mb-20">
                <ul class="flex items-center gap-14">
                    <li>
                        <img class="w-80 h-80 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="../../assets/1.jpg" alt="gambar3">
                    </li>

                    <li>
                        <img class="w-80 h-80 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="../../assets/2.jpg" alt="gambar4">
                    </li>

                    <li>
                        <img class="w-80 h-80  rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="../../assets/3.jpg" alt="gambar5">
                    </li>
                </ul>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
// import { seedProduk } from '@/Service/IndexDB/MasukProduk';

// seedProduk();

export default {
    components: {
        Header,
        Footer
    }
}
</script>