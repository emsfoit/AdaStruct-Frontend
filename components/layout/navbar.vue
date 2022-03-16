<template>
  <div>
    <div v-if="isAuthenticated">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">AdaStruct</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/user/projects">Projects</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
              <b-dropdown-item @click="log_out">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div v-else>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">AdaStruct</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      </b-navbar>
    </div>
  </div>
</template>
<script>
import { LOGOUT } from "../../store/types/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  methods: {
    log_out() {
      this.$store.dispatch(`auth/${LOGOUT}`);
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
