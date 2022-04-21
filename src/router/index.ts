import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useAppStore } from "@/store/index";
import { RouteRecordRaw } from "vue-router";
import LoginPage from "@/views/login/LoginPage.vue";
import Err404Page from "@/views/errors/Err404Page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/login",
    meta: {
      isLogined: false,
    },
  },
  {
    path: "/login",
    component: () => LoginPage,
    meta: {
      isLogined: false,
    },
  },
  {
    path: "/folder",
    redirect: "/folder/Inbox",
    meta: {
      isLogined: true,
    },
  },
  {
    path: "/folder/:id",
    component: () => import("../views/FolderPage.vue"),
    meta: {
      isLogined: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => Err404Page,
    meta: {
      isLogined: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  if (to.meta.isLogined) {
    if (store.token) {
      next();
    } else {
      next("/");
    }
  }
  next();
});

export default router;
