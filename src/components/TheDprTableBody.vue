<template lang="pug">
table.dpr__table
  thead
    tr
      th.dpr__th(v-for="(day, inx) in weekdays" :key="inx") {{day}}
  tbody
    tr(v-for="week in fullDaysForCurrentDataDatePickerInMatrix" )
      td.dpr__td(v-for="day in week" :class="{'isToday': day.stamp === today}") {{day.day}}.{{day.month}}.{{day.year}}
</template>

<script>
import dateWorker from "@/mixins/dateWorker";

export default {
  name: "TheDprTableBody",
  mixins: [dateWorker],
  created() {
    this.updateCurrentDay()
  },
  props: {
    outerCurrentDayTimeStamp: {
      type: Number,
    }
  },
  data() {
    return {
      millisecondsInDay: 86400000,
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      numberDayInCurrenMonth: [],
      currentDayTimeStamp: null,
      today: this.getToday(),
      currentDate: {
        day: null,
        month: null,
        year: null,
        numberDay: null
      }
    }
  },
  methods: {
    getFirstDayMonth(dataMonth) {
      return dataMonth[0]
    },
    getLastDayMonth(dataMonth) {
      return dataMonth[dataMonth.length - 1]
    },
    updateCurrentDay() {
      this.currentDayTimeStamp = parseInt(this.outerCurrentDayTimeStamp)
      this.currentDate.day = this.getDateInTimeStamp(this.currentDayTimeStamp).day
      this.currentDate.month = this.getDateInTimeStamp(this.currentDayTimeStamp).month
      this.currentDate.year = this.getDateInTimeStamp(this.currentDayTimeStamp).year
    }
  },
  watch: {
    outerCurrentDayTimeStamp() {
      this.updateCurrentDay()
    }
  },
  computed: {
    /**
     *
     * @returns {number}
     */
    firstDayCurrentMonthTimeStamp() {
      let time = new Date(this.currentDate.year, this.currentDate.month, 1)
      return time.getTime()
    },

    /**
     *
     * @returns {{month: number, numberDay: number, year: number, day: number}}
     */
    firstDayCurrentMonth() {
      return this.getDateInTimeStamp(this.firstDayCurrentMonthTimeStamp)
    },
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
     * @returns {*[]}
     */
    daysAfterUpdateNumberInMonth() {
      return this.fullDaysForCurrentDataDatePicker.map(day => {
        day.month++
        if (day.month < 10 ) {
          day.month = `0${day.month}`
        }
        if (day.day < 10 ) {
          day.day = `0${day.day}`
        }
        return day
      })
    },
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
    width 100%
  &__th
    padding 5px 10px
    border 1px solid black
  &__td
    padding 5px
    border 1px solid black
    height 30px
    cursor pointer
    &.isToday
      background-color rgba(100, 149, 237, 0.47)
    &:hover:not(.isToday)
      background-color antiquewhite

</style>
