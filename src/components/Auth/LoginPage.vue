<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- <img class="mx-auto h-10 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" /> -->
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Log in to your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email/Username</label>
                    <div class="mt-2">
                        <input type="text" name="user" id="user" autocomplete="user" v-model="user"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" autocomplete="current-password" required=""
                            v-model="password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit" v-on:click.prevent="login"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Belum punya akun?
                {{ ' ' }}
                <router-link class="font-semibold text-indigo-600 hover:text-indigo-500" to="/signup">Sign
                    In</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import User from '../../Service/User';

export default {
    name: 'LoginPage',

    data() {
        return {
            user: '',
            password: ''
        }
    },
    methods: {
        async login() {
            const success = await User.login(this.user, this.password);

            if (success === true) {
                this.$router.push("/");
            } else {
                alert("Login gagal. Periksa kembali username dan password Anda.");
            }
        }
    },
    mounted() {
        const user = localStorage.getItem("user-info");
        if (user) {
            this.$router.push("/");
        }
    }
}
</script>