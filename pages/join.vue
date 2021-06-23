<style lang="scss" src="~/assets/css/join.scss"></style>

<template>
  <div class="join-container box px-5 has-background-white">
    <header class="block">
      <div class="join-header mb-4">
        <img src="~assets/img/newspaper-logo.svg" :alt="content.name">
        <h1 class="title is-4">{{ content.title }}</h1>
      </div>
      <div class="content join-subtitle" v-html="content.subtitle"></div>
    </header>

    <form method="POST" @submit.prevent="checkAndSubmit" :novalidate="hasMounted">
      <nav class="block columns is-mobile is-variable is-1">
        <div class="column pt-0" v-for="(p) in content.periods" :key="p.name">
          <p class="control is-expanded">
            <label v-bind:class="{ 'is-focused': period === p.name }">
              <input class="join-period-input" type="radio" name="period" :value="p.name" v-model="period" v-on:change="amount = p.presetAmounts[0]">
              <span class="button is-primary is-outlined is-fullwidth">
                {{ p.label }}
              </span>
            </label>
          </p>
        </div>
      </nav>

      <section id="amount" class="block">
        <div class="columns join-amount-container">
          <div class="column is-8">
            <label class="join-amount is-gapless">
              <span class="join-amount__text">{{ content.currency }}</span>
              <div class="join-amount__input" :class="{'is-large': amount >= 100}">
                <input type="number" name="amount" v-model.number="amount" :min="minAmount" step="1">
              </div>
              <span class="join-amount__text hidden-nojs">{{ periodVerbose }}</span>
              <div class="join-amount__buttons hidden-nojs">
                <button v-on:click="amount += 1" class="button is-outlined" type="button">▲</button>
                <button v-on:click="amount -= 1" class="button is-outlined" type="button" :disabled="amount <= minAmount">▼</button>
              </div>
            </label>
          </div>
          <div class="column hidden-nojs">
            <div class="join-amount-presets">
              <button
                class="button" type="button"
                v-for="presetAmount in presetAmounts" :key="presetAmount"
                v-on:click="amount = presetAmount"
               >
                {{ content.currency }}{{ presetAmount }}
              </button>
            </div>
          </div>
        </div>
      </section><!-- /#amount -->

      <section id="account-data" class="block">
        <h5 class="title is-5 mb-1">Member account</h5>
        <p class="mb-3"><small>Are you a member already? <a href="/login">Log in</a></small></p>
        <fieldset>
          <div class="field">
            <label class="label" for="email">Email</label>
            <div class="control">
              <input
                class="input" type="email" name="email" id="email" required
                v-model="email" :class="{'is-danger': !!errors.email}" @blur="checkEmail"
              >
            </div>
            <p class="help is-danger" v-show="!!errors.email">
              {{ errors.email }}
            </p>
          </div>
          <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control">
              <input
                class="input" type="password" id="password" name="password" minlength="8" required
                v-model="password"  :class="{'is-danger': !!errors.password}" @blur="checkPassword"
               >
            </div>
            <p class="help is-danger" v-show="!!errors.password">
              {{ errors.password }}
            </p>
            <div class="help is-flex is-align-items-baseline">
              <span class="icon mr-1">
                <i class="fa fa-info-circle"></i>
              </span>
              <span>
                Set a secure password: 8+ characters and at least one number,
                one uppercase and one lowercase letter
              </span>
            </div>
          </div>
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
            <span>Contribute <span class="hidden-nojs">{{ submitText }}</span></span>
          </button>
        </p>
        <p class="has-text-centered is-size-7 mt-4">
          By proceeding, you are accepting the <a :href="content.termsLink">Terms of Service</a>
          and <a :href="content.privacyLink">Privacy Policy</a>.
        </p>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'splash',
  async asyncData(context) {
    const content = await context.$content('join').fetch();
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
  mounted: function () {
    this.hasMounted = true;
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
        try {
          await this.$submitForm(evt);
        } catch (errors) {
          this.errors = errors;
        }
        this.isSubmitting = false;
      }
    }
  }
}
</script>
