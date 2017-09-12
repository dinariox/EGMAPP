<style>

    /* Material Icons im Menü */
    .m-i {

        position: relative;
        bottom: -5px;

        color: #ddd;

    }

    .popup-top {

        display: flex;

    }

    .popup-title {

        width: 100%;
        font-size: 18pt;
        font-weight: 500;
        line-height: normal;

        margin-top: 10px;
        margin-bottom: 10px;

    }

    .popup-text {

        width: 100%;
        font-size: 12pt;
        font-weight: 400;

        margin: 0;
        padding-bottom: 20px;

    }

    .popup-inner {

        padding: 8px 16px;

    }

    .popup-close {

        padding: 16px;

    }

    .popup-image {

        max-width: 100%;
        max-height: 550px;

        margin-top: 16px;
        margin-bottom: 16px;

    }

    .sub-title {

        padding: 0 16px;
        color: #25a69a;
        font-size: 11.5pt;

        margin-top: 20px;
        margin-bottom: 10px;

    }

    .wip {

        padding: 0 16px;
        color: #ff7714;
        font-size: 20pt;

        margin-top: 20px;
        margin-bottom: 10px;

        text-align: center;

    }

    .wip i {

        font-size: 50pt;
        color: #ff7714;

    }

</style>

<template>

  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Menü" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" sliding><div style="margin-left: 16px;">Menü</div></f7-navbar>

            <f7-list>


                <f7-list-item link="/home/" title="<i class='material-icons m-i'>explore</i>&nbsp;&nbsp;&nbsp; Start" link-view="#main-view" link-close-panel></f7-list-item>
                <f7-list-item link="/plan/" title="<i class='material-icons m-i'>list</i>&nbsp;&nbsp;&nbsp; Vertretungsplan" link-view="#main-view" link-close-panel></f7-list-item>
                <f7-list-item link="/news/" title="<i class='material-icons m-i'>speaker_notes</i>&nbsp;&nbsp;&nbsp; News" link-view="#main-view" link-close-panel></f7-list-item>
                <!-- <f7-list-item link="/kalender/" title="<i class='material-icons m-i'>today</i>&nbsp;&nbsp;&nbsp; Schulkalender" link-view="#main-view" link-close-panel></f7-list-item> -->
                <f7-list-item title="<i class='material-icons m-i'>restaurant</i>&nbsp;&nbsp;&nbsp; Mensaplan" link-view="#main-view" link-close-panel @click="openMensa()"></f7-list-item>

                <f7-list-item title="Schulbereiche" divider></f7-list-item>

                <f7-list-item link="/schulleitung/" title="<i class='material-icons m-i'>assistant_photo</i>&nbsp;&nbsp;&nbsp; Schulleitung" link-view="#main-view" link-close-panel></f7-list-item>
                <f7-list-item link="/sv/" title="<i class='material-icons m-i'>portrait</i>&nbsp;&nbsp;&nbsp; SV" link-view="#main-view" link-close-panel></f7-list-item>
                <!-- <f7-list-item link="/sharens/" title="<i class='material-icons m-i'>loyalty</i>&nbsp;&nbsp;&nbsp; Sharens" link-view="#main-view" link-close-panel></f7-list-item> -->

                <f7-list-item title="Sonstiges" divider></f7-list-item>

                <f7-list-item link="/dieapp/" title="<i class='material-icons m-i'>help_outline</i>&nbsp;&nbsp;&nbsp; Die App" link-view="#main-view" link-close-panel></f7-list-item>
                <f7-list-item link="/ueberuns/" title="<i class='material-icons m-i'>people</i>&nbsp;&nbsp;&nbsp; Über uns" link-view="#main-view" link-close-panel></f7-list-item>
                <f7-list-item link="/impressum/" title="<i class='material-icons m-i'>info_outline</i>&nbsp;&nbsp;&nbsp; Impressum" link-view="#main-view" link-close-panel></f7-list-item>
                <f7-list-item link="/einstellungen/" title="<i class='material-icons m-i'>widgets</i>&nbsp;&nbsp;&nbsp; Einstellungen" link-view="#main-view" link-close-panel></f7-list-item>
                <f7-list-item @click="handleSignOut" title="<i class='material-icons m-i'>power_settings_new</i>&nbsp;&nbsp;&nbsp; Abmelden" link-view="#main-view" link-close-panel></f7-list-item>

            </f7-list>



          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>


    <!-- Main Views -->
    <f7-views v-if="loggedin === true">

        <f7-view main id="main-view" url="/home/" navbar-through :fixed-navbar="true">

            <!-- DIE NAVBARS SIND IN JEDER EINZELNEN VUE DATEI -->


          <!-- iOS Theme Navbar -->
          <!-- <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
              <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Vertretungsplan</f7-nav-center>
          </f7-navbar> -->


          <!-- Material Theme Navbar -->
          <!-- <f7-navbar v-if="$theme.material">
            <f7-nav-left>
              <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Vertretungsplan</f7-nav-center>
          </f7-navbar> -->


      </f7-view>
    </f7-views>


    <!-- Login Screen -->

      <f7-view v-if="loggedin === false">

        <f7-page login-screen>
          <f7-login-screen-title>
            <p style="text-align: center"> <img src="./icon.png" width="110" height="110"></p>
          </f7-login-screen-title>

          <!-- WIRD BEI REGISTRATION ANGEZEIGT -->

          <f7-list form id="app-framework-login-screen" inset v-if="!$root.user || mode === 'registration'">
            <f7-list-item v-if="mode === 'registration'">
              <f7-label>{{text.firstname}}</f7-label>
              <f7-input type="text" :placeholder="text.firstname" v-model="firstname" />
            </f7-list-item>
            <f7-list-item v-if="mode === 'registration'">
              <f7-label>{{text.lastname}}</f7-label>
              <f7-input type="text" :placeholder="text.lastname" v-model="lastname" />
            </f7-list-item>
            <f7-list-item>
              <f7-label>{{text.email}}</f7-label>
              <f7-input type="email" :placeholder="text.email" v-model="email" />
            </f7-list-item>
            <f7-list-item v-if=" mode === 'signIn' || mode === 'registration'">
              <f7-label>{{text.password}}</f7-label>
              <f7-input type="password" :placeholder="text.password" v-model="password" />
            </f7-list-item>
            <f7-list-item v-if="mode === 'registration'">
              <f7-label>{{text.password}}</f7-label>
              <f7-input type="password" :placeholder="text.passwordConfirmation" v-model="passwordConfirmation" />
            </f7-list-item>
            <f7-list-item v-if="mode === 'registration'">
              <f7-label>{{text.stufenPassword}}</f7-label>
              <f7-input type="password" :placeholder="text.stufenPassword" v-model="stufenPassword" />
            </f7-list-item>
          </f7-list>
            <!-- Email sign in buttons -->
            <f7-block v-if="mode === 'signIn'">
              <f7-button big raised color="green" fill @click="handleSignIn">{{text.signIn}}</f7-button big>
            </f7-block>
            <!-- Email registration buttons -->
            <f7-block v-if="mode === 'signIn'">
              <f7-button big raised color="green" @click="mode='registration'">{{text.createAccount}}</f7-button big>
            </f7-block>
            <f7-block v-if="mode === 'registration'">
              <f7-button big raised color="green" fill @click="handleRegistration">{{text.handleRegistration}}</f7-button big>
            </f7-block>
            <!-- Email reset buttons -->
            <f7-block v-if="mode === 'signIn'">
              <f7-button big raised color="orange" @click="mode='reset'">{{text.resetPassword}}</f7-button big>
            </f7-block>
            <f7-block v-if="mode === 'reset'">
              <f7-button big raised color="orange" fill @click="handleReset">{{text.handleReset}}</f7-button big>
            </f7-block>
            <!-- Cancel button -->
            <f7-block v-if="mode === 'reset' || mode === 'registration'">
              <f7-button big raised color="red" @click="cancel">{{text.cancel}}</f7-button big>
            </f7-block>

            <f7-list-label>
              <p>© Evangelisches Gymnasium Meinerzhagen</p>
              <!-- -->
            </f7-list-label>
          </f7-list>
        </f7-page>
      </f7-pages>

      </f7-view>


  </div>
