<style scoped>
  .period-input {
    position: absolute;
    opacity: 0;
  }
</style>

<template>
  <div id="signup" class="form-wrapper">
    <header class="main-header">
      <hgroup>
        <h1>
          <img src="~assets/img/cable-logo.svg" alt="The Cable">
        </h1>
        <h2>Join 2,600 people building a new kind of newspaper </h2>
      </hgroup>
      <p class="highlight">
        All members become co-owners of the Bristol Cable, with exclusive opportunities to have a say while supporting quality journalism and our innovative model.
      </p>
    </header>
    <form method="POST">
      <nav>
        <ul>
          <li>
            <input class="period-input" type="radio" id="period-monthly" name="period" value="monthly" v-model="period">
            <label for="period-monthly" class="button button__text button--small" v-bind:class="{ active: period == 'monthly' }">
              Monthly
            </label>
          </li><li>
            <input class="period-input" type="radio" id="period-annually" name="period" value="annually" v-model="period">
            <label for="period-annually" class="button button__text button--small" type="button" v-bind:class="{ active: period == 'annually' }">
              Annually
            </label>
          </li>
        </ul>
      </nav>
      <section id="amount">
        <p class="set-amount">
            <span class="placeholder-currency">€</span>
            <span class="placeholder-regularity">{{ regularityVerbose }}</span>
            <input class="input" type="number" id="custom-amount" name="custom-amount" v-model="amount"
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
            <button class="button hollow number" type="button" v-on:click="amount = 3">
              £3
            </button>
          </p>
          <p>
            <button class="button hollow number" type="button" v-on:click="amount = 5">
              £5
            </button>
          </p>
          <p>
            <button class="button hollow number" type="button" v-on:click="amount = 10">
              £10
            </button>
          </p>
        </div>
      </section><!-- /#amount -->
      <section id="account-data">
        <header>
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
          <p class="checkbox">
            <input type="checkbox" id="no-account" name="no-account">
            <label for="no-account">I don't want to create a member account.</label>
          </p>
        </fieldset>
      </section><!-- /#account-data -->

      <section id="payment">
        <header>
          <h5>Payment method</h5>
        </header>
        <div>
          <p class="checkbox">
            <input type="checkbox" id="service-fees" name="service-fees">
            <label for="service-fees">Our payment processor charges us per transaction, which means we receive less from monthly contributions. Are you happy to absorb the 23p transaction fee? Alternatively you could pay annually.
            </label>
          </p>
          <p><i class="fa fa-lock" aria-hidden="true"></i> <small>Your payment will be processed securely with GoCardless under the Direct Debit Guarantee scheme.</small>
          </p>
        </div>
      </section><!-- /#payment -->
      <section>
        <p><input class="button button--fullwidth" type="submit" :value="submitText"></p>
        <p class="text-center"><small>By proceeding, you are accepting the <a href="">Terms of Service</a>
          and <a href="">Privacy Policy</a>.</small>
        </p>
      </section>
    </form>
    <footer id="footer">
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
      regularity: 'monthly'
    }
  },
  mounted: function() {
    console.log("mounted!")
  },
  computed: {
    regularityVerbose: function() {
      if (this.regularity == 'monthly') {
        return '/ month'
      } else if (this.regularity == 'yearly') {
        return '/ year'
      } else {
        return ''
      }
    },
    submitText: function() {
      var period;
      if (this.regularity == 'single') {
        period = '';
      } else {
        period = ' ' + this.regularity;
      }
      return 'Contribute €' + this.amount + period + ' via GoCardless'
    }
  },
  methods: {
    submit: function() {
      this.$router.push('/account-setup')
      /*
      axios.post(this.formURL, {
          amount: this.amount,
          regularity: this.regularity
      })
      .then(res => {
        this.$router.push('/account-setup')
      })
      .catch(err => { console.log(err) })
      */
    },
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
  @import '~assets/css/cable-fonts.css';
  @import '~assets/css/cable.css';
</style>
