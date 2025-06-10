<template>
    <Header />
    <div class="flex flex-col justify-center items-center mb-50">
        <a href="/profile/edit" rel="author">
            <div
                 class="w-200 h-35 mb-4 mt-10 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 border rounded-lg">
                <img class="object-cover w-20 h-20 mr-3 rounded-full" src="/src/assets/profile.svg">
                <div>
                    <p class="font-display mb-2 text-2xl font-semibold text-black" itemprop="author">
                        {{ user ? user.nama : '' }}
                    </p>
                    <div class="mb-4 prose prose-sm text-gray-400">
                        <p>
                            {{ user ? user.email : '' }}
                        </p>
                    </div>
                </div>
            </div>
        </a>
        <div
            class="w-200 mt-2 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 border rounded-lg">
            <img class="object-cover w-7 h-7 mr-3" src="/src/assets/changePass.svg">
            <div>
                <p class="font-display text-base font-semibold text-black" itemprop="author">
                    <a href="/profile/editpassword" rel="">Ubah Password</a>
                </p>
            </div>
        </div>
        <div
            class="w-200 mt-2 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 border rounded-lg">
            <img class="object-cover w-7 h-7 mr-3" src="/src/assets/logout.svg" alt="Logout Icon">
            <button v-on:click.prevent="out" class="font-display text-base font-semibold text-black cursor-pointer">
                Log Out
            </button>
        </div>
    </div>
    <Footer />
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import Auth from '@/Service/auth';
import User from '@/Service/User';
// import User from '@/Service/IndexDB/UserIDB';

export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            user: null
        }
    },
    methods: {
        async out() {
            User.logout(this.$router);
        }
    },
    mounted() {
        Auth.checkLogin(this);
        User.getUser().then((user) => {
            this.user = user;
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }
}
</script>