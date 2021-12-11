import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Markdown from "../views/Markdown";
import T from "../views/TableFilter";
import MD from "../views/MD";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/T",
    name: "T",
    component: T,
  },
  {
    path: "/MD",
    name: "MD",
    component: MD,
  },
  {
    path: "/Markdown",
    name: "Markdown",
    component: Markdown,
  },
  {
    path: "/RichText",
    name: "RichText",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RichText.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
