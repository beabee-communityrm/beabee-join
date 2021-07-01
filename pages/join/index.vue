<style lang="scss">
  @import "~bulma/sass/utilities/all";

  .join-subtitle {
    font-size: 1.15rem;
  }

  .join-period-input {
    position: absolute;
    opacity: 0;
  }

  .join-period-input:checked + .button.is-primary.is-outlined {
    background-color: var(--c-primary);
    color: white;
  }
</style>

<template>
  <div>
    <JoinHeader :name="content.name" :title="content.title">
      <p class="join-subtitle">{{ content.subtitle }}</p>
    </JoinHeader>

    <Form method="POST" :checkForm="checkAndSubmit">
      <template v-slot:inputs>
        <nav class="block columns is-mobile is-variable is-1">
          <div class="column pt-0" v-for="(p) in content.periods" :key="p.name">
            <p class="control is-expanded">
              <label>
                <input class="join-period-input" type="radio" name="period" :value="p.name" v-model="period" v-on:change="amount = p.presetAmounts[0]">
                <span class="button is-primary is-outlined is-fullwidth">
                  {{ p.label }}
                </span>
              </label>
            </p>
          </div>
        </nav>

        <section id="amount" class="block">
          <JoinAmount
            v-model="amount"
            :currency="content.currency"
            :minAmount="minAmount"
            :presetAmounts="presetAmounts"
            :period="periodVerbose"
          />
        </section><!-- /#amount -->

        <section id="account-data" class="block">
          <h5 class="title is-5 mb-1">Member account</h5>
          <p class="mb-3"><small>Are you a member already? <a href="/login">Log in</a></small></p>
          <fieldset>
            <Input
              name="email" type="email" label="Email" required
              v-model="email"
              :blur="checkEmail"
              :error="errors.email"
            />
            <Input
              name="password" type="password" label="Password" required
              v-model="password"
              :blur="checkPassword"
              :error="errors.password"
            >
              <div class="help is-flex is-align-items-baseline">
                <span class="icon mr-1">
                  <i class="fa fa-info-circle"></i>
                </span>
                <span>
                  Set a secure password: 8+ characters and at least one number,
                  one uppercase and one lowercase letter
                </span>
              </div>
            </Input>
          </fieldset>
        </section><!-- /#account-data -->

        <section id="payment" class="block" v-show="period !== 'annually'">
          <h5 class="title is-5 mb-3">Payment method</h5>
          <!--<fieldset>
            <div class="mb-2">
              <label class="radio">
                <input type="radio" name="payment" value="credit-card" v-model="payment">
                <i class="fa fa-credit-card" aria-hidden="true"></i>
                Credit/Debit Card
              </label>
              <div class="mb-4" v-show="payment === 'credit-card'">
                <p>
                  <small>
                    You will be taken to GoCardless to confirm your payment
                    details, after which you will be returned here to complete the
                    process.
                  </small>
                </p>
              </div>
            </div>

            <div class="mb-2">
              <label class="radio">
                <input type="radio" name="payment" value="direct-debit" v-model="payment">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                Direct debit
              </label>
              <div class="mb-4" v-show="payment === 'direct-debit'">
                <p><small>You will be taken to GoCardless to confirm your payment details, after
                  which you will be returned here to complete the process.</small>
                </p>
              </div>
            </div>

            <div class="mb-2">
              <label class="radio">
                <input type="radio" name="payment" value="paypal" v-model="payment">
                <i class="fa fa-paypal" aria-hidden="true"></i>
                Paypal
              </label>
              <div class="mb-4" v-show="payment === 'paypal'">
                <p><i class="fa fa-lock" aria-hidden="true"></i> <small>You will be taken to GoCardless to confirm your payment details, after
                  which you will be returned here to complete the process.</small>
                </p>
              </div>
            </div>
          </fieldset>-->
          <div v-show="period !== 'annually'">
            <p class="mb-4">
              <label class="checkbox">
                <input type="checkbox" name="payFee" checked>
                <span>
                  Our payment processor charges us per transaction, which means we
                  receive less from monthly contributions. Are you happy to absorb
                  the <span class="hidden-nojs">{{ fee }}</span> transaction fee?
                  Alternatively you could pay annually.
                </span>
              </label>
            </p>
            <p>
              <i class="fa fa-lock" aria-hidden="true"></i>
              Your payment will be processed securely with GoCardless under the
              Direct Debit Guarantee scheme.
            </p>
          </div>
        </section><!-- /#payment -->
      </template>

      <template v-slot:submit>
        <span>Contribute <span class="hidden-nojs">{{ submitText }}</span></span>
      </template>
    </Form>

    <p class="has-text-centered is-size-7 mt-4">
      By proceeding, you are accepting the <a :href="content.termsLink">Terms of Service</a>
      and <a :href="content.privacyLink">Privacy Policy</a>.
    </p>
  </div>
</template>

<script>
export default {
  layout: 'join',
  async asyncData(context) {
    const content = await context.$content('join');
    return {
      content,
      amount: content.initialAmount,
      period: content.initialPeriod
    };
  },
  data: function() {
    return {
      email: '',
      password: '',
      payment: 'direct-debit',
      errors: {
        email: null,
        password: null
      },
      isSubmitting: false,
      hasMounted: false
    };
  },
  computed: {
    fee: function () {
      return this.amount ? (this.amount + 20) + 'p' : '?'
    },
    presetAmounts: function () {
      const period = this.content.periods.find(p => p.name === this.period);
      return period && period.presetAmounts;
    },
    minAmount: function () {
      return this.period === 'monthly' ? 1 : 12;
    },
    periodVerbose: function() {
      switch (this.period) {
        case 'monthly': return '/ month';
        case 'annually': return '/ year';
        default: return '';
      }
    },
    canSubmit: function () {
      return this.email && this.password && !this.hasErrors;
    },
    submitText: function() {
      const period = this.period === 'single' ? '' : ' ' + this.period;
      return `${this.content.currency}${this.amount}${period}`;
    },
    hasErrors: function () {
      return Object.values(this.errors).some(e => !!e);
    }
  },
  methods: {
    checkEmail() {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      this.errors.email = re.test(this.email) ? null : 'Invalid email address';
    },
    checkPassword() {
      const isValid = this.password.length >= 8 && /[A-Z]/.test(this.password) && /[a-z]/.test(this.password) &&
        /[0-9]/.test(this.password);
      this.errors.password = isValid ? null : 'Password does not meet requirements';
    },
    async checkAndSubmit(evt) {
      this.checkPassword();
      this.checkEmail();

      if (!this.hasErrors) {
        this.isSubmitting = true;
        const [errors] = await this.$submitForm(evt);

        if (errors) {
          this.errors = errors;
          this.isSubmitting = false;
        }
      }
    }
  }
}
</script>
