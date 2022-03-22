<template>
  <div class="page-wrapper" v-show="isLoaded">
    <layout-navbar :user="user" />
    <div class="main">
      <div class="sidebar">
        <a @click="goTo('datasets')" :class="{ active: isActive('datasets') }"
          >Datasets</a
        >
        <a @click="goTo('config')" :class="{ active: isActive('config') }"
          >Config</a
        >
        <a
          @click="goTo('inferences')"
          :class="{ active: isActive('inferences') }"
          >Inferences</a
        >
        <a @click="goTo('logs')" :class="{ active: isActive('logs') }">Logs</a>
      </div>
      <div class="content">
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "graph_layout",
  middleware: ["user"],
  data() {
    return {
      isLoaded: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
    isActive() {
      return function (link) {
        if (this.$route.path.indexOf(link) > 0) {
          return true;
        }
        return false;
      };
    },
  },
  mounted() {
    this.isLoaded = true;
  },
  methods: {
    goTo(to) {
      let project_id = this.$route.params.id;
      let graph_id = this.$route.params.graphId;
      this.$router.push(
        `/user/projects/${project_id}/graphs/${graph_id}/${to}`
      );
    },
  },
};
</script>

<style>
.nav {
  z-index: 1; /*Add this*/
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}
.main {
  margin-top: 57px;
}
.bb {
  margin: 0;
  font-family: "Lato", sans-serif;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #04aa6d;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>
