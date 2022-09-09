<template lang="pug">
.dpr__select-wrapper(:class="outerClasses")
  .dpr__select-chosen(@click="openList") {{isShowName ? selectedValue.label : selectedValue.value}}
  .dpr__select-option-wrapper(v-if="isOpen")
    .dpr__select-option(v-for="item in dataForSelect" @click="changeValue(item.value)" :class="{'selected': item.value == selectedValue.value}") {{isShowName ? item.label : item.value}}
</template>

<script>
import dateWorker from "@/mixins/dateWorker";

export default {
  name: "DprControlPanelSelect",
  mixins: [dateWorker],
  inject: ["mainOptions"],
  emits: ["changeValue"],
  mounted() {
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.closeList()
      }
    })
  },
  props: {
    selectData: {
      type: [Number, Array],
      require: true
    },
    currentSelect: {
      type: Number,
      default: 1,
      require: true
    },
    selectName: {
      type: String,
      require: true
    },
    outerClasses: {
      type: String,
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    /**
     * открыть выпадающий список
     */
    openList() {
      this.isOpen = true
    },
    /**
     * закрыть выпадающий список
     */
    closeList() {
      this.isOpen = false
    },
    /**
     * Отправить выбранное значение
     * @param value
     */
    changeValue(value) {
      let selectName = this.selectName
      this.$emit("changeValue", {selectName, value})
      this.closeList()
    }
  },
  computed: {
    /**
     * преобразует полученные данные в нужный формат
     * [{value, label}] - для месяцев
     * [{value}] - для дней и готов
     * @returns {{value: *}[]|*[]}
     */
    dataForSelect() {
      let dataArr = []

      if (Array.isArray(this.selectData)) {
        return this.selectData.map(item => {return {value: item.toString()}})
      }

      if (this.selectName === "month") {
        for (let i = 1; i <= this.selectData; i++) {
          dataArr.push({
            value: this.addLeadingZeroForNumber(i).toString(),
            label: this.mainOptions.monthNames[i-1]
          })
        }
      } else {
        for (let i = 1; i <= this.selectData; i++) {
          dataArr.push({value: this.addLeadingZeroForNumber(i).toString()})
        }
      }

      return dataArr
    },
    /**
     * Возвращает строку для подцветки выбранного селектора
     * @returns {String | Number}
     */
    selectedValue() {
      return this.dataForSelect.filter(select => select.value === this.addLeadingZeroForNumber(this.currentSelect))[0]
    },
    /**
     * Отобразить названия месяцев или числа
     * @returns {boolean}
     */
    isShowName() {
      return this.mainOptions.isNameMonth && this.selectName === "month"
    },
  }
}
</script>

<style scoped lang="stylus">
.dpr
  &__select
    &-wrapper
      display flex
      position relative
      cursor pointer
      &.border-left
        border-right 1px solid gray
    &-chosen
      padding 4px 10px
      background-color white
      width 100%
    &-option
      padding 3px 10px
      width auto
      background-color white
      &:hover
        background-color gray
        color white
      &.selected
        background-color gray
        color white
      &-wrapper
        z-index 10
        position absolute
        display flex
        flex-direction column
        top 100%
        border-top 1px solid gray
</style>
