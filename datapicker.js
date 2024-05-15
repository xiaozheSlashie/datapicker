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
    console.log(this.year_labels)
  },
  props: {
    startDate: {
      required: false,
      type: Date,
    }
  },
  computed: {
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
      startDate = dateFns.addDays(startDate, -daysNeededForLastMonth);
      
      // always generate 6 full weeks to keep the formatting consistent
      let endDate = dateFns.addDays(startDate, 41);
      
      return dateFns.eachDay(startDate, endDate).map(date => ({
        date,
        isCurrentMonth:  dateFns.isSameMonth(cursorDate, date),
        isToday: dateFns.isToday(date),
        isSelected: dateFns.isSameDay(this.selectedDate, date) 
      
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
    dayClassObj(day) {
      return {
        'today' : day.isToday,
        'current': day.isCurrentMonth,
        'selected': day.isSelected,
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