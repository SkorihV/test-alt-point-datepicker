<template lang="pug">
div.dpr.dpr__main-wrapper
  button.dpr__open-btn(@click="toggleDpr") &#8501;
  .dpr-wrapper(ref="dprWrapper" v-show="isOpen" )
    the-dpr-control-panel(:currentDayTimeStamp="currentDayTimeStamp" @changeCurrentDate="changeCurrentDate" )
    the-dpr-table-body(:outer-current-day-time-stamp="currentDayTimeStamp" @change-current-date="changeCurrentDate")
</template>

<script>
import TheDprTableBody from "@/components/TheDprTableBody"
import TheDprControlPanel from "@/components/TheDprControlPanel";
import dateWorker from "@/mixins/dateWorker";

export default {
  name: "TheDprMain",
  mixins: [dateWorker],
  components: {
    TheDprTableBody,
    TheDprControlPanel
  },
  data() {
    return {
      currentDayTimeStamp: this.getToday(),
      isOpen: false
    }
  },
  provide() {
    return {
      mainOptions:  {
        isShowMonth: false, //показывать месяца в ячейках
        isShowYears: false, //показывать годы в ячейках
        isNameMonth: true, //в селекте показывать месяц названием или числом
        weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], // заголовки дней недели
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], // названия месяцев в селекте
      },
    }
  },
  methods: {
    /**
     * выбирать timestamp текущей даты
     * @param newDate
     */
    changeCurrentDate(newDate) {
      this.currentDayTimeStamp = newDate
    },
    /**
     * скрыть / отобразить блок с календарем
     * @param e
     * @returns {null}
     */
    toggleDpr(e) {
      if(!this.$refs.dprWrapper.contains(e.target)) {
        this.isOpen = !this.isOpen
      }
      return null
    }
  },
}
</script>

<style lang="stylus">
.dpr
  &__main-wrapper
    position relative
    display flex
  &-wrapper
    font-size 10px
    display flex
    width auto
    flex-direction: column
    align-items: flex-start
    background-color #e8e5e5
    position absolute
    top calc(100% + 2px)
    padding 10px
    border 1px solid black
    border-radius 5px
  &__open-btn
    cursor pointer
    position relative
    width 40px
    height 40px
</style>
