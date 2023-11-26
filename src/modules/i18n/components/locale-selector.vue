<script setup lang="ts">
const { availableLocales, locale } = useI18n();

const localesLong: Record<string, string> = {
  ar: 'العربية ',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  da: 'Dansk',
  de: 'Deutsch',
  it: 'Italiano',
  nl: 'Nederlands',
  ru: 'Русский',
  pl: 'Polski',
  sv: 'Svenska',
  th: 'ไทย',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  // fa: 'فارسی',
  // he: 'עברית',
  // hi: 'हिन्दी',
  // uk: 'Українська',
};

const localeOptions = computed(() =>
  availableLocales.map(locale => ({
    label: localesLong[locale] ?? locale,
    value: locale,
  })),
);
</script>

<template>
  <c-select
    v-model:value="locale"
    :options="localeOptions"
    placeholder="Select a language"
    w-100px
  />
</template>
