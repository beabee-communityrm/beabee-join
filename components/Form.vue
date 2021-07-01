<template>
  <form :method="method" @submit.prevent="checkAndSubmit" :novalidate="hasMounted">
    <slot name="inputs"></slot>

    <div class="join-errors" v-show="hasErrors">
      <div class="join-errors__icon">
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
  props: ['method', 'checkForm'],
  data: {
    isSubmitting: false,
    hasMounted: false
  },
  mounted() {
    this.hasMounted = true;
  },
  methods: {
    async checkAndSubmit(evt) {
      if (this.checkForm()) {
        this.isSubmitting = true;
        const [errors] = await this.$submitForm(evt);
        this.isSubmitting = false;
      }
    }
  }
};
</script>
