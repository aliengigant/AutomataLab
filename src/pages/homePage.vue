<template>
  <div class="bg-darkblue">
    <div class="row justify-content-center">
      <div class="bg-primary text-center">
        <div class="red" @click="Counter">
          <h1 class="display-1" style="color: aliceblue">AutomataLab</h1>
          <div>
            <button
              v-if="easterEggCounter > 7"
              id="bottomRightBtn"
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              :data-target="'#easterEggModal'"
            >
              Was ist das?
            </button>
          </div>
          <p class="lead" style="color: aliceblue">Ein Tool für dein Fantasy</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <hr />
      <figure class="text-center">
        <h5 style="color: aliceblue">
          <p class="lead">Über AutomataLab</p>

          Willkommen beim Online-Tool für "Theoretische Informatik und Logik"
          von Professor Dr. Faßbender an der FH Aachen!
          <br />
          <br />
          Diese Webseite ist deine virtuelle Schatzkarte für die faszinierende
          Welt der Automatenlehre und Grammatik.
          <br />
          <br />
          Ob du gerade erst in die Materie eintauchst oder bereits ein
          erfahrener Entdecker bist, hier findest du alles, was du brauchst, um
          die komplexen Konzepte zu verstehen und zu beherrschen.
          <br />
          <br />
          Unser interaktives Tool bietet dir:
        </h5>
      </figure>
      <hr />
    </div>
    <div class="row justify-content-center gy-1">
      <div class="col-md-auto text-center">
        <a href="/automatOverview">
          <div class="card" style="width: 15rem">
            <img src="@/assets/auto.jpg" class="card-img-top" alt="..." />
            <div class="class-body m-3">
              <h5 class="card-title">Automat</h5>
              <p class="card-text">Erstelle deinen Automaten</p>
            </div>
          </div></a
        >
      </div>
      <div class="col-md-auto text-center">
        <a href="/grammatikOverview">
          <div class="card" style="width: 15rem">
            <img src="@/assets/grammatik.jpg" class="card-img-top" alt="..." />
            <div class="class-body m-3">
              <h5 class="card-title">Grammatik</h5>
              <p class="card-text">Erstelle deinen Grammatik</p>
            </div>
          </div></a
        >
      </div>
      <!-- <div class="col-md-auto">
            <div class="card" style="width: 15rem">
              <div class="class-body">
                <img src="@/assets/logo.png" class="card-img-top" alt="..." />
                <h5 class="card-title">Regulärer Ausdruck</h5>
                <p class="card-text">Erstelle deinen Regulärer Ausdruck</p>
                <a class="btn btn-outline-secondary m-2" href="/regAusdruck">Klick</a>
              </div>
            </div>
          </div> -->
    </div>
  </div>
  <div
    class="modal fade"
    id="easterEggModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="easterEggModal"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="easterEggModal">
            Wow, du hast mich gefunden?
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Gibt hier den einzig Wahren Cheat Code ein:</p>
          <div id="fieldsContainer">
            <!-- 8 Felder mit IDs field1 bis field8 -->
            <button id="field1" class="btn btn-outline-primary" @click="addCodeEintrag('←')">←</button>
            <button id="field2" class="btn btn-outline-primary" @click="addCodeEintrag('→')">→</button>
            <button id="field3" class="btn btn-outline-primary" @click="addCodeEintrag('↑')">↑</button>
            <button id="field4" class="btn btn-outline-primary" @click="addCodeEintrag('↓')">↓</button>
            <button id="field5" class="btn btn-outline-primary" @click="addCodeEintrag('A')">A</button>
            <button id="field6" class="btn btn-outline-primary" @click="addCodeEintrag('B')">B</button>
            <button id="field7" class="btn btn-outline-primary" @click="addCodeEintrag('Start')">Start</button>
            <button id="field8" class="btn btn-outline-primary" @click="addCodeEintrag('Select')">Select</button>
          </div>
          <ul class="code-list">
            <li v-for="(string, index) in code" :key="index">{{ string }}</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Bestätigen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const code = ref([]);

const easterEggCounter = ref(0);

function Counter() {
  easterEggCounter.value++;
}

function addCodeEintrag(wert) {
  code.value.push(wert);
  if (code.value.length == 10) {
    console.log("LOL");
  }
}
</script>

<style scoped>
.code-list {
  display: flex; /* Flexbox aktivieren */
  list-style-type: none; /* Aufzählungszeichen entfernen */
  padding: 0; /* Standard-Padding entfernen */
}
.bg-darkblue {
  background: linear-gradient(
    #0d6efd 50%,
    #ffffff 95%
  ); /* Schöner Schwarz-Blau-Ton */
}
.card {
  /* transition: box-shadow 0.3s; */
  transition: 0.3s;
}
.card:hover {
  transform: translate(-12px, -12px);
  box-shadow: 12px 12px 10px rgba(0, 0, 0, 0.35);
}
a,
a:hover,
a:visited,
a:active {
  color: inherit;
  text-decoration: none;
}
</style>
