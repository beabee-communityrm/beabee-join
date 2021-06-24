<template>
  <NoticeBox title="Duplicate email address">
    <p class="mb-5">
      This email address is already registered, you can <a
      href="/login">login</a> to proceeed.
    </p> 
    <p>
      <NuxtLink to="/join" class="button is-medium is-primary is-fullwidth">
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
