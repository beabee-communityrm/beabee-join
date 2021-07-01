<template>
  <header class="block">
    <div class="is-flex is-align-items-center mb-4">
      <img class="join-header-logo" width="60" src="~assets/img/newspaper-logo.svg" :alt="name">
      <h1 class="title ml-4 is-4">{{ title }}</h1>
    </div>
    <slot></slot>
  </header>
</template>

<script>
  export default {
    props: ['name', 'title']
  }
</script>
