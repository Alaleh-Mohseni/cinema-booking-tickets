import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { lsGet, lsSet, lsRemove } from '../../utils/localStorage';

describe('localStorage utilities', () => {
  // Mock localStorage
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('lsSet', () => {
    it('should throw an error if key is not a string', () => {
      expect(() => lsSet(123, 'value')).toThrow('key must be string');
    });

    it('should throw an error if data is not an object when isObject is true', () => {
      expect(() => lsSet('key', 'value', true)).toThrow('data must be Object');
    });

    it('should throw an error if data is an object but isObject is false', () => {
      expect(() => lsSet('key', { foo: 'bar' }, false)).toThrow('data must be string or number');
    });

    it('should call localStorage.setItem with string data', () => {
      lsSet('key', 'value');
      expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value');
    });

    it('should call localStorage.setItem with object data as JSON string when isObject is true', () => {
      const data = { foo: 'bar' };
      lsSet('key', data, true);
      expect(localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify(data));
    });
  });

  describe('lsGet', () => {
    it('should throw an error if key is not a string', () => {
      expect(() => lsGet(123)).toThrow('key must be string');
    });

    it('should return string data from localStorage', () => {
      localStorage.getItem.mockReturnValue('value');
      expect(lsGet('key')).toBe('value');
    });

    it('should return parsed object data from localStorage when isObject is true', () => {
      const data = { foo: 'bar' };
      localStorage.getItem.mockReturnValue(JSON.stringify(data));
      expect(lsGet('key', true)).toEqual(data);
    });

    it('should return an empty object when isObject is true and localStorage is empty', () => {
      localStorage.getItem.mockReturnValue(null);
      expect(lsGet('key', true)).toEqual({});
    });
  });

  describe('lsRemove', () => {
    it('should throw an error if key is not a string', () => {
      expect(() => lsRemove(123)).toThrow('key must be string');
    });

    it('should call localStorage.removeItem', () => {
      lsRemove('key');
      expect(localStorage.removeItem).toHaveBeenCalledWith('key');
    });
  });
});
