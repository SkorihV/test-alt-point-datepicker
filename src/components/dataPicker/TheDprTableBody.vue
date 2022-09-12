<template lang="pug">
table.dpr__table
  thead
    tr
      th.dpr__th(v-for="(day, inx) in weekdays" :key="inx") {{day}}
  tbody
    tr(v-for="week in fullDaysForCurrentDataDatePickerInMatrix")
      dpr-td(v-for="day in week" :key="day.stamp" :dayData="day" :currentDate="currentDate"  @changeDay="changeDay")
</template>

<script>
import dateWorker from "@/mixins/dateWorker"
import DprTd from "@/components/dataPicker/DprTd"

export default {
  name: "TheDprTableBody",
  emits: ["changeCurrentDate"],
  mixins: [dateWorker],
  components: {DprTd},
  created() {
    this.updateCurrentDay()
   },
  inject: ["mainOptions"],
  props: {
    outerCurrentDayTimeStamp: {
      type: Number,
    }
  },
  data() {
    return {
      millisecondsInDay: 86400000,
      numberDayInCurrenMonth: [],
      currentDayTimeStamp: null,
      currentDate: {
        day: null,
        month: null,
        year: null,
        numberDay: null,
        stamp: null
      }
    }
  },
  methods: {
    updateCurrentDay() {
      this.currentDayTimeStamp = this.outerCurrentDayTimeStamp
      let currentDayData = this.getDateInTimeStamp(this.currentDayTimeStamp)
      this.currentDate.day = currentDayData.day
      this.currentDate.month = currentDayData.month
      this.currentDate.year = currentDayData.year
      this.currentDate.numberDay = currentDayData.numberDay
      this.currentDate.stamp = currentDayData.stamp
    },
    changeDay(day) {
      this.$emit("changeCurrentDate", day.stamp)
    }
  },
  watch: {
    outerCurrentDayTimeStamp() {
      this.updateCurrentDay()
    }
  },
  computed: {
    /**
     * Список названий дней недели
     * @returns {*}
     */
    weekdays() {
      return this.mainOptions.weekdays
    },
    /**
     *  Получаем timestamp первого дня месяца
     * @returns {number}
     */
    firstDayCurrentMonthTimeStamp() {
      let time = new Date(this.currentDate.year, this.currentDate.month, 1)
      return time.getTime()
    },

    /**
     * Получаем нужный объект даты из первого дня месяца
     * @returns {{month: number, numberDay: number, year: number, day: number}}
     */
    firstDayCurrentMonth() {
      return this.getDateInTimeStamp(this.firstDayCurrentMonthTimeStamp)
    },
    /**
     * Собираем массив данных со всеми днями текущего месяца
     * @returns {[]}
     */
    fullDaysInCurrentMonth() {

      let days = []
      days.push(this.firstDayCurrentMonth)
      let isCurrentMonth = true
      let newDayTimeStamp = null

      while (isCurrentMonth) {
        let currentDay = days[days.length - 1];
        if(currentDay.month !== this.currentDate.month) {
          isCurrentMonth = false
          days.pop()
        } else {
          newDayTimeStamp = this.getTimeStampInDate(currentDay) + this.millisecondsInDay
          days.push(this.getDateInTimeStamp(newDayTimeStamp))
        }
      }
      return days
    },
    /**
     * Добавляем для всех дней месяца дни из соседних месяцев чтобы заполнить всю таблицу от понедельника до воскресенья
     * @returns {[]}
     */
    fullDaysForCurrentDataDatePicker() {
      let dataDays = this.fullDaysInCurrentMonth
      let startArrayIsReady = false
      let finishArrayIsReady = false

      while (!startArrayIsReady || !finishArrayIsReady) {

        if(this.getFirstDayMonth(dataDays)?.numberDay !== 1) {
          let newDayTimeStamp = this.getTimeStampInDate(this.getFirstDayMonth(dataDays)) - this.millisecondsInDay
          dataDays.unshift(this.getDateInTimeStamp(newDayTimeStamp))
        } else {
          startArrayIsReady = true
        }

        if(this.getLastDayMonth(dataDays)?.numberDay !== 7) {
          let newDayTimeStamp = this.getTimeStampInDate(this.getLastDayMonth(dataDays)) + this.millisecondsInDay
          dataDays.push(this.getDateInTimeStamp(newDayTimeStamp))
        } else {
          finishArrayIsReady = true
        }
      }

      return dataDays
    },
    /**
     * Добавляем ведущий 0 для дней и месяцев < 10
     * @returns {[]}
     */
    daysAfterUpdateNumberInMonth() {
      return this.fullDaysForCurrentDataDatePicker.map(day => {
        day.month++
        day.month = this.addLeadingZeroForNumber(day.month)
        day.day = this.addLeadingZeroForNumber(day.day)
        return day
      })
    },
    /**
     * Преобразуем полученный массив в матрицу по неделям
     * @returns {[{}]}
     */
    fullDaysForCurrentDataDatePickerInMatrix() {
      let daysInMatrix = [];
      let daysInArray = this.daysAfterUpdateNumberInMonth
      while (daysInArray.length) {
        daysInMatrix.push(daysInArray.splice(0, 7))
      }
      return daysInMatrix
    },
  }
}
</script>

<style lang="stylus">
.dpr
  &__table
    border-collapse collapse
  &__th
    padding 5px 10px
    border 1px solid black
</style>
