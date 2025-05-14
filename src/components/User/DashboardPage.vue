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
                        class="bg-orange w-60 h-60 rounded-3xl border-b-8 border-solid border-b-neutral-300 flex justify-center items-center">
                        <a href="/daily">
                            <img class="w-40 h-40" src="/src/assets/vue.svg" alt="gambar1">
                        </a>
                    </li>

                    <li
                        class="bg-orange w-60 h-60 rounded-3xl border-b-8 border-solid border-b-neutral-300 flex justify-center items-center">
                        <a href="/ngemil">
                            <img class="w-40 h-40" src="/src/assets/vue.svg" alt="gambar2">
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
                        <img class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="/src/assets/vue.svg" alt="gambar3">
                    </li>

                    <li>
                        <img class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="/src/assets/vue.svg" alt="gambar4">
                    </li>

                    <li>
                        <img class="bg-orange w-50 h-50 rounded-3xl border-b-8 border-solid border-b-neutral-300"
                            src="/src/assets/vue.svg" alt="gambar5">
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
    },
    mounted() {
        try {
            const user = JSON.parse(localStorage.getItem("user-info"));
            if (!user) {
                this.$router.push("/login");
            }
        } catch (error) {
            console.error("Data di localStorage tidak valid:", error);
            this.$router.push("/login");
        }
    }
}
</script>