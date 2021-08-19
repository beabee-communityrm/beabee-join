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
  <form @submit.prevent="checkAndSubmit" :novalidate="hasMounted">
    <slot name="inputs"></slot>

    <div class="form-errors" v-show="hasErrors">
      <div class="form-errors__icon">
        <i class="fa fa-exclamation" aria-hidden="true"></i>
      </div>
      <p class="p-3">{{ $t("form.hasErrors") }}</p>
    </div>

    <section class="block">
      <p>
        <button
          class="button wrap-text is-fullwidth"
          :class="{ [submitButtonType]: true, 'is-loading': isSubmitting }"
          :disabled="hasMounted && (!canSubmit || hasErrors)"
        >
          <slot name="submit"></slot>
        </button>
      </p>
    </section>
  </form>
</template>

<script>
export default {
  props: {
    canSubmit: {
      type: Boolean
    },
    checkForm: {
      type: Function,
      required: true
    },
    hasErrors: {
      type: Boolean
    },
    submitButtonType: {
      type: String,
      default: "is-primary"
    }
  },
  data: () => ({
    isSubmitting: false,
    hasMounted: false
  }),
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
          this.$emit("errors", errors);
        }
        this.isSubmitting = false;
      }
    }
  }
};
</script>
