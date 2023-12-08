<script setup lang="ts">
import { isValidIpv4 } from './ip-location.service';
import { useValidation } from '@/composable/validation';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
const { t } = useI18n();

const rawIpAddress = ref('');
const ipInfo = ref({});
const zoomLevel = ref(5);

const ipLocationMap = computed(() => {
  if (ipInfo.value && ipInfo.value.longitude && ipInfo.value.latitude) {
    return `http://api.map.baidu.com/staticimage?center=${ipInfo.value.longitude},${ipInfo.value.latitude}&width=800&height=600&zoom=${zoomLevel.value}&markers=${ipInfo.value.longitude},${ipInfo.value.latitude}`;
  } else {
    return null;
  }
});

const rawIpValidation = useValidation({
  source: rawIpAddress,
  // 可输入IP或域名,不再做检测
  rules: [{ message: 'Invalid IP address', validator: ip => true }],
});

const fetchIpInfo = async () => {
  const response = await axios.get('https://itoolkit.app/api/iplocation.php?ip=' + rawIpAddress.value);
  if (response.data) {
    ipInfo.value = response.data.data;
    if (response.data.code === 0 && rawIpAddress.value === '') {
      rawIpAddress.value = ipInfo.value.query || ipInfo.value.ip;
    }
  }
};

onMounted(fetchIpInfo);
</script>

<template>
  <div>
    <c-input-text
      v-model:value="rawIpAddress"
      :label="t('tools.ip-location.ipAddress')"
      placeholder="Input an IP address(or domain), or just click the query button to get current IP..."
      :validation="rawIpValidation"
      clearable
    />

    <div mt-5 flex justify-center gap-3>
        <c-button @click="fetchIpInfo">
          {{ t('tools.ip-location.button.query') }}
        </c-button>
    </div>

    <n-divider />

    <!-- <n-form-item label="Prettified version of your JSON">
      <TextareaCopyable :value="JSON.stringify(ipInfo)" language="json" :follow-height-of="inputElement" />
    </n-form-item> -->

    <input-copyable
      v-for="[ label, value ] of Object.entries(ipInfo)"
      :key="label"
      :label="label"
      label-position="left"
      label-width="110px"
      label-align="right"
      mb-2
      :value="value"
      readonly
      placeholder="N/A"
    />

  <n-divider/>
  <n-form-item label=" " label-placement="left" label-width="110" :show-feedback="false">
      <div style="font-size:12px;font-style:italic;">{{ t('tools.ip-location.geolocationNote') }}</div>
  </n-form-item>

  <div v-if="ipLocationMap">
    <n-form-item label="Map" label-placement="left" label-width="110" :show-feedback="false">
      <img class="location-map" :src="ipLocationMap" alt="Geo location">
    </n-form-item>
    <br>
    <n-form-item label="Zoom level" label-placement="left" label-width="110" :show-feedback="false">
          <n-input-number v-model:value="zoomLevel" max="18" min="3" placeholder="Map zoom level (ex: 6)" w-full />
    </n-form-item>
  </div>
</div>
</template>

<style lang="less" scoped>
.location-map{
  width: 100%;
}
</style>