<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';
import { useAppTheme } from '@/ui/theme/themes';
import type { Website } from '@/websites/websites.types';

const props = defineProps<{ website: Website & { category: string } }>();
const { website } = toRefs(props);
const theme = useThemeVars();

const appTheme = useAppTheme();
</script>

<template>
  <a target="_blank" :href="website.url">
    <c-card class="website-card">
      <div flex items-center justify-between>
        <!-- <n-icon class="icon" size="40" :component="website.iconUrl" /> -->
        <!-- <n-image width="100" :src="website.logoUrl" /> -->
        <n-badge :value="website.isHot ? 'Hot' : ''" color="red" :offset="[-10, 10]">
          <n-avatar class="logo" round :size="60" :src="website.logoUrl"/>
        </n-badge>

        <div style="margin-left:10px;width: 90%;">
        <div flex flex-col>
          <n-h3 class="title" flex justify-between>
            <n-ellipsis :line-clamp="1" :tooltip="false">
              {{ website.name }}
            </n-ellipsis>
            <!-- <c-tooltip tooltip="Add to favorites">
              <c-button
                variant="text"
                circle
              >
              <icon-mdi-star />
              </c-button>
            </c-tooltip> -->
          </n-h3>

          <div class="description">
            <n-ellipsis :line-clamp="2" :tooltip="false" style="min-height: 30px">
              {{ website.description }}
              <br>&nbsp;
            </n-ellipsis>
          </div>
        </div>
        <div flex items-center gap-8px>
        </div>
        </div>
      </div>
    </c-card>
  </a>
</template>

<style lang="less" scoped>
a {
  text-decoration: none;
}

.website-card {
  transition: border-color ease 0.5s;
  border-width: 2px !important;
  color: transparent;
  padding: 10px;

  &:hover {
    border-color: v-bind('appTheme.primary.colorHover');
  }

  .icon {
    opacity: 0.6;
    color: v-bind('theme.textColorBase');
  }

  .logo {
    padding: 0;
    border: 1px solid #eee;
  }

  .title {
    display: flex;
    // justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    font-size: 14px;
    margin: 0;
  }

  .description {
    font-size: 12px;
    opacity: 0.6;
    color: v-bind('theme.textColorBase');
    // margin: 5px 0;
  }
}
</style>
