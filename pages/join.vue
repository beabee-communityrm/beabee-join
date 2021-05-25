<style scoped>
  .period-input {
    position: absolute;
    opacity: 0;
  }
</style>

<template>
  <div id="signup" class="container is-max-desktop my-4">
    <header class="main-header block pt-6">
      <hgroup class="mb-3">
        <h1>
          <img src="~assets/img/newspaper-logo.svg" alt="The Newspaper">
        </h1>
        <h2>THE NEWSPAPER</h2>
      </hgroup>
      <p class="highlight">
        Join 2,500 people building a new kind of newspaper!
      </p>
    </header>

    <form method="POST" @submit.prevent="$submitForm">
      <nav class="block">
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input class="period-input" type="radio" id="period-single" name="period" value="single" v-model="period">
            <label for="period-single" class="button" v-bind:class="{ active: period == 'single' }">
              One time
            </label>
          </p>
          <p class="control is-expanded">
            <input class="period-input" type="radio" id="period-monthly" name="period" value="monthly" v-model="period">
            <label for="period-monthly" class="button" v-bind:class="{ active: period == 'monthly' }">
              Monthly
            </label>
          </p>
          <p class="control is-expanded">
            <input class="period-input" type="radio" id="period-annually" name="period" value="annually" v-model="period">
            <label for="period-annually" class="button" type="button" v-bind:class="{ active: period == 'annually' }">
              Annually
            </label>
          </p>
        </div>
      </nav>
      <section id="amount" class="block">
        <p class="set-amount">
            <span class="placeholder-currency">€</span>
            <span class="placeholder-regularity">{{ regularityVerbose }}</span>
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
        <div class="other-amounts stacked-button-group">
          <p>
            <button class="button number" type="button" v-on:click="amount = 3">
              £3
            </button>
          </p>
          <p>
            <button class="button number" type="button" v-on:click="amount = 5">
              £5
            </button>
          </p>
          <p>
            <button class="button number" type="button" v-on:click="amount = 10">
              £10
            </button>
          </p>
        </div>
      </section><!-- /#amount -->

      <section id="account-data" class="block">
        <header class="mb-3">
          <h5>Member account</h5>
          <p><small>Are you a member already? <a href="">Log in</a></small></p>
        </header>
        <fieldset>
          <p>
            <label for="email">Email</label>
            <input class="input" type="email" name="email" id="email" required>
          </p>
          <p>
            <label for="pass">Password</label>
            <input class="input" type="password" id="pass" name="password"
             minlength="8" required>
          </p>
          <p class="checkbox">
            <input type="checkbox" id="no-account" name="no-account">
            <label for="no-account">I don't want to create a member account.</label>
          </p>
        </fieldset>
      </section><!-- /#account-data -->

      <section id="payment" class="block">
        <header class="mb-3">
          <h5>Payment method</h5>
        </header>
        <fieldset>
          <div class="card">
            <p class="card-header radio">
              <input type="radio" id="payment-card" name="payment" value="credit-debit-card"
                v-on:click="updateActivePayment()">
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
        <p><input class="button is-dark is-fullwidth" type="submit" :value="submitText"></p>
        <p class="text-center"><small>By proceeding, you are accepting the <a href="">Terms of Service</a>
          and <a href="">Privacy Policy</a>.</small>
        </p>
      </section>
    </form>
    <footer id="footer" class="block pb-6  mt-4">
      <p>
        By becoming a supporting member, you'll be able to cook perfect carbonara, fly at a height of 2 meters and help fix the problems in modern journalism!
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      amount: 20,
      period: 'monthly',
    }
  },
  computed: {
    fee: function () {
      return this.amount ? (this.amount + 20) + 'p' : '?'
    },
    regularityVerbose: function() {
      if (this.period == 'monthly') {
        return '/ month'
      } else if (this.period == 'annually') {
        return '/ year'
      } else {
        return ''
      }
    },
    submitText: function() {
      var period;
      if (this.period == 'single') {
        period = '';
      } else {
        period = ' ' + this.period;
      }
      return 'Contribute €' + this.amount + period + ' via GoCardless'
    }
  },
  methods: {
    updateActivePayment: function() {
      // collapsible cards - payment methods
      var selectedPayments = document.getElementsByName('payment');
      for (var selectedPayment of selectedPayments) {
        if(selectedPayment.checked == true) {
          selectedPayment.parentElement.parentElement.classList.add('active');
        } else {
          selectedPayment.parentElement.parentElement.classList.remove('active');
        }
      }
    }
  }
}
</script>

<style>
  @import '~assets/css/fonts.css';
  @import '~assets/css/main.css';
</style>
