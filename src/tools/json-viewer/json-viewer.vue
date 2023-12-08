<script setup lang="ts">
import JSON5 from 'json5';
import { useStorage } from '@vueuse/core';
import { formatJson } from './json.models';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const { t } = useI18n();

const inputElement = ref<HTMLElement>();

const rawJson = useStorage('json-prettify:raw-json', '{"hello": "world", "foo": "bar"}');
const indentSize = useStorage('json-prettify:indent-size', 3);
const sortKeys = useStorage('json-prettify:sort-keys', true);
const expandedDeep = useStorage('json-prettify:expanded-deep', 5);
const showIcon = useStorage('json-prettify:show-icon', true);
const showLine = useStorage('json-prettify:show-line', true);
const cleanJson = computed(() => withDefaultOnError(() => formatJson({ rawJson, indentSize, sortKeys }), ''));

const rawJsonValidation = useValidation({
  source: rawJson,
  rules: [
    {
      validator: v => v === '' || JSON5.parse(v),
      message: 'Provided JSON is not valid.',
    },
  ],
});

function unescapeJson() {
  rawJson.value = rawJson.value.replace(/\\"/g, '"');
}
</script>

<template>
  <c-card>
    <div style="flex: 0 0 100%">
      <div flex justify-left gap-3>
        <n-form-item label="Sort keys :" label-placement="left" label-width="100">
          <n-switch v-model:value="sortKeys" />
        </n-form-item>
        <!-- <n-form-item label="Indent size :" label-placement="left" label-width="100" :show-feedback="false">
          <n-input-number v-model:value="indentSize" min="0" max="10" style="width: 100px" />
        </n-form-item> -->
        <n-form-item label="Expanded Deep :" label-placement="left" label-width="135" :show-feedback="false">
          <n-input-number v-model:value="expandedDeep" min="1" max="10" style="width: 100px" />
        </n-form-item>
      </div>
      <!-- <div flex justify-left gap-3>
        <n-form-item label="Show Icon :" label-placement="left" label-width="100">
          <n-switch v-model:value="showIcon" />
        </n-form-item>
        <n-form-item label="Show Line :" label-placement="left" label-width="100">
          <n-switch v-model:value="showLine" />
        </n-form-item>
      </div> -->
    </div>

    <n-form-item
      label="Your raw JSON"
      :feedback="rawJsonValidation.message"
      :validation-status="rawJsonValidation.status"
    >
      <c-input-text
        ref="inputElement"
        v-model:value="rawJson"
        placeholder="Paste your raw JSON here..."
        rows="20"
        multiline
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        monospace
      />
    </n-form-item>
    <div flex justify-center>
      <c-button @click="unescapeJson">
        {{ t('tools.json-prettify.button.unescape') }}
      </c-button>
    </div>
  </c-card>

  <br>

  <c-card>
    <n-form-item label="Prettified version of your JSON">
      <VueJsonPretty v-if="cleanJson" :data="JSON.parse(cleanJson)" :deep="expandedDeep" :show-icon="showIcon" :show-line="showLine" :show-length="true" :show-double-quotes="true" :show-key-value-space="true" />
    </n-form-item>
  </c-card>

  <!-- <c-card>
    <n-form-item label="Prettified version of your JSON">
      <TextareaCopyable :value="cleanJson" language="json" :follow-height-of="inputElement" />
    </n-form-item>
  </c-card> -->
</template>

<style lang="less" scoped>
.result-card {
  position: relative;
  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
