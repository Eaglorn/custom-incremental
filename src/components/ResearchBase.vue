<template>
  <div class="row q-gutter-xs q-pa-xs">
    <q-card
      v-for="meta in researchMeta"
      :key="meta.key"
      class="research-card compact"
      flat
      bordered
      :class="{
        'active-research': researchingKey === meta.key,
        'inactive-research':
          (researchingKey && researchingKey !== meta.key) ||
          getResearch(meta.key).level >= getResearch(meta.key).maxLevel,
        'completed-research': getResearch(meta.key).level >= getResearch(meta.key).maxLevel,
      }"
    >
      <div
        v-if="getResearch(meta.key).level >= getResearch(meta.key).maxLevel"
        class="completed-banner"
      >
        Завершено
      </div>
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 10]" class="tooltip-desc">
        <div class="tooltip-title">{{ meta.title }}</div>
        <div class="tooltip-text">
          {{ meta.description }}
        </div>
      </q-tooltip>
      <q-card-section class="q-pa-sm card-section-fixed">
        <div class="text-subtitle2">{{ meta.title }}</div>
      </q-card-section>
      <div class="research-bottom q-px-sm q-pt-xs q-pb-none">
        <div class="text-caption text-weight-medium q-mb-xs" style="font-size: 12px">
          Уровень: {{ getResearch(meta.key).level }} / {{ getResearch(meta.key).maxLevel }}
        </div>
        <div class="row items-center q-mb-xs">
          <q-badge color="primary" class="q-mr-xs" style="font-size: 11px">
            {{ getResearch(meta.key)?.cost }}
          </q-badge>
          <q-badge color="secondary" style="font-size: 11px">
            {{ getResearch(meta.key).time }} сек
          </q-badge>
        </div>
        <div v-if="getResearch(meta.key).maxLevel.gt(1)">
          <q-linear-progress
            :value="getResearch(meta.key).level.div(getResearch(meta.key).maxLevel).toNumber()"
            color="green"
            size="6px"
            rounded
          />
        </div>
        <div v-else>
          <q-badge :color="getResearch(meta.key).level ? 'green' : 'grey'" style="font-size: 11px">
            {{ getResearch(meta.key).level ? 'Изучено' : 'Не изучено' }}
          </q-badge>
        </div>
      </div>
      <q-separator spaced class="q-my-xs" />
      <q-card-actions align="right" class="q-pa-none q-mt-auto">
        <q-btn
          :disable="
            (researchingKey && researchingKey !== meta.key) ||
            getResearch(meta.key).level >= getResearch(meta.key).maxLevel
          "
          :color="
            (researchingKey && researchingKey !== meta.key) ||
            getResearch(meta.key).level >= getResearch(meta.key).maxLevel
              ? 'grey-6'
              : 'primary'
          "
          size="sm"
          dense
          :label="
            researchingKey === meta.key && getResearch(meta.key).currentTime.gt(0)
              ? `... ${getResearch(meta.key).currentTime} сек.`
              : 'Улучшить'
          "
          @click="startResearch(meta.key)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStoreGame } from 'src/stores/game';
import Decimal from 'break_eternity.js';
import type { Research } from 'components/models';
import { researchMeta } from 'src/constants/researchMeta';

const storeGame = useStoreGame();

const researchList = storeGame.research.list as Record<string, Research>;

function getResearch(key: string) {
  if (!researchList[key])
    return {
      cost: new Decimal(0),
      currentTime: new Decimal(0),
      time: new Decimal(0),
      bonus: new Decimal(0),
      level: new Decimal(0),
      costMultiply: new Decimal(1),
      timeMultiply: new Decimal(1),
      maxLevel: new Decimal(1),
    };
  return researchList[key];
}

const researchingKey = computed(() => storeGame.research.researchingKey);

function startResearch(key: string) {
  const research = researchList[key];
  if (!research) return;
  if (research.level >= research.maxLevel || researchingKey.value) return;
  if (!storeGame.epicNumber.gte(research.cost)) return;
  storeGame.epicNumber = storeGame.epicNumber.minus(research.cost);
  storeGame.research.researchingKey = key;
  research.currentTime = research.time;

  const interval = setInterval(() => {
    if (research.currentTime.gt(0)) {
      research.currentTime = research.currentTime.minus(1);
    }
    if (research.currentTime.lte(0)) {
      clearInterval(interval);
      research.level = research.level.plus(1);
      research.cost = research.cost.mul(research.costMultiply);
      research.time = research.time.mul(research.timeMultiply);
      storeGame.research.researchingKey = '';
    }
  }, storeGame.timer);
}
</script>

<style lang="sass">
.research-card.compact
  position: relative
  overflow: hidden
  width: 170px
  min-height: 210px
  font-size: 12px
  display: flex
  flex-direction: column
  justify-content: space-between
  transition: box-shadow 0.2s, background 0.2s, opacity 0.2s

.active-research
  background: #2e3646 !important
  box-shadow: 0 0 0 2px #1976d2 inset

.inactive-research
  opacity: 0.5
  filter: grayscale(0.2)

.card-section-fixed
  display: flex
  flex-direction: column
  flex: 0 0 auto
  justify-content: flex-start
  padding-top: 8px !important
  padding-bottom: 0 !important

.research-bottom
  flex: 1 1 auto
  display: flex
  flex-direction: column
  justify-content: flex-end
  min-height: 40px

.text-subtitle2
  min-height: 32px
  max-height: 62px
  overflow: hidden
  text-overflow: ellipsis
  white-space: normal
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  font-weight: bold
  margin-bottom: 10px

.tooltip-desc
  max-width: 240px
  white-space: normal
  font-size: 13px
  line-height: 1.4
  padding: 10px 14px
  border-radius: 10px
  box-shadow: 0 2px 12px 0 rgba(80,100,200,0.10)
  background: rgba(120, 100, 200, 0.70)
  color: #222

.tooltip-title
  font-size: 15px
  font-weight: bold
  margin-bottom: 6px
  color: #222

.tooltip-text
  font-size: 13px
  color: #fff

.q-badge
  padding: 2px 6px

.q-card-actions
  margin-top: 2px
  flex-shrink: 0

.completed-banner
  position: absolute
  top: 50%
  left: 50%
  width: 140%
  transform: translate(-50%, -50%)
  background: rgba(60, 60, 60, 0.40)
  color: #fff
  text-align: center
  font-size: 22px
  font-weight: 900
  letter-spacing: 2px
  z-index: 2
  pointer-events: none
  padding: 12px 0
  box-shadow: 0 2px 12px rgba(0,0,0,0.25)
  user-select: none
  border-radius: 8px
  text-shadow: 0 1px 2px #fff, 0 0 1px #fff, 0 0 2px #fff
</style>
