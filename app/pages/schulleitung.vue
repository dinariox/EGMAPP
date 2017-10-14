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

    #dombro-img {

        height: 120px;
        width: 120px;

        object-fit: cover;

        /*border-radius: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: #ccc;

        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);*/

        border-radius: 50%;
        border: 5px solid #eee;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);

        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);

    }

    #dombro-name {

        position: relative;
        top: 190px;
        font-size: 14pt;
        font-weight: 500;
        width: 100%;
        text-align: center;

    }

    #dombro-rank {

        position: relative;
        top: 174px;
        font-size: 11pt;
        font-weight: 200;
        width: 100%;
        text-align: center;

    }

    #kessler-img {

        height: 120px;
        width: 120px;

        object-fit: cover;

        /*border-radius: 50%;
        border-width: 5px;
        border-style: solid;
        border-color: #ccc;

        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);*/

        border-radius: 50%;
        border: 5px solid #eee;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);

        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);

    }

    #kessler-name {

        position: relative;
        top: 190px;
        font-size: 14pt;
        font-weight: 500;
        width: 100%;
        text-align: center;

    }

    #kessler-rank {

        position: relative;
        top: 174px;
        font-size: 11pt;
        font-weight: 200;
        width: 100%;
        text-align: center;

    }

    #kessler {

        position: absolute;
        left: 50%;
        width: 50%;

    }

    #dombro {

        position: absolute;
        width: 50%;
        left: 0;

    }

    #schulleitung-wrapper {

        width: 100%;
        height: 320px;

    }

    .list-block {

        margin: 16px 0;

    }

</style>


<template>
  <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Schulleitung</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Schulleitung</f7-nav-center>
        </f7-navbar>


        <div class="list-block accordion-list">
            <ul>
                <li class="accordion-item"><a href="#" class="item-content item-link">
                    <div class="item-inner">
                        <div class="item-title" v-bind:style="{ fontSize: bigtextSize }">Über die Schulleitung</div>
                    </div></a>
                    <div class="accordion-item-content">
                        <div class="content-block">
                            <div id="schulleitung-wrapper">

                                <div id="dombro">
                                    <img id="dombro-img" src="../images/dombrowski.jpg">
                                    <p id="dombro-name" v-bind:style="{ fontSize: bigtextSize }">
                                        Sven Dombrowski
                                    </p>

                                    <p id="dombro-rank" v-bind:style="{ fontSize: bigtextSize }">
                                        Schulleiter
                                    </p>
                                </div>

                                <div id="kessler">
                                    <img id="kessler-img" src="../images/kessler.jpg">
                                    <p id="kessler-name" v-bind:style="{ fontSize: bigtextSize }">
                                        Eckhard Kessler
                                    </p>

                                    <p id="kessler-rank" v-bind:style="{ fontSize: bigtextSize }">
                                        Stellv. Schulleiter
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>


        <p class="sub-title" v-bind:style="{ fontSize: bigtextSize }">
            Mitteilungen der Schulleitung
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
        var bigtextSize = ''
        this.addNewItem()
        this.checkTextSize()
        return {
          items: items,
          cancelicon: require('../images/ic_cancel_black_24dp.png'),
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
          this.$root.db('schulleitung').once('value').then(function (snapshot) {
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
