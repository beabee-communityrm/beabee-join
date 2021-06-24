<template>
  <ErrorBox title="Duplicate email address">
    <p class="is-size-5 mb-4">
      This email address is already registered.
    </p> 
    <p>
      <a href="/login" class="button is-primary">Login</a>
      <NuxtLink to="/join" class="button is-primary">Back to join</NuxtLink>
    </p>
  </ErrorBox>
</template>
