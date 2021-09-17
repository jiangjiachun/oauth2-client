<template>
  <div class="flex flex-center fullscreen">
    <q-chip
      v-for="message in messages"
      :key="message"
      color="primary"
      text-color="white"
      icon="bookmark"
    >
      {{ message }}
    </q-chip>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Home",
  data() {
    return {
      messages: [],
    };
  },
  setup() {
    return {
      group: ref(""),
    };
  },
  created() {
    this.msg();
  },
  methods: {
    msg() {
      this.$api
        .get("/authorize", {
          params: { grant_type: "authorization_code" },
        })
        .then((request) => {
          this.messages = request.data;
        });
    },
  },
};
</script>
