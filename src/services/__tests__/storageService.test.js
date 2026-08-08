// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getItem,
  setItem,
  removeItem,
  hasItem,
  clearStorage,
} from '../storageService';

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('sets and gets items correctly', () => {
    const testData = { name: 'CareerCraft', version: '1.0' };
    const success = setItem('test_key', testData);
    expect(success).toBe(true);

    const retrieved = getItem('test_key');
    expect(retrieved).toEqual(testData);
    expect(hasItem('test_key')).toBe(true);
  });

  it('returns fallback value if key does not exist', () => {
    const retrieved = getItem('non_existent_key', 'fallback_value');
    expect(retrieved).toBe('fallback_value');
    expect(hasItem('non_existent_key')).toBe(false);
  });

  it('removes item correctly', () => {
    setItem('temp_key', 'temp_val');
    expect(hasItem('temp_key')).toBe(true);

    removeItem('temp_key');
    expect(hasItem('temp_key')).toBe(false);
  });

  it('clears storage correctly', () => {
    setItem('k1', 'v1');
    setItem('k2', 'v2');
    clearStorage();

    expect(hasItem('k1')).toBe(false);
    expect(hasItem('k2')).toBe(false);
  });

  it('handles JSON parse errors gracefully without throwing', () => {
    localStorage.setItem('corrupt_json', 'invalid{json');
    const result = getItem('corrupt_json', 'safe_fallback');
    expect(result).toBe('safe_fallback');
  });
});
