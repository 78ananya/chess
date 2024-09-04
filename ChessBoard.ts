// valueGetterFunc.test.js
import valueGetterFunc from './valueGetterFunc';

describe('valueGetterFunc', () => {
  it('should return null for undefined data', () => {
    const params = { data: undefined };
    const result = valueGetterFunc(params);
    expect(result).toBe(null);
  });

  it('should return null for null data', () => {
    const params = { data: null };
    const result = valueGetterFunc(params);
    expect(result).toBe(null);
  });

  it('should return null for empty string data', () => {
    const params = { data: '' };
    const result = valueGetterFunc(params);
    expect(result).toBe(null);
  });

  it('should return the value for valid data', () => {
    const params = { data: { attributeName: 'test value' }, colDef: { field: 'attributeName' } };
    const result = valueGetterFunc(params);
    expect(result).toBe('test value');
  });

  it('should handle nested objects', () => {
    const params = { data: { nested: { attributeName: 'test value' } }, colDef: { field: 'nested.attributeName' } };
    const result = valueGetterFunc(params);
    expect(result).toBe('test value');
  });

  it('should handle invalid field names', () => {
    const params = { data: { attributeName: 'test value' }, colDef: { field: 'invalidField' } };
    const result = valueGetterFunc(params);
    expect(result).toBe(null);
  });
});
