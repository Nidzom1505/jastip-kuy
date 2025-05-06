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

export default {
    components: {
        Header,
        Footer
    }
}
</script>