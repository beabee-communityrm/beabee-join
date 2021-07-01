<template>
  <p class="mb-4">
    <label class="checkbox">
      <input v-bind="$attrs" :checked="value || undefined" type="checkbox" @input="$emit('input', $event.target.value)">
      <span>
        <slot></slot>
      </span>
    </label>
  </p>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['value']
}
</script>
