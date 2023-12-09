export { convertTextToHex, convertHexToText };

function convertTextToHex(text: string, hexUppercase: boolean, { separator = '' }: { separator?: string } = {}): string {
  // 把字符串转换成 hex
  const hexArray = [];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode < 128) {
      hexArray.push(charCode.toString(16).padStart(2, '0'));
    }
    else if (charCode < 2048) {
      hexArray.push(((charCode >> 6) | 192).toString(16).padStart(2, '0'));
      hexArray.push((charCode & 63 | 128).toString(16).padStart(2, '0'));
    }
    else {
      hexArray.push(((charCode >> 12) | 224).toString(16).padStart(2, '0'));
      hexArray.push(((charCode >> 6 & 63) | 128).toString(16).padStart(2, '0'));
      hexArray.push((charCode & 63 | 128).toString(16).padStart(2, '0'));
    }

    if (separator.length > 0 && i < text.length - 1) {
      hexArray.push(separator);
    }
  }

  const hex = hexArray.join('');
  return hexUppercase ? hex.toUpperCase() : hex.toLowerCase();
}

function convertHexToText(hex: string): string {
  // 清楚空格
  const cleanHex = hex.replace(/\s/g, '');

  if (cleanHex.length > 0 && /^[0-9A-Fa-f]+$/i.test(cleanHex) === false) {
    throw new Error('Invalid hex string');
  }

  const strArray = [];
  for (let i = 0; i < cleanHex.length; i += 2) {
    const byte = Number.parseInt(cleanHex.substr(i, 2), 16);
    if (byte < 128) {
      strArray.push(String.fromCharCode(byte));
    } else if (byte >= 192 && byte < 224) {
      strArray.push(String.fromCharCode(((byte & 31) << 6) | (Number.parseInt(cleanHex.substr(i + 2, 2), 16) & 63)));
      i += 2;
    } else {
      strArray.push(String.fromCharCode(((byte & 15) << 12) | ((Number.parseInt(cleanHex.substr(i + 2, 2), 16) & 63) << 6) | (Number.parseInt(cleanHex.substr(i + 4, 2), 16) & 63)));
      i += 4;
    }
  }
  return strArray.join('');
}
