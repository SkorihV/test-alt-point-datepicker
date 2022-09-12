<template lang="pug">
td.dpr__td(
  :class="{'isToday': isToday,'isChangeDay': isChangeDay, 'isNextMonth': isNextMonthDay}"
  @click="$emit('changeDay', dayData)"
  ) {{dayData.day}}
  template(v-if="mainOptions.isShowMonth" ) .{{dayData.month}}
  template(v-if="mainOptions.isShowYears" ) .{{dayData.year}}
</template>

<script>
import dateWorker from "@/mixins/dateWorker";

export default {
  name: "DprTd",
  emits: ["changeDay"],
  mixins: [dateWorker],
  inject: ["mainOptions"],
  props: {
    dayData: {
      type: Object,
      require: true
    },
    currentDate: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      today: this.getToday()
    }
  },
  computed: {
    /**
     * выбранный день
     * @returns {boolean}
     */
    isChangeDay() {
      return  this.dayData.stamp === this.currentDate.stamp
    },
    /**
     *
     * @returns {boolean}
     */
    isToday() {
      return this.dayData.stamp === this.today
    },
    /**
     * День не текущего месяца
     * @returns {boolean}
     */
    isNextMonthDay() {
      return parseInt(this.dayData.month) !== this.currentDate.month + 1
    }
  }
}
</script>

<style scoped lang="stylus">
.dpr
  &__td
    padding 5px
    border 1px solid black
    min-height  10px
    cursor pointer
    &.isNextMonth
      opacity 0.5
    &.isChangeDay
      background-color blue
      color white
    &.isToday
      background-color green
      color white
    &:hover:not(.isToday):not(.isChangeDay)
      background-color antiquewhite
      color black
</style>
