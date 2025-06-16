<template>
    <div class="display-flex">
        <Header />

        <div>
            Riwayat
        </div>

        <Footer />
    </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import Auth from '@/Service/auth';

export default {
    components: {
        Header,
        Footer
    },
    mounted() {
        Auth.checkLogin(this);
    }
}
</script>