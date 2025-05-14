import LoginPage from "./components/Auth/LoginPage.vue";
import SignUp from "./components/Auth/SignUp.vue";
import EditPage from "./components/User/Profile/EditPage.vue";
import Dashboard from "./components/User/DashboardPage.vue";
import DailyEssentials from "./components/Shop/DailyEssentials.vue";
import NgemilSantuy from "./components/Shop/NgemilSantuy.vue";
import PembayaranPage from "./components/Shop/PembayaranPage.vue";
import KeranjangPage from "./components/User/KeranjangPage.vue";
import RiwayatPage from "./components/User/RiwayatPage.vue";
import WishList from "./components/User/WishList.vue";
import ProfilePage from "./components/User/ProfilePage.vue"
import EditPass from "./components/User/Profile/EditPassword.vue"

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "DashboardPage",
    component: Dashboard,
    path: "/",
  },
  {
    name: "LoginPage",
    component: LoginPage,
    path: "/login",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/signup",
  },
  {
    name: "EditPage",
    component: EditPage,
    path: "/profile/edit",
  },
  {
    name: "DailyEssentials",
    component: DailyEssentials,
    path: "/daily",
  },
  {
    name: "NgemilSantuy",
    component: NgemilSantuy,
    path: "/ngemil",
  },
  {
    name: "PembayaranPage",
    component: PembayaranPage,
    path: "/bayar",
  },
  {
    name: "KeranjangPage",
    component: KeranjangPage,
    path: "/keranjang",
  },
  {
    name: "RiwayatPage",
    component: RiwayatPage,
    path: "/riwayat",
  },
  {
    name: "WishList",
    component: WishList,
    path: "/wishlist",
  },
  {
    name: "Profile",
    component: ProfilePage,
    path: "/profile",
  },
  {
    name: "Password",
    component: EditPass,
    path: "/profile/editpassword",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
