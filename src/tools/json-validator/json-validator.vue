<script setup lang="ts">
import JSON5 from 'json5';
import { useStorage } from '@vueuse/core';
import * as jsonlint from 'jsonlint';
import { formatJson } from './json-validator.service';
import { withDefaultOnError } from '@/utils/defaults';
import { useValidation } from '@/composable/validation';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const inputElement = ref<HTMLElement>();

const rawJson = useStorage('json-validator:raw-json', '{"hello": world"}');
const indentSize = useStorage('json-validator:indent-size', 4);
const sortKeys = useStorage('json-validator:sort-keys', false);
const cleanJson = computed(() => withDefaultOnError(() => formatJson({ rawJson, indentSize, sortKeys }), ''));

window.jsonlint = jsonlint;
const jsonError = computed(() => {
  try {
    jsonlint.parse(rawJson.value.toString());
    return null;
  }
  catch (e) {
    return e.message;
  }
});

const rawJsonValidation = useValidation({
  source: rawJson,
  rules: [
    {
      validator: v => v === '' || JSON5.parse(v),
      message: 'Provided JSON is not valid.',
    },
  ],
});
</script>

<template>
  <!-- <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px" flex justify-center gap-3>
      <n-form-item label="Sort keys :" label-placement="left" label-width="100">
        <n-switch v-model:value="sortKeys" />
      </n-form-item>
      <n-form-item label="Indent size :" label-placement="left" label-width="100" :show-feedback="false">
        <n-input-number v-model:value="indentSize" min="0" max="10" style="width: 100px" />
      </n-form-item>
    </div>
  </div> -->

  <c-card>
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
        test-id="raw-json-input"
      />
    </n-form-item>
    <n-form-item v-if="jsonError">
      <c-alert type="error" style="width: 100%;">
        <pre class="json-error-message" test-id="json-error-message">{{ jsonError }}</pre>
      </c-alert>
    </n-form-item>
  </c-card>

  <c-card>
    <n-form-item label="Prettified version of your JSON">
      <TextareaCopyable :value="cleanJson" language="json" :follow-height-of="inputElement" />
    </n-form-item>
  </c-card>
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

.json-error-message {
  word-break: break-all;
  white-space: break-spaces;
}
</style>
