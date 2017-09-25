<style scoped>

    #mensa-img {

        width: 100%;
        height: 220px;

        object-fit: cover;
        object-position: center;

        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);

    }

    .buttons {

        width: calc(100% - 32px);
        left: 16px;
        margin-bottom: 8px;

    }

    @media only screen and (min-width: 1000px) {

        #mensa-img {

            height: 360px;

        }

        .buttons {

            width: 300px;
            left: calc(50% - 200px);
            margin-bottom: 8px;

        }

    }

    .mini-text {

        font-size: 9pt;
        color: #858585;

    }

</style>


<template>
    <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Mensaplan</f7-nav-center>
        </f7-navbar>


          <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Mensa</f7-nav-center>
        </f7-navbar>


        <img id="mensa-img" src="../images/mensa-img.jpg">

        <p class="sub-title">Alles rund um unsere Schulmensa</p>


        <p class="text-padding">

            In unserer Schulmensa findest Du jede Mittagspause ein gesundes und abwechslungsreiches Mittagessen. Seit 2010 ist sie mit ihren vielen verschiedenen Verwendungszwecken und ihrer modernen Ausstattung eines der Herzstücke unserer Schule geworden.<br />
            In diesem Menü kannst du Dir das Essens-Angebot der nächsten Woche angucken, oder mit einem Klick dein Mensa-Konto bzw. Abo verwalten.
            Guten Appetit!

        </p>

        <p class="mini-text text-padding">
            Beachte bitte die Mensanummer unserer Schule: <b>597 1344</b>
        </p>

        <br />


        <f7-button class="buttons" big fill color="green" @click="openMensa()">Mensaplan öffnen</f7-button>
        <f7-button class="buttons" big fill color="orange" @click="gotoMensaKonto()">Mensa-Konto</f7-button>

        <div class="list-block accordion-list">
            <ul>
                <li class="accordion-item"><a href="#" class="item-content item-link">
                    <div class="item-inner">
                        <div class="item-title">Der Mensa-Verein</div>
                    </div></a>
                    <div class="accordion-item-content">
                        <div class="content-block">

                            <p class="text-padding">
                                Der Mensaverein ist zuständig für die komplette Organisation der Mensa.
                                <br /><br />
                                Weitere Informationen auf der <f7-button @click="gotoFlyer()">Schulhomepage</f7-button>
                            </p>

                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </f7-page>
</template>

<script>

    export default {

      data: function () {
        return {

        }
      },

      mounted: function () {

      },

      methods: {

            // Der Mensaplan wird in einem Fotobrowser geöffnet
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
        },

        gotoMensaKonto: function () {
          window.location.href = 'https://wegener2.securerwsoft.de/clickmeniw/clickmen.dll/'
        },

        gotoFlyer: function () {
          window.location.href = 'http://www.ev-g-m.de/mensa-verein.html'
        }

      }

    }

</script>
