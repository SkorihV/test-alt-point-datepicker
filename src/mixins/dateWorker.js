export default {
  methods: {
    /**
     * получить объект даты из timestamp
     * @param stamp
     * @returns {{month: number, numberDay: (number|number), year: number, stamp, day: number}}
     */
    getDateInTimeStamp(stamp) {
      const date = new Date(stamp)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      const numberDay = date.getDay() === 0 ? 7 : date.getDay()
      return {day, month, year, numberDay, stamp}
    },
    /**
     * Получаем из объекта даты timestamp
     * @param date{year & month & day}
     * @returns {number}
     */
    getTimeStampInDate(date) {
      const time =  new Date(date.year, date.month, date.day)
      return time.getTime()
    },
    /**
     *
     * @returns {number}
     */
    getToday() {
      return this.getTimeStampInDate(this.getDateInTimeStamp(Date.now()))
    },
    /**
     *
     * @param month{number}
     * @param year{number | null}
     * @returns {number}
     */
    getDaysInMonth(month, year = null) {
      if (year === null) {
        let currentDate = this.getDateInTimeStamp(Date.now())
        year = currentDate.year
      }
      return new Date(year, month + 1, 0 ).getDate()
    },
    /**
     * Возвращает строку числа и добавляет первый 0, если оно меньше 10
     * @param num{number}
     * @returns {string}
     */
    addLeadingZeroForNumber(num) {
      return num < 10 ? `0${num}` : num.toString()
    },
    /**
     * Получить первый день месяца
     * @param dataMonth{Array}
     * @returns {*}
     */
    getFirstDayMonth(dataMonth) {
      return dataMonth[0]
    },
    /**
     * Получить последний день месяца
     * @param dataMonth{Array}
     * @returns {*}
     */
    getLastDayMonth(dataMonth) {
      return dataMonth[dataMonth.length - 1]
    },
  }
}
