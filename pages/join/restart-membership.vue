<template>
  <NoticeBox :title="$t('join.errors.restartMembership.title')">
    <p class="mb-3">
      {{ $t("join.errors.restartMembership.message") }}
    </p>
    <p>
      <b>{{ $t("join.errors.confirmEmail.proceed") }}</b>
    </p>
  </NoticeBox>
</template>

<script>
export default {
  layout: "splash"
};
</script>
