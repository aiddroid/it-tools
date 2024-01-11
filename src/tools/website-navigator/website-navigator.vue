<script setup lang="ts">
import type Website from '@/websites/websites.types';
import WebsiteCard from '@/components/WebsiteCard.vue';
import { useWebsiteStore } from '@/websites/websites.store';

const websiteStore = useWebsiteStore();
console.log(websiteStore.websitesByCategory);

const capitalize = (str: string) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<template>
  <div style="flex: 0 1 1200px; max-width: 1200px;">
    <n-card title="" style="margin-bottom: 16px">
      <n-tabs type="line">
        <n-tab-pane v-for="category in websiteStore.websitesByCategory" :key="category.name" :name="category.name" :tab="capitalize(category.name)">
          <n-grid x-gap="12" y-gap="12" cols="1 400:2 800:4 1200:6 2000:10">
            <n-gi v-for="website in category.components" :key="website.name">
              <WebsiteCard :website="website" />
            </n-gi>
            <n-gi v-if="!category.components.length">comming soon.</n-gi>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style lang="less" scoped>

</style>

<style lang="less">
.tool-layout {
  margin: 0;
}
.tool-header {
  padding: 15px 0;
}
</style>
