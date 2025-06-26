<template>
  <div>
    <div class="text-h4 q-mb-md">Процессор</div>
    <q-input v-model="shopCPUValue" label="Значение" class="my-ipnut" :disable="true" />
    <q-input v-model="shopCPUMultiply" label="Множитель" class="my-ipnut" :disable="true" />
    <q-input
      v-model="shopCPUCostMain"
      label="Стоимость процессора"
      class="my-ipnut"
      :disable="true"
    />
    <q-input
      v-model="shopCPUCostMultiply"
      label="Стоимость множителя (в процессорах)"
      class="my-ipnut"
      :disable="true"
    />
    <q-btn color="white" text-color="black" label="Купить" @click="onShopCPUBuyMain" />
    <q-btn color="white" text-color="black" label="Умножить" @click="onShopCPUBuyMultiply" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStoreGame } from 'src/stores/game';

const storeGame = useStoreGame();

const shopCPUValue = computed(() => storeGame.shop.cpu.value.toString());
const shopCPUMultiply = computed(() => storeGame.shop.cpu.multiply.toString());
const shopCPUCostMain = computed(() => storeGame.shop.cpu.cost.main.toString());
const shopCPUCostMultiply = computed(() =>
  storeGame.shop.cpu.cost.multiply.mul(storeGame.shop.cpu.multiply).toString(),
);

const onShopCPUBuyMain = () => {
  if (storeGame.epicNumber.gte(storeGame.shop.cpu.cost.main)) {
    storeGame.epicNumber = storeGame.epicNumber.minus(storeGame.shop.cpu.cost.main);
    storeGame.shop.cpu.value = storeGame.shop.cpu.value.plus(storeGame.shop.cpu.multiply);
  }
};

const onShopCPUBuyMultiply = () => {
  const rent = storeGame.shop.cpu.multiply.mul(storeGame.shop.cpu.cost.multiply);
  if (storeGame.shop.cpu.value.gt(rent)) {
    storeGame.shop.cpu.value = storeGame.shop.cpu.value.minus(rent);
    storeGame.shop.cpu.multiply = storeGame.shop.cpu.multiply.plus(1);
  }
};
</script>
