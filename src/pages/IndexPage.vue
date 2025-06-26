<template>
  <q-page class="column items-stretch full-width full-height">
    <q-input v-model="epicNumberString" class="my-ipnut-full my-number" :disable="true" />
    <q-card class="full-width full-height q-pa-none" style="flex: 1 1 0; align-self: stretch">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="shop" label="Магазин" />
        <q-tab name="research" label="Исследования" />
        <q-tab name="infinity" label="Бесконечность" />
        <q-tab name="eternity" label="Вечность" />
        <q-tab name="achievement" label="Достижения" />
        <q-tab name="setting" label="Настройки" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="shop" class="q-pa-none">
          <q-splitter v-model="splitterModel">
            <template v-slot:before>
              <q-tabs v-model="innerTab" vertical class="text-teal">
                <q-tab name="innerCPU" icon="mail" label="Процессор" />
                <q-tab name="innerHard" icon="mail" label="Жёсткий диск" />
                <q-tab name="innerRAM" icon="mail" label="Оперативная память" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="innerCPU">
                  <ShopCPU />
                </q-tab-panel>
                <q-tab-panel name="innerHard">
                  <ShopHard />
                </q-tab-panel>
                <q-tab-panel name="innerRAM">
                  <ShopRAM />
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="achievement"> </q-tab-panel>

        <q-tab-panel name="setting"> </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStoreGame } from 'src/stores/game';
import ShopCPU from 'src/components/ShopCPU.vue';
import ShopHard from 'src/components/ShopHard.vue';
import ShopRAM from 'src/components/ShopRAM.vue';
import type {} from 'components/models';

const storeGame = useStoreGame();

const tab = ref('shop');
const innerTab = ref('innerCPU');
const splitterModel = ref(20);

const epicNumberString = computed(() => {
  return (
    storeGame.epicNumber.toString() +
    ' / ' +
    storeGame.capacity.plus(storeGame.shop.hard.value).toString()
  );
});

const timerPeriod = ref(1000);

let timerId: ReturnType<typeof setInterval> | null = null;

const startTimer = () => {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    storeGame.epicNumber = storeGame.epicNumber.plus(storeGame.shop.cpu.value);
    storeGame.capacity = storeGame.capacity.plus(storeGame.shop.ram.value);
    const capacityFull = storeGame.capacity.plus(storeGame.shop.hard.value);
    if (storeGame.epicNumber.gt(capacityFull)) {
      storeGame.epicNumber = capacityFull;
    }
  }, timerPeriod.value);
};

watch(timerPeriod, () => {
  startTimer();
});

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<style lang="sass">
.my-ipnut-full
  min-width: 150px
  margin-bottom: 8px
  .q-field__native, .q-field__input
    text-align: center

.my-number
  font-size: 20px;
  color: red

.my-ipnut
  min-width: 100px;

.full-width
  width: 100% !important

.full-height
  height: 100% !important
</style>
