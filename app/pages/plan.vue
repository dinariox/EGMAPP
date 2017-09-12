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
            </div>
          </div>
          <div v-if="mode === 'morgen'" class="page-content tab">
            <div class="content-block">
              <p v-html="planmorgen"></p>
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
    return {
      planheute: this.$root.data.planheute,
      planmorgen: this.$root.data.planmorgen,
      mode: 'heute'
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

    getPlan: async function (day) {
      try {
        var userId = this.$root.user.uid
        var stufe = await this.$root.db('/users/' + userId + '/stufe').once('value').then(function (snapshot) { return (snapshot.val()) })
        var plan = await this.$root.db('/vertretungsplan/' + day + '/' + stufe).once('value').then(function (snapshot) { return (snapshot.val()) })
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
        window.f7.alert('Ein Fehler ist aufgetreten!', 'Achtung!')
      }
    }

  }

}

</script>
