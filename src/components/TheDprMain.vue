<template lang="pug">
.dpr.dpr-wrapper
  the-dpr-control-panel(:currentDayTimeStamp="currentDayTimeStamp" @changeCurrentDate="changeCurrentDate" )
  the-dpr-table-body(:outer-current-day-time-stamp="currentDayTimeStamp")
</template>

<script>
import TheDprTableBody from "@/components/TheDprTableBody"
import TheDprControlPanel from "@/components/TheDprControlPanel";

export default {
  name: "TheDprMain",
  components: {
    TheDprTableBody,
    TheDprControlPanel
  },
  created() {
    this.currentDayTimeStamp = Date.now()
  },
  data() {
    return {
      currentDayTimeStamp: null
    }
  },
  methods: {
    changeCurrentDate(newDate) {
      this.currentDayTimeStamp = newDate
    }
  },
}
</script>

<style lang="stylus">
.dpr
  font-size 10px
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 430px;
  background-color #e8e5e5

</style>
