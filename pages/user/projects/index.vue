<template>
  <section class="container mt-4 mb-4">
    <b-button
      class="mb-2"
      variant="success"
      size="sm"
      v-b-modal="'project-form-model'"
    >
      New Project
    </b-button>
    <projects-new-modal />

    <lazy-projects-list></lazy-projects-list>
  </section>
</template>

<script>
export default {
  layout: "user",
  name: "projects",
};
</script>
