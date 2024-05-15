
'use strict';

var CalendarList = [];

function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.dragBgColor = null;
}

function addCalendar(calendar) {
    CalendarList.push(calendar);
}

(function(window, Calendar) {

    var cal;
    // var useCreationPopup = true;
    // var useDetailPopup = true;
    // var datePicker, selectedCalendar;

    cal = new Calendar('#calendar', {
        defaultView: 'month',
        // useCreationPopup: useCreationPopup,
        // useDetailPopup: useDetailPopup,
        // calendars: CalendarList,
        // template: {
        //     milestone: function(model) {
        //       console.log("444")
        //         return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
        //     },
        //     allday: function(schedule) {
        //       console.log("555")
        //         return getTimeTemplate(schedule, true);
        //     },
        //     time: function(schedule) {
        //       console.log("666")
        //         return getTimeTemplate(schedule, false);
        //     }
        // }
    });

    // event handlers
    // cal.on({
    //     'clickMore': function(e) {
    //         console.log('clickMore', e);
    //     },
    //     'clickSchedule': function(e) {
    //       console.log("777")
    //         // var topValue;
    //         // var leftValue;
    //         // topValue = (e.event.clientY/2)+45;
    //         // leftValue = e.event.clientX;
    //         // if ( e.schedule.calendarId === '1' ) {
    //         //     console.log('clickSchedule', e.schedule.calendarId);
    //         // 				$("#post").fadeIn();
    //         // $("#offer").fadeOut();
    //         // $("#event").fadeOut();
    //         // $("#create").fadeOut();
    //         //     $(".promo_card").css({
    //         //         top: topValue,
    //         //         left: leftValue
    //         //     })
    //         //     return;
    //         // }
    //         // if ( e.schedule.calendarId === '2' ) {
    //         //     console.log('clickSchedule', e.schedule.calendarId);
    //         // 				$("#event").fadeIn();
    //         // $("#post").fadeOut();
    //         // $("#offer").fadeOut();
    //         // $("#create").fadeOut();
    //         //     $(".promo_card").css({
    //         //         top: topValue,
    //         //         left: leftValue
    //         //     })
    //         //     return;
    //         // }
    //         // if ( e.schedule.calendarId === '3' ) {
    //         //     console.log('clickSchedule', e.schedule.calendarId);
    //         // 				$("#offer").fadeIn();
    //         // $("#post").fadeOut();
    //         // $("#event").fadeOut();
    //         // $("#create").fadeOut();
    //         //     $(".promo_card").css({
    //         //         top: topValue,
    //         //         left: leftValue
    //         //     })
    //         //     return;
    //         // }
    //         // console.log('ada ', e.event.clientX)
    //         // if( e.event.clientX > (window.windth - 200) ) {
    //         // }
    //         // console.log('clickSchedule', e);
    //     },
    //     'clickDayname': function(date) {
    //         console.log('clickDayname', date);
    //     },
    //     'beforeCreateSchedule': function(e) {
    //       console.log("8888")

    //         // $("#create").fadeIn();
									
    //         saveNewSchedule(e);
    //     },
    //     'beforeUpdateSchedule': function(e) {
    //         var schedule = e.schedule;
    //         var changes = e.changes;

    //         console.log('beforeUpdateSchedule', e);

    //         cal.updateSchedule(schedule.id, schedule.calendarId, changes);
    //         refreshScheduleVisibility();
    //     },
    //     'beforeDeleteSchedule': function(e) {
    //         console.log('beforeDeleteSchedule', e);
    //         cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
    //     },
    //     'afterRenderSchedule': function(e) {
    //       console.log("999")
    //         var schedule = e.schedule;
    //         // var element = cal.getElement(schedule.id, schedule.calendarId);
    //         // console.log('afterRenderSchedule', element);
    //     },
    //     'clickTimezonesCollapseBtn': function(timezonesCollapsed) {
    //         console.log('timezonesCollapsed', timezonesCollapsed);

    //         if (timezonesCollapsed) {
    //             cal.setTheme({
    //                 'week.daygridLeft.width': '77px',
    //                 'week.timegridLeft.width': '77px'
    //             });
    //         } else {
    //             cal.setTheme({
    //                 'week.daygridLeft.width': '60px',
    //                 'week.timegridLeft.width': '60px'
    //             });
    //         }

    //         return true;
    //     }
    // });

    // function getTimeTemplate(schedule, isAllDay) {
    //   console.log("1010101")
    //     var html = [];
    //     var start = moment(schedule.start.toUTCString());
    //     if (!isAllDay) {
    //         html.push('<strong>' + start.format('HH:mm') + '</strong> ');
    //     }
    //     if (schedule.isPrivate) {
    //         html.push('<span class="calendar-font-icon ic-lock-b"></span>');
    //         html.push(' Private');
    //     } else {
    //         if (schedule.isReadOnly) {
    //             html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
    //         } else if (schedule.recurrenceRule) {
    //             html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
    //         } else if (schedule.attendees.length) {
    //             html.push('<span class="calendar-font-icon ic-user-b"></span>');
    //         } else if (schedule.location) {
    //             html.push('<span class="calendar-font-icon ic-location-b"></span>');
    //         }
    //         html.push(' ' + schedule.title);
    //     }

    //     return html.join('');
    // }

    function onClickNavi(e) {
      console.log("11 11 11")
        var action = getDataAction(e.target);

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            default:
                return;
        }

        setRenderRangeText();
        // setSchedules();
    }

    // function onNewSchedule() {
    //   console.log("12 12 12")
    //     var title = $('#new-schedule-title').val();
    //     var location = $('#new-schedule-location').val();
    //     var isAllDay = document.getElementById('new-schedule-allday').checked;
    //     var start = datePicker.getStartDate();
    //     var end = datePicker.getEndDate();
    //     var calendar = selectedCalendar ? selectedCalendar : CalendarList[0];

    //     if (!title) {
    //         return;
    //     }

    //     console.log('calendar.id ', calendar.id)
    //     cal.createSchedules([{
    //         id: '1',
    //         calendarId: calendar.id,
    //         title: title,
    //         isAllDay: isAllDay,
    //         start: start,
    //         end: end,
    //         category: isAllDay ? 'allday' : 'time',
    //         dueDateClass: '',
    //         color: calendar.color,
    //         bgColor: calendar.bgColor,
    //         dragBgColor: calendar.bgColor,
    //         borderColor: calendar.borderColor,
    //         raw: {
    //             location: location
    //         },
    //         state: 'Busy'
    //     }]);

    //     $('#modal-new-schedule').modal('hide');
    // }

    // function onChangeNewScheduleCalendar(e) {
    //   console.log("13 13 13")
    //     var target = $(e.target).closest('a[role="menuitem"]')[0];
    //     var calendarId = getDataAction(target);
    //     changeNewScheduleCalendar(calendarId);
    // }

    // function changeNewScheduleCalendar(calendarId) {
    //   console.log("14 14 14")
    //     var calendarNameElement = document.getElementById('calendarName');
    //     var calendar = findCalendar(calendarId);
    //     var html = [];

    //     html.push('<span class="calendar-bar" style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
    //     html.push('<span class="calendar-name">' + calendar.name + '</span>');

    //     calendarNameElement.innerHTML = html.join('');

    //     selectedCalendar = calendar;
    // }

    // function createNewSchedule(event) {
    //   console.log("15 15 15")
    //     var start = event.start ? new Date(event.start.getTime()) : new Date();
    //     var end = event.end ? new Date(event.end.getTime()) : moment().add(1, 'hours').toDate();

    //     if (useCreationPopup) {
    //         cal.openCreationPopup({
    //             start: start,
    //             end: end
    //         });
    //     }
    // }
    function saveNewSchedule(scheduleData) {
        console.log('scheduleData ', scheduleData)
        var calendar = scheduleData.calendar || findCalendar(scheduleData.calendarId);
        var schedule = {
            id: '1',
            title: scheduleData.title,
            // isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: 'allday',
            // category: scheduleData.isAllDay ? 'allday' : 'time',
            // dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            dragBgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            location: scheduleData.location,
            // raw: {
            //     class: scheduleData.raw['class']
            // },
            // state: scheduleData.state
        };
        if (calendar) {
            schedule.calendarId = calendar.id;
            schedule.color = calendar.color;
            schedule.bgColor = calendar.bgColor;
            schedule.borderColor = calendar.borderColor;
        }

        cal.createSchedules([schedule]);

        refreshScheduleVisibility();
    }


    function refreshScheduleVisibility() {
      console.log("16 16 16")
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

        CalendarList.forEach(function(calendar) {
            cal.toggleSchedules(calendar.id, !calendar.checked, false);
        });

        cal.render(true);

        calendarElements.forEach(function(input) {
            var span = input.nextElementSibling;
            span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
        });
    }


    function setRenderRangeText() {
      console.log("17 17 17")
        var renderRange = document.getElementById('renderRange');
        var options = cal.getOptions();
        var viewName = cal.getViewName();
        var html = [];
        if (viewName === 'day') {
            html.push(moment(cal.getDate().getTime()).format('MMM YYYY DD'));
        } else if (viewName === 'month' &&
            (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
            html.push(moment(cal.getDate().getTime()).format('MMM YYYY'));
        } else {
            html.push(moment(cal.getDateRangeStart().getTime()).format('MMM YYYY DD'));
            html.push(' ~ ');
            html.push(moment(cal.getDateRangeEnd().getTime()).format(' MMM DD'));
        }
        renderRange.innerHTML = html.join('');
    }

    // function setSchedules() {
    //   console.log("18 18 18")
    //     cal.clear();
    //     var schedules = [
    //         {id: 489273, title: 'Workout for 2020-04-05', isAllDay: false, start: '2020-03-03T11:30:00+09:00', end: '2020-03-03T12:00:00+09:00', goingDuration: 30, comingDuration: 30, color: '#ffffff', isVisible: true, bgColor: '#69BB2D', dragBgColor: '#69BB2D', borderColor: '#69BB2D', calendarId: '1', category: 'allday', dueDateClass: '', customStyle: 'cursor: default;', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''},
    //         {id: 489273, title: 'Workout for 2020-04-05', isAllDay: false, start: '2020-03-11T11:30:00+09:00', end: '2020-03-11T12:00:00+09:00', goingDuration: 30, comingDuration: 30, color: '#ffffff', isVisible: true, bgColor: '#69BB2D', dragBgColor: '#69BB2D', borderColor: '#69BB2D', calendarId: '2', category: 'allday', dueDateClass: '', customStyle: 'cursor: default;', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''},
    //         {id: 18073, title: 'completed with blocks', isAllDay: false, start: '2020-03-20T09:00:00+09:00', end: '2020-03-20T10:00:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#54B8CC', dragBgColor: '#54B8CC', borderColor: '#54B8CC', calendarId: '1', category: 'allday', dueDateClass: '', customStyle: '', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''},
    //         {id: 18073, title: 'completed with blocks', isAllDay: false, start: '2020-03-25T09:00:00+09:00', end: '2020-03-25T10:00:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#54B8CC', dragBgColor: '#54B8CC', borderColor: '#54B8CC', calendarId: '1', category: 'allday', dueDateClass: '', customStyle: '', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''},
    //         {id: 18073, title: 'completed with blocks', isAllDay: false, start: '2020-01-28T09:00:00+09:00', end: '2020-01-28T10:00:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#54B8CC', dragBgColor: '#54B8CC', borderColor: '#54B8CC', calendarId: '1', category: 'allday', dueDateClass: '', customStyle: '', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''},
    //         {id: 18073, title: 'completed with blocks', isAllDay: false, start: '2020-03-07T09:00:00+09:00', end: '2020-03-07T10:00:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#54B8CC', dragBgColor: '#54B8CC', borderColor: '#54B8CC', calendarId: '1', category: 'allday', dueDateClass: '', customStyle: '', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''},
    //         {id: 18073, title: 'Time Schedule Need BGCOLOR', isAllDay: false, start: '2020-03-28T09:00:00+09:00', end: '2020-03-28T10:00:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#54B8CC', dragBgColor: '#54B8CC', borderColor: '#54B8CC', calendarId: '1', category: 'time', dueDateClass: '', customStyle: '', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''},
    //         {id: 18073, title: 'Time Schedule Need BGCOLOR', isAllDay: false, start: '2020-03-17T09:00:00+09:00', end: '2020-03-17T10:00:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#54B8CC', dragBgColor: '#54B8CC', borderColor: '#54B8CC', calendarId: '3', category: 'time', dueDateClass: '', customStyle: '', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''}
    //     ];
    //     // generateSchedule(cal.getViewName(), cal.getDateRangeStart(), cal.getDateRangeEnd());
    //     cal.createSchedules(schedules);
    //     // cal.createSchedules(schedules);
    //     refreshScheduleVisibility();
    // }

    function setEventListener() {
      console.log("19 19 19")
        $('#menu-navi').on('click', onClickNavi);
        // $('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);
        // $('#lnb-calendars').on('change', onChangeCalendars);

        // $('#btn-save-schedule').on('click', onNewSchedule);
        // $('#btn-new-schedule').on('click', createNewSchedule);

        // $('#dropdownMenu-calendars-list').on('click', onChangeNewScheduleCalendar);

        // window.addEventListener('resize', resizeThrottled);
    }

    function getDataAction(target) {
      console.log("20 20 20")
        return target.dataset ? target.dataset.action : target.getAttribute('data-action');
    }

    // resizeThrottled = tui.util.throttle(function() {
    //   console.log("21 21 21")
    //     cal.render();
    // }, 50);

    window.cal = cal;

    // setDropdownCalendarType();
    setRenderRangeText();
    // setSchedules();
    setEventListener();
})(window, tui.Calendar);

// set calendars
(function() {
    // var calendarList = document.getElementById('calendarList');
    // var html = [];
    // CalendarList.forEach(function(calendar) {
    //     html.push('<div class="lnb-calendars-item"><label>' +
    //         '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" checked>' +
    //         '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + calendar.borderColor + ';"></span>' +
    //         '<span>' + calendar.name + '</span>' +
    //         '</label></div>'
    //     );
    // });
    // calendarList.innerHTML = html.join('\n');
})();
