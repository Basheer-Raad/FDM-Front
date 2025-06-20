import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes.ts";
import appConfigs from "@/app/appConfig.ts";


const router = createRouter({
  history: createWebHistory('/tailwick/vue/h-dark'),
  routes,
});

const title = "Tailwick Vue - Admin & Dashboard Template";

router.beforeEach((to: any, from: any, next: any) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  from; // NOTE: on build time it is giving error so just put it here
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r: any) => r.meta && r.meta.title);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title + " | " + title || title;
  }

  const isAuthRequired = to.meta.authRequired;

  if (!isAuthRequired) {
    return next();
  } else {
    const auth = appConfigs.auth;
    if (auth === "fakebackend") {
      const token = localStorage.getItem('token');
      if (isAuthRequired && token) {
        next();
      } else {
        router.push("/login");
      }
    } else {
      next();
    }
  }
});

export default router;
