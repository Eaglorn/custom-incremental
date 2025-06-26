<template>
  <q-card flat bordered class="q-pa-lg">
    <div class="text-h5 text-weight-bold q-mb-lg text-primary flex items-center">
      <q-icon name="fa-duotone fa-hard-drive" class="q-mr-md" size="32px" />
      Жёсткий диск
    </div>
    <q-form>
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <q-input
            v-model="value"
            label="Значение"
            class="my-ipnut q-mb-md"
            :disable="true"
            dense
            :label-class="'text-weight-bold text-body1'"
            :input-class="'text-h6 text-primary'"
            color="primary"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-gauge" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="multiply"
            label="Множитель"
            class="my-ipnut q-mb-md"
            :disable="true"
            dense
            :label-class="'text-weight-bold text-body1'"
            :input-class="'text-h6 text-primary'"
            color="primary"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-xmark" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="costMain"
            label="Основная стоимость"
            class="my-ipnut q-mb-md"
            :disable="true"
            dense
            :label-class="'text-weight-bold text-body1'"
            :input-class="'text-h6 text-primary'"
            color="primary"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-coins" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="costMultiply"
            label="Стоимость множителя"
            class="my-ipnut q-mb-md"
            :disable="true"
            dense
            :label-class="'text-weight-bold text-body1'"
            :input-class="'text-h6 text-primary'"
            color="primary"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="fa-duotone fa-arrow-up-right-dots" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col-6">
          <q-btn
            color="primary"
            outline
            label="Купить"
            class="full-width"
            @click="onBuyMain"
            size="lg"
          />
        </div>
        <div class="col-6">
          <q-btn
            color="primary"
            outline
            label="Умножить"
            class="full-width"
            @click="onBuyMultiply"
            size="lg"
          />
        </div>
      </div>
    </q-form>
  </q-card>
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
