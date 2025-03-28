<template>
  <!--Du bist nah dran!-->
  <div class="bg-darkblue justify-content-center">
    <div class="container">
      <div class="row">
        <!--Klick mich 8 mal an-->
        <div class="bg-primary text-center">
          <div class="red" @click="Counter">
            <div class="display-2 text-info">AutomataLab</div>
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
            <p class="lead" style="color: aliceblue">
              Ein Tool für dein Fantasy
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <hr />
        <figure class="text-center">
          <h5 style="color: aliceblue">
            <p class="lead">Über AutomataLab</p>
            Willkommen beim Online-Tool für "Theoretische Informatik und
            Logik" von Professor Dr. Faßbender an der FH Aachen!
            <br />
            <br />
            Diese Webseite ist deine virtuelle Schatzkarte für die faszinierende
            Welt der Automatenlehre und Grammatik.
            <br />
            <br />
            Ob du gerade erst in die Materie eintauchst oder bereits ein
            erfahrener Entdecker bist, hier findest du alles, was du brauchst,
            um die komplexen Konzepte zu verstehen und zu beherrschen.
            <br />
            <br />
            <div class="text-info">
              Unser interaktives Tool bietet dir:
            </div>
          </h5>
        </figure>
        <hr />
      </div>
      <div class="row justify-content-center">
        <div class="col-md-auto text-center">
          <a href="/automatOverview">
            <div class="card" style="width: 12rem">
              <img src="@/assets/auto.jpg" class="card-img-top" alt="..." />
              <div class="class-body m-3">
                <h5 class="card-title">Automat</h5>
                <p class="card-text">Erstelle deinen Automaten</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-auto text-center">
          <a href="/grammatikOverview">
            <div class="card" style="width: 12rem">
              <img
                src="@/assets/grammatik.jpg"
                class="card-img-top"
                alt="..."
              />
              <div class="class-body m-3">
                <h5 class="card-title">Grammatik</h5>
                <p class="card-text">Erstelle deinen Grammatik</p>
              </div>
            </div>
          </a>
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
      <!--Du bist Falsch hier, such ein Weg diesen Modal zu triggern =>-->
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
              <button
                id="field1"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('←', 0)"
              >
                ←
              </button>
              <button
                id="field2"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('→', 1)"
              >
                →
              </button>
              <button
                id="field3"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('↑', 2)"
              >
                ↑
              </button>
              <button
                id="field4"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('↓', 3)"
              >
                ↓
              </button>
              <button
                id="field5"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('A', 4)"
              >
                A
              </button>
              <button
                id="field6"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('B', 5)"
              >
                B
              </button>
              <button
                id="field7"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('Start', 6)"
              >
                Start
              </button>
              <button
                id="field8"
                class="btn btn-outline-primary"
                @click="addCodeEintrag('Select', 7)"
              >
                Select
              </button>
            </div>
            <ul class="code-list">
              <li v-for="(string, index) in codeLabel" :key="index">
                {{ string }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Bestätigen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
const codeLabel = ref([]);
const code = ref([]);

const easterEggCounter = ref(0);

function Counter() {
  easterEggCounter.value++;
}

function addCodeEintrag(wert, id) {
  code.value.push(id);
  codeLabel.value.push(wert);

  const correctCode = [2, 2, 3, 3, 0, 1, 0, 1, 5, 4];
  if (code.value.length === correctCode.length) {
    if (code.value.every((val, index) => val === correctCode[index])) {
      alert("Du hast den Cheat Code gefunden!");
      router.push("/video");
    } else {
      alert("Falscher Code");
    }
    code.value = []; // Array leeren
    codeLabel.value = []; // Array leeren
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
    #000000 50%,
    #ffffff 95%
  ); /* Schöner Schwarz-Blau-Ton */
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 0;
  position: relative;
}
.card:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 124px rgb(64, 190, 169);
  z-index: 10; /* damit sie über andere Cards schwebt */
  border: 2px solid #40BEAA;
}
a,
a:hover,
a:visited,
a:active {
  color: inherit;
  text-decoration: none;
}
</style>
