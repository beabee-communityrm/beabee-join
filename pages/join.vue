<style lang="scss" src="~/assets/css/join.scss"></style>

<template>
  <div class="join-container box px-5 has-background-white">
    <header class="block">
      <div class="join-header mb-4">
        <img src="~assets/img/newspaper-logo.svg" alt="The Newspaper">
        <h1 class="title is-4">Join The Newspaper and it will feel great</h1>
      </div>
      <p class="is-size-5">
        Join 2,500 people building a new kind of newspaper!
      </p>
    </header>

    <form method="POST" @submit.prevent="$submitForm">
      <nav class="block columns is-variable is-1">
        <div class="column is-4 pt-0">
          <p class="control is-expanded">
            <label class="button is-primary is-outlined is-fullwidth" v-bind:class="{ 'is-focused': period == 'single' }">
              <input class="join-period-input" type="radio" name="period" value="single" v-model="period" v-on:change="amount = presetAmounts[0]">
              One time
            </label>
          </p>
        </div>
        <div class="column is-4 pt-0">
          <p class="control is-expanded">
            <label class="button is-primary is-outlined is-fullwidth" v-bind:class="{ 'is-focused': period == 'monthly' }">
              <input class="join-period-input" type="radio" name="period" value="monthly" v-model="period" v-on:change="amount = presetAmounts[0]">
              Monthly
            </label>
          </p>
        </div>
        <div class="column is-4 pt-0">
          <p class="control is-expanded">
            <label class="button is-primary is-outlined is-fullwidth" v-bind:class="{ 'is-focused': period == 'annually' }">
              <input class="join-period-input" type="radio" name="period" value="annually" v-model="period" v-on:change="amount = presetAmounts[0]">
              Annually
            </label>
          </p>
        </div>
      </nav>

      <section id="amount" class="block">
        <div class="columns">
          <div class="column is-8">
            <label class="join-amount is-gapless">
              <span class="join-amount__text">€</span>
              <div class="join-amount__input">
                <input type="number" name="amount" v-model.number="amount" :min="minAmount" step="1">
              </div>
              <span class="join-amount__text">{{ periodVerbose }}</span>
              <div class="join-amount__buttons">
                <button v-on:click="amount += 1" class="button is-outlined" type="button">▲</button>
                <button v-on:click="amount -= 1" class="button is-outlined" type="button" :disabled="amount <= minAmount">▼</button>
              </div>
            </label>
          </div>
          <div class="column">
            <div class="button-stack">
              <button
                class="button is-primary is-outlined is-fullwidth" type="button"
                v-for="presetAmount in presetAmounts" :key="presetAmount"
                v-on:click="amount = presetAmount"
               >
                €{{ presetAmount }}
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
            <div class="control has-icons-left">
              <input class="input" type="email" name="email" id="email" required>
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control has-icons-left">
              <input class="input" type="password" id="password" name="password" minlength="8" required>
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
            </div>
          </div>
        </fieldset>
      </section><!-- /#account-data -->

      <section id="payment" class="block">
        <h5 class="title is-5 mb-3">Payment method</h5>
        <fieldset>
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
        </fieldset>
      </section><!-- /#payment -->

      <section class="block">
        <p class="mb-4">
          <label class="checkbox">
            <input type="checkbox" name="payFee" checked>
            Our payment processor charges us per transaction, which means we
            receive less from monthly contributions. Are you happy to absorb the
            {{ fee }} transaction fee? Alternatively you could pay annually.
          </label>
        </p>
        <p>
          <i class="fa fa-lock" aria-hidden="true"></i>
          Your payment will be processed securely with GoCardless under the
          Direct Debit Guarantee scheme.
        </p>
      </section>

      <section class="block" v-show="period === 'monthly'">
        <p>
          <button class="button wrap-text is-fullwidth is-primary">
            {{ submitText }}
          </button>
        </p>
        <p class="has-text-centered is-size-7 mt-4">
          By proceeding, you are accepting the <a href="">Terms of Service</a>
          and <a href="">Privacy Policy</a>.
        </p>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'splash',
  data: function() {
    return {
      amount: 20,
      period: 'monthly',
      payment: 'direct-debit'
    }
  },
  computed: {
    fee: function () {
      return this.amount ? (this.amount + 20) + 'p' : '?'
    },
    presetAmounts: function () {
      return this.period === 'monthly' ? [3, 5, 10] : [36, 60, 120];
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
    submitText: function() {
      const period = this.period === 'single' ? '' : ' ' + this.period;
      return 'Contribute €' + this.amount + period + ' via GoCardless'
    }
  }
}
</script>
