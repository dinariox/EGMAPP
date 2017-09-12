<style scoped>

    .newest {

        display: flex;

        cursor: pointer;

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

    .text-p {

        padding-right: 8px;
        max-height: 70px;
        overflow-y: hidden;

    }

</style>


<template>
  <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>SV</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>SV</f7-nav-center>
        </f7-navbar>


        <p class="sub-title">
            SV Mitteilungen
        </p>


        <f7-list class="big-list">
            <f7-list-item v-for="item in items" v-on:click="open(item.title, item.text, item.date, item.image)">
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
                        <p class="text-p">
                            {{item.textshort}}
                        </p>

                    </div>

                </div>
            </f7-list-item>
        </f7-list>




  </f7-page>
</template>


<script>
    export default {
      data: function () {
        var items = []
        this.addNewItem()
        return {
          items: items,
          cancelicon: require('../images/ic_cancel_black_24dp.png')
        }
      },
      mounted: function () {
      },
      methods: {
        // Method to add new item
        addNewItem: function () {
          var self = this
          this.$root.db('sv').once('value').then(function (snapshot) {
            var mitteilungen = snapshot.val()
            var cnt = mitteilungen.length - 1
            self.items = []

            window.f7.showIndicator()

            self.pushItems(cnt, self, mitteilungen)
          })
        },

        pushItems: function (cnt, self, mitteilungen) {
          self.$root.store('default-teaser-icons/' + mitteilungen[cnt].icon + '.png').getDownloadURL().then(function (url) {
            self.items.push({

              title: mitteilungen[cnt].titel,
              text: mitteilungen[cnt].text,
              textshort: mitteilungen[cnt].text.replace(/<\/?[^>]+(>|$)/g, ''), // HTML Tags werden gelöscht
              date: mitteilungen[cnt].datum,
              icon: url,
              image: mitteilungen[cnt].image

            })
          }).then(function () {
            if (cnt > 1) {
              self.pushItems(cnt - 1, self, mitteilungen)
            } else {
              window.f7.hideIndicator()
            }
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

                            <p style="text-align: center;">
                              <img class='popup-image' src=` + image + `>
                            </p>

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
