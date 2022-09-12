<template lang="pug">
main.wrapper
  the-header
  the-dpr-main
  router-view
</template>

<script>
import TheDprMain from "@/components/dataPicker/TheDprMain";
import TheHeader from "@/components/mainTemplates/TheHeader";

export default {
  name: 'App',
  components: {
    TheHeader,
    TheDprMain
  }
}
</script>

<style lang="stylus">
*
  margin: 0
  padding: 0

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center

main
  &.wrapper
    background-color #e3e2e2
    min-height 100vh
    width 980px
    margin 0 auto

</style>
