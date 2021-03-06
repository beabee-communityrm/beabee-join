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
          <div class="column pt-0" v-for="p in content.periods" :key="p.name">
            <p class="control is-expanded">
              <label>
                <input
                  class="join-period-input"
                  type="radio"
                  name="period"
                  :value="p.name"
                  v-model="period"
                  v-on:change="amount = p.presetAmounts[0]"
                />
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
            :minAmount="minAmount"
            :presetAmounts="presetAmounts"
            :prefix="content.currencySymbol"
            :suffix="$t('form.amountPeriod.' + period)"
            :error="errors.amount"
          />
        </section>
        <!-- /#amount -->

        <section id="account-data" class="block">
          <h5 class="title is-5 mb-1">{{ $t("join.memberAccount") }}</h5>
          <p class="mb-3">
            <small
              >{{ $t("join.memberAlready") }}
              <a href="/login">{{ $t("login") }}</a></small
            >
          </p>
          <fieldset>
            <Input
              name="email"
              type="email"
              :label="$t('form.inputs.email')"
              required
              v-model="email"
              :error="errors.email"
              @blur="checkEmail"
            />
            <Input
              name="password"
              type="password"
              :label="$t('form.inputs.password')"
              required
              v-model="password"
              :error="errors.password"
              @blur="checkPassword"
            >
              <div class="help is-flex is-align-items-baseline">
                <span class="icon mr-1">
                  <i class="fa fa-info-circle"></i>
                </span>
                <span>
                  {{ $t("form.securePassword") }}
                </span>
              </div>
            </Input>
          </fieldset>
        </section>
        <!-- /#account-data -->

        <section
          id="payment"
          class="block"
          v-if="content.showAbsorbFee && period !== 'annually'"
        >
          <h5 class="title is-5 mb-3">{{ $t("join.paymentMethod") }}</h5>
          <p class="mb-4">
            <i18n path="join.absorbFeeText">
              <template #fee>
                <span class="hidden-nojs">{{ $n(fee, "currency") }}</span>
              </template>
            </i18n>
          </p>
          <Checkbox v-model="payFee" name="payFee">
            <i18n path="join.absorbFeeOptIn">
              <template #fee>
                <span class="hidden-nojs">{{ $n(fee, "currency") }}</span>
              </template>
            </i18n>
          </Checkbox>
        </section>
        <!-- /#payment -->
      </template>

      <template #submit>
        <i18n path="join.contribute">
          <template #amount>
            <span class="hidden-nojs">{{
              $n(amount + (payFee ? fee : 0), "currency")
            }}</span>
          </template>
          <template #period>
            <span class="hidden-nojs">{{
              $t("join.contributePeriod." + period)
            }}</span>
          </template>
        </i18n>
      </template>
    </Form>

    <p class="has-text-centered is-size-7 mt-4">
      <i18n path="join.notice">
        <template #privacy>
          <a :href="content.privacyLink">{{ $t("join.privacy") }}</a>
        </template>
      </i18n>
    </p>
  </div>
</template>

<script>
export default {
  layout: "join",
  async asyncData({ $axios, query }) {
    const content = await $axios.$get("/_content/join");
    const period = content.periods.find(
      (p) => p.name === content.initialPeriod
    );
    const amount = Math.max(
      period.minAmount,
      query.amount || content.initialAmount
    );

    return {
      content,
      amount,
      period: period.name,
      payFee: content.showAbsorbFee
    };
  },
  data: function () {
    return {
      email: "",
      password: "",
      errors: {
        amount: null,
        email: null,
        password: null
      }
    };
  },
  watch: {
    amount: function () {
      this.checkAmount();
    }
  },
  computed: {
    fee: function () {
      return this.period === "annually"
        ? 0
        : this.amount
        ? (this.amount + 20) / 100
        : "?";
    },
    presetAmounts: function () {
      const period = this.content.periods.find((p) => p.name === this.period);
      return period && period.presetAmounts;
    },
    minAmount: function () {
      const period = this.content.periods.find((p) => p.name === this.period);
      return period && period.minAmount;
    },
    canSubmit: function () {
      return !!(this.email && this.password && this.amount >= this.minAmount);
    },
    hasErrors: function () {
      return Object.values(this.errors).some((e) => !!e);
    }
  },
  methods: {
    checkAmount() {
      this.errors.amount =
        this.amount >= this.minAmount
          ? null
          : this.$t("form.errors.minimumContribution", {
              amount: this.$n(this.minAmount, "currency"),
              period: this.$t("form.amountPeriod." + this.period)
            });
    },
    checkEmail() {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      this.errors.email = re.test(this.email)
        ? null
        : this.$t("form.errors.invalidEmail");
    },
    checkPassword() {
      const isValid =
        this.password.length >= 8 &&
        /[A-Z]/.test(this.password) &&
        /[a-z]/.test(this.password) &&
        /[0-9]/.test(this.password);
      this.errors.password = isValid
        ? null
        : this.$t("form.errors.passwordRequirementsNotMet");
    },
    checkForm() {
      this.checkAmount();
      this.checkPassword();
      this.checkEmail();
    }
  }
};
</script>
