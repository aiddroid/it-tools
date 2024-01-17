import { type MaybeRef, get } from '@vueuse/core';
import QRCodeStyling, { type ErrorCorrectionLevel, type TypeNumber } from 'qr-code-styling'
import type { RequiredOptions } from 'qr-code-styling/lib/core/QROptions';
import { isRef, ref, watch } from 'vue';

export function useQRCodeStyling({
  text,
  image,
  imageOptions: { margin },
  color: { background, foreground },
  qrOptions: { typeNumber, errorCorrectionLevel },
  qrMargin,
  size,
  options,
}: {
  text: MaybeRef<string>
  image?: MaybeRef<string>
  imageOptions: { margin: MaybeRef<number> }
  color: { foreground: MaybeRef<string>; background: MaybeRef<string> }
  qrOptions: { typeNumber: MaybeRef<number>; errorCorrectionLevel: MaybeRef<string> }
  qrMargin: MaybeRef<number>
  size: MaybeRef<number>
  options?: RequiredOptions
}) {
  const qrcode = ref('');
  const qrStyling = ref<QRCodeStyling>();

  watch(
    [text, image, margin, background, foreground, typeNumber, errorCorrectionLevel, qrMargin, size].filter(isRef),
    async () => {
      if (get(text)) {
        const qr = new QRCodeStyling({
          type: 'canvas',
          width: get(size),
          height: get(size),
          data: get(text),
          image: get(image),
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: get(margin),
          },
          dotsOptions: {
            color: get(foreground),
            type: 'rounded',
          },
          backgroundOptions: {
            color: get(background),
          },
          qrOptions: {
            typeNumber: get(typeNumber) as TypeNumber,
            mode: 'Byte',
            errorCorrectionLevel: get(errorCorrectionLevel) as ErrorCorrectionLevel,
          },
          margin: get(qrMargin),
          ...options,
        });

        qrStyling.value = qr;
        // console.log('qrStyling:', qrStyling.value);
        // console.log('qr:', qr);
        // qr.append(document.getElementById('qrcode'));

        const b = await qr.getRawData('png');
        const blobUrl = URL.createObjectURL(b);
        qrcode.value = blobUrl;

      //   qrcode.value = await new QRCodeStyling({
      //     type: 'canvas',
      //     data: get(text),
      //     image: get(image),
      //     imageOptions: {
      //       crossOrigin: 'anonymous',
      //       margin: get(margin),
      //     },
      //     dotsOptions: {
      //       color: get(foreground),
      //       type: 'rounded',
      //     },
      //     backgroundOptions: {
      //       color: get(background),
      //     },
      //     qrOptions: {
      //       typeNumber: get(typeNumber) as TypeNumber,
      //       mode: 'Byte',
      //       errorCorrectionLevel: get(errorCorrectionLevel) as ErrorCorrectionLevel
      //     },
      //     margin: get(qrMargin),
      // }).getRawData('png');
      }
    },
    { immediate: true },
  );

  return { qrStyling, qrcode };
}
