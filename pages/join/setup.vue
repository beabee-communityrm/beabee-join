<template>
  <div>
    <JoinHeader :title="'Welcome ' + firstname">
      <p>{{ content.welcome }}</p>
    </JoinHeader>
    <p class="block">Please confirm your details</p>
    <Form method="POST" :checkForm="checkForm">
      <section class="block">
        <fieldset>
          <Input name="email" label="Email" v-model="email" required />
          <Input name="firstname" label="First name" v-model="firstname" required />
          <Input name="lastname" label="Last name" v-model="lastname" required />
          <Input name="addressLine1" label="Address line 1" v-model="address.line1" />
          <Input name="addressLine2" label="Address line 2" v-model="address.line2" />
          <div class="columns">
            <div class="column">
              <Input name="city" label="City/town" v-model="address.city" />
            </div>
            <div class="column">
              <Input name="postcode" label="Postcode" v-model="address.postcode" />
            </div>
          </div>
        </fieldset>
      </section>
      <section class="block">
        <p>
          <button
            class="button wrap-text is-fullwidth is-primary"
            :class="{'is-loading': isSubmitting}" :disabled="hasMounted && !canSubmit"
          >
            <span>Contribute <span class="hidden-nojs">{{ submitText }}</span></span>
          </button>
        </p>
      </section>
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
      address: {
        line1: 'blah',
        line2: 'blah2',
        city: 'Bristol',
        postcode: 'BS5'
      },
      content
    }
  },
  methods: {
    async checkForm() {
      return true;
    }
  }
}
</script>
