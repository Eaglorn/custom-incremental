<template>
  <router-view />
</template>

<script setup lang="ts">
import { Loading, QSpinnerGrid } from 'quasar';

Loading.setDefaults({
  delay: 100,
  spinner: QSpinnerGrid,
  spinnerSize: 250,
  spinnerColor: 'blue-9',
  backgroundColor: 'brown-7',
});
</script>
