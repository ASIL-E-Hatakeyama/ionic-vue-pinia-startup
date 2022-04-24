import { useAppStore } from "@/store/index";
import Err404Page from "@/views/errors/Err404Page.vue";
import InitPage from "@/views/InitPage.vue";
import LoginPage from "@/views/login/LoginPage.vue";
import TopPage from "@/views/top/TopPage.vue";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

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
    component: () => LoginPage,
    meta: {
      isLogined: false,
    },
  },
  {
    path: "/top",
    component: () => TopPage,
    meta: {
      isLogined: true,
    },
  },
  {
    path: "/video",
    component: () => import("../views/video/VideoPage.vue"),
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
  if (to.fullPath === "/") {
    next();
  } else if (to.meta.isLogined) {
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
