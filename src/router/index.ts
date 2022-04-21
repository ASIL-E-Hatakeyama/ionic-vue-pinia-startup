import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useAppStore } from "@/store/index";
import { RouteRecordRaw } from "vue-router";
import InitPage from "@/views/InitPage.vue";
import Err404Page from "@/views/errors/Err404Page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: () => InitPage,
    meta: {
      isLogined: false,
    },
  },
  {
    path: "/login",
    component: () => import("../views/login/LoginPage.vue"),
    meta: {
      isLogined: false,
    },
  },
  {
    path: "/top",
    component: () => import("../views/top/TopPage.vue"),
    meta: {
      isLogined: true,
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
    component: () => import("../views/top/TopPage.vue"),
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
    if (store.idLogined) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
