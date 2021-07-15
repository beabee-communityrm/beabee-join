<template>
  <header class="block">
    <div class="is-flex is-align-items-center mb-4">
      <img class="join-header-logo" width="60" src="~assets/img/newspaper-logo.svg" :alt="name">
      <div class="ml-4">
        <h1 class="title is-4 mb-0">{{ title }}</h1>
        <p class="mt-2" v-if="subtitle">{{ subtitle }}</p>
      </div>
    </div>
    <slot></slot>
  </header>
</template>

<script>
  export default {
    props: ['name', 'title', 'subtitle']
  }
</script>
