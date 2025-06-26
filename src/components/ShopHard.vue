<template>
  <div>
    <div class="text-h4 q-mb-md">Жёсткий диск</div>
    <q-input v-model="value" label="Значение" class="my-ipnut" :disable="true" />
    <q-input v-model="multiply" label="Множитель" class="my-ipnut" :disable="true" />
    <q-input v-model="costMain" label="Основная стоимость" class="my-ipnut" :disable="true" />
    <q-input
      v-model="costMultiply"
      label="Стоимость множителя (в жёстких дисках)"
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

const value = computed(() => storeGame.shop.hard.value.toString());
const multiply = computed(() => storeGame.shop.hard.multiply.toString());
const costMain = computed(() => storeGame.shop.hard.cost.main.toString());
const costMultiply = computed(() =>
  storeGame.shop.hard.cost.multiply.mul(storeGame.shop.hard.multiply).toString(),
);

const onBuyMain = () => {
  if (storeGame.epicNumber.gte(storeGame.shop.hard.cost.main)) {
    storeGame.epicNumber = storeGame.epicNumber.minus(storeGame.shop.hard.cost.main);
    storeGame.shop.hard.value = storeGame.shop.hard.value.plus(storeGame.shop.hard.multiply);
  }
};

const onBuyMultiply = () => {
  const rent = storeGame.shop.hard.multiply.mul(storeGame.shop.hard.cost.multiply);
  if (storeGame.shop.hard.value.gt(rent)) {
    storeGame.shop.hard.value = storeGame.shop.hard.value.minus(rent);
    storeGame.shop.hard.multiply = storeGame.shop.hard.multiply.plus(1);
  }
};
</script>
