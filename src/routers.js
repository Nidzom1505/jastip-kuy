import LoginPage from "./components/Auth/LoginPage.vue";
import SignUp from "./components/Auth/SignUp.vue";
import EditPage from "./components/User/Profile/EditPage.vue";
import Dashboard from "./components/User/DashboardPage.vue";
import MakananPage from "./components/Shop/MakananPage.vue";
import MinumanPage from "./components/Shop/MinumanPage.vue";
import PembayaranPage from "./components/Shop/PembayaranPage.vue";
import SiangTitip from "./components/Shop/SiangTitip.vue";
import KeranjangPage from "./components/User/KeranjangPage.vue";
import RiwayatPage from "./components/User/RiwayatPage.vue";
import WishList from "./components/User/WishList.vue";
import ProfilePage from "./components/User/ProfilePage.vue"

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
    name: "MakananPage",
    component: MakananPage,
    path: "/makanan",
  },
  {
    name: "MinumanPage",
    component: MinumanPage,
    path: "/minuman",
  },
  {
    name: "PembayaranPage",
    component: PembayaranPage,
    path: "/bayar",
  },
  {
    name: "SiangTitip",
    component: SiangTitip,
    path: "/siangtitip",
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
