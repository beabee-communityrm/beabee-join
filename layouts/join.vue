<style lang="scss">
@import "~bulma/sass/utilities/all";

.join-wrapper {
  min-height: 100vh;
  background-color: var(--c-grey-lightest);

  @include tablet {
    background: var(--join-page-bg);
    background-attachment: fixed;
    background-size: cover;
    padding: 1rem 0;
  }
}

.join-container {
  margin: 0 auto;
  max-width: 32rem;
}
</style>
<template>
  <div class="join-wrapper">
    <div class="join-container box py-6 has-background-white">
      <Nuxt />
    </div>
  </div>
</template>
