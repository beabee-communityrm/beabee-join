<template>
  <NoticeBox title="Duplicate email address">
    <p class="mb-5">
      This email address is already registered, you can login to proceed
    </p> 
    <p class="mb-5">
      <NuxtLink class="button is-medium is-primary is-fullwidth" to="/login">
        Login here
      </NuxtLink>
    </p>
    <p class="has-text-centered">
      <NuxtLink :to="localePath('/join')">
        Back to join page
      </NuxtLink>
    </p>
  </NoticeBox>
</template>

<script>
  export default {
    layout: 'splash'
  };
</script>
