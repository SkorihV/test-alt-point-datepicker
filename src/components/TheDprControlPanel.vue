<template lang="pug">
.dpr__control-wrapper
  button.dpr__prev-month(@click="prev") &laquo;
  the-dpr-control-panel-change-block(:currentDayData="currenDayData")
  button.dpr__today(@click="today") &#10008;
  button.dpr__next-month(@click="next") &raquo;
</template>

<script>
import dateWorker from "@/mixins/dateWorker";
import TheDprControlPanelChangeBlock from "@/components/TheDprControlPanelChangeBlock";

export default {
  name: "TheDprControlPanel",
  emits: ["changeCurrentDate"],
  components: {
    TheDprControlPanelChangeBlock
  },
  mixins: [dateWorker],
  props: {
    currentDayTimeStamp: {
      type: Number
    }
  },
  methods: {
    prev() {
      let date = this.currenDayData
      if ( date.month === 0) {
        date.month = 11
        date.year--
      } else {
        date.month--
      }
      this.$emit("changeCurrentDate", this.getTimeStampInDate(date))
    },
    next() {
      let date = this.currenDayData

      if ( date.month === 11) {
        date.month = 1
        date.year++
      } else {
        date.month++
      }
      this.$emit("changeCurrentDate", this.getTimeStampInDate(date))
    },
    today() {
      this.$emit("changeCurrentDate", this.getToday())
    }
  },
  computed: {
    currenDayData() {
      return this.getDateInTimeStamp(parseInt(this.currentDayTimeStamp))
    }
  }
}
</script>

<style scoped lang="stylus">
.dpr
  &__control-wrapper
    display flex
    align-items center
    justify-content space-between
    width 100%

  &__next-month
  &__prev-month
  &__today
    font-size 16px
    background-color white
    padding 3px 10px
    outline none
    border none
    cursor pointer

</style>
