<script setup lang="ts">
import type { ErrorCorrectionLevel } from 'qr-code-styling';
import { ref } from 'vue';
import { useQRCodeStyling } from './useQRCodeStyling';
import { useDownloadFileFromBase64 } from '@/composable/downloadBase64';
import { useStorage } from '@vueuse/core';

const { t } = useI18n();

const logoOptions = [
  { label: '', value: '', icon: 'assets/logos/no.png', tooltip: 'None' },
  { label: '', value: 'assets/logos/facebook.png', icon: 'assets/logos/facebook.png' },
  { label: '', value: 'assets/logos/twitter.png', icon: 'assets/logos/twitter.png' },
  { label: '', value: 'assets/logos/whatsapp.png', icon: 'assets/logos/whatsapp.png' },
  { label: '', value: 'assets/logos/snapchat.png', icon: 'assets/logos/snapchat.png' },
  { label: '', value: 'assets/logos/linkedin.png', icon: 'assets/logos/linkedin.png' },
  { label: '', value: 'assets/logos/instagram.png', icon: 'assets/logos/instagram.png' },
  { label: '', value: 'assets/logos/pinterest.png', icon: 'assets/logos/pinterest.png' },
  { label: '', value: 'assets/logos/line.png', icon: 'assets/logos/line.png' },
  { label: '', value: 'assets/logos/telegram.png', icon: 'assets/logos/telegram.png' },
  { label: '', value: 'assets/logos/youtube.png', icon: 'assets/logos/youtube.png' },
  { label: '', value: 'assets/logos/spotify.png', icon: 'assets/logos/spotify.png' },
  { label: '', value: 'assets/logos/wechat.png', icon: 'assets/logos/wechat.png' },
  { label: '', value: 'assets/logos/weibo.png', icon: 'assets/logos/weibo.png' },
  { label: '', value: 'assets/logos/qq.png', icon: 'assets/logos/qq.png' },
  { label: '', value: 'assets/logos/appstore.png', icon: 'assets/logos/appstore.png' },
  { label: '', value: 'assets/logos/playstore.png', icon: 'assets/logos/playstore.png' },
  { label: '', value: 'assets/logos/cashapp.png', icon: 'assets/logos/cashapp.png' },
  { label: '', value: 'assets/logos/paypal.png', icon: 'assets/logos/paypal.png' },
  { label: '', value: 'assets/logos/bitcoin.png', icon: 'assets/logos/bitcoin.png' },
  { label: '', value: 'assets/logos/map.png', icon: 'assets/logos/map.png' },
  { label: '', value: 'assets/logos/pdf.png', icon: 'assets/logos/pdf.png' },
  { label: '', value: 'assets/logos/food.png', icon: 'assets/logos/food.png' },
  { label: '', value: 'assets/logos/scanme.png', icon: 'assets/logos/scanme.png' },
  { label: '', value: 'assets/logos/web.png', icon: 'assets/logos/web.png' },
  { label: '', value: 'assets/logos/call.png', icon: 'assets/logos/call.png' },
  { label: '', value: 'assets/logos/share.png', icon: 'assets/logos/share.png' },
  { label: '', value: 'assets/logos/email.png', icon: 'assets/logos/email.png' },
];
const errorCorrectionLevels = [
  { label: 'L - Low(7%)', value: 'L' },
  { label: 'M - Medium(15%)', value: 'M' },
  { label: 'Q - Quartile(25%)', value: 'Q' },
  { label: 'H - High(30%)', value: 'H' },
];

const text = ref(useStorage('qr-code-generator-text', 'https://itoolkit.app'));
const image = ref(useStorage('qr-code-generator-image', ''));
const margin = ref(useStorage('qr-code-generator-margin', 1));
const foreground = ref(useStorage('qr-code-generator-foreground', '#000000ff'));
const background = ref(useStorage('qr-code-generator-background', '#ffffff00'));
const errorCorrectionLevel = ref<ErrorCorrectionLevel>(useStorage('qr-code-generator-error-correction-level', 'Q'));
const typeNumber = ref(0);
const qrMargin = ref(useStorage('qr-code-generator-qr-margin', 1));

const size = ref(useStorage('qr-code-generator-size', 500));

const { qrStyling, qrcode } = useQRCodeStyling({
  text,
  image,
  imageOptions: { margin },
  color: {
    background,
    foreground,
  },
  qrOptions: {
    typeNumber,
    errorCorrectionLevel,
  },
  qrMargin,
  size,
});

const download = function () {
  // useDownloadFileFromBase64({ source: qrcode, filename: 'qr-code.png' });
  // console.log('downloading...');
  qrStyling.value.download({ name: `qrcode-${size.value}-${(new Date()).toISOString()}`, extention: 'png' });
};
</script>

<template>
  <c-card>
    <n-grid x-gap="12" y-gap="12" cols="1 600:3">
      <n-gi span="2">
        <c-input-text
          v-model:value="text"
          label-position="left"
          label-width="130px"
          label-align="right"
          :label="t('tools.qrcode-generator.label.data')"
          multiline
          rows="3"
          autosize
          clearable
          placeholder="Your link or text..."
        />
        <n-divider />
        <n-form label-width="130" label-placement="left">
          <n-form-item :label="t('tools.qrcode-generator.label.icon')">
            <c-buttons-select v-model:value="image" :options="logoOptions" mb-2 />
          </n-form-item>
          <n-form-item :label="t('tools.qrcode-generator.label.iconUrl')">
            <c-input-text v-model:value="image" type="url" placeholder="Input an URL" clearable />
          </n-form-item>
          <n-form-item :label="t('tools.qrcode-generator.label.iconMargin')" :show-feedback="false">
            <n-slider v-model:value="margin" :step="1" :min="0" :max="50" :disabled="!image" />
          </n-form-item>
          <n-divider />
          <n-form-item :label="t('tools.qrcode-generator.label.foregroundColor')">
            <n-color-picker v-model:value="foreground" :modes="['hex']" />
          </n-form-item>
          <n-form-item :label="t('tools.qrcode-generator.label.backgroundColor')">
            <n-color-picker v-model:value="background" :modes="['hex']" />
          </n-form-item>
          <n-form-item :label="t('tools.qrcode-generator.label.quiteZone')">
            <n-slider v-model:value="qrMargin" :step="1" :min="0" :max="100" />
          </n-form-item>
          <c-select
            v-model:value="errorCorrectionLevel"
            :label="t('tools.qrcode-generator.label.errorResistance')"
            label-position="left"
            label-width="130px"
            label-align="right"
            :options="errorCorrectionLevels"
          />
        </n-form>
      </n-gi>
    </n-grid>
  </c-card>
  <c-card>
    <n-grid x-gap="12" y-gap="12" cols="1 600:3">
      <n-gi>
        <div flex flex-col items-center gap-3>
          <n-image id="qrcode" class="qrcode" :src="qrcode" width="300" style="border: 1px solid #eee;" />
          <!-- <div id="qrcode"></div> -->
          <n-form-item :label="`${t('tools.qrcode-generator.label.downloadSize')} (${size} pixels)`">
            <n-slider v-model:value="size" :step="10" :min="100" :max="1000" />
          </n-form-item>
          <c-button @click="download">
            {{ t('tools.qrcode-generator.button.download') }}
          </c-button>
        </div>
      </n-gi>
    </n-grid>
  </c-card>
</template>
