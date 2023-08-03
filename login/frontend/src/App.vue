<template>
  <div class="app">
    <div v-if="state.account.id">
      <p>안녕하세요? {{ state.account.name }}님!</p>
      <button @click="logout()">로그아웃</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId" />
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="password" id="loginPw" v-model="state.form.loginPw" />
      </label>
      <hr />
      <button @click="submit()">로그인</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      //loggedIn: false,
      account: {
        id: null,
        name: "",
      },
      form: {
        loginId: "",
        loginPw: "",
      },
    });
    const submit = () => {
      const args = {
        loginId: state.form.loginId,
        loginPw: state.form.loginPw,
      };
      axios
        .post("/api/account", args)
        .then((res) => {
          alert("로그인에 성공했습니다.");
          console.log(res);
          state.account = res.data;
        })
        .catch(() => {
          alert("로그인에 실패하였습니다. 계정 정보를 확인해 주세요.");
        });
    };

    const logout = () => {
      axios.delete("/api/account").then(() => {
        alert("로그아웃하였습니다.");
        state.account.id = null;
        state.account.name = "";
      });
    };

    /*
    axios.get("/api/account").then((res) => {
      //console.log(res.data);
      state.account = res.data;
    });
    */

    return { state, submit, logout };
  },

  components: {},
};
</script>

<style></style>
