<style scoped>

    .calendar {

        position: relative;
        width: calc(100% - 32px);
        left: 16px;

        background-color: #abc;

    }

    .date-display {

        text-align: center;

    }

    .year {

        font-size: 15pt;

    }

    .c-container {


    }

</style>



<template>
    <f7-page>

        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Schulkalender</f7-nav-center>
        </f7-navbar>


        <!-- Material Theme Navbar -->
        <f7-navbar v-if="$theme.material">
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding>Schulkalender</f7-nav-center>
        </f7-navbar>


        <p class="sub-title">
            Der aktuelle Schulkalender (2017/18)
        </p>

        <div class="calendar">

            <div class="date-display">
                <p class="year">2017</p>
                <p class="month">September</p>
            </div>

            <div class="c-container">

                <div class="day mon">Mo</div>
                <div class="day tue">Di</div>
                <div class="day wed">Mi</div>
                <div class="day thu">Do</div>
                <div class="day fri">Fr</div>
                <div class="day sat">Sa</div>
                <div class="day sun">So</div>

            </div>

        </div>





    </f7-page>
</template>
