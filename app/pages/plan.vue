
<style scoped>

    #planinfo {



    }

    hr {

        margin: 0;

    }

    .m-i {

        position: relative;
        bottom: -7px;

        padding-right: 4px;

        color: #880000;

    }

</style>


<template>

      <div data-page="plan" class="page toolbar-fixed kitchen-sink-material">

          <!-- iOS Theme Navbar -->
          <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
              <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Vertretungsplan</f7-nav-center>
          </f7-navbar>


          <!-- Material Theme Navbar -->
          <f7-navbar v-if="$theme.material">
            <f7-nav-left>
              <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Vertretungsplan</f7-nav-center>
          </f7-navbar>


       <div class="toolbar tabbar">
         <div class="toolbar-inner"><a href="#tab1" class="tab-link active" @click="mode='heute'">Heute</a><a href="#tab2" class="tab-link" @click="mode='morgen'">Morgen</a></div>
       </div>

              <div v-if="mode === 'heute'" class="page-content tab active">
                <div class="content-block">
                  <p v-html="planheute"></p>
                  <hr />
                  <div id="planinfo">

                      <p class="sub-title" style="padding: 0; margin-top: 12px;" v-bind:style="{ fontSize: bigtextSize }">
                          <i class='material-icons m-i'>info_outline</i> Informationen zum Vertretungsplan
                      </p>

                      <p v-bind:style="{ fontSize: bigtextSize }">
                          Im Vertretungsplan-Menü werden Dir Deine Vertretungs- und Freistunden angezeigt. <br />
                          Der Vertretungsplan in der App ist eine Kopie des festen Vertretungsplans in der Schule. Sobald der Plan dort aktualisiert wird, erscheinen die neuen Infos auch auf Deinem Handy.
                          <br /><br />
                          Bitte beachte, dass bei schlechter Internet-Verbindung der Plan nur langsam aktualisiert wird. Es können dann ältere Pläne angezeigt werden. (Achte auf das Datum)
                          <br /><br />
                          Wir übernehmen keine Verantwortung für die Vollständigkeit des Vertretungsplans!
                      </p>

                  </div>
                  <hr />
                </div>
              </div>
              <div v-if="mode === 'morgen'" class="page-content tab">
                <div class="content-block">
                  <p v-html="planmorgen"></p>
                  <hr />
                  <div id="planinfo">

                      <p class="sub-title" style="padding: 0; margin-top: 12px;" v-bind:style="{ fontSize: bigtextSize }">
                          <i class='material-icons m-i'>info_outline</i> Informationen zum Vertretungsplan
                      </p>

                      <p v-bind:style="{ fontSize: bigtextSize }">
                          Im Vertretungsplan-Menü werden Dir Deine Vertretungs- und Freistunden angezeigt. <br />
                          Der Vertretungsplan in der App ist eine Kopie des festen Vertretungsplans in der Schule. Sobald der Plan dort aktualisiert wird, erscheinen die neuen Infos auch auf Deinem Handy.
                          <br /><br />
                          Bitte beachte, dass bei schlechter Internet-Verbindung der Plan nur langsam aktualisiert wird. Es können dann ältere Pläne angezeigt werden. (Achte auf das Datum)
                          <br /><br />
                          Wir übernehmen keine Verantwortung für die Vollständigkeit des Vertretungsplans!
                      </p>

                  </div>
                  <hr />
                </div>
              </div>

              <f7-tabs>
                <f7-tab id="tab1" active></f7-tab>
                <f7-tab id="tab2"></f7-tab>
              </f7-tabs>

     </div>




</template>


<script>
export default {
  data () {
    var bigtextSize = ''
    this.checkTextSize()
    return {
      planheute: this.$root.data.planheute,
      planmorgen: this.$root.data.planmorgen,
      mode: 'heute',
      bigtextSize: bigtextSize
    }
  },

  mounted: function () {
    if (navigator.onLine === true) {
      this.getPlan('heute')
      this.getPlan('morgen')
    } else {
      window.f7.addNotification({
        title: 'ACHTUNG!',
        message: 'Du bist offline und der Vertretungsplan ist evtl. nicht aktuell',
        hold: 10000,
        closeIcon: false
      })
    }
  },

  methods: {

    checkTextSize: function () {
      var self = this

      this.$root.db('settings/' + this.$root.user.uid).once('value').then(function (snapshot) {
        var settings = snapshot.val()

        if (settings.bigtext === 'true') {
          self.bigtextSize = '14pt'
        } else {
          self.bigtextSize = ''
        }
      })
    },

    getPlan: async function (day) {
      try {
        var userId = this.$root.user.uid
        var stufe = await this.$root.db('/users/' + userId + '/stufe').once('value').then(function (snapshot) { return (snapshot.val()) })
        var plan = '<h1 style="color: #25a69a;"><b>STUFE ' + stufe + '</b></h1>'
        plan += await this.$root.db('/vertretungsplan/' + day + '/' + stufe).once('value').then(function (snapshot) { return (snapshot.val()) })

        // Zur Sicherheit als String und als Integer abfragen
        if (stufe === '13' || stufe === 13) {
          console.log('Stufe 13 (Lehrer)')

          plan = ''

          for (var i = 5; i <= 12; i++) {
            if (i !== 5) { plan += '<br />' }
            plan += '<h1 style="color: #25a69a;"><b>STUFE ' + i + '</b></h1>'
            plan += await this.$root.db('/vertretungsplan/' + day + '/' + i).once('value').then(function (snapshot) { return (snapshot.val()) })
          }
        }

        this.$root.saveData('plan' + day, plan)

        switch (day) {
          case 'heute':
            this.planheute = plan
            break
          case 'morgen':
            this.planmorgen = plan
            break
        }

        return
      } catch (err) {
        window.f7.alert('Ein Fehler ist aufgetreten!' + err, 'Fehler')
      }
    }

  }

}

</script>
