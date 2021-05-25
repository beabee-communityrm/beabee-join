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
          <img src="~assets/img/cable-logo.svg" alt="The Cable">
        </h1>
        <h2>Join 2,600 people building a new kind of newspaper </h2>
      </hgroup>
      <p class="highlight">
        All members become co-owners of the Bristol Cable, with exclusive opportunities to have a say while supporting quality journalism and our innovative model.
      </p>
    </header>
    <form method="POST" @submit.prevent="$submitForm">
      <nav class="block">
        <div class="field is-grouped">
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
          <p><small>Are you a member already? <a href="">Log in here</a>.</small></p>
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
        </fieldset>
      </section><!-- /#account-data -->

      <section id="payment" class="block">
        <header class="mb-3">
          <h5>Payment method</h5>
        </header>
        <div>
          <p class="checkbox">
            <input type="checkbox" id="service-fees" name="payFee" value="true" checked>
            <label for="service-fees">
               Our payment processor charges us per transaction, which means we
               receive less from monthly contributions. Are you happy to absorb
               the {{ fee }} transaction fee? Alternatively you could pay
               annually.
            </label>
          </p>
          <p><i class="fa fa-lock" aria-hidden="true"></i> <small>Your payment will be processed securely with GoCardless under the Direct Debit Guarantee scheme.</small>
          </p>
        </div>
      </section><!-- /#payment -->
      <section class="block">
        <p><input class="button is-dark is-fullwidth" type="submit" :value="submitText"></p>
        <p class="text-center"><small>By proceeding, you are accepting the <a href="">Terms of Service</a>
          and <a href="">Privacy Policy</a>.</small>
        </p>
      </section>
    </form>
    <footer id="footer" class="block pb-6 mt-4">
      <p>
        When you join the Cable, you support a new kind of newspaper for Bristol.
      </p>
      <p>
        We are 100% owned by thousands of local people. We produce quality local journalism in print and online, free to access for all.
        <a href="">Read more</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      amount: 20,
      period: 'monthly'
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
  }
}
</script>

<style>
  @import '~assets/css/cable-fonts.css';
  @import '~assets/css/cable.css';
</style>
