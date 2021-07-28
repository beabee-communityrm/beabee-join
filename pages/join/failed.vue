<template>
  <NoticeBox title="Something went wrong">
    <p class="mb-5">
      There was a problem setting up your membership, our team has been
      notified. Please contact support if the problem persists.
    </p> 
    <p>
      <NuxtLink :to="localePath('/join')" class="button is-medium is-primary is-fullwidth">
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
