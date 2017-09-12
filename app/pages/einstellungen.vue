<style>

    .profile-wrapper {

        width: 100%;
        height: 406px;
        background-color: #abc;

        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);

    }

    .profile-img {

        height: 120px;
        width: 120px;

        border-radius: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: #ccc;

        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);

    }

    .profile-name {

        position: absolute;
        top: 210px;
        font-size: 14pt;
        font-weight: 500;
        width: 100%;
        text-align: center;

    }

    .profile-email {

        position: absolute;
        top: 248px;
        font-size: 11pt;
        font-weight: 200;
        width: 100%;
        text-align: center;

    }

    .profile-stufe {

        position: absolute;
        top: 270px;
        font-size: 11pt;
        font-weight: 200;
        width: 100%;
        text-align: center;

    }

    .app-version {

        position: absolute;
        top: 50px;
        right: 10px;
        font-size: 11pt;
        font-weight: 200;

        color: #888;

    }

    .profile-reset-wrapper {

        display: flex;

        position: absolute;
        top: 324px;

        width: calc(100% - 32px);
        padding: 0 16px;

        justify-content: space-between;
    }

    .profile-reset-wrapper-bottom {

        display: flex;

        position: absolute;
        top: 384px;

        width: calc(100% - 32px);
        padding: 0 16px;

        justify-content: space-between;
    }

    .profile-btn-left {

        width: 48%;

    }

    .profile-btn-right {

        width: 48%;

    }


    .smallerMargin {

        margin-top: 0;
        padding-top: 0;

    }

</style>


<template>
  <f7-page>

      <!-- iOS Theme Navbar -->
      <f7-navbar v-if="$theme.ios">
        <f7-nav-left>
          <f7-link icon="icon-bars" open-panel="left"></f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Einstellungen</f7-nav-center>
      </f7-navbar>


      <!-- Material Theme Navbar -->
      <f7-navbar v-if="$theme.material">
        <f7-nav-left>
          <f7-link icon="icon-bars" open-panel="left"></f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Einstellungen</f7-nav-center>
      </f7-navbar>


      <div class="profile-wrapper">

        <img class="profile-img" src="../images/profileimg.png">

        <p class="app-version">
            v{{appVersion}}
        </p>

        <p class="profile-name">
            {{userFirstname}} {{userLastname}}
        </p>

        <p class="profile-email">
            {{userEmail}}
        </p>

        <p class="profile-stufe">
            Stufe {{userStufe}} <span v-if="userStufe==13">(Lehrer)</span>
        </p>

        <div class="profile-reset-wrapper">

            <f7-button big raised color="green" fill class="profile-btn-left" @click="handleReset()">Passwort ändern</f7-button big>
            <f7-button big raised color="green" fill class="profile-btn-right" @click="handleEmailReset()">Email ändern</f7-button big>

        </div>

        <div class="profile-reset-wrapper-bottom">

            <f7-button big raised color="orange" fill class="profile-btn-left" @click="handleChangeStufenpasswort()">Stufe wechseln</f7-button big>
            <f7-button big raised color="red" fill class="profile-btn-right" @click="handleDelete()">Konto löschen</f7-button big>

        </div>

      </div>

    <p class="sub-title">
        Allgemein
    </p>

    <f7-list class="smallerMargin">

        <f7-list-item title="Benachrichtigungen (In späteren Updates verfügbar)">
            <span slot="after"><f7-input type="switch" @change="" disabled></f7-input></span>
        </f7-list-item>

        <f7-list-item title="Textgröße in Artikeln (Klein / Groß)">
            <span slot="after"><f7-input :checked="bigtextState" type="switch" @change="onBigtextChange()"></f7-input></span>
        </f7-list-item>

    </f7-list>

    <f7-button color="red" v-on:click="openSupport()">Support / Fehler melden</f7-button>
    <f7-button v-on:click="openChangelog()">Changelog</f7-button>
    <f7-button v-on:click="openPlannedFeatures()">Geplante Features</f7-button>

    <br />
    <br />

  </f7-page>
</template>


<script>

import xhr from 'xhr'

