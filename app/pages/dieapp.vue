<style scoped>

    #help-img {

        width: 100%;
        height: 220px;

        object-fit: cover;
        object-position: center;

        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);

    }

    @media only screen and (min-width: 1000px) {

        #help-img {

            height: 360px;

        }

    }

    .accordion-list {

        margin-top: 0;

    }

    .small-img {

        width: 100%;

    }

    @media only screen and (min-width: 1000px) {

        .small-img {

            width: 350px;

        }

    }

    .center-img {

        text-align: center;

    }


</style>


<template>
  <f7-page>

      <!-- iOS Theme Navbar -->
      <f7-navbar v-if="$theme.ios">
        <f7-nav-left>
          <f7-link icon="icon-bars" open-panel="left"></f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Die App</f7-nav-center>
      </f7-navbar>


      <!-- Material Theme Navbar -->
      <f7-navbar v-if="$theme.material">
        <f7-nav-left>
          <f7-link icon="icon-bars" open-panel="left"></f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Die App</f7-nav-center>
      </f7-navbar>

      <img id="help-img" src="../images/screenshot0.jpg">

      <!-- <p class="sub-title">
          Die Funktionen der EGM-App kurz & knapp
      </p>

      <div class="list-block accordion-list">
          <ul>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">Start</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p class="center-img">

                              <img src="../images/screenshot2.jpg" class="small-img" />

                          </p>
                          <p>
                              Der Startbereich - Hier beginnt Deine Navigation durch die App mit einer Übersicht über den jeweils aktuellsten Beitrag aus den Kategorien Homepage-News, SV und Schulleitung.<br />Außerdem wirst du mit einem (bald zufällig außgewählten) Willkommenstext begrüßt. Wir haben viele Nationalitäten auf unserer Schule, deshalb fragen wir verschiedene Schüler und Lehrer, ob sie einen Willkommenstext auf ihre Muttersprache übersetzen können und zeigen diese dann als Begrüßung an.
                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">Vertretungsplan</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p class="center-img">

                              <img src="../images/screenshot3.jpg" class="small-img" />

                          </p>
                          <p>
                              Endlich kannst Du den Vertretungsplan auch von Zuhause aus betrachten! Sieh Dir alle Deine Freistunden und Vertretungen mit einem "Tap" an!
                              <br />
                              Der Plan ist immer auf dem selben Stand, wie der originale auf den Bildschirmen in der Schule. Wenn morgens ein neuer Plan veröffentlicht wird, wird dieser auf dem App-Server automatisch sortiert, damit du nur die relevanten Infos für deine Stufe siehst.
                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">News</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p class="center-img">

                              <img src="../images/screenshot4.jpg" class="small-img" />

                          </p>
                          <p>
                              Was geht in der Schule momentan so vor sich? Unter dem Reiter "News" findest Du alles Wichtige zum Schulleben am EGM. Hier siehst du die neusten Artikel von der Schulhomepage auf einem Blick. Wenn Dir die Schrift der Artikel zu klein ist, kannst Du sie in den Einstellungen größer einstellen.
                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">Mensaplan</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p class="center-img">

                              <img src="../images/screenshot5.jpg" class="small-img" />

                          </p>
                          <p>
                              Hier findest du jede Woche den aktuellen Speiseplan unserer Mensa! So kannst du schon im Voraus sehen, welche Gerichte es in der Woche gibt.
                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">Schulbereiche</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p class="center-img">

                              <img src="../images/screenshot6.jpg" class="small-img" />

                          </p>
                          <p>
                              Im Bereich „Schulbereiche“ kannst Du jederzeit die neusten Mitteilungen der Schulleitung, sowie Neuigkeiten von der SV und Sharens nachlesen. Am Sharens-Bereich wird im Moment noch mit Hochdruck gearbeitet und wird in einem der nächsten Updates freigeschaltet.
                          </p>
                      </div>
                  </div>
              </li>
          </ul>
      </div> -->



      <p class="sub-title" v-bind:style="{ fontSize: bigtextSize }">
          Tutorials für die Nutzung der App
      </p>



      <div class="list-block accordion-list">
          <ul>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title" v-bind:style="{ fontSize: bigtextSize }">Die App auf Deinem Homescreen</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p v-bind:style="{ fontSize: bigtextSize }">

                              Die App in <b>drei Schritten</b> auf Deinen Homescreen:
                              <br />
                              <br />

                              <ol>
                                  <li>
                                      Öffne Deinen Internetbrowser und gib <b>app.ev-g-m.de</b> in die Suchleiste ein.
                                  </li><br />
                                  <li>
                                      Nutze die Funktion <b>"Teilen"</b> (Bei Android oben rechts bei den drei Punkten zu finden) und wähle <b>"Zum Homebildschirm"</b> bzw. <b>"Zum Homebildschirm hinzufügen"</b> aus.
                                  </li><br />
                                  <li>
                                      Nun kannst Du die App nach Deinem Wunsch <b>benennen</b>, standardmäßig ist "EGM-App" ausgewählt.
                                  </li>
                              </ol>
                              <br />

                              Fertig!

                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title" v-bind:style="{ fontSize: bigtextSize }">Passwort zurücksetzen</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p v-bind:style="{ fontSize: bigtextSize }">

                              Das Passwort zurückzusetzen ist sehr einfach. Hier <b>drei Schritte</b> zu Deinem neuen Passwort:<br /><br />

                              <ol>
                                  <li>
                                      Im Login-Bereich der App findest Du die Schaltfläche <b>Passwort zurücksetzen</b>, tippe auf diese.
                                  </li>
                                  <li><br />
                                      Gebe dort Deine <b>Email-Adresse</b> ein, bestätige und <b>überprüfe</b> Deinen <b>Posteingang</b>.
                                  </li>
                                  <li>
                                      Klicke auf den <b>Link</b> in der Email & überlege Dir ein <b>neues Passwort</b>.
                                  </li><br />
                              </ol>
                              <br />
                              Viel Spaß!


                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title" v-bind:style="{ fontSize: bigtextSize }">App aktualisieren</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p v-bind:style="{ fontSize: bigtextSize }">

                              Es ist möglich, dass Dein Browser App-Daten im Cache speichert, damit nicht jedes mal alles wieder neu heruntergeladen werden muss. Das kann die Folge haben, dass Du evtl. einen älteren Stand der App als deine Freunde/Kollegen hast.<br />
                              In den nächsten Schritten stellen wir einen möglichen Lösungsversuch vor:<br /><br />

                              <ol>
                                  <li>
                                      <b>Entferne</b> die App von Deinem Homescreen.
                                  </li><br />
                                  <li>
                                      <b>Lösche den Cache</b> in deinem Internetbrowser. Bei Safari (iOS) kannst du deinen <b>Verlauf</b> löschen, es wird automatisch der Cache zurückgesetzt. Bei Chrome (Android) auf die drei Punkte oben rechts tippen -> "Verlauf" -> "Browserdaten löschen" -> Haken bei <b>"Bilder und Dateien im Cache"</b> -> "Daten löschen"
                                  </li><br />
                                  <li>
                                      Öffne app.ev-g-m.de und füge die App wieder auf deinen Homescreen hinzu. Siehe Dir dazu das Tutorial "Die App auf Deinem Homescreen" an.
                                  </li>
                              </ol>
                              <br />
                              Viel Erfolg!


                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title" v-bind:style="{ fontSize: bigtextSize }">Scrollen nicht möglich</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p v-bind:style="{ fontSize: bigtextSize }">

                              Leider ist es für uns unmöglich 100% aller Geräte und Browser zu unterstützen, und manche Dinge die im Kern des App-Frameworks sind können wir auch nicht so leicht ändern.<br />Falls Du nicht scrollen kannst, findest Du hier eine mögliche Lösung für das Problem:<br /><br />

                              <ol>
                                  <li>
                                      Google Chrome bietet mit Abstand die beste Unterstützung für alle Geräte. Falls Du Chrome nicht hast, lade es Dir im App Store bzw. Play Store herunter.
                                  </li><br />
                                  <li>
                                      Falls Du die App auf deinem Homescreen hast, entferne sie und öffne app.ev-g-m.de in Chrome. Wenn Du Android benutzt, kannst Du auch mit Chrome die App wieder zum Homescreen hinzufügen.
                                  </li><br />
                                  <li>
                                      Falls das Problem weiterhin besteht, schreibe bitte unseren Support an (Einstellungen -> Support/Fehler melden). Bitte nenne uns, welches Gerät Du benutzt und dazu welchen Browser (wenn nicht Chrome) und welche Version von Android, iOS oder Sonstigem.<br />Wir versuchen ein Lösung zu finden!
                                  </li>
                              </ol>
                              <br />
                              Viel Erfolg!


                          </p>
                      </div>
                  </div>
              </li>
          </ul>
      </div>


      <f7-button big raised color="green" filled @click="gotoYouTube()" v-bind:style="{ fontSize: bigtextSize }">Video Tutorials</f7-button>

      <br /><br />



  </f7-page>
</template>


<script>
    export default {
      data: function () {
        var bigtextSize = ''
        this.checkTextSize()

        return {

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

        gotoYouTube: function () {
          window.location.href = 'https://www.youtube.com/channel/UCVY-O-ZiykZieTlMFx7W4IQ'
        }
      }
    }
  </script>
