<template lang="pug">
.dpr__control-wrapper
  button.dpr__prev-month(@click="prev") &#10094;
  the-dpr-control-panel-change-block(v-if="isDropdownInput" :current-day-data="currenDayData" @change-current-day="changeCurrentDay")
  dpr-control-panel-input(v-else :current-day-data="currenDayData" @change-current-day="changeCurrentDay")
  button.dpr__today(@click="toggleInputPanel") &#10150;
  button.dpr__today(@click="today") &#10008;
  button.dpr__next-month(@click="next") &#10095;
</template>

<script>
import dateWorker from "@/mixins/dateWorker"
import TheDprControlPanelChangeBlock from "@/components/dataPicker/TheDprControlPanelChangeBlock"
import DprControlPanelInput from "@/components/dataPicker/DprControlPanelInput"

export default {
  name: "TheDprControlPanel",
  emits: ["changeCurrentDate"],
  components: {
    DprControlPanelInput,
    TheDprControlPanelChangeBlock
  },
  mixins: [dateWorker],
  props: {
    currentDayTimeStamp: {
      type: Number
    }
  },
  data() {
    return {
      isDropdownInput: true
    }
  },
  methods: {
    /**
     * Предыдущий месяц
     */
    prev() {
      let date = this.currenDayData
      if ( date.month === 1) {
        date.month = 12
        date.year--
      } else {
        date.month--
      }
      this.changeCurrentDate(this.getTimeStampInDate(date))
    },
    /**
     * Следующий месяц
     */
    next() {
      let date = this.currenDayData

      if ( date.month === 12) {
        date.month = 1
        date.year++
      } else {
        date.month++
      }
      this.changeCurrentDate(this.getTimeStampInDate(date))
    },
    /**
     * Сбросить дату на сегодняшний день
     */
    today() {
      this.changeCurrentDate(this.getToday())
    },
    /**
     * Выбор даты кликом мыши
     * @param newDayData
     */
    changeCurrentDay(newDayData) {
      this.changeCurrentDate(newDayData.stamp)
    },
    /**
     * Отправка события с выбранной датой
     * @param stamp{Number}
     */
    changeCurrentDate(stamp) {
      this.$emit("changeCurrentDate", stamp)
    },
    /**
     * Переключить тип панели выбора даты
     */
    toggleInputPanel() {
      this.isDropdownInput = !this.isDropdownInput
    }
  },
  computed: {
    /**
     * Возвращает текущую выбранную дату
     * @returns {{month: number, numberDay: number, year: number, stamp, day: number}}
     */
    currenDayData() {
      return this.getDateInTimeStamp(this.currentDayTimeStamp)
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
    height 20px
    background-color white
    border-left 1px solid black
    border-right 1px solid black
    box-sizing border-box
  &__next-month
  &__prev-month
  &__today
    font-size 12px
    background-color white
    padding 3px 5px
    outline none
    border none
    cursor pointer
    flex: 1 1 auto;
  &__prev-month
  &__today
    border-right 1px solid black
</style>
