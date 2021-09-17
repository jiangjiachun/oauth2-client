<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <q-card class="my-card">
      <q-card-section class="bg-width text-black">
        <div>登录</div>
        <q-input
          label="用户"
          name="username"
          v-model="user.username"
          stack-label
          :dense="true"
        >
          <template v-slot:append>
            <q-icon name="person_outline" class="non-selectable" />
          </template>
        </q-input>
        <q-input
          label="密码"
          name="password"
          v-model="user.password"
          type="password"
          stack-label
          :dense="true"
        >
          <template v-slot:append>
            <q-icon name="lock" class="non-selectable" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          outline
          color="primary"
          :label="submit"
          :loading="loading"
          padding="5px 20px"
          @click="loginSubmit"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useMeta } from "quasar";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      submit: "登录",
      user: {
        username: "",
        password: "",
      },
    };
  },
  setup() {
    useMeta({
      title: "登录",
    });
    return {
      authorizationURL,
      baseURL,
    };
  },
  created() {
    this.redirectURL();
  },
  methods: {
    loginSubmit() {},
  },
};
</script>
