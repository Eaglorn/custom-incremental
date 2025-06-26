<template>
  <q-page class="column items-stretch full-width full-height">
    <q-banner
      class="q-mb-md rounded-borders flex justify-center items-center"
      style="font-size: 1.4rem; min-height: 40px; padding: 0.5rem 0"
    >
      <div class="row items-center justify-center q-gutter-md" style="width: 100%">
        <div class="row items-center q-gutter-xs">
          <q-icon name="fa-duotone fa-gauge-high" size="30px" color="primary" />
          <span class="text-weight-bold text-white text-h4" style="letter-spacing: 1px">
            {{ storeGame.epicNumber.toString() }}
          </span>
        </div>
        <q-icon name="fa-solid fa-arrow-right" size="25px" color="grey-5" />
        <div class="row items-center q-gutter-xs">
          <q-icon name="fa-duotone fa-database" size="30px" color="secondary" />
          <span class="text-weight-bold text-white text-h4" style="letter-spacing: 1px">
            {{ storeGame.capacity.plus(storeGame.shop.hard.value).toString() }}
          </span>
        </div>
      </div>
    </q-banner>
    <q-card class="full-width full-height q-pa-none" style="flex: 1 1 0; align-self: stretch">
      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="justify"
        class="text-grey"
      >
        <q-tab name="shop" icon="fa-duotone fa-store" label="Магазин" />
        <q-tab name="research" icon="fa-duotone fa-flask-vial" label="Исследования" />
        <q-tab name="infinity" icon="fa-duotone fa-infinity" label="Бесконечность" />
        <q-tab name="eternity" icon="fa-duotone fa-hourglass-end" label="Вечность" />
        <q-tab name="achievement" icon="fa-duotone fa-trophy-star" label="Достижения" />
        <q-tab name="help" icon="fa-duotone fa-circle-question" label="Помощь" />
        <q-tab name="setting" icon="fa-duotone fa-gear-complex" label="Настройки" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="shop" class="q-pa-none">
          <q-splitter v-model="splitterModel">
            <template v-slot:before>
              <q-tabs v-model="innerShop" vertical class="text-teal">
                <q-tab name="innerCPU" icon="fa-duotone fa-microchip" label="Процессор" />
                <q-tab name="innerHard" icon="fa-duotone fa-hard-drive" label="Жёсткий диск" />
                <q-tab name="innerRAM" icon="fa-duotone fa-memory" label="Оперативная память" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerShop"
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

        <q-tab-panel name="research"></q-tab-panel>
        <q-tab-panel name="infinity"></q-tab-panel>
        <q-tab-panel name="eternity"></q-tab-panel>
        <q-tab-panel name="achievement"></q-tab-panel>
        <q-tab-panel name="help"></q-tab-panel>
        <q-tab-panel name="setting"></q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useStoreGame } from 'src/stores/game';
import ShopCPU from 'src/components/ShopCPU.vue';
import ShopHard from 'src/components/ShopHard.vue';
import ShopRAM from 'src/components/ShopRAM.vue';
import type {} from 'components/models';

const storeGame = useStoreGame();

const tab = ref('shop');
const innerShop = ref('innerCPU');
const splitterModel = ref(20);

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

.q-tabs .q-tab:not(.q-tab--active)
  color: #607d8b !important
</style>
