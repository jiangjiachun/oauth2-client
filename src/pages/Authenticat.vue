<template>
  <div></div>
</template>

<script>
export default {
  name: "Oauth",
  data() {
    return {};
  },
  created() {
    //this.loginSubmit();
  },
  methods: {
    loginSubmit() {
      console.log(this.$route.query.code);
      console.log(this.$route.query.state);
      location.href =
        "http://127.0.0.1:8080/login/oauth2/code/messaging-client-oidc?code=" +
        this.$route.query.code +
        "&state=" +
        this.$route.query.state;
    },
  },
};
</script>
