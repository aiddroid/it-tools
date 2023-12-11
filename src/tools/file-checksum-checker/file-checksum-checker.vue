<script setup lang="ts">
import { read } from 'node:fs';
import * as CryptoJS from 'crypto-js';
import type { FileChecksumInfo } from './pdf-signature-checker.service';
import { formatBytes } from '@/utils/convert';

const { t } = useI18n();

const fileChecksumInfo = ref<FileChecksumInfo[]>([]);
const status = ref<'idle' | 'parsed' | 'error' | 'loading'>('idle');
const file = ref<File | null>(null);

async function onVerifyClicked(uploadedFile: File) {
  status.value = 'loading';

  file.value = uploadedFile;
  const fileBuffer = await uploadedFile.arrayBuffer();
  // console.log('file:', uploadedFile, fileBuffer, typeof fileBuffer);
  try {
    const wordArray = CryptoJS.lib.WordArray.create(fileBuffer);
    const md5 = CryptoJS.MD5(wordArray).toString();
    const sha1 = CryptoJS.SHA1(wordArray).toString();
    const sha256 = CryptoJS.SHA256(wordArray).toString();
    // const sha512 = CryptoJS.SHA512(wordArray).toString();
    // console.log(md5, sha1, sha256, sha512);

    fileChecksumInfo.value = { md5, sha1, sha256 };
    status.value = 'parsed';
  }
  catch (e) {
    fileChecksumInfo.value = {};
    status.value = 'error';
  }
}
</script>

<template>
  <div>
    <c-file-upload :title="t('tools.file-checksum-checker.label.drapOrDropHere')" accept="*" @file-upload="onVerifyClicked" />

    <c-card v-if="file" mt-4 gap-2>
      <div>
        File name: {{ file.name }}
      </div>
      <div>
        File size: {{ formatBytes(file.size) }}
      </div>
      <div>
        File type: {{ file.type }}
      </div>
      <div>
        Last modified at: {{ file.lastModifiedDate }}
      </div>
    </c-card>

    <div v-if="status === 'loading'">
      <c-alert mt-4>
        Please wait, calculating the checksums...
      </c-alert>
    </div>
    <div v-else-if="status === 'error'">
      <c-alert mt-4>
        Calculate checksums error for your provided file.
      </c-alert>
    </div>

    <div v-if="status === 'parsed' && fileChecksumInfo" style="flex: 0 0 100%" mt-5 flex flex-col gap-4>
      <input-copyable
        v-for="[label, value] of Object.entries(fileChecksumInfo)"
        :key="label"
        :label="label"
        label-position="left"
        label-width="110px"
        label-align="right"

        :value="value"
        readonly mb-2
        placeholder="N/A"
        :test-id="label"
      />
    </div>
  </div>
</template>
