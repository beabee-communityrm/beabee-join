<template>
  <div id="signup">
    <header id="header">
      <h1>
        <img src="~assets/img/newspaper-logo.svg" alt="The Newspaper">
      </h1>
      <div>
        <h2 class="logo">THE NEWSPAPER</h2>
        <p class="highlight">Join 2,500 people building a new kind of newspaper!</p>
      </div>
    </header>
    <nav>
      <ul>
        <li>
          <button class="text" type="button" v-on:click="regularity = 'single'" v-bind:class="{ active: regularity == 'single' }">
            One time
          </button>
        </li><li>
          <button class="text" type="button" v-on:click="regularity = 'monthly'" v-bind:class="{ active: regularity == 'monthly' }">
            Monthly
          </button>
        </li><li>
          <button class="text" type="button" v-on:click="regularity = 'yearly'" v-bind:class="{ active: regularity == 'yearly' }">
            Annually
          </button>
        </li>
      </ul>
    </nav>

    <form :action="formURL" method="post">
      <section id="amount">
        <p class="set-amount">
            <span class="placeholder-currency">€</span>
            <span class="placeholder-regularity">{{ regularityVerbose }}</span>
            <input class="active input" type="number" id="custom-amount" name="custom-amount" v-model="amount"
                  autofocus min="5" step="1">
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
            <button class="button hollow number" type="button" v-on:click="amount = 5">
              €5
            </button>
          </p>
          <p>
            <button class="button hollow number" type="button" v-on:click="amount = 12">
              €12
            </button>
          </p>
          <p>
            <button class="button hollow number" type="button" v-on:click="amount = 25">
              €25
            </button>
          </p>
        </div>
      </section><!-- /#amount -->
      <section id="account-data">
        <header>
          <h4>Member account</h4>
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
          <h4>Payment method</h4>
        </header>
        <fieldset>
          <div class="card">
            <p class="card-header radio">
              <input type="radio" id="payment-card" name="payment" value="card"
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
              <input type="radio" id="payment-debit" name="payment" value="payment-debit"
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
              <input type="radio" id="payment-paypal" name="payment" value="payment-paypal"
                v-on:click="updateActivePayment()">
              <label for="payment-paypal">
                <i class="fa fa-paypal" aria-hidden="true"></i>
                Paypal
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
        </fieldset>
      </section><!-- /#payment -->
      <div id="submit-form">
        <input class="button" type="submit" :value="submitText">
      </div>
      <p class="text-center"><small>By proceeding, you are accepting the <a href="">Terms of Service</a>
        and <a href="">Privacy Policy</a>.</small>
      </p>
    </form>
    <footer id="footer">
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
      formURL: '/api/send',
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
