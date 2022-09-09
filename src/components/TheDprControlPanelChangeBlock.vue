<template lang="pug">
div.dpr__change-block-wrapper
  dpr-control-panel-select(:select-data="getDaysInMonth(currentDayData.month)" select-name="day" :current-select="currentDayData.day" outer-classes="border-left" @change-value="changeValue")
  dpr-control-panel-select(:select-data="monthOnYear" select-name="month" :current-select="currentDayData.month + 1" outer-classes="border-left" @change-value="changeValue")
  dpr-control-panel-select(:select-data="yearsForSelect" select-name="year" :current-select="currentDayData.year" outer-classes="border-left" @change-value="changeValue")
</template>

<script>
import DprControlPanelSelect from "@/components/DprControlPanelSelect"
import dateWorker from "@/mixins/dateWorker"

export default {
  name: "TheDprControlPanelChangeBlock",
  mixins: [dateWorker],
  emits: ["changeCurrentDay"],
  components: {DprControlPanelSelect},
  props: {
    currentDayData: {
      type: Object
    }
  },
  data() {
    return {
      monthOnYear: 12,
      changeDay: this.currentDayData.day,
      changeMonth: this.currentDayData.month,
      changeYear: this.currentDayData.year,

    }
  },
  methods: {
    /**
     * Инициализирует событие и отправляет объект с новой датой
     * @param data{Object}
     */
    changeValue(data) {
      let newCurrentDayData = this.currentDayData
      let {selectName, value} = data
      newCurrentDayData[selectName] = parseInt(value)
      if (selectName === 'month') {
        newCurrentDayData.month--
      }
      newCurrentDayData = this.getDateInTimeStamp(this.getTimeStampInDate(newCurrentDayData))
      this.$emit("changeCurrentDay", newCurrentDayData)
    }
  },
  computed: {
    /**
     * Собирает список годов в массив +/- 4 года от выбранного
     * @returns {*[]}
     */
    yearsForSelect() {
      let yearsArr = [];
      let startYear = this.currentDayData.year - 4
      for (let i = 0; i < 9; i++) {
        yearsArr.push(startYear)
        startYear++
      }
      return yearsArr
    }
  }
}
</script>

<style scoped lang="stylus">
.dpr
  &__change
    &-block
      &-wrapper
        display flex
        background-color  white
</style>
