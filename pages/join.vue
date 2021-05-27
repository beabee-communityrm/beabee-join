<style>
  @import "~assets/css/join.scss";
</style>

<template>
  <div class="columns is-centered">
    <div class="column box px-5 is-7 is-6-desktop has-background-white">
      <header class="block pt-5">
        <div class="join-header mb-4">
          <img src="~assets/img/newspaper-logo.svg" alt="The Newspaper">
          <h1 class="title is-4">Join The Newspaper and it will feel great</h1>
        </div>
        <p class="highlight">
          Join 2,500 people building a new kind of newspaper!
        </p>
      </header>

      <form method="POST" @submit.prevent="$submitForm">
        <nav class="block columns is-variable is-1">
          <div class="column is-4 pt-0">
            <p class="control is-expanded">
              <label class="button is-primary is-outlined is-fullwidth" v-bind:class="{ 'is-focused': period == 'single' }">
                <input class="join-period-input" type="radio" name="period" value="single" v-model="period">
                One time
              </label>
            </p>
          </div>
          <div class="column is-4 pt-0">
            <p class="control is-expanded">
              <label class="button is-primary is-outlined is-fullwidth" v-bind:class="{ 'is-focused': period == 'monthly' }">
                <input class="join-period-input" type="radio" name="period" value="monthly" v-model="period">
                Monthly
              </label>
            </p>
          </div>
          <div class="column is-4 pt-0">
            <p class="control is-expanded">
              <label class="button is-primary is-outlined is-fullwidth" v-bind:class="{ 'is-focused': period == 'annually' }">
                <input class="join-period-input" type="radio" name="period" value="annually" v-model="period">
                Annually
              </label>
            </p>
          </div>
        </nav>
        <section id="amount" class="block">
          <div class="columns">
            <div class="column is-8">
              <p class="set-amount">
                  <span class="placeholder-currency">€</span>
                  <span class="placeholder-regularity">{{ periodVerbose }}</span>
                  <input class="input" type="number" id="custom-amount" name="amount" v-model.number="amount"
                        autofocus min="3" step="1">
                  <!--
                  https://stackoverflow.com/questions/45396280/customizing-increment-arrows-on-input-of-type-number-using-css
                -->
                <span class="amount-controls">
                  <button v-on:click="amount += 1" class="button" type="button">▲</button>
                  <button v-on:click="amount -= 1" class="button" type="button">▼</button>
                </span>
              </p>
            </div>
            <div class="column">
              <div class="field is-stacked">
                <p class="control">
                  <button class="button is-primary is-outlined is-fullwidth" type="button" v-on:click="amount = 3">
                    €3
                  </button>
                </p><p class="control">
                  <button class="button is-primary is-outlined is-fullwidth" type="button" v-on:click="amount = 5">
                    €5
                  </button>
                </p><p class="control">
                  <button class="button is-primary is-outlined is-fullwidth" type="button" v-on:click="amount = 10">
                    €10
                  </button>
                </p>
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
          <h5 class="title is-5">Payment method</h5>
          <fieldset>
            <div class="card">
              <p class="card-header radio">
                <input type="radio" id="payment-card" name="payment" value="credit-debit-card">
                <label for="payment-card">
                  <i class="fa fa-credit-card" aria-hidden="true"></i>
                  Credit/Debit Card
                </label>
              </p>
              <div class="collapsible-card">
                <p><small>You will be taken to GoCardless to confirm your payment details, after
                  which you will be returned here to complete the process.</small>
                </p>
                <p class="checkbox">
                  <input type="checkbox" id="service-fees" name="service-fees">
                  <label for="service-fees"> Agree to pay 2.23€ for processing fees.
                    This is an expense we incur for payment processing, and we would be thankful
                    for your generosity in covering it.
                  </label>
                </p>
              </div>
            </div><!-- /.card -->

            <div class="card">
              <p class="card-header radio">
                <input type="radio" id="payment-debit" name="payment" value="direct-debit"
                  v-on:click="updateActivePayment()">
                <label for="payment-debit">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  Direct debit
                </label>
              </p>
              <div class="collapsible-card">
                <p><small>You will be taken to GoCardless to confirm your payment details, after
                  which you will be returned here to complete the process.</small>
                </p>
                <p class="checkbox">
                  <input type="checkbox" id="service-fees" name="service-fees">
                  <label for="service-fees"> Agree to pay 2.23€ for processing fees.
                    This is an expense we incur for payment processing, and we would be thankful
                    for your generosity in covering it.
                  </label>
                </p>
              </div>
            </div> <!-- /.card -->
            <div class="card">
              <p class="card-header radio">
                <input type="radio" id="payment-paypal" name="payment" value="paypal"
                  v-on:click="updateActivePayment()">
                <label for="payment-paypal">
                  <i class="fa fa-paypal" aria-hidden="true"></i>
                  Paypal
                </label>
              </p>
              <div class="collapsible-card">
                <p class="checkbox">
                  <input type="checkbox" id="service-fees" name="service-fees">
                  <label for="service-fees"> Agree to pay 2.23€ for processing fees.
                    This is an expense we incur for payment processing, and we would be thankful
                    for your generosity in covering it.
                  </label>
                </p>
                <p><i class="fa fa-lock" aria-hidden="true"></i> <small>You will be taken to GoCardless to confirm your payment details, after
                  which you will be returned here to complete the process.</small>
                </p>
              </div>
            </div> <!-- /.card -->
          </fieldset>
        </section><!-- /#payment -->
        <section class="block">
          <p>
            <button class="button wrap-text is-fullwidth is-primary">
              {{ submitText }}
            </button>
          </p>
          <p class="text-center mt-4"><small>By proceeding, you are accepting the <a href="">Terms of Service</a>
            and <a href="">Privacy Policy</a>.</small>
          </p>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'splash',
  data: function() {
    return {
      amount: 20,
      period: 'monthly',
      payFee: true
    }
  },
  computed: {
    fee: function () {
      return this.amount ? (this.amount + 20) + 'p' : '?'
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
