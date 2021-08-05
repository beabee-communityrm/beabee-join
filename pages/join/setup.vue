<template>
  <div>
    <JoinHeader
      :title="$t('joinSetup.welcome', {firstname})"
      :subtitle="$t('joinSetup.confirmDetails')"
    >
      <p class="is-size-5">{{ content.welcome }}</p>
    </JoinHeader>
    <Form
      method="POST"
      :checkForm="checkForm"
      :canSubmit="canSubmit"
      :hasErrors="hasErrors"
      v-on:errors="errors = $event"
      submitButtonType="is-success"
    >
      <template #inputs>
        <section class="block">
          <fieldset>
            <Input
              name="email" type="email" required
              v-model="email"
              :label="$t('form.inputs.email')"
              :error="errors.email"
              @blur="checkEmail"
            />
            <Input
              name="firstname" required
              v-model="firstname"
              :label="$t('form.inputs.firstName')"
              :error="errors.firstname"
              @blur="checkRequired('firstname', $t('form.inputs.firstName'))"
            />
            <Input
              name="lastname" required
              v-model="lastname"
              :label="$t('form.inputs.lastName')"
              :error="errors.lastname"
              @blur="checkRequired('lastname', $t('form.inputs.lastName'))"
            />
          </fieldset>
        </section>
        <section class="block" v-if="content.showDeliveryAddress">
          <p class="is-size-5 mb-1">Can we send you occasional mail?</p>
          <p class="mb-1 has-text-lighter">{{ content.mail }}</p>
          <Checkbox name="deliveryOptIn" :checked="deliveryOptIn">
            <b>Yes, you can send me occasional mail</b>
          </Checkbox>
          <fieldset>
            <Input
              name="deliveryAddress[line1]"
              :label="$t('form.inputs.address.line1')"
              v-model="deliveryAddress.line1"
            />
            <Input
              name="deliveryAddress[line2]"
              :label="$t('form.inputs.address.line2')"
              v-model="deliveryAddress.line2"
            />
            <div class="columns">
              <div class="column">
                <Input
                  name="deliveryAddress[city]"
                  :label="$t('form.inputs.address.city')"
                  v-model="deliveryAddress.city"
                />
              </div>
              <div class="column">
                <Input
                  name="deliveryAddress[postcode]"
                  :label="$t('form.inputs.address.postcode')"
                  v-model="deliveryAddress.postcode"
                />
              </div>
            </div>
          </fieldset>
        </section>
        <section class="block">
          <p class="is-size-5 mb-1">Keep up to do with our newsletter</p>
          <p class="mb-1 has-text-lighter">{{ content.newsletter }}</p>
          <Checkbox
            name="newsletterStatus"
            checkboxValue="subscribed"
            :checked="newsletterStatus === 'subscribed'"
          >
            <b>Yes, I want to receive newsletters</b>
          </Checkbox>
        </section>
      </template>
      <template #submit>
        {{ $t('joinSetup.continue') }}
      </template>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'join',
  async asyncData({$axios}) {
    const member = await $axios.$get('/_api/member/me');
    const content = await $axios.$get('/_content/join/setup');

    return {
      email: member.email,
      firstname: member.firstname,
      lastname: member.lastname,
      deliveryAddress: member.profile.deliveryAddress || {},
      deliveryOptIn: member.profile.deliveryOptIn,
      newsletterStatus: member.profile.newsletterStatus,
      content
    };
  },
  data: () => ({
    errors: {
      email: null,
      firstname: null,
      lastname: null
    }
  }),
  computed: {
    canSubmit() {
      return !!(this.email && this.firstname && this.lastname);
    },
    hasErrors() {
      return Object.values(this.errors).some(e => !!e);
    }
  },
  methods: {
    checkEmail() {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      this.errors.email = re.test(this.email) ? null : 'Invalid email address';
    },
    checkRequired(name, label) {
      return () => {
        this.errors[name] = this[name] ? null : label + ' is required';
      };
    },
    async checkForm() {
      this.checkEmail();
      this.checkRequired('firstname', 'First name');
      this.checkRequired('lastname', 'Last name');
    }
  }
}
</script>
