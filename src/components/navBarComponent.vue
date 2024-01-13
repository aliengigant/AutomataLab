<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <h1 class="h1">{{ props.title }}</h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/automatOverview">Automaten</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/grammatik">Grammatik</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/regAusdruck">Regulärer Ausdrücke</a>
          </li>
        </ul>

        <!--ToDo: Beispielsammlung etc. -->
        <a class="nav-link" href="#">Beispiele</a>
      </div>
    </div>
  </nav>

  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Module</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/automat">Automaten</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/grammatik">Grammatik</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/regAusdruck">Regulärer Ausdrücke</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<style></style>
