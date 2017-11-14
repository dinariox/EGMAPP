
<style scoped>

    @import url('https://fonts.googleapis.com/css?family=Indie+Flower');

    .newest {

        margin: 20px 16px;

        display: flex;

        cursor: pointer;

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

    .text-p {

        padding-right: 8px;
        font-size: 12pt;
        max-height: 70px;
        overflow-y: hidden;

    }


    #welcome-img {

        width: 100%;
        height: 220px;

        object-fit: cover;

        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);

    }

    @media only screen and (min-width: 1000px) {

        #welcome-img {

            height: 360px;

        }

    }

    #welcome-div {

        padding: 0;
        margin: 0;

        padding-left: 20px;
        padding-right: 20px;

    }

    #welcome-text {

        font-size: 19pt;
        padding-bottom: 0;
        margin-bottom: 0;
        margin-top: 18px;
        line-height: 20pt;
        font-family: 'Indie Flower', cursive;

    }

    #welcome-author {

        color: #888;
        font-size: 11pt;
        padding-top: 6px;
        margin-top: 0;

    }

    .bigtext {

        font-size: 30pt;
        color: red;

    }

    .smallerTopMargin {

        margin-top: 12px;

    }



</style>

<template>
    <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>EGM App</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>EGM App</f7-nav-center>
        </f7-navbar>


        <img id="welcome-img" :src="rndBild">


        <div id="welcome-div">

            <p id="welcome-text">
                <!-- Hola.<br />¡Espero que te sientas bien! -->
                <!-- Memnum oldum seni görmeye! -->
                <!-- Hi, how are you today, <span>{{userFirstname}}</span>? -->
                {{rndWillkommenstext}}
            </p>

            <p id="welcome-author" v-bind:style="{ fontSize: bigtextSize }">
                <!-- Paul Handke (EF) - Spanisch -->
                <!-- Meltem Kazan & Zeynel Atas (Q1) -->
                {{rndWillkommenstextAutor}} - {{rndWillkommenstextSprache}}
            </p>

        </div>


        <hr />


        <div id="newswrapper">

            <p class="sub-title smallerTopMargin" v-bind:style="{ fontSize: bigtextSize }">
                Der aktuellste Beitrag von der Homepage
            </p>

            <div class="newest" v-for="item in itemsHP" v-on:click="open(item.title, item.text, item.date, item.image)">

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
                    <p class="text-p">
                        {{item.textshort}}
                    </p>

                </div>

            </div>

            <hr />

            <p class="sub-title smallerTopMargin" v-bind:style="{ fontSize: bigtextSize }">
                Das Neuste von der SV
            </p>

            <div class="newest" v-for="item in itemsSV" v-on:click="open(item.title, item.text, item.date, item.image)">

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
                    <p class="text-p">
                        {{item.textshort}}
                    </p>

                </div>

            </div>

            <hr />

            <p class="sub-title smallerTopMargin" v-bind:style="{ fontSize: bigtextSize }">
                Wichtiges von der Schulleitung
            </p>

            <div class="newest" v-for="item in itemsSL" v-on:click="open(item.title, item.text, item.date, item.image)">

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
                    <p class="text-p">
                        {{item.textshort}}
                    </p>

                </div>

            </div>

        </div>



    </f7-page>
</template>


