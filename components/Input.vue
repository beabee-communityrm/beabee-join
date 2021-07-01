
<template>
  <div class="field">
    <label class="label" :for="id || name">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        :class="{'is-danger': !!error}"
        :type="type"
        :name="name"
        :id="id || name"
        :required="required"
        :value="value"
        @input="updateValue($event.target.value)"
        @blur="blur"
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
  props: {
    id: {type: String},
    name: {type: String, required: true},
    label: {type: String, required: true},
    value: {type: String, required: true},
    type: {type: String, default: 'text'},
    required: {type: Boolean, default: false},
    blur: {type: Function},
    error: {type: String}
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    }
  }
}
</script>