export default {
  data: function () {
    var items = []
    var itemsPF = []
    var bigtextState = false
    var changelogFinishedLoading = false
    var plannedFeaturesFinishedLoading = false
    var supportEmail = 'support.app@ev-g-m.de'
    var userFirstname = ''
    var userLastname = ''
    var userEmail = ''
    var userStufenkey = ''
    var userStufe = ''
    this.addNewItem()
    this.addNewItemPlanned()
    this.checkSettings()
    this.getUserInfo()
    return {
      items: items,
      itemsPF: itemsPF,
      bigtextState: bigtextState,
      cancelicon: require('../images/ic_cancel_black_24dp.png'),
      supportEmail: supportEmail,
      changelogFinishedLoading: changelogFinishedLoading,
      plannedFeaturesFinishedLoading: plannedFeaturesFinishedLoading,
      userFirstname: userFirstname,
      userLastname: userLastname,
      userEmail: userEmail,
      userStufenkey: userStufenkey,
      userStufe: userStufe
    }
  },
  mounted: function () {
  },
  methods: {
        // Method to add new item
    addNewItem: function () {
      var self = this
      this.$root.db('changelog').once('value').then(function (snapshot) {
        var mitteilungen = snapshot.val()
        self.items = []
        var cnt = 1
        var menge = mitteilungen.length
        while (cnt < menge) {
          self.items.push({
            version: mitteilungen[cnt].version,
            date: mitteilungen[cnt].date,
            changes: mitteilungen[cnt].changes
          })
          cnt++
        }

        self.changelogFinishedLoading = true
      })
    },

    addNewItemPlanned: function () {
      var self = this
      this.$root.db('plannedFeatures').once('value').then(function (snapshot) {
        var mitteilungen = snapshot.val()
        self.itemsPF = []
        var cnt = 1
        var menge = mitteilungen.length

        while (cnt < menge) {
          self.itemsPF.push({
            feature: mitteilungen[cnt]
          })
          cnt++
        }

        self.plannedFeaturesFinishedLoading = true
      })
    },

    getUserInfo: function () {
      var self = this
      this.appVersion = window.sessionStorage.getItem('appVersion')
      this.$root.db('users/' + this.$root.user.uid).once('value').then(function (snapshot) {
        var userStats = snapshot.val()

        self.userStufenkey = userStats.stufenkey
        self.userStufe = userStats.stufe
        self.userFirstname = userStats.firstname
        self.userLastname = userStats.lastname
        self.userEmail = self.$root.user.email
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

    handleChangeStufenpasswort: function () {
      var stufenkey = window.prompt('Bitte gib das neue Stufenpasswort ein:')

      if (stufenkey === '' || stufenkey === null || stufenkey === undefined) {
        window.f7.addNotification({
          title: 'Abgebrochen',
          message: 'Der Vorgang wurde abgebrochen ',
          hold: 3000,
          closeIcon: false
        })
        return
      }

      window.f7.showIndicator()

      if (this.checkstufenpass(stufenkey) !== 'true') {
        window.f7.alert('Dieses Stufenpasswort existiert nicht, versuche es mit einem anderen.', 'Fehler')
      } else if (this.userStufenkey === stufenkey) {
        window.f7.alert('Du bist schon mit diesem Stufenpasswort angemeldet', 'Fehler')
      } else {
        var self = this

        this.$root.db('users/' + this.$root.user.uid).set({
          stufenkey: stufenkey,
          firstname: this.userFirstname,
          lastname: this.userLastname
        }).then(function () {
          self.userStufenkey = stufenkey
          window.f7.alert('Dein Stufenpasswort wurde aktualisiert.', 'Erfolg')
          setTimeout(function () { window.location.reload() }, 1500)
        }).catch(function (err) {
          window.f7.alert(err, 'Fehler')
        })
      }
    },

    handleDelete: function () {
      var deleteTxt = window.prompt('Gib LÖSCHEN ein, um Deinen Account zu löschen', '')

      if (deleteTxt !== 'LÖSCHEN' || window.confirm('Wirklich löschen?') !== true) {
        window.f7.addNotification({
          title: 'Abgebrochen',
          message: 'Der Vorgang wurde abgebrochen ',
          hold: 3000,
          closeIcon: false
        })
      } else {
        var user = window.firebase.auth().currentUser

        user.delete().then(function () {
          window.f7.alert('Dein Account wurde gelöscht!<br /><br />Bitte lade die Seite neu, um zum Anmeldebilschirm zu gelangen.', 'Erfolg')
          setTimeout(function () { window.location.reload() }, 1500)
        }).catch(function (error) {
          window.f7.alert(error, 'Fehler')
        })
      }
    },

    handleReset: function () {
      if (navigator.onLine === false) {
        window.f7.alert('Du bist offline!', 'Fehler')
      } else if (this.$root.user.email === '') {
        window.f7.alert('Keine Email angegeben', 'Fehler')
      } else if (window.confirm('Möchtest du wirklich dein Passwort zurücksetzen?<br />(Dir wird eine Email mit einem Reset-Link zugesendet)') !== true) {
        window.f7.addNotification({
          title: 'Abgebrochen',
          message: 'Der Vorgang wurde abgebrochen ',
          hold: 3000,
          closeIcon: false
        })
      } else {
            // Show loading indicator
        window.f7.showIndicator()
            // Send reset link
        window.firebase.auth().sendPasswordResetEmail(this.$root.user.email)
            .then(user => {
                // Hide loading indicator
              window.f7.hideIndicator()
                // On success, show notfication and login screen again
              window.f7.addNotification({
                title: 'Email wurde gesendet',
                message: 'Bitte überprüfe Deinen Posteingang',
                hold: 3000,
                closeIcon: false
              })
            })
            .catch(err => {
                // Hide loading indicator
              window.f7.hideIndicator()
                // Show error alert
              window.f7.alert('Firebase Error: ' + err, 'Fehler')
            })
      }
    },

    validateEmail: function (email) {
      var re = /\S+@\S+\.\S+/
      return re.test(email)
    },

    handleEmailReset: function () {
      var newEmail = window.prompt('Bitte gib eine neue Email ein', 'Neue Email')

      if (newEmail === '' || newEmail === null || newEmail === undefined) {
        window.f7.addNotification({
          title: 'Abgebrochen',
          message: 'Der Vorgang wurde abgebrochen ',
          hold: 3000,
          closeIcon: false
        })

        return
      }

      if (this.validateEmail(newEmail) !== true) {
        window.f7.alert('Bitte gib eine gültige Email-Adresse an!', 'Fehler')

        return
      }

      if (newEmail === null || newEmail === '' || window.confirm('Wirklich ändern?') !== true) {
        window.f7.addNotification({
          title: 'Abgebrochen',
          message: 'Der Vorgang wurde abgebrochen ',
          hold: 3000,
          closeIcon: false
        })
      } else {
        var user = window.firebase.auth().currentUser

        user.updateEmail(newEmail).then(function () {
          window.f7.alert('Email wurde geändert!', 'Erfolg')
          setTimeout(function () { window.location.reload() }, 1500)
        }).catch(function (error) {
          window.f7.alert(error, 'Fehler')
        })
      }
    },

    checkSettings: function () {
      var self = this

      this.$root.db('settings/' + this.$root.user.uid).once('value').then(function (snapshot) {
        var settings = snapshot.val()

        if (settings.bigtext === 'false') {
          self.bigtextState = false
        } else if (settings.bigtext === 'true') {
          self.bigtextState = true
        }
      }).catch(function () {
        self.$root.db('settings/' + self.$root.user.uid).set({
          bigtext: 'false'
        })
      })
    },

    onBigtextChange: function () {
      var self = this

      this.$root.db('settings/' + this.$root.user.uid).once('value').then(function (snapshot) {
        var settings = snapshot.val()

        if (settings.bigtext === 'false') {
          self.$root.db('settings/' + self.$root.user.uid).set({
            bigtext: 'true'
          })
        } else if (settings.bigtext === 'true') {
          self.$root.db('settings/' + self.$root.user.uid).set({
            bigtext: 'false'
          })
        }
      }).catch(function () {
        self.$root.db('settings/' + self.$root.user.uid).set({
          bigtext: 'false'
        })

        window.f7.alert('Bitte Lade die Seite neu', 'Einstellungen wurden nicht richtig konfiguriert')
      })
    },

    openChangelog: function () {
      var myApp = window.f7
      var popupHTML = `<div class="popup">

                <div class="popup-inner">

                    <div class='popup-top'>

                        <p class='popup-title'>

                            Changelog

                        </p>

                        <p><a href="#" class="popup-close close-popup"><i class="material-icons">close</i></a></p>

                    </div>

                    <p class='popup-text'>

                        <ul>


        `

      while (this.changelogFinishedLoading !== true) {

      }

      var i = this.items.length - 1
      while (i >= 0) {
        popupHTML += '<li><b>' + this.items[i].version + '</b> - <span style="color: #999">' + this.items[i].date + '</span>' + this.items[i].changes + '</li><br />'
        i--
      }

      popupHTML += `</p>

                      </div>

                    </div>

                  `

      myApp.popup(popupHTML)
    },

    openPlannedFeatures: function () {
      var myApp = window.f7
      var popupHTML = `<div class="popup">

                  <div class="popup-inner">

                      <div class='popup-top'>

                          <p class='popup-title'>

                              Geplante Features

                          </p>

                          <p><a href="#" class="popup-close close-popup"><i class="material-icons">close</i></a></p>

                      </div>

                      <p class='popup-text'>

                          <ul>


          `

      while (this.plannedFeaturesFinishedLoading !== true) {

      }

      var i = this.itemsPF.length - 1
      while (i >= 0) {
        popupHTML += '<li><b>' + this.itemsPF[i].feature + '</b></li>'
        i--
      }

      popupHTML += `</ul></p>

                        </div>

                      </div>

                    `

      myApp.popup(popupHTML)
    },

    openSupport: function () {
      var myApp = window.f7
      var popupHTML = `

            <div class="popup">

                <div class="popup-inner">

                    <div class='popup-top'>

                        <p class='popup-title'>

                            Support / Fehler melden

                        </p>

                        <p><a href="#" class="popup-close close-popup"><i class="material-icons">close</i></a></p>

                    </div>

                    <p class='popup-text'>
                        Wenn du ein Problem mit der App hast oder du einen Fehler gefunden hast, kannst du uns eine Email an folgende Adresse schreiben: <br /><b>` + this.supportEmail + `</b>
                    </p>

                </div>

            </div>

          `

      myApp.popup(popupHTML)
    }
  }
}
  </script>
