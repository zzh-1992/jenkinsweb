import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('../views/Home')
const Markdown = () => import('../views/Markdown')
const T = () => import('../views/T')
const MD = () => import('../views/MD')
const Tag = () => import('../views/Tag')
const Socket = () => import('../views/Socket')
const RichText = () => import('../views/RichText')

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
    path: "/Tag",
    name: "Tag",
    component: Tag,
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
    component: RichText,
  },
  {
    path: "/Socket",
    name: "Socket",
    component: Socket,
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // 定义接口基础路径
  history: createWebHistory(process.env.VUE_APP_BASE_API),
  routes,
});

export default router;
