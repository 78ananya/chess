import { valueGetterFunc } from './your-file'; // Replace with the actual path

describe('valueGetterFunc', () => {
  it('should return null for undefined values', () => {
    const params = { data: undefined };
    const result = valueGetterFunc(params);
    expect(result).toBe(null);
  });

  it('should return null for null values', () => {
    const params = { data: null };
    const result = valueGetterFunc(params);
    expect(result).toBe(null);
  });

  it('should return null for empty string values', () => {
    const params = { data: '' };
    const result = valueGetterFunc(params);
    expect(result).toBe(null);
  });

  it('should return the value for valid data', () => {
    const params = { data: { attributeName: 'test value' }, colDef: { field: 'attributeName' } };
    const result = valueGetterFunc(params);
    expect(result).toBe('test value');
  });
});
