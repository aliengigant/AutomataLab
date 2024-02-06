<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="/automatOverview"
        data-bs-toggle="tooltip"
        title="Zurück zur Übersicht"
      >
        <!--zurück zur Übersicht-->
        <i class="fa-solid fa-arrow-left"></i
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item ml-2">
            <!--Off Canvas für Informationen und Hilfe-->
            <a class="nav-link" aria-current="page" href="#"
              ><i class="fa-solid fa-circle-info"></i> Hilfe</a
            >
          </li>
          <li class="nav-item ml-2">
            <!--Off Canvas für Informationen und Hilfe-->
            <a class="nav-link" aria-current="page" href="#"
              ><i class="fa-solid fa-circle-info"></i> Grammatik Konvetieren</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped></style>
