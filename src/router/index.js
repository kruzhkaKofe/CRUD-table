import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage";
import PersonDetails from "@/views/PersonDetails";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/details/:id",
    component: PersonDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
