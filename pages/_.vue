<template>
</template>

<script>
// This page is necessary while the Nuxt app only handles some routes,
// the rest are proxied to the old frontend by nginx
export default {
  // Server side: don't handle routes that are in the app, they should use
  // Nuxt's 404 pages
  // NOTE: Must match regex in nginx
  validate({req}) {
    return !(process.server && /^\/((en|de)\/)?join/.test(req.url));
  },
  created() {
    // Client side: force server fetch for unknown routes as they might exist in
    // the old frontend
    window.location.href = window.location.href;
  }
}
</script>