</template>

<script>

import xhr from 'xhr'

let text = {
  de: {
    titleSignIn: 'Anmelden',
    titleSignOut: 'Abmelden',
    firstname: 'Vorname',
    lastname: 'Nachname',
    email: 'E-Mail',
    password: 'Passwort',
    passwordConfirmation: 'Bestätigung',
    stufenPassword: 'Stufenpasswort',
    handleRegistration: 'Konto erstellen',
    handleReset: 'Passwort zurücksetzen',
    signIn: 'Anmelden',
    signOut: 'Abmelden',
    createAccount: 'Neues Konto erstellen',
    resetPassword: 'Passwort zurücksetzen',
    cancel: 'Abbrechen',
    emailSent: 'E-Mail verschickt',
    checkYourInbox: 'Bitte schau in deinem Posteingang.',
    signOutDone: 'Abmeldung erfolgreich',
    accountCreated: 'Konto erfolgreich erstellt, willkommen 😊',
    error: 'Fehler',
    errorOffline: 'Diese Aktion ist offline nicht möglich.',
    errorNoEmail: 'Bitte gib Deine E-Mail-Adresse ein.',
    errorNoFirstname: 'Bitte gib Deinen Vornamen ein.',
    errorNoLastname: 'Bitte gib Deinen Nachnamen ein.',
    errorNoPassword: 'Bitte gib ein Passwort ein.',
    errorNostufenPassword: 'Bitte gib ein Stufenpasswort ein',
    errorFalsestufenPassword: 'Falsches Stufenpasswort',
    errorPasswordsDifferent: 'Du hast zwei unterschiedliche Passwörter eingegeben.',
    firebaseErrors: {
      'auth/email-already-in-use': 'Die E-Mail-Adresse wird bereits verwendet.',
      'auth/invalid-email': 'Die E-Mail-Adresse ist fehlerhaft.',
      'auth/operation-not-allowed': 'Anmelden ist zurzeit nicht möglich.',
      'auth/weak-password': 'Dein Passwort ist nicht sicher genug.',
      'auth/user-not-found': 'Kein Konto mit dieser E-Mail-Adresse gefunden.',
      'auth/user-disabled': 'Dein Konto ist deaktiviert.',
      'auth/wrong-password': 'Das Passwort ist falsch.'
    }
  }
}

