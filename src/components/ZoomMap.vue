<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { toRefs, useVModel } from '@vueuse/core';
import { computed } from 'vue';
import { useAppTheme } from '@/ui/theme/themes';

// 父组件中通过 :v-model:zoomLevel="zoomLevel" 实现双向绑定
const props = defineProps<{ lat: number; lng: number; zoomLevel: number }>();
const emit = defineEmits(['update:zoomLevel']);
const zoomLevel = useVModel(props, 'zoomLevel', emit);
const { lat, lng } = toRefs(props);

// 实时计算 mapImageUrl
const mapImageUrl = computed(() => {
  return `http://api.map.baidu.com/staticimage?center=${lng.value},${lat.value}&width=800&height=600&zoom=${zoomLevel.value}&markers=${lng.value},${lat.value}`;
});

const theme = useThemeVars();
const appTheme = useAppTheme();
</script>

<template>
  <div class="map-container">
    <n-form-item label="Map" label-placement="left" label-width="110" :show-feedback="false">
      <img class="location-map" :src="mapImageUrl" alt="Geo location" referrerpolicy="no-referrer">
    </n-form-item>
    <br>
    <n-form-item class="zoom-level-item" label="Zoom" label-style="color: #666" label-placement="left" label-width="110" :show-feedback="false">
      <n-input-number class="zoom-input" v-model:value="zoomLevel" max="18" min="3" placeholder="Map zoom level (ex: 6)" w-full />
    </n-form-item>
  </div>
</template>

<style lang="less" scoped>
.map-container {
    position: relative;
}
.zoom-level-item {
    position: absolute;
    right: 10px;
    bottom: 30px;
}
.location-map {
    width: 100%;
}
.zoom-input {
    width: 80px;
}
</style>
