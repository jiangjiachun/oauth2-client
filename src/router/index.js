/* import store from "../store/index";
import { computed } from "vue"; */
import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { SessionStorage, Cookies } from "quasar";
import { api } from "../boot/axios";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });
  Router.beforeEach((to, from, next) => {
    isAuth(api, to).then(() => {
      let isAuthenticated = SessionStorage.getItem("isAuthenticated");
      if (isAuthenticated && to.meta.requiresAuth) {
        next();
      } else if (!to.meta.requiresAuth) {
        next();
      }
    });
  });
  return Router;
});

/**
 * 验证是否登录
 * @param {*} api
 * @param {*} isAuthenticated
 * @returns
 */
async function isAuth(api, to) {
  let isAuthenticated = SessionStorage.getItem("isAuthenticated");
  if (!isAuthenticated && to.meta.requiresAuth) {
    try {
      await api.get("/authorized/user").then((response) => {
        let headerName = response.data.csrf.headerName;
        let token = response.data.csrf.token;
        api.defaults.xsrfHeaderName = headerName;
        Cookies.set("XSRF-TOKEN", token, {
          sameSite: "Lax",
        });
      });
    } catch (error) {}
  }
}
