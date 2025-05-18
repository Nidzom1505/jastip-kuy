<template>
    <header class="bg-green rounded-b-2xl border-b-8 border-solid  border-b-orange">
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="md:flex md:items-center md:gap-12">
                    <a class="block text-teal-600 dark:text-teal-600" href="/">
                        <span class="sr-only">Home</span>
                        <img class="h-8" src="/src/assets/logo.png" alt="Logo" />
                    </a>
                </div>

                <div class="hidden md:block">
                    <nav aria-label="Global">
                        <ul class="flex items-center gap-6 text-xl">
                            <li>
                                <a class="text-white transition hover:text-white/75 font-bold"
                                    href="/keranjang">
                                    Keranjang
                                </a>
                            </li>

                            <li>
                                <a class="text-white transition hover:text-white/75 font-bold"
                                    href="/wishlist">
                                    Wishlist
                                </a>
                            </li>

                            <li>
                                <a class="text-white transition hover:text-white/75 font-bold"
                                    href="/riwayat">
                                    Riwayat
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="flex items-center gap-4">
                    <div class="sm:flex sm:gap-4">
                        <a class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                            href="#">
                            <img class="h-8" src="/src/assets/vue.svg" alt="Logo" />
                        </a>

                        <div class="hidden sm:flex">
                            <a class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                                href="/profile">
                                <img class="h-8" src="/src/assets/vue.svg" alt="Logo" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>