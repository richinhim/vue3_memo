<template>
  <div class="app">
    <div v-if="state.loggedIn">안녕하세요? 홍길동님!</div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" />
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="text" id="loginPw" />
      </label>
      <hr />
      <button>로그인</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      loggedIn: false,
    });
    return { state };
  },

  components: {},
};
</script>

<style></style>
