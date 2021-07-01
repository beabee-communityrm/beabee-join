<template>
  <div>
    <JoinHeader :title="'Welcome ' + firstname">
      <p class="is-size-5">{{ content.welcome }}</p>
    </JoinHeader>
    <p class="block">Please confirm your details</p>
    <Form
      method="POST"
      :checkForm="checkForm"
      :canSubmit="canSubmit"
      :hasErrors="hasErrors"
      v-on:errors="errors = $event"
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
            <Input name="addressLine1" label="Address line 1" v-model="addressLine1" />
            <Input name="addressLine2" label="Address line 2" v-model="addressLine2" />
            <div class="columns">
              <div class="column">
                <Input name="city" label="City/town" v-model="addressCity" />
              </div>
              <div class="column">
                <Input name="postcode" label="Postcode" v-model="addressPostcode" />
              </div>
            </div>
          </fieldset>
        </section>
      </template>
      <template #submit>
        Save
      </template>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'join',
  async asyncData({$axios, $content}) {
    const member = await $axios.$get('/_api/member/me');
    console.log(member);
    const content = await $content('join');

    return {
      email: member.email,
      firstname: member.firstname,
      lastname: member.lastname,
      addressLine1: 'Line 1',
      addressLine2: 'Line 2',
      addressCity: 'City',
      addressPostcode: 'Postcode',
      content
    };
  },
  data: () => ({
    errors: {
      email: null,
      firstname: null,
      lastname: null,
      addressLine1: null,
      addressLine2: null,
      addressCity: null,
      addressPostcode: null,
    }
  }),
  computed: {
    canSubmit() {
      return this.email && this.firstname && this.lastname;
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
