<style>

</style>

<template>
  <div class="columns join-amount-container">
    <div class="column is-8">
      <label class="join-amount is-gapless">
        <span class="join-amount__text">{{ currency }}</span>
        <div class="join-amount__input" :class="{'is-large': amount >= 100}">
          <input type="number" name="amount" v-model.number="amount" :min="minAmount" step="1">
        </div>
        <span class="join-amount__text hidden-nojs">{{ period }}</span>
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
          :class="{'is-active': amount === presetAmount}"
        >
          {{ currency }}{{ presetAmount }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['currency', 'period', 'minAmount', 'presetAmounts', 'value'],
  computed: {
    amount: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit( 'input', value)
      }
    }
  }
}
</script>
