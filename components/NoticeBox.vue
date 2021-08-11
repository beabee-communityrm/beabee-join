<style lang="scss">
@import "~bulma/sass/utilities/all";

.notice-box {
  position: relative;
  max-width: 30rem;
  margin: 0 auto;
  background-position: 90% 30%;
  padding: 1.5rem;

  @include tablet {
    padding: 3rem;
  }
}

.notice-box__bg {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 30%;
  max-width: 130px;
  stroke: var(--c-success);
  stroke-opacity: 0.3;
}

.notice-box__content {
  position: relative;
}

.notice-box-title {
  font-size: 2rem;
  @include tablet {
    font-size: 3rem;
  }
}
</style>

<template>
  <div class="notice-box box has-background-white is-size-5">
    <svg class="notice-box__bg" viewBox="0 0 44.327 53.536">
      <g
        transform="translate(-78.661 -67.441)"
        fill="none"
        stroke-linecap="round"
        stroke-width="1"
      >
        <path d="m79.094 87.608 3.9928 3.9928" />
        <path d="m83.087 87.608-3.9928 3.9928" />
        <path d="m85.672 81.03 3.9928 3.9928" />
        <path d="m89.665 81.03-3.9928 3.9928" />
        <path d="m85.672 94.844 3.9928 3.9928" />
        <path d="m89.665 94.844-3.9928 3.9928" />
        <path d="m92.25 115.89 3.9928 3.9928" />
        <path d="m96.243 115.89-3.9928 3.9928" />
        <path d="m98.828 67.874 3.9928 3.9928" />
        <path d="m102.82 67.874-3.9928 3.9928" />
        <path d="m98.828 81.688 3.9928 3.9928" />
        <path d="m102.82 81.688-3.9928 3.9928" />
        <path d="m98.828 95.501 3.9928 3.9928" />
        <path d="m102.82 95.501-3.9928 3.9928" />
        <path d="m98.828 109.32 3.9928 3.9928" />
        <path d="m102.82 109.32-3.9928 3.9928" />
        <path d="m105.41 75.11 3.9928 3.9928" />
        <path d="m109.4 75.11-3.9928 3.9928" />
        <path d="m105.41 88.924 3.9928 3.9928" />
        <path d="m109.4 88.924-3.9928 3.9928" />
        <path d="m105.41 102.74 3.9928 3.9928" />
        <path d="m109.4 102.74-3.9928 3.9928" />
        <path d="m105.41 116.55 3.9928 3.9928" />
        <path d="m109.4 116.55-3.9928 3.9928" />
        <path d="m111.98 96.159 3.9928 3.9927" />
        <path d="m115.98 96.159-3.9928 3.9927" />
        <path d="m118.56 89.581 3.9928 3.9928" />
        <path d="m122.55 89.581-3.9928 3.9928" />
      </g>
    </svg>
    <div class="notice-box__content">
      <h1 class="title notice-box-title mb-5">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>
