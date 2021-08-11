<template>
  <NoticeBox :title="$t('join.errors.duplicateEmail.title')">
    <p class="mb-5">
      {{ $t("join.errors.duplicateEmail.message") }}
    </p>
    <p class="mb-5">
      <NuxtLink class="button is-medium is-primary is-fullwidth" to="/login">
        {{ $t("login") }}
      </NuxtLink>
    </p>
    <p class="has-text-centered">
      <NuxtLink :to="localePath('/join')">
        {{ $t("join.errors.failed.backToJoin") }}
      </NuxtLink>
    </p>
  </NoticeBox>
</template>

<script>
export default {
  layout: "splash"
};
</script>
