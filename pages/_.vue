<script>
export default {
  beforeCreate() {
    // Force browser to handle unknown routes rather than client side router
    // This is necessary while the app is part Nuxt and part old app and
    // therefore some routes don't exist in Nuxt but do on the old app
    window.location.href = window.location.href;
  }
}
</script>
