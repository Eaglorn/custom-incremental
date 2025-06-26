<template>
  <q-page class="row items-center justify-evenly">
    <q-input v-model="epicNumberString" label="Число" class="my-ipnut-full" :disable="true" />
    <br />
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="base" label="Base" />
        <q-tab name="infinity" label="Infinity" />
        <q-tab name="eternity" label="Eternity" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="base" class="q-pa-none">
          <q-splitter v-model="splitterModel" style="height: 100%">
            <template v-slot:before>
              <q-tabs v-model="innerTab" vertical class="text-teal">
                <q-tab name="innerBase" icon="mail" label="Base" />
                <q-tab name="innerInfinity" icon="alarm" label="Infinity" />
                <q-tab name="innerEternity" icon="movie" label="Eternity" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="innerBase">
                  <div class="text-h4 q-mb-md">Base</div>
                  <q-input
                    v-model="epicNumberAddValue"
                    label="Значение"
                    class="my-ipnut"
                    :disable="true"
                  />
                  <q-input
                    v-model="epicNumberAddMultiply"
                    label="Множитель"
                    class="my-ipnut"
                    :disable="true"
                  />
                  <q-input
                    v-model="epicNumberAddCount"
                    label="Количество"
                    class="my-ipnut"
                    :disable="true"
                  />
                  <q-input
                    v-model="epicNumberAddCost"
                    label="Стоимость"
                    class="my-ipnut"
                    :disable="true"
                  />
                  <q-btn
                    color="white"
                    text-color="black"
                    label="Купить"
                    @click="updateEpicNumber"
                  />
                </q-tab-panel>

                <q-tab-panel name="innerInfinity">
                  <div class="text-h4 q-mb-md">Infinity</div>
                </q-tab-panel>

                <q-tab-panel name="innerEternity">
                  <div class="text-h4 q-mb-md">Eternity</div>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="infinity">
          <div class="text-h6">Infinity</div>
        </q-tab-panel>

        <q-tab-panel name="eternity">
          <div class="text-h6">Eternity</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-btn color="white" text-color="black" label="Ускорить" @click="updateTimer" />
    <q-input v-model.number="timerPeriod" label="Период (мс)" type="number" min="100" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import Decimal from 'break_eternity.js';
import { QBtn } from 'quasar';
import type {} from 'components/models';

const tab = ref('mails');
const innerTab = ref('innerMails');
const splitterModel = ref(20);

const epicNumber = ref(new Decimal(1));
const epicNumberString = computed(() => {
  return epicNumber.value.toString();
});

const epicNumberAdd = ref({
  value: new Decimal(1),
  multiply: new Decimal(1),
  count: new Decimal(1),
  cost: new Decimal(50),
});

const epicNumberAddValue = computed(() => {
  return epicNumberAdd.value.value.toString();
});

const epicNumberAddMultiply = computed(() => {
  return epicNumberAdd.value.multiply.toString();
});

const epicNumberAddCount = computed(() => {
  return epicNumberAdd.value.count.toString();
});

const epicNumberAddCost = computed(() => {
  return epicNumberAdd.value.cost.toString();
});

const updateEpicNumber = () => {
  epicNumberAdd.value.count = epicNumberAdd.value.count.plus(1);
  epicNumberAdd.value.cost = epicNumberAdd.value.cost.mul(2);
  epicNumberAdd.value.value = epicNumberAdd.value.value.plus(1);
};

const timerPeriod = ref(1000);

let timerId: ReturnType<typeof setInterval> | null = null;

const startTimer = () => {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    epicNumber.value = epicNumber.value.plus(
      epicNumberAdd.value.value.mul(epicNumberAdd.value.count.mul(epicNumberAdd.value.multiply)),
    );
  }, timerPeriod.value);
};

const updateTimer = () => {
  if (timerPeriod.value > 1) {
    timerPeriod.value -= 100;
  }
  if (timerPeriod.value < 1) {
    timerPeriod.value = 1;
  }
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
  position: absolute
  top: 0
  left: 50%
  .q-field__native, .q-field__input
    text-align: center

.my-ipnut
  min-width: 100px;
</style>
