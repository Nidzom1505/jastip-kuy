<template>
    <div class="flex flex-col items-center justify-center mt-8">
        <img class="w-32 h-32 rounded-full mx-auto" src="https://loremflickr.com/320/320/girl" alt="">
        <div class="text-center mt-5">
            <div>
                <input type="file" name="profile" id="upload_profile" hidden required>

                <label for="upload_profile" class="inline-flex items-center">
                    <svg data-slot="icon" class="w-5 h-5 text-blue-700" fill="none" stroke-width="1.5"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                        </path>
                    </svg>
                </label>
            </div>
            <button
                class="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
                Change Profile Picture
            </button>
        </div>
        <div class="mt-5">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Username</label>
            <div class="mt-2">
                <input type="email" name="email" id="email" autocomplete="email" required="" v-model="user"
                    class="block w-120 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-5">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Nama</label>
            <div class="mt-2">
                <input type="email" name="email" id="email" autocomplete="email" required="" v-model="user"
                    class="block w-120 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-5">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">No. Telepon</label>
            <div class="mt-2">
                <input type="email" name="email" id="email" autocomplete="email" required="" v-model="user"
                    class="block w-120 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div class="mt-5">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
            <div class="mt-2">
                <input type="email" name="email" id="email" autocomplete="email" required="" v-model="user"
                    class="block w-120 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <button type="submit" v-on:click.prevent="login"
            class="mt-10 flex w-120 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Simpan
        </button>
        <div>

        </div>
    </div>
</template>

<script></script>
