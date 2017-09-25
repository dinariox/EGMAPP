<style scoped>


    .calendar {

        width: 490px;

        background-color: #ccc;

        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

    }

    .calendar table {

        border-spacing: 0;

    }

    .calendar tr {

        font-size: 15pt;
        text-transform: uppercase;

    }

    .calendar tr td {

        width: 70px;
        height: 70px;

        text-align: center;

    }

    .daysofweek {

        background-color: #3f51b5;

    }

    .dayofweek {

        color: white;

    }

    .lastmonth, .nextmonth {

        color: #999;

    }

    .event {

        background-image: url('../images/circle_event.png');
        background-repeat: no-repeat;
        background-position: center;
        color: #3f51b5;
        font-weight: 600;

        border-radius: 50%;

        transition: 0.3s;

    }

    .event:hover {

        cursor: pointer;
        background-color: #3f51b5;
        color: white;

        transition: 0.3s;

    }

    .event:left {



    }

    .today {

        color: #900;
        font-weight: 600;
        background-image: url('../images/circle_today.png');
        background-repeat: no-repeat;
        background-position: center;

    }

    h2 {

        text-align: center;

    }

    .detail_content {

        padding: 0 16px;
        font-size: 14pt;

    }

</style>


<template>
    <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Schulkalender</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Schulkalender</f7-nav-center>
        </f7-navbar>


        <p class="sub-title">
            Der aktuelle Schulkalender (2017/18)
        </p>

        <!-- <div class="calendar" v-html="calendarHTML"> -->
        <div class="calendar">

            <h2>September 2017</h2>

            <table>
                <tr class="daysofweek">
                    <td class="dayofweek">Mo</td>
                    <td class="dayofweek">Di</td>
                    <td class="dayofweek">Mi</td>
                    <td class="dayofweek">Do</td>
                    <td class="dayofweek">Fr</td>
                    <td class="dayofweek">Sa</td>
                    <td class="dayofweek">So</td>
                </tr>
                <tr>
                    <td id="day_240" class="lastmonth">28</td>
                    <td id="day_241" class="lastmonth">29</td>
                    <td id="day_242" class="lastmonth">30</td>
                    <td id="day_243" class="lastmonth">31</td>
                    <td id="day_244">1</td>
                    <td id="day_245">2</td>
                    <td id="day_246" class="event" onclick="showDetails(2017, 246)">3</td>
                </tr>
                <tr>
                    <td id="day_247">4</td>
                    <td id="day_248">5</td>
                    <td id="day_249" class="event" onclick="showDetails(2017, 249)">6</td>
                    <td id="day_250">7</td>
                    <td id="day_251">8</td>
                    <td id="day_252">9</td>
                    <td id="day_253">10</td>
                </tr>
                <tr>
                    <td id="day_254">11</td>
                    <td id="day_255">12</td>
                    <td id="day_256">13</td>
                    <td id="day_257">14</td>
                    <td id="day_258">15</td>
                    <td id="day_259">16</td>
                    <td id="day_260">17</td>
                </tr>
                <tr>
                    <td id="day_261">18</td>
                    <td id="day_262">19</td>
                    <td id="day_263">20</td>
                    <td id="day_264">21</td>
                    <td id="day_265">22</td>
                    <td id="day_266">23</td>
                    <td id="day_267">24</td>
                </tr>
                <tr>
                    <td id="day_268">25</td>
                    <td id="day_269">26</td>
                    <td id="day_270">27</td>
                    <td id="day_271">28</td>
                    <td id="day_272">29</td>
                    <td id="day_273">30</td>
                    <td id="day_274" class="nextmonth">1</td>
                </tr>
                <tr>
                    <td id="day_275" class="nextmonth">2</td>
                    <td id="day_276" class="nextmonth">3</td>
                    <td id="day_277" class="nextmonth">4</td>
                    <td id="day_278" class="nextmonth">5</td>
                    <td id="day_279" class="nextmonth">6</td>
                    <td id="day_280" class="nextmonth">7</td>
                    <td id="day_281" class="nextmonth">8</td>
                </tr>
            </table>

            <div class="details_overlay">
                <h2 class="detail_title">Event Details</h2>
                <p class="detail_content">Beispiel Detail 1</p>
            </div>


        </div>



        <button @click="loadPreviousMonthsCalendar()">Vorheriger Monat</button>
        <button @click="loadNextMonthsCalendar()">Nächster Monat</button>


    </f7-page>
