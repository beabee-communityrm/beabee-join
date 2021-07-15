<template>
  <div>
    <JoinHeader :title="'Welcome ' + firstname" subtitle="Please confirm your details...">
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
              name="email" type="email" label="Email" required
              v-model="email"
              :blur="checkEmail"
              :error="errors.email"
            />
            <Input
              name="firstname" label="First name" required
              v-model="firstname"
              :blur="checkRequired('firstname', 'First name')"
              :error="errors.firstname"
            />
            <Input
              name="lastname" label="Last name" required
              v-model="lastname"
              :blur="checkRequired('lastname', 'Last name')"
              :error="errors.lastname"
            />
          </fieldset>
        </section>
        <section class="block" v-if="content.showDeliveryAddress">
          <p class="is-size-5 mb-1">Can we send you occasional mail?</p>
          <p class="mb-1 has-text-lighter">{{ content.mail }}</p>
          <Checkbox name="profile[deliveryOptIn]" :checked="deliveryOptIn">
            <b>Yes, you can send me occasional mail</b>
          </Checkbox>
          <fieldset>
            <Input name="profile[deliveryAddress][line1]" label="Address line 1" v-model="deliveryAddress.line1" />
            <Input name="profile[deliveryAddress][line2]" label="Address line 2" v-model="deliveryAddress.line2" />
            <div class="columns">
              <div class="column">
                <Input name="profile[deliveryAddress][city]" label="City/town" v-model="deliveryAddress.city" />
              </div>
              <div class="column">
                <Input name="profile[deliveryAddress][postcode]" label="Postcode" v-model="deliveryAddress.postcode" />
              </div>
            </div>
          </fieldset>
        </section>
        <section class="block">
          <p class="is-size-5 mb-1">Keep up to do with our newsletter</p>
          <p class="mb-1 has-text-lighter">{{ content.newsletter }}</p>
          <Checkbox
            name="profile[newsletterStatus]"
            checkboxValue="subscribed"
            :checked="newsletterStatus === 'subscribed'"
          >
            <b>Yes, I want to receive newsletters</b>
          </Checkbox>
        </section>
      </template>
      <template #submit>
        All good! Continue
      </template>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'join',
  async asyncData({$axios, $content}) {
    const member = await $axios.$get('/_api/member/me');
    const content = await $content('join/setup');

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
