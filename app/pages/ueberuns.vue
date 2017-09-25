<style scoped>

    #team-img {

        width: 100%;
        height: 220px;

        object-fit: cover;
        object-position: center;

        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);

    }

    @media only screen and (min-width: 1000px) {

        #team-img {

            height: 360px;

        }

    }

    .sponsor-img {

        height: 200px;
        width: 200px;

        border-radius: 50%;

        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

        position: relative;
        left: 50%;
        transform: translateX(-50%);

    }

    .center-text {

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
        <f7-nav-center sliding>Über uns</f7-nav-center>
      </f7-navbar>


      <!-- Material Theme Navbar -->
      <f7-navbar v-if="$theme.material">
        <f7-nav-left>
          <f7-link icon="icon-bars" open-panel="left"></f7-link>
        </f7-nav-left>
        <f7-nav-center sliding>Über uns</f7-nav-center>
      </f7-navbar>


      <img id="team-img" src="../images/dasteam.jpg">

      <p class="sub-title">
          Über das EGM-Medienteam
      </p>


      <p class="text-padding">
          Das EGM-Medienteam ist eine Gruppe von Schülern, die sich rund um das Entwerfen & Programmieren Deiner EGM-App und um Teile der Homepage kümmern.
          <br />
          Das Team ist Teil des EGM-Presseteams, welches auch der Initiator des App-Projekts gewesen ist.
          <br /><br />
          Mit Stolz kann man sagen, dass die App ein nahezu 100%-Schüler-Produkt ist 😉
      </p>

      <div class="list-block accordion-list">
          <ul>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">Das Team</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p>
                              <p class="sub-title">
                                  Paul Handke (Q1)
                              </p>
                              <p class="text-padding">
                                  Paul ist der allgemeine Organisator der App. Seit den Überlegungen einer möglichen EGM-App im Jahre 2015 ist er dabei. Er kümmert sich um alles Organisatorische, liefert Ideen und koordiniert,  was in die App hineinkommt, er ist Gründer und Leiter des Medienteams.
                              </p>

                              <p class="sub-title">
                                  Timo Nowak (Q1)
                              </p>
                              <p class="text-padding">
                                  Timo leitet die Programmierung der EGM-App. Er ist mit seinen Mitstreitern dafür verantwortlich, dass alle Ideen und Funktionsentwürfe perfekt in die App integriert werden. So konnten bereits viele Funktionen umgesetzt werden und das Projekt sehr erfolgreich vorangetrieben werden.
                              </p>

                              <p class="sub-title">
                                  Marvin Strangfeld (Abiturient)
                              </p>
                              <p class="text-padding">
                                  Marvin hat den Grundstein für die App gelegt. Nach Gesprächen und Planungen des Presseteams hat er die erste Version der App designt und programmiert. Wichtige Grundfunktionen wie den digitalen Vertretungsplan konnte er umsetzten.
                              </p>

                              <p class="sub-title">
                                  Leon Bromand (Q1)
                              </p>
                              <p class="text-padding">
                                  Leon hat als Redakteur des Teams mit Redaktionsarbeit zu tun. Er ist dafür zuständig, Funktionen der App mit Info-Texten und anderen Beiträgen lebendig zu machen. Darüber hinaus liefert er Unterstützung bei der Organisation.
                              </p>

                              <p class="sub-title">
                                  Ole Beckmann (Q1)
                              </p>
                              <p class="text-padding">
                                  Ole ist ebenfalls in der Redaktion der App aktiv. Er hat außerdem bei der Erstellung der verschiedenen Info-Clips mitgewirkt und kümmert sich jetzt mit um die Aktualisierung und Instandhaltung des Support-Bereichs der App.
                              </p>

                              <p class="sub-title">
                                  Julian Klose (Q1)
                              </p>
                              <p class="text-padding">
                                  Julian ist unser „Multifunktionswerkzeug“. Er hilft bei der Programmierung der App, ist für die Aktualisierung des mittleren Homepagebereichs verantwortlich und hilft auch in der Redaktion aus.
                              </p>

                              <p class="sub-title">
                                  Till Hammer (Q1)
                              </p>
                              <p class="text-padding">
                                  Till unterstützt Timo bei der Programmierung der App. Des Weiteren beschäftigt sich Till mit zusätzlichen noch folgenden Funktionen, die in Zukunft in die App integriert werden.
                              </p>

                              <p class="sub-title">
                                  Ben Leitzbach (Q1)
                              </p>
                              <p class="text-padding">
                                  Ben ist dafür verantwortlich, dass der mittlere Bereich der Homepage immer aktuell ist. Artikel des Presseteams und anderer schulischen Gruppen sind immer ohne großen Zeitverlust zwischen „Schreiben“ und „Erscheinen“ auf der Homepage.
                              </p>
                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">Mitmachen</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <p>
                              Du willst mitmachen? Wir sehen gerne neue Gesichter in unserem Team.
                              <br /><br />
                              Wenn Du jemanden aus unserem Team kennst, sprich ihn einfach an. Alternativ kannst Du uns auch an unsere Support-Email schreiben.
                          </p>
                      </div>
                  </div>
              </li>
              <li class="accordion-item"><a href="#" class="item-content item-link">
                  <div class="item-inner">
                      <div class="item-title">Sponsoren</div>
                  </div></a>
                  <div class="accordion-item-content">
                      <div class="content-block">
                          <div>
                              <p class="sub-title center-text">Evangelisches Gymnasium Meinerzhagen</p>
                              <img src="../images/sponsor-egm.jpg" class="sponsor-img">

                              <p class="sub-title center-text">Lions Club Meinerzhagen-Kierspe</p>
                              <img src="../images/sponsor-lionsclub.jpg" class="sponsor-img">

                              <br /><br />
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
      </div>








  </f7-page>
</template>
