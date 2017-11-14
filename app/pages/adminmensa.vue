<style scoped>

    #mensa-upload-label {

        padding: 12px 16px;
        color: white;
        background-color: #4caf50;
        border-radius: 3px;
        cursor: pointer;
        user-select: none;

    }

    #mensa-upload-label:hover {

        background-color: #429c46;

    }

    #mensa-upload {

        display: none;

    }




</style>


<template>
  <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Admin-Bereich: Mensa</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Admin-Bereich: Mensa</f7-nav-center>
        </f7-navbar>


        <div class="text" v-if="hasPermission">

            <h2 class="popup-title">Mensaplan aktualisieren</h2>

            <p>
                Der Mensaplan muss (falls in PDF vorhanden) auf einer Seite wie http://pdf2png.com/de/ zu einer PNG Datei konvertiert werden!<br />
                Wenn die Datei als PNG vorliegt, kann sie hier mit einem Klick auf den grünen Button ausgewählt werden. Danach bekommst Du eine Vorschau und die Abfrage, ob dieses Bild als Mensaplan hochgeladen werden soll.
                <br />Achtung: Diese Aktion kann nicht mehr rückgängig gemacht werden!
                <br />Nach dem Upload ist der Plan automatisch aktualisiert.
            </p>

            <br />

            <label id="mensa-upload-label" for="mensa-upload"><i class="material-icons button-icons">add</i> Mensaplan-Datei auswählen (PNG)</label>
            <input type="file" id="mensa-upload" accept=".png" @change="updateImageDisplay($event)"/>

        </div>

        <div class="text" v-else>

            <p>
                Sorry, aber Du hast keine Berechtigung, diese Seite anzusehen!
            </p>

        </div>


  </f7-page>
</template>


<script>

export default {
  data: function () {
    var hasPermission = false
    this.checkAdminPermission()

    return {

      hasPermission: hasPermission

    }
  },
  mounted: function () {
  },
  methods: {

    updateImageDisplay: function (event) {
      var file = event.target.files[0]

      if (this.hasPermission === false) {
        window.f7.alert('Du hast keine Berechtigung, um dies zu tun!', '⚙️ Abgebrochen')
        return
      }

      if (!this.checkValidFiletype(file)) {
        window.f7.alert('Dieser Dateityp (' + file.type + ') wird nicht unterstüzt!', '⚙️ Abgebrochen', () => { window.location.reload() })
        return
      }

      window.f7.confirm('Möchtest Du dieses Bild als Mensaplan hochladen?<br /><img src=' + window.URL.createObjectURL(file) + ' width="230" /><br />' + file.name + ' [' + this.getFilesize(file) + ']', () => {
        this.uploadImage(file)
      }, () => {
        window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen', () => { window.location.reload() })
      })
    },

    uploadImage: function (file) {
      window.f7.showIndicator()

      var uploadTask = this.$root.store('Mensaplan/Speiseplan.png').put(file)

      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        window.f7.addNotification({
          message: 'Wird hochgeladen (' + progress.toFixed(1) + '%)',
          hold: 2000,
          closeIcon: false
        })
      }, function (error) {
        window.f7.hideIndicator()

        switch (error.code) {
          case 'storage/unauthorized':
            window.f7.alert('Es fehlen Recht zum Hochladen.', '⚙️ Abgebrochen', () => { window.location.reload() })
            break

          case 'storage/canceled':
            window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen', () => { window.location.reload() })
            break

          case 'storage/unknown':
            window.f7.alert('Es ist ein unbekannter Fehler aufgetreten. Versuche es später erneut.', '⚙️ Abgebrochen', () => { window.location.reload() })
            break
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        window.f7.hideIndicator()
        window.f7.alert('Der Mensaplan wurde erfolgreich aktualisiert.', '⚙️ Erfolg', () => { window.location.reload() })
      })
    },

    checkAdminPermission: function () {
      var self = this
      var stufenZahl
      var stufenName

      this.$root.db('users/' + this.$root.user.uid).once('value').then(function (snapshot) {
        var userStats = snapshot.val()

        stufenZahl = userStats.stufe

        if (stufenZahl !== 13 && stufenZahl !== 14 && stufenZahl !== 15) {
          self.hasPermission = false
          return
        }

        switch (stufenZahl) {

          case 13:
            stufenName = 'lehrer'
            break
          case 14:
            stufenName = 'bearbeiter'
            break
          case 15:
            stufenName = 'admin'
            break

        }

        var me = self

        self.$root.db('adminPermissions/' + stufenName).once('value').then(function (snapshot) {
          var permissions = snapshot.val()

          if (!permissions.mensa) {
            me.hasPermission = false
            return
          } else {
            me.hasPermission = true
            return
          }
        })
      })
    },

    checkValidFiletype: function (file) {
      var fileTypes = [
        'image/png'
      ]

      for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
          return true
        }
      }

      return false
    },

    getFilesize: function (file) {
      var number = file.size

      if (number < 1024) {
        return number + ' Bytes'
      } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + ' KB'
      } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + ' MB'
      }
    }

  }
}

</script>
