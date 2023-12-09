import { describe, expect, it } from 'vitest';
import { convertHexToText, convertTextToHex } from './text-to-hex.service';

describe('text-to-hex', () => {
  describe('convertTextToHex', () => {
    it('convert text to hex', () => {
      expect(convertTextToHex('Hello, World!', false)).toBe('48656c6c6f2c20576f726c6421');
      expect(convertTextToHex('你a好', true)).toBe('E4BDA061E5A5BD');
    });
    it('convert text to hex with separator', () => {
      expect(convertTextToHex('Hello, World!', false, { separator: ' ' })).toBe('48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21');
      expect(convertTextToHex('你a好', true, { separator: ' ' })).toBe('E4BDA0 61 E5A5BD');
    });
  });
});
