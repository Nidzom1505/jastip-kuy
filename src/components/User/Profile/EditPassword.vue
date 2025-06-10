<template>
    <div class="flex items-center justify-center text-sm/6 font-medium text-gray-900">
        <div class="flex justify-between gap-2 mt-3 ml-3">
            <a href="/profile"
                class="inline-flex items-center border border-green px-3 py-1.5 rounded-md text-green hover:bg-indigo-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18">
                    </path>
                </svg>
                <span class="ml-1 font-bold text-lg">Back</span>
            </a>
        </div>
        <div class="flex items-center justify-center w-full h-full text-xl font-bold">
            <h1>Ubah Password</h1>
        </div>
    </div>
    <div class="flex flex-col items-center justify-center mt-8">
        <div class="mt-5">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
                <input type="password" name="password" id="password" autocomplete="current-password"
                    v-model="newPassword"
                    class="block w-120 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-5">
            <label for="conPassword" class="block text-sm/6 font-medium text-gray-900">Konfirmasi Password</label>
            <div class="mt-2">
                <input type="password" name="password" id="conPassword" autocomplete="current-password"
                    v-model="conPassword"
                    class="block w-120 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <button type="submit" v-on:click.prevent="simpanPassword"
            class="mt-10 flex w-120 justify-center rounded-md bg-green px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Simpan
        </button>
    </div>
</template>

<script>
import Auth from '@/Service/auth';
import User from '@/Service/User';
// import User from '@/Service/IndexDB/UserIDB';

export default {
    data() {
        return {
            newPassword: '',
            conPassword: ''
        }
    },
    mounted() {
        Auth.checkLogin(this);
    },
    methods: {
        async simpanPassword() {
            User.changePassword(this.newPassword, this.conPassword, this.$router);
        }
    }
}
</script>