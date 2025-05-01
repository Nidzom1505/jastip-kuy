import LoginPage from "./components/LoginPage.vue";
import SignUp from "./components/SignUp.vue";
import ProfilePage from "./components/ProfilePage.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "LoginPage",
    component: LoginPage,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/signup",
  },
  {
    name: "ProfilePage",
    component: ProfilePage,
    path: "/profile",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;