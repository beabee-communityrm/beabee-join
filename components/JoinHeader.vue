<style lang="scss">
  .join-header {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 60px 1fr;
    align-items: center;
  }
</style>

<template>
  <header class="block">
    <div class="join-header mb-4">
      <img src="~assets/img/newspaper-logo.svg" :alt="name">
      <h1 class="title is-4">{{ title }}</h1>
    </div>
    <slot></slot>
  </header>
</template>

<script>
  export default {
    props: ['name', 'title']
  }
</script>