</template>


<script>

export default {
  data: function () {
    var calendarHTML = ''
    var displayedMonth = ''
    var displayedYear = ''

    // this.loadCurrentMonthsCalendar()

    return {

      calendarHTML: calendarHTML,
      displayedMonth: displayedMonth,
      displayedYear: displayedYear

    }
  },
  mounted: function () {

  },

  methods: {

    loadCurrentMonthsCalendar: function () {
      var monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

      var currentDate = new Date()
      var currentMonth = monthList[currentDate.getMonth()]
      var currentYear = currentDate.getFullYear()

      this.getCalendarMonth(currentYear, currentMonth)
    },

    loadNextMonthsCalendar: function () {
      if (this.displayedMonth === '' || this.displayedMonth === null || this.displayedMonth === undefined) {
        return window.f7.alert('Der aktuelle Monat wurde nicht erkannt', 'Fehler')
      }

      var monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
      var index = monthList.indexOf(this.displayedMonth)

      if (index === 11) {
        this.getCalendarMonth(this.displayedYear + 1, monthList[0])
      } else {
        this.getCalendarMonth(this.displayedYear, monthList[index + 1])
      }
    },

    loadPreviousMonthsCalendar: function () {
      if (this.displayedMonth === '' || this.displayedMonth === null || this.displayedMonth === undefined) {
        return window.f7.alert('Der aktuelle Monat wurde nicht erkannt', 'Fehler')
      }

      var monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
      var index = monthList.indexOf(this.displayedMonth)

      if (index === 0) {
        this.getCalendarMonth(this.displayedYear - 1, monthList[11])
      } else {
        this.getCalendarMonth(this.displayedYear, monthList[index - 1])
      }
    },

    getCalendarMonth: function (year, month) {
      console.log('Getting calendar for ' + year + ' ' + month)

      var validMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

      if (!validMonths.includes(month)) {
        return window.f7.alert('Es wurde versucht einen invaliden Monat zu laden', 'Kalender konnte nicht geladen werden')
      }

      var self = this

      this.$root.db('calendar/months/' + year + '/' + month).once('value').then(function (snapshot) {
        if (snapshot.val() === '' || snapshot.val() === null || snapshot.val() === undefined) {
          return window.f7.alert('Du kannst nicht weiter vor/zurück', 'Fehlender Kalender')
        }

        self.calendarHTML = snapshot.val()

        self.displayedMonth = month
        self.displayedYear = year
      }).catch(function (err) {
        return window.f7.alert(err, 'Kalender konnte nicht geladen werden')
      })
    },

    loadCalendarEntries: function () {

    },

    loadEvent: function (year, day, readableDate) {
      this.$root.db('calendar/events/' + year + '/' + day).once('value').then(function (snapshot) {
        if (snapshot.val() === '' || snapshot.val() === null || snapshot.val() === undefined) {
          window.f7.alert('Kein Event an diesem Tag gefunden')
        } else {
          var myApp = window.f7
          var popupHTML = `<div class="popup">

                            <div class="popup-inner">

                                <div class='popup-top'>

                                    <p class='popup-title'>

                                        Events am ` + readableDate + `

                                    </p>

                                    <p><a href="#" class="popup-close close-popup"><i class="material-icons">close</i></a></p>

                                </div>

                                <p class='popup-text'>

                                    <ul>


                    `

          var i = 1
          while (i <= snapshot.val().length - 1) {
            popupHTML += '<li><b>' + snapshot.val()[i] + '</b></li>'
            i++
          }

          popupHTML += `</ul></p>

                                  </div>

                                </div>

                              `

          myApp.popup(popupHTML)
        }
      }).catch(function (err) {
        return window.f7.alert(err, 'Kalender konnte nicht geladen werden')
      })
    }

  }
}

</script>
