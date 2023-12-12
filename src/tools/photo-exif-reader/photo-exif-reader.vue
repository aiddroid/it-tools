<script setup lang="ts">
import * as ExifReader from 'exifreader';
import { formatBytes } from '@/utils/convert';

const { t } = useI18n();

const photoExifInfo = ref({});
const status = ref<'idle' | 'parsed' | 'error' | 'loading'>('idle');
const file = ref<File | null>(null);

const imageData = ref('');
const zoomLevel = ref(6);

async function onVerifyClicked(uploadedFile: File) {
  status.value = 'loading';

  file.value = uploadedFile;
  try {
    const tags = await ExifReader.load(uploadedFile);
    photoExifInfo.value = tags;
    status.value = 'parsed';

    const reader = new FileReader();
    reader.onload = (event) => {
      imageData.value = event.target.result;
    };
    reader.readAsDataURL(uploadedFile);
  }
  catch (e) {
    photoExifInfo.value = {};
    status.value = 'error';
  }
}
</script>

<template>
  <div>
    <c-file-upload :title="t('tools.photo-exif-reader.label.drapOrDropHere')" accept="image/*" @file-upload="onVerifyClicked" />
    <n-divider />
    <img v-if="imageData" id="photo-preview" :src="imageData" alt="Photo Preview">

    <n-divider />

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
        Please wait, reading the exif information...
      </c-alert>
    </div>
    <div v-else-if="status === 'error'">
      <c-alert mt-4>
        Reading exif information error for your provided photo.
      </c-alert>
    </div>

    <div v-if="status === 'parsed' && photoExifInfo" style="flex: 0 0 100%" mt-5 flex flex-col gap-4>
      <input-copyable
        v-for="[label, value] of Object.entries(photoExifInfo)"
        :key="label"
        :label="label"
        label-position="left"
        label-width="200px"
        label-align="right"

        :value="value.description"
        readonly mb-2
        placeholder="N/A"
        :test-id="label"
      />

      <zoom-map v-if="photoExifInfo.GPSLatitude" :lat="photoExifInfo.GPSLatitude.description" :lng="photoExifInfo.GPSLongitude.description" v-model:zoom-level="zoomLevel" />
    </div>
  </div>
</template>

<style lang="less" scoped>
#photo-preview {
  width: 600px;
}
</style>
