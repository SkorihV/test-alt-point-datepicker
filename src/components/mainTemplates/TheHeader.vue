<template lang="pug">
header
  ul.main-menu.menu
    li.main-menu__item
      router-link.main-menu__link(to="/") Главная страница
    li
      router-link.main-menu__link(to="/task-list") Список задач
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped lang="stylus">
header
  padding  0 10px
  border-bottom 1px solid white
  display flex

.main-menu
  width 100%
  display flex
  align-items center
  justify-content flex-start
  list-style none
  margin 10px 0

  &__link
    display flex
    padding 4px 10px
    margin 3px
    border 1px solid #00f
    background-color white
    color black
    text-decoration none
    border-radius 5px

    &:hover
      color white
      background-color #00f
      border-color white
      box-shadow 0 0 2px 2px white

</style>
