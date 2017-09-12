<style scoped>

    

</style>


<template>
  <f7-page>

      <!-- iOS Theme Navbar -->
      <f7-navbar v-if="$theme.ios">
        <f7-nav-left>
          <f7-link icon="icon-bars" open-panel="left"></f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Sharens</f7-nav-center>
      </f7-navbar>


      <!-- Material Theme Navbar -->
      <f7-navbar v-if="$theme.material">
        <f7-nav-left>
          <f7-link icon="icon-bars" open-panel="left"></f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Sharens</f7-nav-center>
      </f7-navbar>

      <p class="sub-title">
          SHARENS
      </p>


      <p class="wip"><i class='material-icons m-i'>settings</i><br />WORK IN PROGRESS ...</p>


  </f7-page>
</template>
