import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

export { textToBase64, base64ToText, isValidBase64, removePotentialDataAndMimePrefix };

function base64Encode(str: string) {
  return Base64.stringify(Utf8.parse(str));
}

function base64Decode(str: string) {
  return Utf8.stringify(Base64.parse(str));
}

function textToBase64(str: string, { makeUrlSafe = false }: { makeUrlSafe?: boolean } = {}) {
  // const encoded = window.btoa(str);
  const encoded = base64Encode(str);
  return makeUrlSafe ? makeUriSafe(encoded) : encoded;
}

function base64ToText(str: string, { makeUrlSafe = false }: { makeUrlSafe?: boolean } = {}) {
  if (!isValidBase64(str, { makeUrlSafe })) {
    throw new Error('Incorrect base64 string');
  }

  let cleanStr = removePotentialDataAndMimePrefix(str);
  if (makeUrlSafe) {
    cleanStr = unURI(cleanStr);
  }

  try {
    const decoded = base64Decode(cleanStr);
    return decoded;
    // return window.atob(cleanStr);
  }
  catch (_) {
    throw new Error('Incorrect base64 string');
  }
}

function removePotentialDataAndMimePrefix(str: string) {
  return str.replace(/^data:.*?;base64,/, '');
}

function isValidBase64(str: string, { makeUrlSafe = false }: { makeUrlSafe?: boolean } = {}) {
  let cleanStr = removePotentialDataAndMimePrefix(str);
  if (makeUrlSafe) {
    cleanStr = unURI(cleanStr);
  }

  try {
    if (makeUrlSafe) {
      // return removePotentialPadding(window.btoa(window.atob(cleanStr))) === cleanStr;
      return removePotentialPadding(base64Encode(base64Decode(cleanStr))) === cleanStr;
    }

    // return window.btoa(window.atob(cleanStr)) === cleanStr;
    return base64Encode(base64Decode(cleanStr)) === cleanStr;
  }
  catch (err) {
    return false;
  }
}

function makeUriSafe(encoded: string) {
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function unURI(encoded: string): string {
  return encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/[^A-Za-z0-9+/]/g, '');
}

function removePotentialPadding(str: string) {
  return str.replace(/=/g, '');
}
