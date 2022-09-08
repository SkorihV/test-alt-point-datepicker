<template lang="pug">
select.dpr__select(v-if="dataForSelect.length" )
  option.dpr__option(v-for="item in dataForSelect" :selected="item === currentSelect") {{item}}
</template>

<script>
export default {
  name: "DprSelect",
  props: {
    selectData: {
      type: [Number, Array]
    },
    currentSelect: {
      type: Number,
      default: 1
    }
  },
  computed: {
    dataForSelect() {
      if (Array.isArray(this.selectData)) {
        return this.selectData
      }
      let dataArr = [];
      for (let i = 1; i <= this.selectData; i++) {
        dataArr.push(i)
      }
      return dataArr
    }
  }
}
</script>

<style scoped lang="stylus">
.dpr
  &__option
    &:focus
      outline none

</style>
