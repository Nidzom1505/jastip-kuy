<template>
    <div class="display-flex">
        <Header />

        <div>
            Wishlist
        </div>

        <Footer />
    </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import Auth from '@/Service/auth';
import User from '@/Service/User';
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