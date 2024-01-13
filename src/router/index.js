import { createRouter, createWebHistory } from "vue-router";
import homePage from "@/pages/homePage.vue";
import automatPage from "@/pages/automatPage";
import automatOverviewPage from "@/pages/automatOverviewPage";
import grammatikPage from "@/pages/grammatikPage";
import regAusdruckPage from "@/pages/regAusdruckPage";

const router = createRouter({
  // optionen
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: homePage,
    },
    {
      path: "/automat/:id",
      name: "automatPage",
      component: automatPage,
      props: true,
    },
    {
      path: "/automatOverview",
      component: automatOverviewPage,
    },
    {
      path: "/grammatik",
      component: grammatikPage,
    },
    {
      path: "/regAusdruck",
      component: regAusdruckPage,
    },
  ],
});

export default router;