export default {
  data () {
    var appVersion = ''
    this.checkAppVersion()

    return {
      loggedin: this.checklogin(),
      stufe: this.$root.data.stufe,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      stufenPassword: '',
      mode: 'signIn',
      appVersion: appVersion
    }
  },

  computed: {
    text: function () {
      return text['de']
    }
  },
  created: function () {
    this.mode = this.$root.user ? 'signOut' : 'signIn'
  },

  methods: {

    checklogin: function () {
      if (this.$root.user) {
        return true
      } else {
        return false
      }
    },
    cancel: function () {
        // Reset form
      this.email = ''
      this.password = ''
      this.passwordConfirmation = ''
      this.stufenPassword = ''
      this.mode = this.$root.user ? 'signOut' : 'signIn'

        // Reset local storage
      window.localStorage.removeItem('requestedView')
      window.localStorage.removeItem('requestedUrl')
    },

    checkAppVersion: function () {
      var CURRENT_APP_VERSION = '1.4.2'
      window.sessionStorage.setItem('appVersion', CURRENT_APP_VERSION)

      this.appVersion = CURRENT_APP_VERSION

      this.$root.db('APP_VERSION').once('value').then(function (snapshot) {
        var newestVersion = snapshot.val()

        console.log('Current Version: ' + CURRENT_APP_VERSION + ', Newest Version: ' + newestVersion)

        if (CURRENT_APP_VERSION !== newestVersion) {
          var alertMsg = 'Die Version der App auf Deinem Gerät ist <b>' + CURRENT_APP_VERSION + '</b><br />Die aktuellste Version ist <b>' + newestVersion + '</b><br /><br />Aktualisiere bitte die App. <b>Melde</b> dich im Menü <b>ab</b>, starte die App neu und melde dich wieder an.<br />Falls das nicht hilft, erfahre unter "Die App" > "App aktualisieren", warum das nötig ist und wie Du es machst.'

          window.f7.alert(alertMsg, 'Update verfügbar')
        }
      })
    },

    handleSignIn: function () {
      if (navigator.onLine === false) {
        window.f7.alert(this.text.errorOffline, this.text.error)
      } else if (this.email === '') {
        window.f7.alert(this.text.errorNoEmail, this.text.error)
      } else if (this.password === '') {
        window.f7.alert(this.text.errorNoPassword, this.text.error)
      } else {
            // Show loading indicator
        window.f7.showIndicator()
            // Sign in user
        window.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
              // On success
              .then(user => {
                this.handleSignInDone()
              })
              // On error, show alert
              .catch(err => {
                // Hide loading indicator
                window.f7.hideIndicator()
                // Shoe error alert
                window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
              })
      }
    },

    handleSignInDone: function () {
        // Hide loading indicator
      window.f7.hideIndicator()
        // Reset form
      this.email = ''
      this.password = ''
      this.passwordConfirmation = ''
      this.stufenPassword = ''
      this.mode = 'signOut'
        // Show requested URL or navigate back
      this.loggedin = true
        // Reset local storage
      window.localStorage.removeItem('requestedView')
      window.localStorage.removeItem('requestedUrl')
    },

    handleSignOut: function () {
      window.firebase.auth().signOut()
          .then(() => {
              // Reset form
            this.mode = 'signIn'
            this.loggedin = false
            this.$root.removeData('planheute')
            this.$root.removeData('planmorgen')
          })
    },
    checkstufenpass: function (mystufenkey) {
      window.f7.showIndicator()
      var options =
        {
          body: { key: mystufenkey },
          useXDR: true,
          json: true,
          sync: true
        }
      var mystatus = xhr.post('https://us-central1-egm-app.cloudfunctions.net/egmapp/checkkey', options, function (error, response) {
        if (error) {
          console.log(error)
          return
        }
        return (response.body)
      })
      window.f7.hideIndicator()
      return (mystatus.response)
    },

    handleRegistration: function () {
      if (navigator.onLine === false) {
        window.f7.alert(this.text.errorOffline, this.text.error)
      } else if (this.firstname === '') {
        window.f7.alert(this.text.errorNoFirstname, this.text.error)
      } else if (this.lastname === '') {
        window.f7.alert(this.text.errorNoLastname, this.text.error)
      } else if (this.email === '') {
        window.f7.alert(this.text.errorNoEmail, this.text.error)
      } else if (this.password === '') {
        window.f7.alert(this.text.errorNoPassword, this.text.error)
      } else if (this.passwordConfirmation !== this.password) {
        window.f7.alert(this.text.errorPasswordsDifferent, this.text.error)
      } else if (this.stufenPassword === '') {
        window.f7.alert(this.text.errorNostufenPassword, this.text.error)
      } else if (this.checkstufenpass(this.stufenPassword) !== 'true') {
        window.f7.alert(this.text.errorFalsestufenPassword, this.text.error)
      } else {
          // Show loading indicator
        window.f7.showIndicator()
        var mystufenkey = this.stufenPassword
        var myfirstname = this.firstname
        var mylastname = this.lastname
          // Create new user
        window.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            // On success, sign in user
            .then(user => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Show notification
              window.f7.addNotification({
                title: this.text.accountCreated,
                message: this.text.accountCreated,
                hold: 3000,
                closeIcon: false
              })
              this.$root.db('users/' + user.uid).set({
                stufenkey: mystufenkey,
                firstname: myfirstname,
                lastname: mylastname
              })
              this.$root.db('settings/' + user.uid).set({
                bigtext: 'false'
              })

              this.handleSignInDone()
            })
            // On error, show alert
            .catch(err => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Show error alert
              window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
            })
      }
    },

    handleReset: function () {
      if (navigator.onLine === false) {
        window.f7.alert(this.text.errorOffline, this.text.error)
      } else if (this.email === '') {
        window.f7.alert(this.text.errorNoEmail, this.text.error)
      } else {
          // Show loading indicator
        window.f7.showIndicator()
          // Send reset link
        window.firebase.auth().sendPasswordResetEmail(this.email)
            .then(user => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Update mode
              this.mode = 'signIn'
              // On success, show notfication and login screen again
              window.f7.addNotification({
                title: this.text.emailSent,
                message: this.text.checkYourInbox,
                hold: 3000,
                closeIcon: false
              })
              this.mode = 'signIn'
            })
            .catch(err => {
              // Hide loading indicator
              window.f7.hideIndicator()
              // Show error alert
              window.f7.alert(this.text.firebaseErrors[err.code], this.text.error)
            })
      }
    },

    openMensa: function () {
      window.f7.showIndicator()
      this.$root.store('Mensaplan/Speiseplan.png').getDownloadURL().then(function (url) {
        var photoBrowserPage = window.f7.photoBrowser({
          photos: {url},
          type: 'popup',
          ofText: 'von'
        })
        photoBrowserPage.open()
      }).then(() => {
        window.f7.hideIndicator()
      })
    }

  }

}

</script>
