<template>
    <Header />
    <div class="flex flex-col justify-center items-center mb-50">
        <div
            class="w-200 h-35 mb-4 mt-10 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 border rounded-lg">
            <img class="object-cover w-20 h-20 mr-3 rounded-full" src="../../assets/vue.svg">
            <div>
                <p class="font-display mb-2 text-2xl font-semibold text-black" itemprop="author">
                    <a href="/profile/edit" rel="author">M. Nidzom Imtiyaz</a>
                </p>
                <div class="mb-4 prose prose-sm text-gray-400">
                    <p>nidzomtiyaz@gmail.com</p>
                </div>
            </div>
        </div>
        <div
            class="w-200 mt-2 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 border rounded-lg">
            <img class="object-cover w-7 h-7 mr-3 rounded-full" src="../../assets/vue.svg">
            <div>
                <p class="font-display text-base font-semibold text-black" itemprop="author">
                    <a href="#" rel="author">Ubah Password</a>
                </p>
            </div>
        </div>
        <div
            class="w-200 mt-2 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 border rounded-lg">
            <img class="object-cover w-7 h-7 mr-3 rounded-full" src="../../assets/vue.svg">
            <div>
                <p class="font-display text-base font-semibold text-black" itemprop="author">
                    <a href="/login" rel="author">Log Out</a>
                </p>
            </div>
        </div>
    </div>
    <Footer />
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
