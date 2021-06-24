<style>
  .error-box {
    max-width: 30rem;
    margin: 0 auto;
  }
</style>

<template>
  <div class="error-box box px-5 has-background-white">
    <h1 class="title is-size-1">{{ title }}</h1> 
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>
