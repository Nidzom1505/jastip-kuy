<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- <img class="mx-auto h-10 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" /> -->
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="name" class="block text-sm/6 font-medium text-gray-900">Nama Lengkap</label>
                    <div class="mt-2">
                        <input type="text" name="text" id="name" autocomplete="name" required="" v-model="name"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
                    <div class="mt-2">
                        <input type="text" name="text" id="username" autocomplete="username" required="" v-model="user"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" autocomplete="email" required="" v-model="email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label for="phone" class="block text-sm/6 font-medium text-gray-900">No Telepon</label>
                    <div class="mt-2">
                        <input type="phone" name="phone" id="phone" autocomplete="email" required="" v-model="telp"
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
                    <label for="conPassword" class="block text-sm/6 font-medium text-gray-900">Konfirmasi
                        Password</label>
                    <div class="mt-2">
                        <input type="password" name="password" id="conPassword" autocomplete="current-password"
                            required="" v-model="conPassword"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit" v-on:click.prevent="create"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Sudah punya akun?
                {{ ' ' }}
                <router-link class="font-semibold text-indigo-600 hover:text-indigo-500" to="/">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import User from '../../Service/User';

export default {
    name: 'SignUp',

    data() {
        return {
            name: '',
            user: '',
            email: '',
            telp: '',
            password: '',
            conPassword: ''
        }
    },

    methods: {
        async create() {
            User.register(this.name, this.user, this.email, this.telp, this.password, this.conPassword);

            if (true) {
                this.$router.push("/login"); // Navigasi ke halaman login
            }
        }
    }
}

</script>