<style scoped>



</style>


<template>
  <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Admin-Bereich</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Admin-Bereich</f7-nav-center>
        </f7-navbar>


        <div class="text">

            <h2>
                Willkommen im internen Admin/Verwaltungs-Bereich der EGM App
            </h2>

            <p>
                Je nach Berechtigungslevel, siehst du im Menü der App unter "App Verwaltung" verschiedene Unterpunkte.
                <br />Klicke auf diese, um den jeweiligen Bereich zu bearbeiten bzw. zu verwalten.
            </p>

        </div>


  </f7-page>
</template>


<script>

export default {
  data: function () {
    return {

    }
  },
  mounted: function () {
  },
  methods: {

  }
}

</script>
