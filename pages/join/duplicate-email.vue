<template>
  <NoticeBox title="Duplicate email address">
    <p class="mb-5">
      This email address is already registered, you can login to proceed
    </p> 
    <p class="mb-3">
      <a class="button is-medium is-primary is-fullwidth" href="/login">Login</a>
    </p>
    <p class="has-text-centered">
      <NuxtLink to="/join">
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
