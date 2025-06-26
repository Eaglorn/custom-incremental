<template>
  <div>
    <div class="text-h4 q-mb-md">Процессор</div>
    <q-input v-model="value" label="Значение" class="my-ipnut" :disable="true" />
    <q-input v-model="multiply" label="Множитель" class="my-ipnut" :disable="true" />
    <q-input v-model="costMain" label="Основная стоимость" class="my-ipnut" :disable="true" />
    <q-input
      v-model="costMultiply"
      label="Стоимость множителя (в процессорах)"
      class="my-ipnut"
      :disable="true"
    />
    <q-btn color="white" text-color="black" label="Купить" @click="onBuyMain" />
    <q-btn color="white" text-color="black" label="Умножить" @click="onBuyMultiply" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStoreGame } from 'src/stores/game';

const storeGame = useStoreGame();

const value = computed(() => storeGame.shop.cpu.value.toString());
const multiply = computed(() => storeGame.shop.cpu.multiply.toString());
const costMain = computed(() => storeGame.shop.cpu.cost.main.toString());
const costMultiply = computed(() =>
  storeGame.shop.cpu.cost.multiply.mul(storeGame.shop.cpu.multiply).toString(),
);

const onBuyMain = () => {
  if (storeGame.epicNumber.gte(storeGame.shop.cpu.cost.main)) {
    storeGame.epicNumber = storeGame.epicNumber.minus(storeGame.shop.cpu.cost.main);
    storeGame.shop.cpu.value = storeGame.shop.cpu.value.plus(storeGame.shop.cpu.multiply);
  }
};

const onBuyMultiply = () => {
  const rent = storeGame.shop.cpu.multiply.mul(storeGame.shop.cpu.cost.multiply);
  if (storeGame.shop.cpu.value.gt(rent)) {
    storeGame.shop.cpu.value = storeGame.shop.cpu.value.minus(rent);
    storeGame.shop.cpu.multiply = storeGame.shop.cpu.multiply.plus(1);
  }
};
</script>
