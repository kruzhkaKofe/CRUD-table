<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="sass">
:root
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif
  font-size: 18px
  line-height: 24px
  font-weight: 400
  font-synthesis: none
  text-rendering: optimizeLegibility
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  -webkit-text-size-adjust: 100%

*
  padding: 0
  margin: 0
  box-sizing: border-box

#app
  width: 100%
  max-width: 1500px
  margin: 0 auto
  padding: 2rem
  text-align: center

#app > .v-application--wrap
  min-height: 100%
</style>
