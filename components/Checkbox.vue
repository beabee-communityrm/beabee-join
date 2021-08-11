<template>
  <p class="mb-4">
    <label class="checkbox">
      <input
        type="checkbox"
        v-bind="$attrs"
        :checked="value || undefined"
        :value="checkboxValue || true"
        @input="$emit('input', $event.target.value)"
      />
      <span>
        <slot></slot>
      </span>
    </label>
  </p>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["value", "checkboxValue"]
};
</script>
