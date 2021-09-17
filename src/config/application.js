import { SessionStorage } from "quasar";
// 获取 URL 的主机部分地址
const baseURL = window.location.protocol + "//" + window.location.host;
// api接口地址
const apiURL = "http://127.0.0.1:8080";
// aouth2认证跳转地址，接收redirect（全路径）参数，由后台重定向至前台页面
const authorizationURL = apiURL + "/oauth2/authorization/messaging-client-oidc";

// 重定向到登录页面
function redirectLoginPage(redirect) {
  SessionStorage.clear();
  redirect = encodeURIComponent(baseURL + redirect);
  let url = authorizationURL + "?redirect=" + redirect;
  window.location.href = url;
}

export { baseURL, apiURL, authorizationURL, redirectLoginPage };
