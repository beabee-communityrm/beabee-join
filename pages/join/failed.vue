<template>
  <NoticeBox :title="$t('join.errors.failed.title')">
    <p class="mb-5">
      {{ $t("join.errors.failed.message") }}
    </p>
    <p>
      <NuxtLink
        :to="localePath('/join')"
        class="button is-medium is-primary is-fullwidth"
      >
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
