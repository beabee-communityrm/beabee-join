<style lang="scss">
  .form-errors {
    display: flex;
    margin-bottom: 1rem;
    color: var(--c-danger);
    font-weight: bold;
    background-color: var(--c-danger-lighter);
    border-radius: var(--radius);
  }

  .form-errors__icon {
    flex: 0 0 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--c-danger);
    color: var(--c-danger-lighter);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
</style>

<template>
  <form :method="method" @submit.prevent="checkAndSubmit" :novalidate="hasMounted">
    <slot name="inputs"></slot>

    <div class="form-errors" v-show="hasErrors">
      <div class="form-errors__icon">
        <i class="fa fa-exclamation" aria-hidden="true"></i>
      </div>
      <p class="p-3">
        Something is missing, please check the fields above
      </p>
    </div>

    <section class="block">
      <p>
        <button
          class="button wrap-text is-fullwidth is-primary"
          :class="{'is-loading': isSubmitting}" :disabled="hasMounted && !canSubmit"
        >
          <slot name="submit"></slot>
        </button>
      </p>
    </section>
  </form>
</template>

<script>
export default {
  props: ['method', 'checkForm', 'hasErrors'],
  data: {
    isSubmitting: false,
    hasMounted: false,
    canSubmit: true // TODO
  },
  mounted() {
    this.hasMounted = true;
  },
  methods: {
    async checkAndSubmit(evt) {
      this.checkForm();

      if (!this.hasErrors) {
        this.isSubmitting = true;
        const [errors] = await this.$submitForm(evt);
        if (errors) {
          this.$emit('errors', errors);
        }
        this.isSubmitting = false;
      }
    },
  }
};
</script>
