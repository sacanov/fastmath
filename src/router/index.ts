import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { useSAGameSettingsStore } from "@/stores/SAGameSettings";
import { useFractionsStore } from "@/stores/FractionsSettings";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/play",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "play",
      },
      {
        path: "play",
        component: () => import("@/views/GameModes.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3Page.vue"),
      },
    ],
  },
  {
    path: "/speedArithmetic",

    component: () => import("@/views/SAOptions.vue"),
  },
  {
    path: "/fractions",
    component: () => import("@/views/FractionsOptions.vue"),
  },
  {
    path: "/game/:type",
    component: () => import("@/views/GameView.vue"),
    props: true,
    beforeEnter: () => {
      const SAStore = useSAGameSettingsStore();
      const FractionStore = useFractionsStore();
      if (!(SAStore.playing || FractionStore.playing)) {
        return "/";
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