<script>
    export default {
      data: function () {
        var bigtextEnable = false
        var itemsSV = []
        var itemsSL = []
        var itemsHP = []
        var rndWillkommenstext = ''
        var rndWillkommenstextAutor = ''
        var rndWillkommenstextSprache = ''
        var rndBild = ''
        var userFirstname = ''
        var bigtextSize = ''
        this.checkTextSize()
        this.addNewItem()
        this.randomStartbild()
        this.getUserFirstname()
        this.randomWillkommenstext()
        return {
          bigtextEnable: bigtextEnable,
          itemsSV: itemsSV,
          itemsSL: itemsSL,
          itemsHP: itemsHP,
          cancelicon: require('../images/ic_cancel_black_24dp.png'),
          rndBild: rndBild,
          rndWillkommenstext: rndWillkommenstext,
          rndWillkommenstextAutor: rndWillkommenstextAutor,
          rndWillkommenstextSprache: rndWillkommenstextSprache,
          userFirstname: userFirstname,
          bigtextSize: bigtextSize
        }
      },
      mounted: function () {
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

        // Method to add new item
        addNewItem: function () {
          var self = this
          this.$root.db('news').once('value').then(function (snapshot) {
            var mitteilungen = snapshot.val()
            var anzahlMitteilungen = mitteilungen.length - 1

            while (mitteilungen[anzahlMitteilungen].deleted === true) {
              anzahlMitteilungen--
            }

            self.$root.store('default-teaser-icons/' + mitteilungen[anzahlMitteilungen].icon + '.png').getDownloadURL().then(function (url) {
              self.itemsHP = []
              self.itemsHP.push({

                title: mitteilungen[anzahlMitteilungen].titel,
                text: mitteilungen[anzahlMitteilungen].text,
                textshort: mitteilungen[anzahlMitteilungen].text.replace(/<\/?[^>]+(>|$)/g, ''),
                date: mitteilungen[anzahlMitteilungen].datum,
                icon: url,
                image: mitteilungen[anzahlMitteilungen].image

              })
            })
          })
          this.$root.db('sv').once('value').then(function (snapshot) {
            var mitteilungen = snapshot.val()
            var anzahlMitteilungen = mitteilungen.length - 1

            while (mitteilungen[anzahlMitteilungen].deleted === true) {
              anzahlMitteilungen--
            }

            self.$root.store('default-teaser-icons/' + mitteilungen[anzahlMitteilungen].icon + '.png').getDownloadURL().then(function (url) {
              self.itemsSV = []
              self.itemsSV.push({

                title: mitteilungen[anzahlMitteilungen].titel,
                text: mitteilungen[anzahlMitteilungen].text,
                textshort: mitteilungen[anzahlMitteilungen].text.replace(/<\/?[^>]+(>|$)/g, ''),
                date: mitteilungen[anzahlMitteilungen].datum,
                icon: url,
                image: mitteilungen[anzahlMitteilungen].image

              })
            })
          })
          this.$root.db('schulleitung').once('value').then(function (snapshot) {
            var mitteilungen = snapshot.val()
            var anzahlMitteilungen = mitteilungen.length - 1

            while (mitteilungen[anzahlMitteilungen].deleted === true) {
              anzahlMitteilungen--
            }

            self.$root.store('default-teaser-icons/' + mitteilungen[anzahlMitteilungen].icon + '.png').getDownloadURL().then(function (url) {
              self.itemsSL = []
              self.itemsSL.push({

                title: mitteilungen[anzahlMitteilungen].titel,
                text: mitteilungen[anzahlMitteilungen].text,
                textshort: mitteilungen[anzahlMitteilungen].text.replace(/<\/?[^>]+(>|$)/g, ''), // HTML Tags werden gelöscht
                date: mitteilungen[anzahlMitteilungen].datum,
                icon: url,
                image: mitteilungen[anzahlMitteilungen].image

              })
            })
          })
        },

        getUserFirstname: function () {
          var self = this

          this.$root.db('users/' + this.$root.user.uid).once('value').then(function (snapshot) {
            var userStats = snapshot.val()

            self.userFirstname = userStats.firstname
          })
        },

        randomStartbild: function () {
          var anzahlBilder = 7
          var rnd = Math.floor((Math.random() * anzahlBilder) + 1)

          var bildPath = 'bild' + rnd

          var self = this

          this.$root.store('startbilder/' + bildPath + '.jpg').getDownloadURL().then(function (url) {
            self.rndBild = url
          })
        },

        randomWillkommenstext: function () {
          var self = this

          this.$root.db('willkommenstexte').once('value').then(function (snapshot) {
            var willkommenstexte = snapshot.val()

            var anzahlTexte = willkommenstexte.length - 1
            var rnd = Math.floor((Math.random() * anzahlTexte) + 1)

            var name = self.userFirstname

            self.rndWillkommenstext = (willkommenstexte[rnd].text).replace('[NAME]', name)
            self.rndWillkommenstextAutor = willkommenstexte[rnd].autor
            self.rndWillkommenstextSprache = willkommenstexte[rnd].sprache
          })
        },

        open: function (titel, text, datum, image) {
          var self = this

          this.$root.db('settings/' + this.$root.user.uid).once('value').then(function (snapshot) {
            var settings = snapshot.val()

            if (settings.bigtext === 'false') {
              self.bigtextEnable = false
            } else if (settings.bigtext === 'true') {
              self.bigtextEnable = true
            }
          }).then(function () {
            var myApp = window.f7
            var popupHTML = `

                <div class="popup">

                    <div class="popup-inner">

                        <div class='popup-top'>

                            <p class='popup-title'>

                                ` + titel + `

                            </p>

                            <p><a href="#" class="popup-close close-popup"><i class="material-icons">close</i></a></p>

                        </div>

                        <br />
                        <hr />
                        <br />

                        <p id='popup-text' class='popup-text'>
                            ` + text + `
                        </p>

                    </div>

                  </div>

                `

            if (image !== '' && image !== undefined && image !== null) {
              popupHTML = `

                    <div class="popup">

                        <div class="popup-inner">

                            <div class='popup-top'>

                                <p class='popup-title'>

                                    ` + titel + `

                                </p>

                                <p><a href="#" class="popup-close close-popup"><i class="material-icons">close</i></a></p>

                            </div>

                            <br />
                            <hr />

                            <p style="text-align: center;">
                              <img class='popup-image' src=` + image + `>
                            </p>

                            <hr />
                            <br />

                            <p id='popup-text' class='popup-text'>
                                ` + text + `
                            </p>

                        </div>

                      </div>

                    `
            }
            myApp.popup(popupHTML)

            if (self.bigtextEnable) {
              document.getElementById('popup-text').style.fontSize = '15pt'
            }
          }).catch(function () {
            self.$root.db('settings/' + self.$root.user.uid).set({
              bigtext: 'false'
            })

            window.f7.alert('Bitte Lade die Seite neu', 'Einstellungen wurden nicht richtig konfiguriert')
          })
        }
      }
    }
  </script>
