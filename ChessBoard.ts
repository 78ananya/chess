// Test cases for valueGetterfunc
describe('valueGetterfunc', () => {
  it('should return null for undefined value', () => {
    const params = { data: {} };
    const result = valueGetterfunc(params);
    expect(result).toBeNull();
  });

  it('should return null for null value', () => {
    const params = { data: { value: null } };
    const result = valueGetterfunc(params);
    expect(result).toBeNull();
  });

  it('should return null for "null" string value', () => {
    const params = { data: { value: 'null' } };
    const result = valueGetterfunc(params);
    expect(result).toBeNull();
  });

  it('should return the value if it is not undefined, null, or "null"', () => {
    const params = { data: { value: 'some value' } };
    const result = valueGetterfunc(params);
    expect(result).toBe('some value');
  });
});
