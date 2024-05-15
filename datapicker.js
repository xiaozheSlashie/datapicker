const DAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTH_LABELS = [
        "一月", "二月", "三月",
        "四月", "五月", "六月",
        "七月", "八月", "九月",
        "十月", "十一月", "十二月"];
const Calendar = Vue.component('calendar', {
  template: "#calendar",
  data() {
    return {
      minDate:new Date(),
      today: null,
      selectedDate: null,
      currDateCursor: null,
      dayLabels: null,
      state :[
        'Pending',      // 0: 即將成團
        'Confirmed',    // 1: 已成團
        'NotAvailable', // 2: 不可預定
      ],
      year_labels:[]
    };
  },
  created() {
    this.dayLabels = DAY_LABELS.slice();
    this.today = new Date();
    this.selectedDate = this.today;
    this.currDateCursor = this.today;
    let currentYear = this.today.getFullYear();
    this.year_labels = Array.from({ length: 10 }, (_, index) => currentYear + index);
  },
  props: {
    startDate: {
      required: false,
      type: Date,
    }
  },
  computed: {
  
    lastDayOfMonth(){
        return  new Date(this.currDateCursor.getFullYear(), this.currDateCursor.getMonth() + 1, 0);
    },
    lastDay(){
      return this.lastDayOfMonth.getDate();
    },
    currentMonth() {
      return this.currDateCursor.getMonth();
    },
    currentYear() {
      return this.currDateCursor.getFullYear();
    },
    currentMonthLabel() {
      return MONTH_LABELS[this.currentMonth];
    },
    dates() {
      const cursorDate = this.currDateCursor;
      let startDate = dateFns.startOfMonth(cursorDate);
      const daysNeededForLastMonth = dateFns.getDay(startDate);
      startDate = dateFns.subDays(startDate, daysNeededForLastMonth);
      // startDate = dateFns.addDays(startDate, -daysNeededForLastMonth);
      // console.log(this.lastDay)
      
      // always generate 6 full weeks to keep the formatting consistent
      endDate = dateFns.addDays(startDate, this.lastDay+daysNeededForLastMonth-1);
      return dateFns.eachDay(startDate,endDate).map(date => ({
        date,
        isCurrentMonth: dateFns.isSameMonth(cursorDate, date),
        isToday: dateFns.isToday(date),
        isSelected: dateFns.isSameDay(this.selectedDate, date),
        isnotCurrentMonth:  !dateFns.isSameMonth(cursorDate, date),
        isPending : this.isPending(date.getDate()-1),
        isConfirmed : this.isConfirmed(date.getDate()-1),
        isNotAvailable : this.isNotAvailable(date.getDate()-1),
        isbeforecurrentdate : this.isbeforecurrentdate(date),
      }));
    },
  },
  mounted() {
    if (this.startDate) {
      this.currDateCursor = this.startDate;
      this.selectedDate = this.startDate;
    }
  },
  methods: {
    isbeforecurrentdate(i){
        if(i<this.selectedDate){
          return true
        }else{
          return false
        }
    },
    isPending(i){
      // console.log(i)
      if(this.state[i] == 'Pending'){
        return true
      }else{
        return false
      }
    },
    isConfirmed(i){
      if(this.state[i] == 'Confirmed'){
        return true
      }else{
        return false
      }
    },
    isNotAvailable(i){
      if(this.state[i] != 'Confirmed' &&this.state[i] != 'Pending' || this.state[i]=='NotAvailable'){
        return true
      }else{
        return false
      }
    },
    dayClassObj(day) {
      return {
        'today' : day.isToday,
        'current': day.isCurrentMonth,
        'selected': day.isSelected,
        'non_current': !day.isCurrentMonth,
        'Pending' :day.isPending,
        'Confirmed' :day.isConfirmed,
        'NotAvailable': day.isNotAvailable,
        'isbeforecurrentdate': day.isbeforecurrentdate
      };
    },
    nextMonth() {
      this.currDateCursor = dateFns.addMonths(this.currDateCursor, 1);
    },
    previousMonth() {
      let previousMonth = dateFns.addMonths(this.currDateCursor, -1);
      if (dateFns.isBefore(previousMonth, this.minDate)) return;
      this.currDateCursor = previousMonth;
    },
    nextYear() {
      this.currDateCursor = dateFns.addYears(this.currDateCursor, 1);
    },
    previousYear() {
      let previousYear = dateFns.addYears(this.currDateCursor, -1);
      if (dateFns.isBefore(previousYear, this.minDate)) return;
      this.currDateCursor = previousYear;
    },
    setSelectedDate(day) {
      this.selectedDate = day.date;
      this.$emit('input', this.selectedDate);
      // change calendar to correct month if they select previous or next month's days
      if (!day.isCurrentMonth) {
        const selectedMonth = dateFns.getMonth(this.selectedDate);
        this.currDateCursor = dateFns.setMonth(this.currDateCursor, selectedMonth);
      }
    }
  },
  filters: {
    formatDateToDay(val) {
      return dateFns.format(val, 'D');
    }
  },
});

new Vue({
  el: '#app',
  components: {
    Calendar,
  },
  data: {
    curr: new Date(),
  },
  computed: {
    formattedDate() {
      return dateFns.format(this.curr, 'YYYY/MM/DD');
    }
  },
});