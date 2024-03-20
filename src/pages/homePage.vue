<template>
  <div class="bg-darkblue">
    <div class="row justify-content-center">
      <div class="bg-primary">
        <div class="red" @click="easterEggCounter++">
          <h1 class="display-1" style="color: aliceblue">Trafo Tool</h1>
          <p class="lead" style="color: aliceblue">Ein Tool für dein Fantasy</p>
        </div>
      </div>
      <div class="row justify-content-center gy-5">
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
              <img
                src="@/assets/grammatik.jpg"
                class="card-img-top"
                alt="..."
              />
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
    <div v-if="easterEggCounter >= 7">
      <p>lol du hast mich gefunden</p>
      <p>Gib nun den einzige wahren Cheat Code ein</p>
      <!-- Div-Container für die Felder -->
      {{ codeString }}
      <div id="fieldsContainer" v-if="code.length < 10">
        <!-- 8 Felder mit IDs field1 bis field8 -->
        <button id="field1" class="field" @click="addCodeEintrag('left')">
          ←
        </button>
        <button id="field2" class="field" @click="addCodeEintrag('right')">
          →
        </button>
        <button id="field3" class="field" @click="addCodeEintrag('up')">
          ↑
        </button>
        <button id="field4" class="field" @click="addCodeEintrag('down')">
          ↓
        </button>
        <button id="field5" class="field" @click="addCodeEintrag('A')">
          A
        </button>
        <button id="field6" class="field" @click="addCodeEintrag('B')">
          B
        </button>
        <button id="field7" class="field" @click="addCodeEintrag('Start')">
          Start
        </button>
        <button id="field8" class="field" @click="addCodeEintrag('Select')">
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const easterEggCounter = ref(0);
const code = ref("");
let codeString = ref("Code eingabe: ");

function addCodeEintrag(wert) {
  code.value += wert;
  codeString.value += wert + ", ";
  if (code.value.length == 10) {
    console.log("LOL")
  }
}
</script>

<style scoped>
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
