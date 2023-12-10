<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { convertTextToRegex, isValidRegex, useRegexGraph } from './regex-visualization-tester.service';
import { withDefaultOnError } from '@/utils/defaults';
import { useCopy } from '@/composable/copy';
import { isNotThrowing } from '@/utils/boolean';
import { useStorage } from '@vueuse/core';

const inputRegexText = ref(useStorage('regex-visualization-tester-input-regex-text', '^(13|14|15|16|17|18|19)\\d{9}$'));
const isIgnoreCase = ref(false);
const isMultiline = ref(false);
const isGlobalMatch = ref(false);
const inputTestText = ref(useStorage('regex-visualization-tester-input-test-text', '13800138000'));

const isMatched = computed(() => withDefaultOnError(() => {
  try {
    const { regex, flags } = convertTextToRegex(inputRegexText.value, isIgnoreCase.value, isMultiline.value, isGlobalMatch.value);
    return (new RegExp(regex, flags)).test(inputTestText.value);
  }
  catch (error) {
    return false;
  }
}));

const regexGraph = ref('');

const inputRegexTextValidationRules = [
  {
    validator: (value: string) => isNotThrowing(() => isValidRegex(value)),
    message: 'Input value should be a valid regex string, please check [] or {} pairs carfully.',
  },
];

const regexGraphId = 'regex-graph';
// 页面加载完成后触发
onMounted(() => {
  useRegexGraph({ inputRegexText, isIgnoreCase, isMultiline, isGlobalMatch, regexGraphId, regexGraph });
});
</script>

<template>
  <div>
    <c-input-text v-model:value="inputRegexText" label="Enter regex for test(without //):" placeholder="e.g. '[0-9A-F]{32}' to match a MD5 checksum." :validation-rules="inputRegexTextValidationRules" multiline autosize clearable raw-text test-id="regex-text-input" />

    <n-form-item label="" label-placement="left">
      <n-checkbox v-model:checked="isIgnoreCase" />&nbsp;Ignore case&nbsp;&nbsp;
      <n-checkbox v-model:checked="isMultiline" />&nbsp;Is multiline&nbsp;&nbsp;
      <n-checkbox v-model:checked="isGlobalMatch" />&nbsp;Is global match&nbsp;&nbsp;
    </n-form-item>

    <c-input-text v-model:value="inputTestText" label="Enter text to test:" multiline clearable raw-text mt-2 placeholder="Input the text to test" test-id="test-text-input" />

    <n-divider />

    <div v-if="isMatched" bg-green class="match-result" test-id="match-result">
      Match result: {{ isMatched }}
    </div>
    <div v-if="!isMatched" bg-red class="match-result" test-id="match-result">
      Match result: {{ isMatched }}
    </div>

    <n-divider />

    <n-form-item label="Regex Graph:">
      <div id="regex-graph" ref="regexGraph" class="regex-graph" />
    </n-form-item>
  </div>
</template>

<style lang="less" scoped>
.regex-graph {
  width: 100%;
  background: #eee;
  overflow-x: scroll;
}
.match-result {
  padding: 5px;
}
</style>
