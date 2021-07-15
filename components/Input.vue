
<template>
  <div class="field">
    <label class="label" :for="id || name">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        v-bind="$attrs"
        :class="{'is-danger': !!error}"
        :name="name"
        :id="id || name"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
      >
    </div>
    <p class="help is-danger" v-show="!!error">
      {{ error }}
    </p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {type: String},
    name: {type: String, required: true},
    label: {type: String, required: true},
    value: {type: String, default: ""},
    error: {type: String}
  }
}
</script>
