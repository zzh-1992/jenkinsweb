import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home");
const Markdown = () => import("../views/Markdown");
const MD = () => import("../views/MD");
const Tag = () => import("../views/Tag");
const Socket = () => import("../views/Socket");
const RichText = () => import("../views/RichText");
const TreeTable = () => import("../views/TreeTable");
const TimeLine = () => import("../views/TimeLine");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/TimeLine",
    name: "TimeLine",
    component: TimeLine,
  },
  {
    path: "/TreeTable",
    name: "TreeTable",
    component: TreeTable,
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
