<style lang="scss">
@import "~bulma/sass/utilities/all";

.join-amount-container {
  @include mobile {
    display: flex;
    flex-direction: column;
  }
}

.join-amount {
  display: flex;
  height: 100%;
  border: 1px solid var(--c-primary);
  border-radius: var(--radius);
  overflow: hidden;
  white-space: nowrap;
  padding-left: 1rem;

  &:focus-within {
    box-shadow: var(--input-focus-box-shadow-size)
      var(--input-focus-box-shadow-color);
  }
}

.join-amount__text {
  font-weight: bold;
  align-self: center;
  color: var(--c-grey);
  margin-bottom: -2.5rem;
}

.join-amount__input {
  display: flex;
  align-items: center;
  flex: 1 1 0;
  padding: 0 0.5rem;
  font-size: 5rem;

  @include mobile {
    &.is-large {
      font-size: 3rem;
    }
  }

  & > input {
    width: 100%;
    border: 0;
    outline: 0;
    color: var(--c-primary);
    font-size: inherit;
    line-height: 6.6rem;
    font-weight: bold;

    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }
  }
}

.join-amount__buttons {
  display: flex;
  flex-direction: column;
  flex: 0 0 2rem;
  color: var(--c-grey);
  margin-left: 1rem;

  border-left: 1px solid var(--c-grey-light);

  & > .button {
    height: 50%;
    border-radius: 0;
    border: 0;
    &:first-child {
      border-bottom: 1px solid var(--c-grey-light);
    }
    &:hover {
      color: var(--c-primary);
    }
  }
}

.join-amount-presets {
  display: flex;

  & > .button {
    border: 1px solid var(--c-primary);
    color: var(--c-primary);
    flex: 1 1 auto;

    &:hover {
      background-color: rgba(var(--c-primary-rgb), 0.1);
    }
    &.is-active {
      background-color: var(--c-primary);
      color: white;
    }
  }

  @include mobile {
    & > .button:not(:first-child) {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    & > .button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  @include tablet {
    flex-direction: column;
    & > .button:not(:first-child) {
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    & > .button:not(:last-child) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>

<template>
  <div class="columns join-amount-container">
    <div class="column is-8">
      <label class="join-amount is-gapless">
        <span class="join-amount__text">{{ prefix }}</span>
        <div class="join-amount__input" :class="{ 'is-large': amount >= 100 }">
          <input
            type="number"
            name="amount"
            v-model.number="amount"
            :min="minAmount"
            step="1"
          />
        </div>
        <span class="join-amount__text hidden-nojs">{{ suffix }}</span>
        <div class="join-amount__buttons hidden-nojs">
          <button
            v-on:click="amount += 1"
            class="button is-outlined"
            type="button"
          >
            ▲
          </button>
          <button
            v-on:click="amount -= 1"
            class="button is-outlined"
            type="button"
            :disabled="amount <= minAmount"
          >
            ▼
          </button>
        </div>
      </label>
    </div>
    <div class="column hidden-nojs">
      <div class="join-amount-presets">
        <button
          class="button"
          type="button"
          v-for="presetAmount in presetAmounts"
          :key="presetAmount"
          v-on:click="amount = presetAmount"
          :class="{ 'is-active': amount === presetAmount }"
        >
          {{ $n(presetAmount, "currency") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prefix", "suffix", "minAmount", "presetAmounts", "value"],
  computed: {
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
