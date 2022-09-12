<template lang="pug">
input.dpr__input(v-model="dataInput" placeholder="дд.мм.гггг" type="text")
</template>

<script>
import dateWorker from "@/mixins/dateWorker";

export default {
  name: "DprControlPanelInput",
  mixins: [dateWorker],
  emits: ["changeCurrentDay"],
  mounted() {
    /**
     * даем фокус инпуту сразу после отображения элемента
     */
    this.$el.focus()
    this.dataInput = `${this.addLeadingZeroForNumber(this.currentDayData.day)}.${this.addLeadingZeroForNumber(this.currentDayData.month)}.${this.currentDayData.year}`
   },
  props: {
    currentDayData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dataInput: "",
      dateReg: /^((0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[12])\.\d{4})$/  //регулярка для даты
    }
  },
  watch: {
    /**
     * Если полученная дата соответствует регуляке - отправляем timestamp наверх
     */
    dataInput() {
      if(this.dataInput.match(this.dateReg)) {
        const [day, month, year] = this.dataInput.split(".")
        const newCurrentDay = this.getDateInTimeStamp(this.getTimeStampInDate({day, month, year}))
        this.$emit("changeCurrentDay", newCurrentDay)
      }
    },
    /**
     * обновляем содержимое инпута, если текущий день меняется извне ( кликом мыши )
     */
    currentDayData() {
      this.dataInput = `${this.addLeadingZeroForNumber(this.currentDayData.day)}.${this.addLeadingZeroForNumber(this.currentDayData.month)}.${this.currentDayData.year}`
    }
  }
}
</script>

<style scoped lang="stylus">
.dpr
  &__input
    outline none
    border none
    background-color #e8e5e5
    height 100%
    width 150px
</style>
