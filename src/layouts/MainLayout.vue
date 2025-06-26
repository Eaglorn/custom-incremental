<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary-8 text-white">
      <q-toolbar class="bg-grey-10">
        <q-toolbar-title class="flex items-center">
          <q-icon name="fa-duotone fa-terminal" class="q-mr-md" size="28px" color="grey-4" />
          <span
            class="text-h5 text-weight-bold"
            style="letter-spacing: 2px; text-shadow: 0 2px 8px #2228"
          >
            {{ storeGlobal.app.name }}
          </span>
          <span class="q-ml-sm text-caption text-grey-4" style="font-style: italic">
            v{{ storeGlobal.app.version }}
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useStoreGlobal } from 'src/stores/global';

const storeGlobal = useStoreGlobal();
</script>
