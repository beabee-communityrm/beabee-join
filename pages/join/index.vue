<style lang="scss">
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
      <p class="is-size-5">{{ content.subtitle }}</p>
    </JoinHeader>

    <Form
      method="POST"
      :checkForm="checkForm"
      :canSubmit="canSubmit"
      :hasErrors="hasErrors"
      v-on:errors="errors = $event"
    >
      <template #inputs>
        <nav class="block columns is-mobile is-variable is-1">
          <div class="column pt-0" v-for="(p) in content.periods" :key="p.name">
            <p class="control is-expanded">
              <label>
                <input class="join-period-input" type="radio" name="period" :value="p.name" v-model="period" v-on:change="amount = p.presetAmounts[0]">
                <span class="button is-primary is-outlined is-fullwidth">
                  {{ $t(p.name) }}
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
            :period="$t('per_' + period)"
          />
        </section><!-- /#amount -->

        <section id="account-data" class="block">
          <h5 class="title is-5 mb-1">{{ $t('Member account') }}</h5>
          <p class="mb-3"><small>{{ $t('Are you a member already?') }} <a href="/login">{{ $t('Log in') }}</a></small></p>
          <fieldset>
            <Input
              name="email" type="email" :label="$t('Email')" required
              v-model="email"
              :error="errors.email"
              @blur="checkEmail"
            />
            <Input
              name="password" type="password" :label="$t('Password')" required
              v-model="password"
              :error="errors.password"
              @blur="checkPassword"
            >
              <div class="help is-flex is-align-items-baseline">
                <span class="icon mr-1">
                  <i class="fa fa-info-circle"></i>
                </span>
                <span>
                  {{ $t('Set a secure password: 8+ characters and at least one number, one uppercase and one lowercase letter') }}
                </span>
              </div>
            </Input>
          </fieldset>
        </section><!-- /#account-data -->

        <section id="payment" class="block" v-if="content.showAbsorbFee" v-show="period !== 'annually'">
          <h5 class="title is-5 mb-3">{{ $t('Payment method') }}</h5>
          <div v-show="period !== 'annually'">
            <Checkbox v-model="payFee" name="payFee" checked>
              Our payment processor charges us per transaction, which means we
              receive less from monthly contributions. Are you happy to absorb
              the <span class="hidden-nojs">{{ fee }}</span> transaction fee?
              Alternatively you could pay annually.
            </Checkbox>
            <p>
              <i class="fa fa-lock" aria-hidden="true"></i>
              Your payment will be processed securely with GoCardless under the
              Direct Debit Guarantee scheme.
            </p>
          </div>
        </section><!-- /#payment -->
      </template>

      <template #submit>
        <span>{{ $t('Contribute') }} <span class="hidden-nojs">{{ submitText }}</span></span>
      </template>
    </Form>

    <p class="has-text-centered is-size-7 mt-4">
      {{ $t('By proceeding, you are accepting the') }}
      <a :href="content.termsLink">{{ $t('Terms of Service') }}</a>
      {{ $t('and') }}
      <a :href="content.privacyLink">{{ $t('Privacy Policy') }}</a>.
    </p>
  </div>
</template>

<script>
export default {
  layout: 'join',
  async asyncData({$axios, query}) {
    const content = await $axios.$get('/_content/join');
    const period = content.periods.find(p => p.name === content.initialPeriod);
    const amount = Math.max(period.minAmount, query.amount || content.initialAmount);

    return {
      content,
      amount,
      period: period.name
    };
  },
  data: function() {
    return {
      email: '',
      password: '',
      payFee: true,
      errors: {
        email: null,
        password: null
      }
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
      const period = this.content.periods.find(p => p.name === this.period);
      return period && period.minAmount;
    },
    submitText: function() {
      const period = this.period === 'single' ? '' : ' ' + this.$t(this.period);
      return `${this.content.currency}${this.amount}${period}`;
    },
    canSubmit: function () {
      return !!(this.email && this.password);
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
    checkForm() {
      this.checkPassword();
      this.checkEmail();
    }
  }
}
</script>
