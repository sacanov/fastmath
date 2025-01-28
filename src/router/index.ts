import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { useSAGameSettingsStore } from "@/stores/SAGameSettings";
import { useFractionsStore } from "@/stores/FractionsSettings";
import { useFAGameSettingsStore } from "@/stores/FAGameSettings";

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
        path: "settings",
        component: () => import("@/views/SettingsPage.vue"),
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
    path: "/flashArithmetic",
    component: () => import("@/views/FAOptions.vue"),
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
  {
    path: "/flashGame",
    component: () => import("@/views/FlashGameView.vue"),
    beforeEnter: () => {
      const FAStore = useFAGameSettingsStore();
      if (!FAStore.playing) {
        return "/";
      }
    },
  },
  {
    path: "/keyboard",
    component: () => import("@/components/KeyboardSettings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
