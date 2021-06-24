<style lang="scss">
  @import "~bulma/sass/utilities/all";
  .splash-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background-color: var(--c-grey-lighter);

    padding: 1rem;
    @include tablet {
      padding: 2rem;
    }
  }
</style>
<template>
  <div class="splash-wrapper">
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>
