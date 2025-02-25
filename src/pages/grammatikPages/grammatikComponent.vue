<template>
  <div class="video-container">
    <video autoplay>
      <source :src="video" type="video/mp4" />
      Dein Browser unterstützt das Video-Tag nicht.
    </video>
  </div>
</template>

<script setup>
import video from '@/assets/Epic.mp4'
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black;
}
video {
  width: 100%;
  max-height: 90vh;
}
</style>
