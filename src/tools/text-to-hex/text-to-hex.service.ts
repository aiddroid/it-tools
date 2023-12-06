export { convertTextToHex, convertHexToText };

function convertTextToHex(text: string, hexUppercase: boolean, { separator = ' ' }: { separator?: string } = {}): string {
  // 把字符串转换成 hex
  const hex = text.split('').map(char => char.charCodeAt(0).toString(16)).join(separator);
  return hexUppercase ? hex.toUpperCase() : hex.toLowerCase();
}

function convertHexToText(hex: string): string {
  if (hex.length > 0 && /^[ 0-9A-Fa-f]+$/.test(hex) === false) {
    throw new Error('Invalid hex string');
  }

  // 把 hex 转换成字符串
  const cleanHex = hex.replace(/ /g, '');

  return cleanHex.split(/(.{2})/).filter(Boolean).map(hex => String.fromCharCode(Number.parseInt(hex, 16))).join('');
}
