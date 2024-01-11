import { type MaybeRef, get, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import _ from 'lodash';
import type { Website, WebsiteCategory, WebsiteWithCategory } from './websites.types';
import { websites, websitesByCategory } from './index';

export const useWebsiteStore = defineStore('websites', () => {
  const favoriteWebsitesName = useStorage('favoriteWebsitesName', []) as Ref<string[]>;
  const { t } = useI18n();

  const favoriteWebsites = computed(() => {
    return favoriteWebsitesName.value
      .map(favoriteName => websites.value.find(({ name }) => name === favoriteName))
      .filter(Boolean) as WebsiteWithCategory[]; // cast because .filter(Boolean) does not remove undefined from type
  });

  return {
    websites,
    favoriteWebsites,
    websitesByCategory,
    newWebsites: computed(() => websites.value.filter(({ isNew }) => isNew)),

    addWebsiteToFavorites({ website }: { website: MaybeRef<Website> }) {
      favoriteWebsitesName.value.push(get(website).name);
    },

    removeWebsiteFromFavorites({ website }: { website: MaybeRef<Website> }) {
      favoriteWebsitesName.value = favoriteWebsitesName.value.filter(name => get(website).name !== name);
    },

    isWebsiteFavorite({ website }: { website: MaybeRef<Website> }) {
      return favoriteWebsitesName.value.includes(get(website).name);
    },
  };
});
