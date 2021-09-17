import { boot } from "quasar/wrappers";
import axios from "axios";
import { apiURL, redirectLoginPage } from "../config/application";
import { SessionStorage } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN", // 自动读取cookie中csrf取
  xsrfHeaderName: "X-CSRF-TOKEN", // 请求时自动携带的header名称
});

api.interceptors.response.use(
  function (response) {
    set();
    return response;
  },
  function (error) {
    login(error);
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

/**
 * 403状态清除SessionStorage，重定向到登录页面
 * @param {*} error
 */
function login(error) {
  if (error.request.status === 403) {
    let redirect = window.location.pathname + window.location.search;
    redirectLoginPage(redirect);
  }
}

/**
 * 设置登录状态为已登录
 */
function set() {
  let isAuthenticated = SessionStorage.getItem("isAuthenticated");
  if (!isAuthenticated) {
    SessionStorage.set("isAuthenticated", true);
  }
}

export { api };
