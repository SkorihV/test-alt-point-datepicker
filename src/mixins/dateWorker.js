export default {
  methods: {
    getDateInTimeStamp(stamp) {
      let date = new Date(stamp)
      let day = date.getDate()
      let month = date.getMonth()
      let year = date.getFullYear()
      let numberDay = date.getDay() === 0 ? 7 : date.getDay()
      return {day, month, year, numberDay, stamp}
    },
    getTimeStampInDate(date) {
      let time =  new Date(date.year, date.month, date.day)
      return time.getTime()
    },
    getToday() {
      return this.getTimeStampInDate(this.getDateInTimeStamp(Date.now()))
    },
    /**
     *
     * @param month
     * @param year
     * @returns {number}
     */
    getDaysInMonth(month, year = null) {

      if (year === null) {
        let currentDate = this.getDateInTimeStamp(Date.now())
        year = currentDate.year
      }
      return new Date(year, month + 1, 0 ).getDate() + 1
    }
  }
}
