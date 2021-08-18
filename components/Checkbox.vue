<template>
  <p class="mb-4">
    <label class="checkbox">
      <input
        type="checkbox"
        v-model="checked"
        :name="name"
        :value="checkboxValue || true"
        @change="$emit('input', checkedProxy)"
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
  props: ["value", "checkboxValue", "name"],
  data() {
    return {
      checkedProxy: this.checked
    };
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      }
    }
  }
};
</script>
