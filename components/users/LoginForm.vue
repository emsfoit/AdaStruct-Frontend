<template>
  <div class="login-container text-center">
    <h1 class="h2 mb-4">Login</h1>
    <b-alert class="mt-3" v-if="error" variant="danger" show dismissible>{{
      this.error
    }}</b-alert>
    <form @submit.prevent="login">
      <b-form-group>
        <b-form-input
          type="email"
          placeholder="Email"
          id="email-input"
          v-model="user.user_email"
          autofocus
          required
        />
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="password"
          placeholder="Password"
          id="password"
          v-model="user.password"
          required
        />
      </b-form-group>
      <b-button variant="action-primary" class="mt-4" type="submit">
        Login
      </b-button>
    </form>
    <div class="row mt-2">
      <div class="col-12">
        <NuxtLink class="text-decoration" to="/user/reset_password">
          Sign up
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "../../store/types/actions.type";
import { RESET_ALERT } from "../../store/types/mutations.type";

export default {
  name: "LoginForm",
  data() {
    return {
      error: "",
      user: {
        user_email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch(`auth/${LOGIN}`, {
          user_email: this.user.user_email.toLowerCase(),
          password: this.user.password,
        })
        .then((data) => {
          this.$store.commit(`alerts/${RESET_ALERT}`);
        })
        .catch((error) => {
          if (error.response.status == 401)
            this.error = "wronng E-Mail/Password";
          else this.error = "something went wrong";
        });
    },
  },
};
</script>
<style scoped>
.login-container {
  background-color: #eaebe5;
  padding: 36px 20px;
  max-width: 556px;
  margin: 0 auto;
  margin-bottom: 200px;
}

input {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #0f2244;
  border-radius: 102px;
}
</style>
