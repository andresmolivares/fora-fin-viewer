<script setup lang="ts">
import { toggleTheme, appTheme } from "./helpers/helpers";

// function onClick() {
//   toggleTheme();
// }
</script>

<template>
  <v-responsive class="w-100">
    <v-app :theme="appTheme" class="w-100">
      <!-- <v-app-bar>
        <v-spacer></v-spacer>

        <v-btn :prepend-icon="appTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text="Toggle Theme" slim @click="onClick"></v-btn>
      </v-app-bar> -->

      <v-main class="w-100">
        <div class="w-100 ma-pa-6">
          <router-view />
        </div>
      </v-main>
    </v-app>
  </v-responsive>
</template>
