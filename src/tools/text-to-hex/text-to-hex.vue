<script setup lang="ts">
import { convertHexToText, convertTextToHex } from './text-to-hex.service';
import { withDefaultOnError } from '@/utils/defaults';
import { useCopy } from '@/composable/copy';
import { isNotThrowing } from '@/utils/boolean';

const inputText = ref('');
const hexUppercase = useStorage('text-to-hex-uppercase', false);

const hexFromText = computed(() => convertTextToHex(inputText.value, hexUppercase.value));
const { copy: copyHex } = useCopy({ source: hexFromText });

const inputHex = ref('');
const textFromHex = computed(() => withDefaultOnError(() => convertHexToText(inputHex.value), ''));
const inputHexValidationRules = [
  {
    validator: (value: string) => isNotThrowing(() => convertHexToText(value)),
    message: 'HEX should be a valid Hex string, only 0-9 and A-F are allowed',
  },
];
const { copy: copyText } = useCopy({ source: textFromHex });
</script>

<template>
  <c-card title="Text to Hex">
    <c-input-text v-model:value="inputText" multiline placeholder="e.g. 'Hello world'" label="Enter text to convert to Hex" autosize autofocus raw-text test-id="text-to-hex-input" />
    <c-input-text v-model:value="hexFromText" label="Hex from your text" multiline raw-text readonly mt-2 placeholder="The Hex representation of your text will be here" test-id="text-to-hex-output" />
    <n-form-item label="Hex upper case" label-placement="left">
      <n-switch v-model:value="hexUppercase" />
    </n-form-item>
    <div mt-2 flex justify-center>
      <c-button :disabled="!hexFromText" @click="copyHex()">
        Copy Hex to clipboard
      </c-button>
    </div>
  </c-card>

  <c-card title="Hex to text">
    <c-input-text v-model:value="inputHex" multiline placeholder="e.g. '68 65 6C 6C 6F 20 77 6F 72 6C 64'" label="Enter Hex to convert to text" autosize raw-text :validation-rules="inputHexValidationRules" test-id="hex-to-text-input" />
    <c-input-text v-model:value="textFromHex" label="Text from your Hex" multiline raw-text readonly mt-2 placeholder="The text representation of your Hex will be here" test-id="hex-to-text-output" />
    <div mt-2 flex justify-center>
      <c-button :disabled="!textFromHex" @click="copyText()">
        Copy text to clipboard
      </c-button>
    </div>
  </c-card>
</template>
