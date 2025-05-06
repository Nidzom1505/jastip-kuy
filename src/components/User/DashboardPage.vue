<template>
    <div class="display-flex">
        <Header />

        <div class="flex flex-col items-center justify-center mt-4">
            <img class="h-25" src="/src/assets/vue.svg" alt="Logo" />
            <div class="text-black font-bold text-3xl my-12">
                <h2>INI TAGLINE</h2>
            </div>
            <div class="hidden md:block flex-row mb-20">
                <ul class="flex items-center gap-14">
                    <li
                        class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300 flex justify-center items-center">
                        <a href="#">
                            <img class="w-40 h-40" src="/src/assets/vue.svg" alt="gambar1">
                        </a>
                    </li>

                    <li
                        class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300 flex justify-center items-center">
                        <a href="#">
                            <img class="w-40 h-40" src="/src/assets/vue.svg" alt="gambar2">
                        </a>
                    </li>

                    <li
                        class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300 flex justify-center items-center">
                        <a href="#">
                            <img class="w-40 h-40" src="/src/assets/vue.svg" alt="gambar3">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="text-black font-bold text-3xl mb-10">
                <h2>Why purcase with Jastip Kuy?</h2>
            </div>
            <div class="hidden md:block flex-row mb-20">
                <ul class="flex items-center gap-14">
                    <li>
                        <img class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="/src/assets/vue.svg" alt="gambar4">
                    </li>

                    <li>
                        <img class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="/src/assets/vue.svg" alt="gambar5">
                    </li>

                    <li>
                        <img class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="/src/assets/vue.svg" alt="gambar6">
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

export default {
    components: {
        Header,
        Footer
    }
}
</script>