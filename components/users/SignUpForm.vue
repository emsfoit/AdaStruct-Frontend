<template>
  <div class="sign_up-container text-center">
    <h1 class="h2 mb-4">Sign up</h1>
    <b-alert class="mt-3" v-if="error" variant="danger" show dismissible>{{
      this.error
    }}</b-alert>
    <form @submit.prevent="sign_up">
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
          placeholder="Company"
          id="Company-input"
          v-model="user.company_name"
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
        Sign up
      </b-button>
    </form>
    <div class="row mt-2">
      <div class="col-12">
        <NuxtLink class="text-decoration" to="/user/login"> Back </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN, SIGNUP } from "../../store/types/actions.type";
import { RESET_ALERT } from "../../store/types/mutations.type";

export default {
  name: "SignupForm",
  data() {
    return {
      error: "",
      user: {
        user_email: "",
        password: "",
        company_name: "",
      },
    };
  },
  methods: {
    sign_up() {
      this.$store
        .dispatch(`auth/${SIGNUP}`, {
          ...this.user,
        })
        .then((data) => {
          this.$store.commit(`alerts/${RESET_ALERT}`);
        })
        .catch((error) => {
          if (error.response.data.message) {
            this.error = error.response.data.message;
          } else this.error = "something went wrong";
        });
    },
  },
};
</script>
<style scoped>
.sign_up-container {
  background-color: #eaebe5;
  padding: 36px 20px;
  max-width: 556px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
}

input {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #0f2244;
  border-radius: 102px;
}
</style>
