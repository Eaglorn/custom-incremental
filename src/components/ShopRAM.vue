<template>
  <div>
    <div class="text-h4 q-mb-md">Оперативная память</div>
    <q-input v-model="value" label="Значение" class="my-ipnut" :disable="true" />
    <q-input v-model="multiply" label="Множитель" class="my-ipnut" :disable="true" />
    <q-input v-model="costMain" label="Основная стоимость" class="my-ipnut" :disable="true" />
    <q-input
      v-model="costMultiply"
      label="Стоимость множителя (в оперативной памяти)"
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

const value = computed(() => storeGame.shop.ram.value.toString());
const multiply = computed(() => storeGame.shop.ram.multiply.toString());
const costMain = computed(() => storeGame.shop.ram.cost.main.toString());
const costMultiply = computed(() =>
  storeGame.shop.ram.cost.multiply.mul(storeGame.shop.ram.multiply).toString(),
);

const onBuyMain = () => {
  if (storeGame.epicNumber.gte(storeGame.shop.ram.cost.main)) {
    storeGame.epicNumber = storeGame.epicNumber.minus(storeGame.shop.ram.cost.main);
    storeGame.shop.ram.value = storeGame.shop.ram.value.plus(storeGame.shop.ram.multiply);
  }
};

const onBuyMultiply = () => {
  const rent = storeGame.shop.ram.multiply.mul(storeGame.shop.ram.cost.multiply);
  if (storeGame.shop.ram.value.gt(rent)) {
    storeGame.shop.ram.value = storeGame.shop.ram.value.minus(rent);
    storeGame.shop.ram.multiply = storeGame.shop.ram.multiply.plus(1);
  }
};
</script>
