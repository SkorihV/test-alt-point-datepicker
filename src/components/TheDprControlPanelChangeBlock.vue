<template lang="pug">
div.dpr__change-block-wrapper
  dpr-select(:selectData="getDaysInMonth(currentDayData.month)" :currentSelect="currentDayData.day")
  dpr-select(:selectData="monthOnYear" :currentSelect="currentDayData.month + 1")
  dpr-select(:selectData="yearsForSelect" :currentSelect="currentDayData.year")
</template>

<script>
import DprSelect from "@/components/DprSelect"
import dateWorker from "@/mixins/dateWorker"

export default {
  name: "TheDprControlPanelChangeBlock",
  mixins: [dateWorker],
  components: {DprSelect},
  props: {
    currentDayData: {
      type: Object
    }
  },
  data() {
    return {
      monthOnYear: 12
    }
  },
  computed: {
    yearsForSelect() {
      let yearsArr = [];
      let startYear = this.currentDayData.year - 5
      for (let i = 0; i < 10; i++) {
        yearsArr.push(startYear)
        startYear++
      }
      return yearsArr
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
