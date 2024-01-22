import { createRouter, createWebHistory } from "vue-router";
import homePage from "@/pages/homePage.vue";
import automatPage from "@/pages/automatPages/automatPage";
import automatOverviewPage from "@/pages/automatPages/automatOverviewPage";
import grammatikOverviewPage from "@/pages/grammatikPages/grammatikOverviewPage";
import grammatikPage from "@/pages/grammatikPages/grammatikPage";
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
      path: "/grammatikOverview",
      component: grammatikOverviewPage,
    },
    {
      path: "/grammatik/:id",
      name: "grammatikPage",
      component: grammatikPage,
      props: true,
    },
    {
      path: "/regAusdruck",
      component: regAusdruckPage,
    },
  ],
});

export default router;
