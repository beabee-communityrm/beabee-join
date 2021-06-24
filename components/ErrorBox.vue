<style lang="scss">
  @import "~bulma/sass/utilities/all";

  .error-box {
    max-width: 30rem;
    margin: 0 auto;
    background: url(~/assets/img/error.png) no-repeat;
    background-position: 90% 30%;
    padding: 1.5rem;

    @include tablet {
      padding: 3rem;
    }
  }

  .error-box-title {
    font-size: 2rem;
    @include tablet {
      font-size: 3rem;
    }
  }
</style>

<template>
  <div class="error-box box has-background-white">
    <h1 class="title error-box-title mb-5">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>
