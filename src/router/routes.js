import { redirectLoginPage } from "../config/application";

import Home from "pages/Home";

const routes = [
  {
    path: "/",
    alias: "/home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    beforeEnter: (to, from, next) => {
      let redirect = to.query.redirect ? to.query.redirect : "";
      redirectLoginPage(redirect);
    },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
