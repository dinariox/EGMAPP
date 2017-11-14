<style scoped>

    .newest {

        display: flex;

    }

    .big-list {

        margin-top: 0px;

    }


    .teaser-img {

        height: 54px;
        border-radius: 50%;
        margin-right: 12px;


    }

    .img-div {

        height: 100%;

    }

    .text-div p {

        padding: 0;
        margin: 0;

    }

    .title-p {

        font-size: 14pt;
        font-weight: 400;
        line-height: normal;

    }

    .date-p {

        color: #666;
        font-weight: 200;
        font-size: 11pt;

    }



    .editTB {

        width: 100%;
        padding: 4px;
        font-family: 'Roboto', sans-serif;

    }

    textarea.editTB {

        height: 300px;
        resize: none;

    }

    #image-prev {

        max-width: 100%;

    }

    .icon-variant {

        text-align: center;

    }

    .icon-variant img {

        width: 48px;
        height: 48px;

        margin: 2px 5px;

        cursor: pointer;

        border-radius: 50%;

    }

    .icon-variant img:hover {

        box-shadow:

    }

    #icon-selection {

        margin-top: 12px;

    }

    #news-upload, #news-upload-new {

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
            <f7-nav-center sliding>Admin-Bereich: Schulleitung</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Admin-Bereich: Schulleitung</f7-nav-center>
        </f7-navbar>



        <div class="text" v-if="hasPermission">

            <h2 class="popup-title" v-if="!editMode">Artikel aus dem "Schulleitung"-Bereich</h2>
            <h2 class="popup-title" v-if="editMode">Artikel bearbeiten</h2>

            <p v-if="!editMode && !newMode">
                Hier gibt es eine Übersicht mit allen Artikeln die im Bereich "Schulleitung" hochgeladen wurden.
                <br />Du kannst sie bearbeiten oder löschen. Klicke auf den grünen Button, um einen Artikel zu erstellen.
            </p>

            <p v-if="editMode">
                Jetzt kannst du den ausgewählten Artikel bearbeiten.<br />
                Wenn du fertig bist, klicke unten auf "Artikel veröffentlichen" oder "Abbrechen", falls du es dir anders überlegt hast.<br />
                Achtung: Sobald der Artikel hochgeladen wurde, kannst du die Änderungen nicht mehr rückgängig machen!
            </p>

            <p v-if="newMode">
                Hier kannst du einen neuen Artikel erstellen.<br />
                Wenn du fertig bist, klicke unten auf "Artikel veröffentlichen" oder "Abbrechen", falls du es dir anders überlegt hast.<br />
            </p>

            <f7-button color="green" @click="newArticle()" fill v-if="!editMode && !newMode"><i class="material-icons button-icons">add</i> Neuen Artikel erstellen</f7-button>

            <br />

            <f7-list class="big-list" v-if="!editMode && !newMode">
                <f7-list-item v-for="item in items">
                    <div class="newest">

                        <div class="img-div">

                            <img :src="item.icon" class="teaser-img" />

                        </div>

                        <div class="text-div">

                            <p class="title-p">
                                {{item.title}}
                            </p>
                            <p class="date-p">
                                {{item.date}}
                            </p>

                            <a class="click-links" @click="editArticle(item.id, item.title, item.date, item.text, item.iconname, item.image)"><i class="material-icons mini-icons">edit</i> Bearbeiten</a>&nbsp;&nbsp;
                            <a class="click-links" @click="deleteArticle(item.id)"><i class="material-icons mini-icons">delete</i> Löschen</a>

                        </div>

                    </div>
                </f7-list-item>
            </f7-list>



            <div v-if="editMode || newMode">

                <div v-if="editMode">
                    <label>ID</label><br />
                    <input type="text" placeholder="ID" class="editTB" v-model="idTB" disabled />
                    <br /><br />
                </div>

                <label>Titel</label><br />
                <input type="text" placeholder="Titel" class="editTB" v-model="titleTB" />
                <br /><br />

                <label>Text</label><br />
                <textarea type="text" placeholder="Text" class="editTB" v-model="textTB"></textarea>
                <br /><br />

                <label>Datum (dd.mm.yyyy)</label> &nbsp; <a @click="insertCurrentDate()" class="click-links"><i class="material-icons mini-icons">event</i> Heutiges Datum einfügen</a><br />
                <input type="text" placeholder="Datum" class="editTB" v-model="dateTB" />
                <br /><br />

                <label>Icon</label> &nbsp; <a v-if="!iconMode" @click="selectIcon()" class="click-links"><i class="material-icons mini-icons">edit</i> Anderes Icon auswählen</a><br />
                <input type="text" placeholder="Icon" class="editTB" v-model="iconTB" disabled />

                <div id="icon-selection" v-if="iconMode">

                    <div class="icon-variant">
                        <img src="../images/teaser-imgs/0-blue.png" alt="0-blue" @click="updateIcon('0-blue')">
                        <img src="../images/teaser-imgs/0-green.png" alt="0-green" @click="updateIcon('0-green')">
                        <img src="../images/teaser-imgs/0-orange.png" alt="0-orange" @click="updateIcon('0-orange')">
                        <img src="../images/teaser-imgs/0-purple.png" alt="0-purple" @click="updateIcon('0-purple')">
                        <img src="../images/teaser-imgs/0-red.png" alt="0-red" @click="updateIcon('0-red')">
                    </div>
                    <div class="icon-variant">
                        <img src="../images/teaser-imgs/1-blue.png" alt="1-blue" @click="updateIcon('1-blue')">
                        <img src="../images/teaser-imgs/1-green.png" alt="1-green" @click="updateIcon('1-green')">
                        <img src="../images/teaser-imgs/1-orange.png" alt="1-orange" @click="updateIcon('1-orange')">
                        <img src="../images/teaser-imgs/1-purple.png" alt="1-purple" @click="updateIcon('1-purple')">
                        <img src="../images/teaser-imgs/1-red.png" alt="1-red" @click="updateIcon('1-red')">
                    </div>
                    <div class="icon-variant">
                        <img src="../images/teaser-imgs/2-blue.png" alt="2-blue" @click="updateIcon('2-blue')">
                        <img src="../images/teaser-imgs/2-green.png" alt="2-green" @click="updateIcon('2-green')">
                        <img src="../images/teaser-imgs/2-orange.png" alt="2-orange" @click="updateIcon('2-orange')">
                        <img src="../images/teaser-imgs/2-purple.png" alt="2-purple" @click="updateIcon('2-purple')">
                        <img src="../images/teaser-imgs/2-red.png" alt="2-red" @click="updateIcon('2-red')">
                    </div>
                    <div class="icon-variant">
                        <img src="../images/teaser-imgs/3-blue.png" alt="3-blue" @click="updateIcon('3-blue')">
                        <img src="../images/teaser-imgs/3-green.png" alt="3-green" @click="updateIcon('3-green')">
                        <img src="../images/teaser-imgs/3-orange.png" alt="3-orange" @click="updateIcon('3-orange')">
                        <img src="../images/teaser-imgs/3-purple.png" alt="3-purple" @click="updateIcon('3-purple')">
                        <img src="../images/teaser-imgs/3-red.png" alt="3-red" @click="updateIcon('3-red')">
                    </div>
                    <div class="icon-variant">
                        <img src="../images/teaser-imgs/4-blue.png" alt="4-blue" @click="updateIcon('4-blue')">
                        <img src="../images/teaser-imgs/4-green.png" alt="4-green" @click="updateIcon('4-green')">
                        <img src="../images/teaser-imgs/4-orange.png" alt="4-orange" @click="updateIcon('4-orange')">
                        <img src="../images/teaser-imgs/4-purple.png" alt="4-purple" @click="updateIcon('4-purple')">
                        <img src="../images/teaser-imgs/4-red.png" alt="4-red" @click="updateIcon('4-red')">
                    </div>
                    <div class="icon-variant">
                        <img src="../images/teaser-imgs/5-blue.png" alt="5-blue" @click="updateIcon('5-blue')">
                        <img src="../images/teaser-imgs/5-green.png" alt="5-green" @click="updateIcon('5-green')">
                        <img src="../images/teaser-imgs/5-orange.png" alt="5-orange" @click="updateIcon('5-orange')">
                        <img src="../images/teaser-imgs/5-purple.png" alt="5-purple" @click="updateIcon('5-purple')">
                        <img src="../images/teaser-imgs/5-red.png" alt="5-red" @click="updateIcon('5-red')">
                    </div>

                </div>

                <br /><br />

                <div v-if="newMode">
                    <label>Bild</label> &nbsp; <label class="click-links" for="news-upload-new"><i class="material-icons button-icons">edit</i> Ein Bild hochladen (PNG, JPG)</label>
                    <input type="file" id="news-upload-new" accept=".png, .jpg, .jpeg" @change="updateNewImage($event)"/>

                    <input type="text" placeholder="Bild" class="editTB" v-model="newImgTB" /><br />

                </div>

                <div v-if="editMode">
                    <label>Bild</label> &nbsp; <label class="click-links" for="news-upload"><i class="material-icons button-icons">edit</i> Anderes Bild hochladen (PNG, JPG)</label>
                    <input type="file" id="news-upload" accept=".png, .jpg, .jpeg" @change="updateImageDisplay($event)"/>
                    <br />

                    <f7-button color="pink" fill @click="showCurrentImage()"><i class="material-icons button-icons">image</i> Bild ansehen</f7-button>
                </div>





                <br /><br /><br />

                <f7-button v-if="editMode" color="blue" fill @click="publishEditedArticle()"><i class="material-icons button-icons">save</i> Artikel veröffentlichen</f7-button>
                <f7-button v-if="newMode" color="green" fill @click="publishNewArticle()"><i class="material-icons button-icons">save</i> Artikel erstellen</f7-button>
                <br />
                <f7-button color="gray" fill @click="cancelEditingArticle()"><i class="material-icons button-icons">cancel</i> Abbrechen</f7-button>
                <br />

            </div>


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
    var editMode = false
    var iconMode = false
    var newMode = false
    var hasPermission = false
    var items = []
    var titleTB = ''
    var textTB = ''
    var dateTB = ''
    var iconTB = ''
    var imageTB = ''
    var newImgTB = ''
    var idTB = ''
    var isImageUpdated = false
    var updatedImage = ''
    this.checkAdminPermission()
    this.addNewItem()
    return {

      hasPermission: hasPermission,
      items: items,
      editMode: editMode,
      iconMode: iconMode,
      newMode: newMode,
      titleTB: titleTB,
      textTB: textTB,
      dateTB: dateTB,
      iconTB: iconTB,
      imageTB: imageTB,
      idTB: idTB,
      updatedImage: updatedImage,
      isImageUpdated: isImageUpdated,
      newImgTB: newImgTB
    }
  },
  mounted: function () {
  },
  methods: {

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

          if (!permissions.schulleitung) {
            me.hasPermission = false
            return
          } else {
            me.hasPermission = true
            return
          }
        })
      })
    },

    // Method to add new item
    addNewItem: function () {
      var self = this
      this.$root.db('schulleitung').once('value').then(function (snapshot) {
        var mitteilungen = snapshot.val()
        var cnt = mitteilungen.length - 1
        self.items = []

        window.f7.showIndicator()

        self.pushItems(cnt, self, mitteilungen)
      })
    },

    pushItems: function (cnt, self, mitteilungen) {
      if (mitteilungen[cnt].deleted === true) {
        if (cnt === 1) {
          window.f7.hideIndicator()
          return
        }
        return self.pushItems(cnt - 1, self, mitteilungen)
              // Niemals Artikel löschen, sondern deleted = true
      }

      var iconName = mitteilungen[cnt].icon || '0-purple'

      self.$root.store('default-teaser-icons/' + iconName + '.png').getDownloadURL().then(function (url) {
        self.items.push({

          title: mitteilungen[cnt].titel || 'Fehler',
          text: mitteilungen[cnt].text || 'Fehler',
          date: mitteilungen[cnt].datum || 'Fehler',
          icon: url,
          iconname: mitteilungen[cnt].icon,
          image: mitteilungen[cnt].image,
          id: mitteilungen[cnt].link

        })
      }).then(function () {
        if (cnt > 1) {
          self.pushItems(cnt - 1, self, mitteilungen)
        } else {
          window.f7.hideIndicator()
          console.log(self.items)
        }
      })
    },

    editArticle: function (id, title, date, text, icon, image) {
      console.log('Editing', id)

      this.editMode = true

      this.idTB = id
      this.titleTB = title || 'Fehler'
      this.textTB = text.replace(/<br\s*\/?>/mg, '\n') || 'Fehler'
      this.dateTB = date || 'Fehler'
      this.iconTB = icon || '0-purple'
      this.imageTB = image || ''
    },

    newArticle: function () {
      console.log('New Article')

      this.newMode = true

      this.idTB = ''
      this.titleTB = ''
      this.textTB = ''
      this.dateTB = ''
      this.iconTB = '0-purple'
      this.newImgTB = ''
    },

    insertCurrentDate: function () {
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1 // January is 0!
      var yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      today = dd + '.' + mm + '.' + yyyy

      this.dateTB = today
    },

    selectIcon: function () {
      this.iconMode = true
    },

    updateIcon: function (icon) {
      this.iconMode = false
      this.iconTB = icon
    },

    updateNewImage: function (event) {
      var file = event.target.files[0]

      if (this.isImageUpdated) {
        window.f7.alert('Das Bild wurde bereits einmal hochgeladen (oder es wurde abgebrochen). Wenn Du ein anderes Bild benutzten möchtest, veröffentliche diesen Artikel (oder klicke auf Abbrechen) und wähle ihn erneut zum Bearbeiten aus, oder erstelle ihn neu.', '⚙️ Nicht möglich')
        return
      }

      this.isImageUpdated = true

      if (this.hasPermission === false) {
        window.f7.alert('Du hast keine Berechtigung, um dies zu tun!', '⚙️ Abgebrochen')
        return
      }

      if (!this.checkValidFiletype(file)) {
        window.f7.alert('Dieser Dateityp (' + file.type + ') wird nicht unterstüzt!', '⚙️ Abgebrochen', () => { window.location.reload() })
        return
      }

      window.f7.prompt('Gib dem Bild einen Dateinamen. (Bitte behalte die gleiche Dateiendung bei, also ändere nicht .png auf .jpg oder Sonstiges!)<br />Wenn du den Original-Dateinamen <b>' + file.name + '</b> behalten möchtest, lass das Feld einfach frei.', (input) => {
        var self = this

        input = input || file.name

        window.f7.confirm('Möchtest Du dieses Bild hochladen?<br /><img src=' + window.URL.createObjectURL(file) + ' width="230" /><br />' + input + ' [' + self.getFilesize(file) + ']<br /><br /><b>Achtung:</b> Wenn du das Bild hochlädst wird es automatisch aktualisiert, auch schon bevor du auf Artikel veröffentlichen klickst!', () => {
          self.uploadNewImage(file, input)
        }, () => {
          window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen', () => { window.location.reload() })
        })
      }, () => {
        window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen', () => { window.location.reload() })
      })
    },

    uploadNewImage: function (file, name) {
      window.f7.showIndicator()

      var self = this

      var currentYear = new Date().getFullYear()

      var uploadTask = this.$root.store('artikel-bilder/' + currentYear + '/' + name).put(file)

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
            window.f7.alert('Es fehlen Recht zum Hochladen.', '⚙️ Abgebrochen')
            break

          case 'storage/canceled':
            window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen')
            break

          case 'storage/unknown':
            window.f7.alert('Es ist ein unbekannter Fehler aufgetreten. Versuche es später erneut.', '⚙️ Abgebrochen')
            break
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        var newImgUrl = uploadTask.snapshot.downloadURL
        console.log(newImgUrl)

        self.updateTB(newImgUrl)

        window.f7.hideIndicator()
        window.f7.alert('Das Bild wurde hochgeladen!', '⚙️ Erfolg')
      })
    },

    updateTB: function (newImgUrl) {
      this.newImgTB = newImgUrl
    },

    updateImageDisplay: function (event) {
      var file = event.target.files[0]

      if (this.isImageUpdated) {
        window.f7.alert('Das Bild wurde bereits einmal aktualisiert (oder es wurde abgebrochen). Wenn Du ein anderes Bild benutzten möchtest, veröffentliche diesen Artikel (oder klicke auf Abbrechen) und wähle ihn erneut zum Bearbeiten aus.', '⚙️ Nicht möglich')
        return
      }

      this.isImageUpdated = true

      if (this.hasPermission === false) {
        window.f7.alert('Du hast keine Berechtigung, um dies zu tun!', '⚙️ Abgebrochen')
        return
      }

      if (!this.checkValidFiletype(file)) {
        window.f7.alert('Dieser Dateityp (' + file.type + ') wird nicht unterstüzt!', '⚙️ Abgebrochen', () => { window.location.reload() })
        return
      }

      window.f7.prompt('Gib dem Bild einen Dateinamen. (Bitte behalte die gleiche Dateiendung bei, also ändere nicht .png auf .jpg oder Sonstiges!)<br />Wenn du den Original-Dateinamen <b>' + file.name + '</b> behalten möchtest, lass das Feld einfach frei.', (input) => {
        var self = this

        input = input || file.name

        window.f7.confirm('Möchtest Du dieses Bild hochladen?<br /><img src=' + window.URL.createObjectURL(file) + ' width="230" /><br />' + input + ' [' + self.getFilesize(file) + ']<br /><br /><b>Achtung:</b> Wenn du das Bild hochlädst wird es automatisch aktualisiert, auch schon bevor du auf Artikel veröffentlichen klickst!', () => {
          self.uploadImage(file, input)
        }, () => {
          window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen', () => { window.location.reload() })
        })
      }, () => {
        window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen', () => { window.location.reload() })
      })
    },

    uploadImage: function (file, name) {
      window.f7.showIndicator()

      var self = this

      var currentYear = new Date().getFullYear()

      var uploadTask = this.$root.store('artikel-bilder/' + currentYear + '/' + name).put(file)

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
            window.f7.alert('Es fehlen Recht zum Hochladen.', '⚙️ Abgebrochen')
            break

          case 'storage/canceled':
            window.f7.alert('Das Hochladen wurde durch Dich abgebrochen.', '⚙️ Abgebrochen')
            break

          case 'storage/unknown':
            window.f7.alert('Es ist ein unbekannter Fehler aufgetreten. Versuche es später erneut.', '⚙️ Abgebrochen')
            break
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        var newImgUrl = uploadTask.snapshot.downloadURL
        console.log(newImgUrl)

        self.updateImageUrl(newImgUrl)

        window.f7.hideIndicator()
        window.f7.alert('Das Bild wurde hochgeladen und wird im Artikel automatisch ersetzt!', '⚙️ Erfolg')
      })
    },

    updateImageUrl: function (newImgUrl) {
      var self = this

      this.$root.db('schulleitung/' + this.idTB).once('value').then(function (snapshot) {
        var mitteilung = snapshot.val()
        self.uploadNewImgUrl(newImgUrl, mitteilung)
      })
    },

    uploadNewImgUrl: function (newImgUrl, oldInfo) {
      this.$root.db('schulleitung/' + this.idTB).set({
        image: newImgUrl,
        titel: oldInfo.titel,
        text: oldInfo.text,
        icon: oldInfo.icon,
        link: oldInfo.link,
        datum: oldInfo.datum
      })
    },

    showCurrentImage: function () {
      this.$root.db('schulleitung/' + this.idTB).once('value').then(function (snapshot) {
        var val = snapshot.val()

        window.f7.alert('Dieses Bild wird beim Artikel momentan angezeigt:<br /><img src=' + val.image + ' width="230" />')
      })
    },

    checkValidFiletype: function (file) {
      var fileTypes = [
        'image/png',
        'image/jpeg'
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
    },

    publishEditedArticle: function () {
      console.log('Publishing Edited Article')

      window.f7.showIndicator()

      var self = this

      this.$root.db('schulleitung/' + this.idTB).once('value').then(function (snapshot) {
        var mitteilung = snapshot.val()
        self.uploadEditedArticle(mitteilung.image)
      })
    },

    publishNewArticle: function () {
      console.log('Publishing New Article')

      if (this.titleTB === '' || this.textTB === '' || this.dateTB === '') {
        window.f7.alert('Alle Felder müssen ausgefüllt sein (außer Bild)!', '⚙️ Fehler')
        return
      }

      window.f7.showIndicator()

      var self = this

      this.$root.db('schulleitung').once('value').then(function (snapshot) {
        var mitteilungen = snapshot.val()
        var lastMitteilung = mitteilungen[mitteilungen.length - 1]
        var newArticleId = lastMitteilung.link + 1

        self.uploadNewArticle(newArticleId)
      })
    },

    uploadEditedArticle: function (image) {
      var updateInfo = {
        titel: this.titleTB,
        text: this.textTB.replace(/\n/g, '<br />'),
        datum: this.dateTB,
        icon: this.iconTB,
        image: image,
        link: this.idTB
      }

      var self = this

      this.$root.db('schulleitung/' + this.idTB).set(updateInfo).then(() => {
        window.f7.hideIndicator()

        var me = self

        window.f7.alert('Der Artikel wurde erfolgreich veröffentlicht!', '⚙️ Erfolg', () => {
          me.cancelEditingArticle()

          me.$root.db('log/' + new Date().getTime()).set({
            user: me.$root.user.uid,
            action: 'Updated SL ' + updateInfo.link + ': [TITEL] ' + updateInfo.titel + ' [TEXT] ' + updateInfo.text + ' [IMAGE] ' + updateInfo.image
          })
        })
      }).catch((error) => {
        window.f7.alert('Sorry, etwas ist schiefgelaufen!<br /><br />' + error.message, '⚙️ Fehler')
        window.f7.hideIndicator()
        return
      })
    },

    uploadNewArticle: function (newId) {
      var updateInfo = {
        titel: this.titleTB,
        text: this.textTB.replace(/\n/g, '<br />'),
        datum: this.dateTB,
        icon: this.iconTB,
        image: this.newImgTB || '',
        link: newId
      }

      var self = this

      this.$root.db('schulleitung/' + newId).set(updateInfo).then(() => {
        window.f7.hideIndicator()

        var me = self

        window.f7.alert('Der Artikel wurde erfolgreich erstellt!', '⚙️ Erfolg', () => {
          me.cancelEditingArticle()

          me.$root.db('log/' + new Date().getTime()).set({
            user: me.$root.user.uid,
            action: 'Uploaded SL ' + newId + ': [TITEL] ' + updateInfo.titel + ' [TEXT] ' + updateInfo.text + ' [IMAGE] ' + updateInfo.image
          })
        })
      }).catch((error) => {
        window.f7.alert('Sorry, etwas ist schiefgelaufen!<br /><br />' + error.message, '⚙️ Fehler')
        window.f7.hideIndicator()
        return
      })
    },

    cancelEditingArticle: function () {
      console.log('Cancel Editing Article')

      this.editMode = false
      this.iconMode = false
      this.isImageUpdated = false
      this.newMode = false

      this.idTB = ''
      this.titleTB = ''
      this.textTB = ''
      this.dateTB = ''
      this.iconTB = ''
      this.imageTB = ''
      this.newImg = ''

      window.location.reload()
    },

    deleteArticle: function (id) {
      console.log('Deleting:', id)

      var self = this

      window.f7.confirm('Möchtest du wirklich den Artikel (ID: ' + id + ') löschen?', () => {
        self.$root.db('schulleitung/' + id).update({
          deleted: true,
          titel: 'Dieser Artikel wurde gelöscht',
          text: 'Du siehst diesen Artikel noch, da Du wahrscheinlich eine ältere Version der App hast. Im neusten Update werden gelöschte Artikel nicht mehr angezeigt!',
          datum: '-',
          icon: '0-purple',
          image: ''
        }).then(() => {
          self.$root.db('log/' + new Date().getTime()).set({
            user: self.$root.user.uid,
            action: 'Deleted SL ' + id
          }).then(() => { window.f7.alert('Artikel wurde erfolgreich gelöscht!', () => { window.location.reload() }) })
        })
      })
    }

  }
}

</script>
